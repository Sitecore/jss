const config = require('../../../temp/config');

/**
 * @param {import('next').NextConfig} nextConfig
 */
const corsHeaderPlugin = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    async headers() {
      return [
        {
          source: '/_next/:path*',
          headers: [{ key: 'Access-Control-Allow-Origin', value: config.sitecoreApiHost }],
        },
      ];
    },
  });
};

module.exports = corsHeaderPlugin;
