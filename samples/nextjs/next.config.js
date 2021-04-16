const withTM = require('next-transpile-modules')(['@sitecore-jss/sitecore-jss-nextjs'], {
  resolveSymlinks: false,
});
const path = require('path');
const baseConfig = require('./next.config.base');

const nextConfig = {
  ...baseConfig,
  webpack: (config, options) => {
    baseConfig.webpack(config, options);

    if (options.isServer) {
      config.externals = ['react', ...config.externals];
    }

    IS_TRACKING_ENABLED: process.env.IS_TRACKING_ENABLED,
    TRACKING_ENDPOINT: process.env.TRACKING_ENDPOINT,
    PERSONALIZATION_DECISIONS_ENDPOINT: process.env.PERSONALIZATION_DECISIONS_ENDPOINT,
    SITECORE_SERVICES_API_KEY: process.env.SITECORE_SERVICES_API_KEY,
    config.resolve.alias['react'] = path.resolve(__dirname, '.', 'node_modules', 'react');

    return config;
    }
}


module.exports = withTM(nextConfig);
