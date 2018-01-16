const path = require('path');
const webpack = require('webpack');
const merge = require('lodash.merge');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

/*
  The core Webpack configuration used by all build configurations.
  Other configurations import this base config to extend it with dev/prod specific enhancements.
*/

const sharedConfig = {
  context: path.resolve(process.cwd(), 'src'),
  output: {
    // path and publicPath will be set in webpack.dev.js and webpack.prod.js
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      // JS/JSX loader
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          babelrc: false,
          presets: [
            [
              'env',
              {
                modules: false,
              },
            ],
            'react',
            'stage-0',
          ],
          plugins: [
            'react-hot-loader/babel',
          ],
        },
      },
      // CSS loader
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
      // Image loader
      {
        test: /\.(png|jpg|gif)$/,
        use: 'url-loader?limit=50000&name=img/img-[hash:6].[ext]',
      },
      // Font loaders
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'file-loader',
      },
      // JSON loader
      {
        test: /\.json$/,
        use: 'json-loader',
      },
    ],
  },
  resolve: {
    modules: [
      path.resolve(process.cwd(), 'src'),
      'node_modules',
    ],
    extensions: ['.js', '.jsx', '.react.js'],
    alias: {
      assets: path.resolve(process.cwd(), 'assets'),
      'data-provider': path.resolve(process.cwd(), 'src/dataProvider'),
    },
  },
  plugins: [
    new ProgressBarPlugin({
      format: `  build [:bar] ${chalk.green.bold(':percent')} (:elapsed seconds)`,
      clear: false,
    }),
    // extract CSS imports into a css file; [name] is the bundle name (client, server)
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true,
    })
  ]
};

/*
  Define the client-side bundle. This is executed by a browser as it runs the application.
*/
const clientConfig = () => {
  const merged = merge(
    {},
    sharedConfig,
    {
      name: 'client',
      target: 'web',
      entry: {
        // main entry point for the application; src/client.js
        client: ['./client.js'],
      },
    }
  );

  merged.plugins.push(new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor-client',
    filename: '[name].bundle.js',
    minChunks: module => module.resource && module.resource.indexOf('node_modules') !== -1,
  }));

  return merged;
};

/*
  Define the server-side bundle. This is used by a Node server (or Sitecore server) when doing
  Server-Side Rendering (SSR) of the JSS application.
*/
const serverConfig = () => {
  const merged = merge(
    {},
    sharedConfig,
    {
      name: 'server',
      target: 'node',
      entry: {
        // main entry point for the application; src/server.js
        server: ['./server.js'],
      },
      output: {
        libraryTarget: 'this', // this option is required for use with JavaScriptViewEngine
      },
    });
  return merged;
};

// export the client and server base webpack configurations
// they are factory methods to avoid any object-by-reference issues in configs that extend them
module.exports = [
  clientConfig(),
  serverConfig(),
];
