const withTM = require('next-transpile-modules')(['@sitecore-jss/sitecore-jss-nextjs'], {
  resolveSymlinks: false,
});
const path = require('path');
const prodConfig = require('./next.config.prod');

const nextConfig = {
  ...prodConfig,
  webpack: (config, options) => {
    prodConfig.webpack(config, options);

    if (options.isServer) {
      config.externals = ['react', ...config.externals];
    }

    config.resolve.alias['react'] = path.resolve(__dirname, '.', 'node_modules', 'react');

    return config;
  }
}


module.exports = withTM(nextConfig);
