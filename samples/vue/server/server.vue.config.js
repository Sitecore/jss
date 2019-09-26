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

    /*
    When building a server bundle, we insert a `null-loader` rule at the beginning of the webpack loader rule set
    that would handle file types we're not interested in. e.g. anything not a .js, .vue, .html, .graphql, or .gql file.

    However, the vue-cli webpack config uses `url-loader` for images, media, and fonts.
    `url-loader` will try to convert assets to an inline base64-encoded data string.

    This means we can't ignore images, media, and fonts during server bundle build that might be `import`-ed by components,
    otherwise the asset won't be inlined into the server bundle and will cause a 404 when SSR content is rendered by the browser.

    However, we _do_ need to ignore / remove css files or loaders when building the server bundle, as they will
    likely fail at that time.

    The quickest solution is to not ignore the asset extensions that _might_ be inlined by `url-loader`, e.g. png, jpg, etc...

    If you'd like to see the serialized webpack config that vue-cli generates, create an npm script in package.json with this command:
    `cross-env-shell BUILD_TARGET_ENV=server vue-cli-service inspect > serialized-webpack-config.js`
    After running the script, a file named `serialized-webpack-config.js` should be in the root folder of your project.
    */

    config.module.rules.unshift({
      test: /\.(?!js|vue|ts|html|graphql|gql|png|jpe?g|gif|webp|svg|woff2?|eot|ttf|otf$)[^.]+$/,
      use: {
        loader: 'null-loader',
      },
    });

    // Server build must emit a single bundle file, so we disable the `splitChunks` feature of webpack.
    if (config.optimization) {
      config.optimization.splitChunks = undefined;
      config.optimization.minimize = false;
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

    config.plugin('define').tap(webpackDefinePluginWorkaround);
  },
};

function webpackDefinePluginWorkaround(pluginArgs) {
  /*
      The vue-cli webpack config is setup to replace `process.env` with a defined object, e.g.
      {
        'process.env': {
          NODE_ENV: '"production"',
          BASE_URL: '"/"'
        }
      }

      However, replacing `process.env` with an object is too greedy, as it will replace _any_ reference to `process.env`
      in your code (or dependency code) with a literal object.

      Specifically, this borks the default `isServerRendering`, a.k.a. $isServer, function in Vue.
      That function bypasses webpack shimming (DefinePlugin) by referencing `global['process'].env.VUE_ENV`.
      And the Vue SSR renderer explicitly sets `process.env.VUE_ENV = 'server'` before performing SSR.
      However, because webpack is replacing `process.env` with a literal `Object({ NODE_ENV: 'production', BASE_URL: '/' })`,
      the generated code looks like `Object({ ... }).VUE_ENV = 'server'`;

      This will cause `global['process'].env.VUE_ENV` to "fail" because it's not referencing the same object that webpack shimmed.

      *pause for breath*

      The workaround is to re-map the default shim object that vue-cli provides to the DefinePlugin, essentially "expanding" the strings
      to replace with fully-qualified variable names.

      In other words, this:
      {
        'process.env': {
          NODE_ENV: '"production"',
          BASE_URL: '"/"'
        }
      }
      becomes this:
      {
        'process.env.NODE_ENV': '"production"',
        'process.env.BASE_URL': '"/"'
      }

      So only explicit code references to `process.env.NODE_ENV` (and BASE_URL) are replaced/shimmed by webpack.
      This means the code in Vue SSR renderer, `process.env.VUE_ENV = 'server'`, remains intact and the `$isServer` function
      will evaluate properly.
      */

  if (!pluginArgs || !Array.isArray(pluginArgs) || pluginArgs.length <= 0) {
    return pluginArgs;
  }

  if (pluginArgs.some((arg) => arg && arg['process.env'])) {
    return pluginArgs.map((arg) => {
      const processEnv = arg['process.env'];
      if (processEnv) {
        return Object.keys(processEnv).reduce((result, key) => {
          result[`process.env.${key}`] = processEnv[key];
          return result;
        }, {});
      }
      return arg;
    });
  }
  return pluginArgs;
}

module.exports = vueConfig;
