/**
 * @param {import('next').NextConfig} nextConfig
 */
const edgePlugin = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack: (config, options) => {
      if (options.isServer && options.nextRuntime === 'edge') {
        // Next.js enforces a strict (browser-based) runtime on Edge.
        // Point the Edge compiler in the right direction for 3rd-party module browser bundles.

        // debug
        config.resolve.alias['debug'] = require.resolve('debug/src/browser');
        
        // graphql-request
        config.resolve.alias['cross-fetch'] = require.resolve('cross-fetch/dist/browser-ponyfill');
        config.resolve.alias['form-data'] = require.resolve('form-data/lib/browser');
      }

      // Overload the Webpack config if it was already overloaded
      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options);
      }

      return config;
    }
  });
};

module.exports = edgePlugin;
