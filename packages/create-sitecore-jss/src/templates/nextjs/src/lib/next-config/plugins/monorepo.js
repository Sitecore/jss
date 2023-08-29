const path = require('path');
const CWD = process.cwd();

/**
 * @param {import('next').NextConfig} nextConfig
 */
const monorepoPlugin = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack: (config, options) => {
      if (options.isServer) {
        config.externals = ['react', 'vertx', ...config.externals];
      }
      // Monorepo support for @sitecore-feaas/clientside/react
      config.resolve.alias['@sitecore-feaas/clientside/react'] = path.resolve(
        CWD, options.isServer ? 
          './node_modules/@sitecore-feaas/clientside/dist/node/react.cjs' :
          './node_modules/@sitecore-feaas/clientside/dist/browser/react.esm.js'
      );

      // Overload the Webpack config if it was already overloaded
      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options);
      }

      return config;
    }
  });
};

module.exports = monorepoPlugin;
