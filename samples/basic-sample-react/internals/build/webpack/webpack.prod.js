const path = require('path');
const webpack = require('webpack');
const baseConfig = require('./webpack.base');
const vars = require('./webpack.vars');
const jssConfig = require('../config');

/*
  PROD webpack configuration.
  This configuration is used for production builds
  (started with `npm run build` or any deployment script), 
  and extends the base configurations by minifying JS,
  activating production React,
  and creating sourcemaps
*/

module.exports = baseConfig.map((c) => {
  const config = c;
  config.output.path = path.resolve(process.cwd(), jssConfig.buildArtifactsPathProd);
  config.output.publicPath = path.join('/', jssConfig.sitecoreDistPath, '/').replace(/\\/g, '/'); // path.join uses '\' on Windows
  config.resolve.alias.dataprovideralias = path.resolve(process.cwd(), 'src/dataProvider/DataProvider.prod');
  config.devtool = 'cheap-source-map';

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

  return config;
});
