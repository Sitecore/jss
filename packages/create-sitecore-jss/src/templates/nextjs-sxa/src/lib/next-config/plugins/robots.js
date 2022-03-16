const robotsPlugin = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    async rewrites() {
      // When disconnected we proxy to the local faux layout service host, see scripts/disconnected-mode-proxy.ts
      return [
        // robots route
        {
          source: '/robots.txt',
          destination: '/api/robots',
        },
      ];
    },
  });
};

module.exports = robotsPlugin;
