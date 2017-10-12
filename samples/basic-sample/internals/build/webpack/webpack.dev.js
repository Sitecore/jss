const path = require('path');
const webpack = require('webpack');
const baseConfig = require('./webpack.base');
const pkg = require('../../../package.json');

module.exports = baseConfig.map((c) => {
  const config = c;
  config.output.path = path.resolve(process.cwd(), pkg.config.buildArtifactsPathDev);
  config.output.publicPath = path.join('/', pkg.config.buildArtifactsPathDev, '/').replace(/\\/g, '/'); // path.join uses '\' on Windows

  const plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
      __BUNDLE_OUTPUT_PATH__: JSON.stringify(config.output.publicPath)
    }),
    new webpack.NamedModulesPlugin()
  ];

  if (config.name === 'client') {
    config.entry.client.unshift(
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:3001',
      'webpack/hot/only-dev-server'
    );

    plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  config.plugins = config.plugins ? config.plugins.concat(plugins) : plugins;

  return config;
});
