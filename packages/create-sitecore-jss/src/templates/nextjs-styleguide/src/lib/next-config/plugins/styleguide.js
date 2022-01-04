const styleguidePlugin = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    i18n: {
      ...nextConfig.i18n,
      locales: ['en', '<%- language %>'],
    },
  });
};

module.exports = styleguidePlugin;
