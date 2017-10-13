const path = require('path');
const webpack = require('webpack');
const baseConfig = require('./webpack.base');
const pkg = require('../../../package.json');

module.exports = baseConfig.map((c) => {
  const config = c;
  config.output.path = path.resolve(process.cwd(), pkg.config.buildArtifactsPathProd);
  config.output.publicPath = path.join('/', pkg.config.sitecoreDistPath, '/').replace(/\\/g, '/'); // path.join uses '\' on Windows

  const plugins = [new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
    },
    __BUNDLE_OUTPUT_PATH__: JSON.stringify(config.output.publicPath)
  })];
  config.plugins = config.plugins ? config.plugins.concat(plugins) : plugins;
  return config;
});
