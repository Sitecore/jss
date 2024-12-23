/**
 * @param {import('next').NextConfig} nextConfig
 */
const corsHeaderPlugin = (nextConfig = {}) => {
  const apiHost = process.env.SITECORE_API_HOST;
  if (!process.env.SITECORE_API_HOST) {
    return nextConfig;
  }
  return Object.assign({}, nextConfig, {
    async headers() {
      const extendHeaders =
        typeof nextConfig.headers === 'function' ? await nextConfig.headers() : [];
      return [
        ...(await extendHeaders),
        {
          source: '/_next/:path*',
          headers: [
            {
              key: 'Access-Control-Allow-Origin',
              value: apiHost.replace(/\/$/, ''),
            },
          ],
        },
      ];
    },
  });
};

module.exports = corsHeaderPlugin;
