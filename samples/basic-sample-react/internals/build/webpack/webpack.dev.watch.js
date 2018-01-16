const path = require('path');
const webpack = require('webpack');
const baseConfig = require('./webpack.base');
const vars = require('./webpack.vars');
const jssConfig = require('../config');

/*
  DEV-WATCH webpack configuration.
  This configuration starts the development build in watch mode,
  so that when files change they are immediately deployed to the local Sitecore instance
*/
module.exports = baseConfig.map((c) => {
  const config = c;
  // change the paths so that we are deploying the artifacts directly to Sitecore
  config.output.path = path.resolve(jssConfig.sitecore.instancePath + jssConfig.sitecoreDistPath);
  config.output.publicPath = path.join('/', jssConfig.sitecoreDistPath, '/').replace(/\\/g, '/'); // path.join uses '\' on Windows

  // we use the 'prod' data provider because that reads from Sitecore
  config.resolve.alias.dataprovideralias = path.resolve(process.cwd(), 'src/dataProvider/DataProvider.prod');

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
    new webpack.NamedModulesPlugin()
  ];

  config.plugins = config.plugins ? config.plugins.concat(plugins) : plugins;

  // turn on file watching
  config.watch = true;

  return config;
});
