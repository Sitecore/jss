const { constants } = require('@sitecore-jss/sitecore-jss-nextjs');
const jssConfig = require('../../../temp/config');

const isDisconnected = process.env.JSS_MODE === constants.JSS_MODE.DISCONNECTED;

/**
 * @param {import('next').NextConfig} nextConfig
 */
const trackingPlugin = (nextConfig = {}) => {
  if (isDisconnected) {
    return nextConfig;
  }

  return Object.assign({}, nextConfig, {
    async rewrites() {
      const existingRewrites = await (nextConfig.rewrites ? nextConfig.rewrites() : []);

      return [
        ...existingRewrites,
        // visitor identification
        {
          source: '/layouts/system/:path*',
          destination: `${jssConfig.sitecoreApiHost}/layouts/system/:path*`,
        },
      ];
    },
  });
};

module.exports = trackingPlugin;
