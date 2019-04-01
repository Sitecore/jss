export { startRenderHostTunnel } from './tunnel';
export { startDevServer } from './devServer';
export { ssrMiddleware } from './ssrMiddleware';
export { startRenderingHostServer } from './renderingHostServer';

// const jssConfig = require('../scjssconfig.json');
// const ssrWebpackConfig = require('../server/server.webpack.config');
// const craWebpackConfig = require('../node_modules/react-scripts/config/webpack.config');
// const craWebpackDevServerConfig = require('../node_modules/react-scripts/config/webpackDevServer.config');

// doIt(5000);

// // invoking code, to be called from within sample app
// function doIt(port = 5000) {
//   startRenderHostTunnel('http://localhost', { port })
//     .then((tunnelUrl: string) => {
//       // generateHtmlTemplate(tunnelUrl);
//       startDevServer({
//         port,
//         tunnelUrl,
//         configFactory,
//         buildArtifactsPath: '../build',
//         serverBundleFileName: 'server.bundle',
//         urlToOpenOnStart: `${jssConfig.sitecore.layoutServiceHost}?sc_renderengineurl=${tunnelUrl}`,
//       });
//     })
//     .catch((err: Error) => {
//       console.error(err);
//     });
// }
