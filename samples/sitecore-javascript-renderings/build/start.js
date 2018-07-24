import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import open from 'opn';
import {
  createDefaultDocumentMiddleware,
  createDisconnectedAssetMiddleware,
} from '@sitecore-jss/sitecore-jss-dev-tools';
import jssConfig from './config';
import { writeIndexFile } from './create-static-index';
import webpackConfig from './webpack/webpack.client';
import { ComponentManager, RenderingDataService } from './componentManager';
import { components } from '../src/boot/componentFactory';
import { catalogServerRenderer } from './catalogServerRenderer';
import { mockContext } from './sitecore-context-mock';
import { mockViewBag } from './sitecore-viewbag-mock';

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

const server = new WebpackDevServer(compiler, {
  inline: true,
  contentBase: config.output.path,
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
  },
});

const appRoot = path.join(__dirname, '../');

const createOrUpdateIndexFile = (componentManager) => {
  const indexContents = componentManager.renderAll();
  writeIndexFile(config.output.path, config.output.publicPath, indexContents);
};

const startDisconnectedServer = () => {
  return new Promise((resolve, reject) => {
    const renderingDataService = new RenderingDataService({
      componentDataFolderPath: './data/component-content',
      contextFactory: (componentName, language) => mockContext(),
      viewBagFactory: (componentName, language) => mockViewBag(),
    });

    const componentManager = new ComponentManager(
      components,
      catalogServerRenderer,
      renderingDataService,
      {
        watchFilePaths: ['./data/**'],
      }
    );

    componentManager.setFileUpdatedCallback(() => {
      // this tells Webpack to refresh the page so we get instant updates
      createOrUpdateIndexFile(componentManager);
      server.sockWrite(server.sockets, 'content-changed');
    });

    createOrUpdateIndexFile(componentManager);

    // creates a middleware that serves media files from the manifest, as well as from /assets
    const assetMiddleware = createDisconnectedAssetMiddleware({
      manifestPath: '',
      staticRootPath: appRoot,
    });

    server.use('/assets', assetMiddleware);

    resolve();
  });
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
  startPromise = startDisconnectedServer().then(startServer);
} else {
  startPromise = startServer();
}

startPromise.catch((error) => {
  console.error(error);
  process.exit(1);
});
