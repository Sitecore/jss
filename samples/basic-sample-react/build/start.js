import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import open from 'opn';
import {
  createDisconnectedAssetMiddleware,
  createDisconnectedLayoutService,
  createDisconnectedContentService,
  createDisconnectedDictionaryService,
  createDefaultDocumentMiddleware,
  ManifestManager,
} from '@sitecore-jss/sitecore-jss-dev-tools';
import jssConfig from './config';
import { writeIndexFile } from './create-static-index';
import webpackConfig from './webpack/webpack.client';

/* eslint-disable no-console */

/*
  Start script
  Used to start the local dev server when running 'jss start' or 'jss start:connected'.
  Can be used to inject middleware, etc if needed
*/

const options = {
  host: 'localhost',
  port: jssConfig.devServerPort,
  scheme: 'http',
  uri() {
    return `${this.scheme}://${this.host}:${this.port}`;
  },
};

// parse webpack parameters from the command line
// see https://webpack.js.org/configuration/configuration-types/#exporting-a-function
const webpackEnv = {
  devserver: true,
};

process.argv.forEach((arg) => {
  if (arg.startsWith('--env.')) {
    if (arg.indexOf('=') === -1) {
      webpackEnv[arg.substring(6)] = true;
    } else {
      webpackEnv[arg.substring(6, arg.indexOf('='))] = arg.substring(arg.indexOf('=') + 1);
    }
  }
});

const config = webpackConfig(webpackEnv);

const compiler = webpack(config);

// deploy a physical index.html file - without this file, webpack shows a directory listing for the root item
writeIndexFile(config.output.path, config.output.publicPath);

const server = new WebpackDevServer(compiler, {
  inline: true,
  contentBase: config.output.path,
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
  },
});

const appRoot = path.join(__dirname, '../');

// the manifest manager maintains the state of the disconnected manifest data during the course of the dev run
// it provides file watching services, and language switching capabilities
const manifestManager = new ManifestManager({
  appName: config.appName,
  rootPath: appRoot,
  watchOnlySourceFiles: './data/**',
});

const startDisconnectedServer = (manifest) => {
  // creates a fake version of the Sitecore Layout Service that is powered by your disconnected manifest file
  const layoutService = createDisconnectedLayoutService({
    manifest,
    manifestLanguageChangeCallback: manifestManager.getManifest,
  });

  // creates a fake version of the Sitecore Dictionary Service that is powered by your disconnected manifest file
  const dictionaryService = createDisconnectedDictionaryService({
    manifest,
    manifestLanguageChangeCallback: manifestManager.getManifest,
  });

  // creates a fake version of the Sitecore Content Service that is powered by your disconnected manifest file
  const contentService = createDisconnectedContentService({
    manifest,
    manifestLanguageChangeCallback: manifestManager.getManifest,
  });

  // creates a middleware that serves media files from the manifest, as well as from /assets
  const assetMiddleware = createDisconnectedAssetMiddleware({
    manifestPath: manifestManager.getManifestPath(),
    staticRootPath: appRoot,
  });

  // set up live reloading of the manifest when any manifest source file is changed
  manifestManager.setManifestUpdatedCallback((newManifest) => {
    layoutService.updateManifest(newManifest);
    dictionaryService.updateManifest(newManifest);
    contentService.updateManifest(newManifest);

    // this tells Webpack to refresh the page so we get instant updates
    server.sockWrite(server.sockets, 'ok');
  });

  // attach our disconnected service mocking middleware to webpack dev server
  server.use('/sitecore/api/layout/render', layoutService.middleware);
  server.use('/sitecore/api/jss/dictionary/:appName/:language', dictionaryService.middleware);
  server.use('/sitecore/api/jss/contentsvc', contentService.middleware);
  server.use('/assets', assetMiddleware);
};

const startServer = () => {
  return new Promise((resolve, reject) => {
    // creates a middleware that returns the root index.html for any request
    // (this enables proper handling of routing if you refresh the page after switching routes)
    const defaultDocumentMiddleware = createDefaultDocumentMiddleware({
      indexFilePath: path.join(appRoot, `${config.output.publicPath}index.html`),
    });

    server.use('/', defaultDocumentMiddleware);

    // starts the webpack dev server
    server.listen(options.port, options.host, (err) => {
      if (err) {
        reject(err);
        return;
      }

      console.log(`Starting webpack dev server at ${options.uri()}`);
      open(options.uri());
      resolve();
    });
  });
};

let startPromise;

if (webpackEnv.content && webpackEnv.content === 'disconnected') {
  startPromise = manifestManager
    .getManifest(config.language)
    .then(startDisconnectedServer)
    .then(startServer);
} else {
  startPromise = startServer();
}

startPromise.catch((error) => {
  console.error(error);
  process.exit(1);
});
