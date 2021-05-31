let vueConfig = {};
const path = require("path");

if (process.env.BUILD_TARGET_ENV === 'server') {
  const serverConfig = require('./server/server.vue.config');
  vueConfig = serverConfig;
} else if (process.env.BUILD_TARGET_ENV === 'client') {
  // We can't directly assign a value to `process.env.BASE_URL`, as it is always assigned by `config.publicPath`, regardless of whether `config.publicPath` is defined or undefined.
  // Therefore, we set a value for `process.env.PUBLIC_URL` then use that value for `config.publicPath`.
  vueConfig.publicPath = process.env.PUBLIC_URL;

  // By default, Vue cli uses HtmlWebpackPlugin to generate the html file used for rendering the app.
  // When in production mode, it also enables the HtmlWebpackPlugin `minify` option and sets
  // the `removeAttributeQuotes` option of the html minifier to true.
  // Our server-side rendering script uses string replacement to determine where to inject the
  // rendered output of the JSS app. For example, the SSR script is looking for `<div id="root">` and injecting
  // the rendered output into that place in the html template string.
  // However, with the `removeAttributeQuotes` enabled, our html template output is `<div id=root>`, so the SSR
  // string replacement can't find `<div id="root">`.
  // Therefore, by disabling the `removeAttributeQuotes` flag for html minification, all is well.
  if (process.env.NODE_ENV === 'production') {
    vueConfig.chainWebpack = (config) => {
      config.plugin('html').init((Plugin, args) => {
        const newArgs = {
          ...args[0],
        };
        newArgs.minify.removeAttributeQuotes = false;
        return new Plugin(newArgs);
      });
    };
  }
} else {
  vueConfig.devServer = {
    port: process.env.PORT || 3000,
    proxy: `http://localhost:${process.env.PROXY_PORT || 3042}`,
  };
}

// We may already have an existing `configureWebpack` definition (e.g. when building the server bundle).
// So we need to preserve that definition and ensure it is invoked along with the config
// options that are common to both client/server bundles.
const existingConfigureWebpack = vueConfig.configureWebpack;

vueConfig.configureWebpack = (config) => {
  if (existingConfigureWebpack) {
    existingConfigureWebpack(config);
  }

  // we turn off `.mjs` file support in Vue, because `graphql` ships
  // mjs files in its npm package (bad) and Vue's webpack settings destroy
  // graphql's mjs files, causing strange runtime errors. By disabling mjs,
  // we make webpack use the .js files in graphql instead, which work fine.
  const indexOfMjs = config.resolve.extensions.indexOf('.mjs');
  if (indexOfMjs > -1) {
    config.resolve.extensions.splice(indexOfMjs, 1);
  }

  config.resolve.alias.vue = path.resolve(__dirname, 'node_modules/vue');

  config.module.rules.push({
    test: /\.(graphql|gql)$/,
    exclude: /node_modules/,
    loader: 'graphql-tag/loader',
  });
};

// Below is a workaround when building the app within the context of the JSS monorepo.
// The monorepo uses symlinks within the `node_modules` folder to reference `sitecore-jss-*` packages,
// which causes the eslint loader to attempt resolving eslint config from the _actual_ package location,
// not the "virtual" location under `node_modules`. In turn, an incorrect eslint config is resolved and
// breaks the build process.
// The workaround is to exclude the `packages/sitecore-jss*` packages from eslint-loader.

// We may already have an existing `chainWebpack` definition (e.g. when building the server bundle).
// So we need to preserve that definition and ensure it is invoked along with the config
// options that are common to both client/server bundles.
const existingChainWebpack = vueConfig.chainWebpack;
vueConfig.chainWebpack = (config) => {
  if (existingChainWebpack) {
    existingChainWebpack(config);
  }
  config.module.rule('eslint').exclude.add(/packages(\\|\/)sitecore-jss*/);
};

module.exports = vueConfig;
