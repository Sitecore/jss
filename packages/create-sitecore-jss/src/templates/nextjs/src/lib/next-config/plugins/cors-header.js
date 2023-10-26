const config = require('../../../temp/config');

/**
 * @param {import('next').NextConfig} nextConfig
 */
const corsHeaderPlugin = (nextConfig = {}) => {
  if (!config.sitecoreApiHost) {
    return nextConfig;
  }
  return Object.assign({}, nextConfig, {
    async headers() {
      const extendHeaders = typeof nextConfig.headers === "function" ? await nextConfig.headers() : [];
      return [
        ...await extendHeaders,
        {
          source: '/_next/:path*',
          headers: [{ key: 'Access-Control-Allow-Origin', value: config.sitecoreApiHost }],
        },
      ];
    },
  });
};

module.exports = corsHeaderPlugin;
