const { constants } = require('@sitecore-jss/sitecore-jss-nextjs');

const disconnectedServerUrl = `http://localhost:${process.env.PROXY_PORT || 3042}/`;
const isDisconnected = process.env.JSS_MODE === constants.JSS_MODE.DISCONNECTED;

const disconnectedPlugin = (nextConfig = {}) => {
  if (!isDisconnected) {
    return nextConfig;
  }

  return Object.assign({}, nextConfig, {
    async rewrites() {
      // When disconnected we proxy to the local faux layout service host, see scripts/disconnected-mode-server.js
      return [
        {
          source: '/sitecore/:path*',
          destination: `${disconnectedServerUrl}/sitecore/:path*`,
        },
        // media items
        {
          source: '/data/media/:path*',
          destination: `${disconnectedServerUrl}/data/media/:path*`,
        },
      ];
    },

    webpack: (config, options) => {
      // Prevent webpack-5 from throwing error for sitecore-import.json when app first starts
      config.resolve.fallback = {
        'sitecore/manifest/sitecore-import.json': false
      };

      // Overload the Webpack config if it was already overloaded
      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options);
      }

      return config;
    }
  });
};

module.exports = disconnectedPlugin;
