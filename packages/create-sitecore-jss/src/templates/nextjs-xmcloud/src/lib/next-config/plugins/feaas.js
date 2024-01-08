/**
 * @param {import('next').NextConfig} nextConfig
 */
const feaasPlugin = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack: (config, options) => {
      if (options.isServer) {
        // Force use of CommonJS on the server for FEAAS SDK since JSS also uses CommonJS entrypoint to FEAAS SDK.
        // This prevents issues arising due to FEAAS SDK's dual CommonJS/ES module support on the server (via conditional exports).
        // See https://nodejs.org/api/packages.html#dual-package-hazard.
        config.externals = [
          {
            '@sitecore-feaas/clientside/react': 'commonjs @sitecore-feaas/clientside/react',
            '@sitecore/byoc': 'commonjs @sitecore/byoc',
            '@sitecore/byoc/react': 'commonjs @sitecore/byoc/react',
          },
          ...config.externals,
        ];
      }

      // Overload the Webpack config if it was already overloaded
      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options);
      }

      return config;
    },
  });
};

module.exports = feaasPlugin;
