const path = require('path');

const vueConfig = {
  // Remove PWA config options from Vue config for server build
  pwa: undefined,

  // Configure webpack "simple object" options via `configureWebpack`.
  // If you need to modify existing rules or plugin options, use the `chainWebpack` method as it will be easier.
  configureWebpack: (config) => {
    config.entry = path.resolve(__dirname, 'server.js');
    config.target = 'node';
    config.output.filename = 'server.bundle.js';
    config.output.libraryTarget = 'this'; // libraryTarget: 'this' is required for use with Sitecore JavaScriptViewEngine
    config.module.rules.push({
      test: /\.html$/,
      exclude: /node_modules/,
      use: { loader: 'html-loader' },
    });
    // ignore anything not a .js, .vue, .html, .graphql, or .gql file for server bundling
    // rules are matched in the order in which they're defined, so be sure this rule is defined before any loaders for undesired files, e.g. css, images, etc...
    config.module.rules.unshift({
      test: /\.(?!js|vue|html|graphql|gql$)[^.]+$/,
      exclude: /node_modules/,
      use: {
        loader: 'null-loader',
      },
    });
    // Server build must emit a single bundle file, so we disable the `splitChunks` feature of webpack.
    if (config.optimization) {
      config.optimization.splitChunks = undefined;
    }
  },
  chainWebpack: (config) => {
    // Server build does not need HtmlWebpackPlugin, HtmlPwaPlugin, HotModuleReplacementPlugin
    // At minimum, HtmlWebpackPlugin must be removed for server build.
    // Otherwise, the dist/index.html emitted by the client build will be overwritten by an inaccurate file from the server build.
    // PreloadPlugin and PrefetchPlugin must be removed as they are dependent on HtmlWebpackPlugin
    config.plugins.delete('html');
    config.plugins.delete('pwa');
    // workbox is used by PWA plugin, so remove it as well to ensure no PWA-related assets are generated during server build.
    config.plugins.delete('workbox');
    config.plugins.delete('hmr');
    config.plugins.delete('preload');
    config.plugins.delete('prefetch');
  },
};

module.exports = vueConfig;
