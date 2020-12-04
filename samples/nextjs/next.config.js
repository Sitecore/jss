const jssConfig = require('./src/temp/config');
const packageConfig = require('./package.json').config;
const { JSS_MODE_DISCONNECTED, JSS_MODE_EDITING } = require('@sitecore-jss/sitecore-jss-nextjs');
const { parse } = require('url');
const chalk = require('chalk');

const disconnectedServerUrl = `http://localhost:${process.env.DISCONNECTED_SERVER_PORT || 3042}/`;
const disconnected = process.env.JSS_MODE === JSS_MODE_DISCONNECTED;
const editing = process.env.JSS_MODE === JSS_MODE_EDITING;
const publicUrl = process.env.PUBLIC_URL;

module.exports = (phase, { defaultConfig }) => {
  
  let assetPrefix = '';
  let images = defaultConfig.images;

  //TODO: Move editing-specific config mods
  if (editing) {
    if (!publicUrl || publicUrl.length === 0) {
      console.warn(chalk.yellow.bold('Warning: ') + 'A PUBLIC_URL environment variable is not defined. Falling back to http://localhost:3000.')
      publicUrl = 'http://localhost:3000';
    } else {
      // Set our public URL as the asset prefix, which is used by Next.js for the JavaScript and CSS files it loads
      // See https://nextjs.org/docs/api-reference/next.config.js/cdn-support-with-asset-prefix
      assetPrefix = publicUrl;
      
      // Set our public URL to be used by Next.js image optimization
      // See https://nextjs.org/docs/basic-features/image-optimization
      const domain = parse(publicUrl).hostname;
      images.domains = [domain];
      images.path = publicUrl + defaultConfig.images.path;
    }
  }

  const env = {
    // Expose current Next.js phase as an environment variable
    // See available phases here: https://github.com/vercel/next.js/blob/canary/packages/next/next-server/lib/constants.ts#L1-L4
    NEXT_PHASE: phase,
  };

  const i18n = {
    // These are all the locales you want to support in your application.
    // These should generally match (or at least be a subset of) those in Sitecore.
    locales: ['en', 'da-DK'],
    // This is the locale that will be used when visiting a non-locale
    // prefixed path e.g. `/styleguide`.
    defaultLocale: packageConfig.language,
  };

  async function rewrites() {
    if (disconnected) {
      // When disconnected we proxy to the local faux layout service host, see scripts/disconnected-mode-server.js
      return [
        {
          source: '/sitecore/:path*',
          destination: `${disconnectedServerUrl}/sitecore/:path*`,
        },
        {
          source: '/:locale/sitecore/:path*',
          destination: `${disconnectedServerUrl}/sitecore/:path*`,
        },
        // media items
        {
          source: '/data/media/:path*',
          destination: `${disconnectedServerUrl}/data/media/:path*`,
        },
        {
          source: '/:locale/data/media/:path*',
          destination: `${disconnectedServerUrl}/data/media/:path*`,
        },
      ];
    } else {
      // When in connected mode we want to proxy Sitecore paths off to Sitecore
      return [
        {
          source: '/sitecore/:path*',
          destination: `${jssConfig.sitecoreApiHost}/sitecore/:path*`,
        },
        {
          source: '/:locale/sitecore/:path*',
          destination: `${jssConfig.sitecoreApiHost}/sitecore/:path*`,
        },
        // media items
        {
          source: '/-/:path*',
          destination: `${jssConfig.sitecoreApiHost}/-/:path*`,
        },
        {
          source: '/:locale/-/:path*',
          destination: `${jssConfig.sitecoreApiHost}/-/:path*`,
        },
        // visitor identification
        {
          source: '/layouts/:path*',
          destination: `${jssConfig.sitecoreApiHost}/layouts/:path*`,
        },
        {
          source: '/:locale/layouts/:path*',
          destination: `${jssConfig.sitecoreApiHost}/layouts/:path*`,
        },
      ];
    }
  };

  const applyGraphQLCodeGenerationLoaders = (config, options) => {
    config.module.rules.push({
      test: /\.graphql$/,
      exclude: /node_modules/,
      use: [options.defaultLoaders.babel, { loader: 'graphql-let/loader' }],
    })

    config.module.rules.push({
      test: /\.graphqls$/,
      exclude: /node_modules/,
      use: ['graphql-let/schema/loader'],
    })

    config.module.rules.push({
      test: /\.ya?ml$/,
      type: 'json',
      use: 'yaml-loader',
    })

    return config;
  }

  const webpack = (config, options) => {
    applyGraphQLCodeGenerationLoaders(config, options);

    if (!options.isServer) {
      // Exclude express (for Editing Server) from the client bundle
      // https://stackoverflow.com/a/56482335/233024
      config.externals.push({ express: { commonjs: 'express' } });
    }

    return config;
  }

  return {
    assetPrefix,
    env,
    i18n,
    images,
    rewrites,
    webpack
  };
};
