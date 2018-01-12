const path = require('path');
const webpack = require('webpack');
const baseConfig = require('./webpack.base');
const vars = require('./webpack.vars');
const jssConfig = require('../config');

/*
  DEV webpack configuration.
  This configuration is used for development builds
  (started with `npm run start`), and extends the base configurations
  by adding webpack-development-server to run a local test server
*/
module.exports = baseConfig.map((c) => {
  const config = c;
  config.output.path = path.resolve(process.cwd(), jssConfig.buildArtifactsPathDev);
  config.output.publicPath = path.join('/', jssConfig.buildArtifactsPathDev, '/').replace(/\\/g, '/'); // path.join uses '\' on Windows
  config.resolve.alias.dataprovideralias = path.resolve(process.cwd(), 'src/dataProvider/DataProvider.dev');

  const plugins = [
    // define global JS variables available
    // the variables are an amalgam of ./webpack.vars.js,
    // and variables defined in the object literal below.
    // The object literal can override the vars file.
    new webpack.DefinePlugin(Object.assign(vars, {
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
      __BUNDLE_OUTPUT_PATH__: JSON.stringify(config.output.publicPath),
    })),
    new webpack.NamedModulesPlugin(),
  ];

  // the client bundle runs webpack-dev-server; the server bundle does not (unused in dev mode)
  if (config.name === 'client') {
    config.entry.client.unshift(`webpack-dev-server/client?http://localhost:${jssConfig.devServerPort}`);
  }

  config.plugins = config.plugins ? config.plugins.concat(plugins) : plugins;

  return config;
});
