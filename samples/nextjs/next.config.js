const jssConfig = require('./src/temp/config');
const packageConfig = require('./package.json').config;
const { JSS_MODE_DISCONNECTED, JSS_MODE_EDITING } = require('@sitecore-jss/sitecore-jss-nextjs');

const withEditing = require('@sitecore-jss/sitecore-jss-nextjs-editing-host').config({
  enabled: process.env.JSS_MODE === JSS_MODE_EDITING,
});

const disconnectedServerUrl = `http://localhost:${process.env.DISCONNECTED_SERVER_PORT || 3042}/`;
const disconnected = process.env.JSS_MODE === JSS_MODE_DISCONNECTED;

const nextConfig = {

  i18n: {
    // These are all the locales you want to support in your application.
    // These should generally match (or at least be a subset of) those in Sitecore.
    locales: ['en', 'da-DK'],
    // This is the locale that will be used when visiting a non-locale
    // prefixed path e.g. `/styleguide`.
    defaultLocale: packageConfig.language,
  },

  async rewrites() {
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
  },
  
  webpack: (config, options) => {
    applyGraphQLCodeGenerationLoaders(config, options);

    return config;
  },
}

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

module.exports = withEditing(nextConfig);
