const path = require('path');
const webpack = require('webpack');
const baseConfig = require('./webpack.base');
const pkg = require('../../../package.json');
const env = require('../env.dev-connected');

module.exports = baseConfig.map((c) => {
  const config = c;
  config.output.path = path.resolve(process.cwd(), pkg.config.buildArtifactsPathDev);
  config.output.publicPath = path.join('/', pkg.config.buildArtifactsPathDev, '/').replace(/\\/g, '/'); // path.join uses '\' on Windows
  config.resolve.alias.dataprovideralias = path.resolve(process.cwd(), 'src/dataProvider/DataProvider.prod');

  const plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
      __BUNDLE_OUTPUT_PATH__: JSON.stringify(config.output.publicPath),
      __SC_API_HOST__: JSON.stringify(env.SC_API_HOST),
      __TRANSLATION_PATH__: JSON.stringify('/data/dictionary/{{lng}}.json'),
    }),
    new webpack.NamedModulesPlugin(),
  ];

  if (config.name === 'client') {
    // config.entry.client.unshift(
    //   'react-hot-loader/patch',
    //   'webpack-dev-server/client?http://localhost:3001',
    //   'webpack/hot/only-dev-server');

    // plugins.push(new webpack.HotModuleReplacementPlugin());

    config.entry.client.unshift('webpack-dev-server/client?http://localhost:3001');
  }

  config.plugins = config.plugins ? config.plugins.concat(plugins) : plugins;

  return config;
});
