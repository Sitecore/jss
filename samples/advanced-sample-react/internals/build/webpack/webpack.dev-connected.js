const path = require('path');
const webpack = require('webpack');
const baseConfig = require('./webpack.base');
const vars = require('./webpack.vars');
const jssConfig = require('../config');

module.exports = baseConfig.map((c) => {
  const config = c;
  config.output.path = path.resolve(process.cwd(), jssConfig.buildArtifactsPathDev);
  config.output.publicPath = path.join('/', jssConfig.buildArtifactsPathDev, '/').replace(/\\/g, '/'); // path.join uses '\' on Windows
  config.resolve.alias.dataprovideralias = path.resolve(process.cwd(), 'src/dataProvider/DataProvider.prod');

  const plugins = [
    new webpack.DefinePlugin(Object.assign(vars, {
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
      __BUNDLE_OUTPUT_PATH__: JSON.stringify(config.output.publicPath),
    })),
    new webpack.NamedModulesPlugin(),
  ];

  if (config.name === 'client') {
    config.entry.client.unshift('webpack-dev-server/client?http://localhost:3001');
  }

  config.plugins = config.plugins ? config.plugins.concat(plugins) : plugins;

  return config;
});
