const jssConfig = require('./src/temp/config');
const packageConfig = require('./package.json').config;
const {
  getPublicUrl,
} = require('@sitecore-jss/sitecore-jss-nextjs');

const publicUrl = getPublicUrl();

const nextConfig = {
  // Set assetPrefix to our public URL
  assetPrefix: publicUrl,

  // Allow specifying a distinct distDir when concurrently running app in a container
  distDir: process.env.NEXTJS_DIST_DIR || '.next',

  // Make the same PUBLIC_URL available as an environment variable on the client bundle
  env: {
    PUBLIC_URL: publicUrl,
  },

  i18n: {
    // These are all the locales you want to support in your application.
    // These should generally match (or at least be a subset of) those in Sitecore.
    locales: ['en', 'da-DK'],
    // This is the locale that will be used when visiting a non-locale
    // prefixed path e.g. `/styleguide`.
    defaultLocale: packageConfig.language,
  },
  
  // Enable React Strict Mode
  reactStrictMode: true,

  async rewrites() {
    // When in connected mode we want to proxy Sitecore paths off to Sitecore
    return [
      {
        source: '/sitecore/:path*',
        destination: `${jssConfig.sitecoreApiHost}/sitecore/:path*`,
      },
      // media items
      {
        source: '/-/:path*',
        destination: `${jssConfig.sitecoreApiHost}/-/:path*`,
      },
      // visitor identification
      {
        source: '/layouts/:path*',
        destination: `${jssConfig.sitecoreApiHost}/layouts/:path*`,
      },
    ];
  },

  webpack: (config, options) => {
    applyGraphQLCodeGenerationLoaders(config, options);

    return config;
  },
};

const applyGraphQLCodeGenerationLoaders = (config, options) => {
  config.module.rules.push({
    test: /\.graphql$/,
    exclude: /node_modules/,
    use: [options.defaultLoaders.babel, { loader: 'graphql-let/loader' }],
  });

  config.module.rules.push({
    test: /\.graphqls$/,
    exclude: /node_modules/,
    use: ['graphql-let/schema/loader'],
  });

  config.module.rules.push({
    test: /\.ya?ml$/,
    type: 'json',
    use: 'yaml-loader',
  });

  return config;
};

module.exports = nextConfig;
