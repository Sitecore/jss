const path = require('path');
const webpack = require('webpack');
const baseConfig = require('./webpack.base');
const vars = require('./webpack.vars');
const jssConfig = require('../config');
const fsExtra = require('fs-extra');
const templates = require('../templates');

/*
  STATIC webpack configuration.
  This configuration creates a production build,
  but using the disconnected data provider.

  Useful for deploying a static version of the site.
*/

module.exports = baseConfig
  .filter(config => config.name === 'client') // no server js for static build
  .map((c) => {
    const config = c;
    config.output.path = path.resolve(process.cwd(), jssConfig.buildArtifactsPathStatic);
    config.output.publicPath = jssConfig.staticOutputPublicPath;
    config.devtool = 'cheap-source-map';

    // dev data provider gets us local data
    config.resolve.alias.dataprovideralias = path.resolve(process.cwd(), 'src/dataProvider/DataProvider.dev');

    const plugins = [
      // define global JS variables available
      // the variables are an amalgam of ./webpack.vars.js,
      // and variables defined in the object literal below.
      // The object literal can override the vars file.
      new webpack.DefinePlugin(Object.assign(vars, {
        // activates production react build
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
        __BUNDLE_OUTPUT_PATH__: JSON.stringify(config.output.publicPath),
      })),
      // minify JS (options based on create-react-app)
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

    // deploy static files
    templates(config.output.path, jssConfig.staticOutputPublicPath);
    fsExtra.copySync(path.resolve(process.cwd(), './assets/img'), `${config.output.path}/assets/img`);
    fsExtra.copySync(path.resolve(process.cwd(), './data'), `${config.output.path}/data`);

    return config;
  });
