const withTM = require('next-transpile-modules')(['@sitecore-jss/sitecore-jss-nextjs'], {
  resolveSymlinks: false,
});
const path = require('path');

const CWD = process.cwd();

const monorepoPlugin = (nextConfig = {}) => {
  return withTM(Object.assign({}, nextConfig, {
    webpack: (config, options) => {
      if (options.isServer) {
        config.externals = ['react', 'vertx', ...config.externals];
      }

      config.resolve.alias['react'] = path.resolve(CWD, '.', 'node_modules', 'react');

      // Overload the Webpack config if it was already overloaded
      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options);
      }

      return config;
    }
  }));
};

module.exports = monorepoPlugin;
