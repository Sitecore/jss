const path = require('path');
const webpack = require('webpack');
const merge = require('lodash.merge');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const sharedConfig = {
  context: path.resolve(process.cwd(), 'src'),
  output: {
    // path and publicPath will be set in webpack.dev.js and webpack.prod.js
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
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
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: 'url-loader?limit=50000&name=img/img-[hash:6].[ext]',
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'file-loader',
      },
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
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true,
    }),
  ],
};

const clientConfig = () => {
  const merged = merge(
    {},
    sharedConfig,
    {
      name: 'client',
      target: 'web',
      entry: {
        client: ['./client.js'],
      },
    }
  );

  merged.plugins.push(new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor-client',
    filename: '[name].bundle.js',
    minChunks: module => module.resource && module.resource.indexOf('node_modules') !== -1,
  }));
  merged.plugins.push(new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    openAnalyzer: false,
  }));

  return merged;
};

const serverConfig = () => {
  const merged = merge(
    {},
    sharedConfig,
    {
      name: 'server',
      target: 'node',
      entry: {
        server: ['./server.js'],
      },
      output: {
        libraryTarget: 'this', // this option is required for use with JavaScriptViewEngine
      },
    });
  return merged;
};

module.exports = [
  clientConfig(),
  serverConfig(),
];
