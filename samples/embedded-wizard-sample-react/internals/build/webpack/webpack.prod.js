const path = require('path');
const webpack = require('webpack');
const baseConfig = require('./webpack.base');
const vars = require('./webpack.vars');
const jssConfig = require('../config');

module.exports = baseConfig.map((c) => {
  const config = c;
  config.output.path = path.resolve(process.cwd(), jssConfig.buildArtifactsPathProd);
  config.output.publicPath = path.join('/', jssConfig.sitecoreDistPath, '/').replace(/\\/g, '/'); // path.join uses '\' on Windows
  config.resolve.alias.dataprovideralias = path.resolve(process.cwd(), 'src/dataProvider/DataProvider.prod');
  config.devtool = 'cheap-source-map';

  const plugins = [
    new webpack.DefinePlugin(Object.assign(vars, {
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
      __BUNDLE_OUTPUT_PATH__: JSON.stringify(config.output.publicPath),
    })),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        comparisons: false,
      },
      mangle: {
        safari10: true,
      },
      output: {
        comments: false,
        ascii_only: true,
      },
      sourceMap: true,
    }),
  ];

  config.plugins = config.plugins ? config.plugins.concat(plugins) : plugins;

  return config;
});
