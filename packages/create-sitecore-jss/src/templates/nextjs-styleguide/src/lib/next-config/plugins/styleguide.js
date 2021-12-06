const styleguidePlugin = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
		i18n: {
			...nextConfig.i18n,

			locales: [<%- language ? ['en', language] : 'en' %>],
		},
	})
};

module.exports = styleguidePlugin;
