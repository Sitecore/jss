const { constants } = require('@sitecore-jss/sitecore-jss-nextjs');

const disconnectedServerUrl = `http://localhost:${process.env.PROXY_PORT || 3042}/`;
const isDisconnected = process.env.JSS_MODE === constants.JSS_MODE.DISCONNECTED;

/**
 * @param {import('next').NextConfig} nextConfig
 */
const disconnectedPlugin = (nextConfig = {}) => {
  if (!isDisconnected) {
    return nextConfig;
  }

  return Object.assign({}, nextConfig, {
    async rewrites() {
      // When disconnected we proxy to the local faux layout service host, see scripts/disconnected-mode-proxy.ts
      return [
        // API endpoints
        {
          source: '/sitecore/api/:path*',
          destination: `${disconnectedServerUrl}/sitecore/api/:path*`,
        },
        // media items
        {
          source: '/data/media/:path*',
          destination: `${disconnectedServerUrl}/data/media/:path*`,
        },
      ];
    },
  });
};

module.exports = disconnectedPlugin;
