const {
  startDevServer,
  startRenderHostTunnel,
} = require('@sitecore-jss/sitecore-jss-rendering-host');
const path = require('path');
const jssConfig = require('../scjssconfig.json');
const ssrWebpackConfig = require('../server/server.webpack.config');
const craWebpackConfig = require('../node_modules/react-scripts/config/webpack.config');
const craWebpackDevServerConfig = require('../node_modules/react-scripts/config/webpackDevServer.config');

startRenderHostTunnel('localhost', { port: 5000, subdomain: 'jss' })
  .then((tunnelUrl) => {
    const browserUrl = `${jssConfig.sitecore.layoutServiceHost}?sc_httprenderengineurl=${tunnelUrl}`;
    // const buildArtifactsPath = path.resolve(__dirname, '../build');
    startDevServer({
      port: 5000,
      tunnelUrl,
      configFactory,
      urlToOpenOnStart: browserUrl,
    });
  })
  .catch((err) => {
    console.error(err);
  });

// NOTE: `configFactory` will be different for each JSS app/sample app
function configFactory(nodeEnv, tunnelUrl) {
  process.env.PUBLIC_URL = tunnelUrl;
  const clientWebpackConfig = craWebpackConfig(nodeEnv);

  if (nodeEnv === 'development') {
    // CRA injects it's own WDS client, which unfortunately hard-codes the socket URL that is
    // used for communication with WDS.
    // https://github.com/facebook/create-react-app/blob/5c637a488fcef04929927bbcf7780694b432bd00/packages/react-scripts/config/webpack.config.js#L137
    // The comments in the webpack config suggest to replace the CRA client with the "stock" client entries below.

    // By default, the CRA-provided `react-dev-utils/webpackHotDevClient` is the first entry in the `entry` array.
    // So, insert the default webpack client as the first entry, then replace the existing CRA client with the other
    // default webpack entry.

    // Be sure to append the tunnel URL to the `webpack-dev-server/client` entry point...
    // The `client` script uses this value when establishing the URL for socket connections.
    clientWebpackConfig.entry.unshift(
      `${require.resolve('webpack-dev-server/client')}?${tunnelUrl}`
    );
    clientWebpackConfig.entry[1] = require.resolve('webpack/hot/dev-server');

    // The CRA dev config defaults to `/dist` for output path. We want the `build` folder for our artifacts.
    clientWebpackConfig.output.path = path.resolve(__dirname, '../build');

    // CRA uses `style-loader` in development mode to inject css as `<style />` tags in the HTML output.
    // However, `style-loader` does not work in SSR, so the server-rendered markup displays as unstyled
    // until the client-side rendering is complete, resulting in flash-of-unstyled-content (FOUC).
    // In production mode, CRA uses `MiniCSSExtractPlugin` to extract css to files.
    // Potential workaround is to use style-loader-equivalent packages that are SSR-friendly. However,
    // most of those packages require changes to app code in order to properly function - something we're trying to avoid.
    // So, the workaround below is to generate a `production` webpack config, then replace the use of `style-loader`
    // in the `development` config with `MiniCSSExtractPlugin` from `production` config. HackyAF, and brittleAF
    // as well if CRA adds/removes rules or loaders from their webpack config. 🤢
    const productionConfig = craWebpackConfig('production');
    let miniCssLoader;
    productionConfig.module.rules.forEach((rule) => {
      if (rule.oneOf && Array.isArray(rule.oneOf)) {
        rule.oneOf.forEach((conditionalRule) => {
          if (conditionalRule.use && Array.isArray(conditionalRule.use)) {
            conditionalRule.use.forEach((loaderDef) => {
              if (
                loaderDef.loader &&
                typeof loaderDef.loader === 'string' &&
                loaderDef.loader.indexOf('mini-css-extract-plugin') !== -1
              ) {
                miniCssLoader = loaderDef;
              }
            });
          }
        });
      }
    });
    clientWebpackConfig.module.rules.forEach((rule) => {
      if (rule.oneOf && Array.isArray(rule.oneOf)) {
        rule.oneOf.forEach((conditionalRule) => {
          if (conditionalRule.use && Array.isArray(conditionalRule.use)) {
            conditionalRule.use.forEach((loader, index, loaderArr) => {
              if (typeof loader === 'string' && loader.indexOf('style-loader') !== -1) {
                loaderArr[index] = miniCssLoader;
              }
            });
          }
        });
      }
    });

    const miniCssPlugin = productionConfig.plugins.find(
      (plugin) => plugin.constructor.name === 'MiniCssExtractPlugin'
    );
    clientWebpackConfig.plugins.push(miniCssPlugin);
  }

  return {
    ssrWebpackConfig,
    clientWebpackConfig,
    devServerConfig: craWebpackDevServerConfig(),
  };
}
