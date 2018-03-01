const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {  server: './server.bundle.ts' },
  resolve: { extensions: ['.ts', '.js'] },
  target: 'node',
  node: {
    // This ensures the global node variables are untouched
    __dirname: false,
    __filename: false,
  },
  // this makes sure we include node_modules and other 3rd party libraries
  externals: [/(node_modules|main\..*\.js)/],
  output: {
    filename: '[name].bundle.js',
    libraryTarget: 'commonjs' // ensures server.ts renderView is exposed as a public method.
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: 'ts-loader' }
    ]
  },
  plugins: [
    new webpack.NormalModuleReplacementPlugin(/\.\.\/environments\/environment/, '../environments/environment.server'),
    // Temporary Fix for issue: https://github.com/angular/angular/issues/11580
    // for "WARNING Critical dependency: the request of a dependency is an expression"
    new webpack.ContextReplacementPlugin(
      /(.+)?angular(\\|\/)core(.+)?/,
      path.join(__dirname, 'src'), // location of your src
      {} // a map of your routes
    )
  ]
}
