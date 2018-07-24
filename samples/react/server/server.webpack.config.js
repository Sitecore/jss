const path = require('path');
const env = require('babel-preset-env');
const reactApp = require('babel-preset-react-app');
const stage0 = require('babel-preset-stage-0');

// Webpack build configuration to build the SSR bundle.
// Invoked by build:server.

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, './server.js'),
  target: 'node',
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: '../build/server.bundle.js',
    libraryTarget: 'this',
  },
  optimization: {
    minimize: false,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [env, stage0, reactApp],
          },
        },
      },
      // The GraphQL loader preprocesses GraphQL queries in .graphql files.
      {
        test: /\.(graphql)$/,
        exclude: /node_modules/,
        use: {
          loader: 'graphql-tag/loader',
        },
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: { loader: 'html-loader' },
      },
      {
        // anything not JS or HTML, we load as a URL
        // this makes static image imports work with SSR
        test: /\.(?!js|html|graphql$)[^.]+$/,
        exclude: /node_modules/,
        use: {
          loader: 'url-loader',
        },
      },
      {
        // anything in node_modules that isn't js,
        // we load as null - e.g. imported css from a module,
        // that is not needed for SSR
        test: /\.(?!js|html|graphql$)[^.]+$/,
        include: /node_modules/,
        use: {
          loader: 'null-loader',
        },
      },
    ],
  },
};
