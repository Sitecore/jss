const path = require('path');
const webpack = require('webpack');
const baseConfig = require('./webpack.base');
const pkg = require('../../../package.json');
const env = require('../env.prod');

module.exports = baseConfig.map((c) => {
  const config = c;
  config.output.path = path.resolve(process.cwd(), pkg.config.buildArtifactsPathProd);
  config.output.publicPath = path.join('/', pkg.config.sitecoreDistPath, '/').replace(/\\/g, '/'); // path.join uses '\' on Windows
  config.resolve.alias.dataprovideralias = path.resolve(process.cwd(), 'src/dataProvider/DataProvider.prod');

  const plugins = [new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
    },
    __BUNDLE_OUTPUT_PATH__: JSON.stringify(config.output.publicPath),
    __SC_API_HOST__: JSON.stringify(env.SC_API_HOST),
    __TRANSLATION_PATH__: JSON.stringify(`/sitecore/api/jss/dictionary/${pkg.config.appName}/{{lng}}`),
  })];
  config.plugins = config.plugins ? config.plugins.concat(plugins) : plugins;
  return config;
});
