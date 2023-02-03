/**
 * @param {import('next').NextConfig} nextConfig
 */
const styleguidePlugin = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    i18n: {
      ...nextConfig.i18n,
      locales: ['en', '<%- language %>'],
    },
    webpack: (config, options) => {
      // Prevent webpack-5 from throwing error for sitecore-import.json when app first starts
      config.resolve.fallback = {
        'sitecore/manifest/sitecore-import.json': false,
        ...config.resolve.fallback,
      };

      // Overload the Webpack config if it was already overloaded
      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options);
      }

      return config;
    },
  });
};

module.exports = styleguidePlugin;
