const withTM = require('next-transpile-modules')(['@sitecore-jss/sitecore-jss-nextjs'], {
  resolveSymlinks: false,
});
const path = require('path');
const baseConfig = require('./next.config.base');

const nextConfig = {
  ...baseConfig,
  webpack: (config, options) => {
    baseConfig.webpack(config, options);

    if (options.isServer) {
      config.externals = ['react', ...config.externals];
    }

    config.resolve.alias['react'] = path.resolve(__dirname, '.', 'node_modules', 'react');

    return config;
  }
}


module.exports = withTM(nextConfig);
