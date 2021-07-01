import path from 'path';
import express from 'express';
import compression from 'compression';
import { forceDomain } from 'forcedomain';
import enforce from 'express-sslify';

import {
  createDisconnectedAssetMiddleware,
  createDisconnectedLayoutService,
  createDefaultDocumentMiddleware,
  ManifestManager,
} from '@sitecore-jss/sitecore-jss-dev-tools';
import config from './config';
import app from '../dist/server.bundle';

const appRoot = path.join(__dirname, '../');
const server = express();
const manifestManager = new ManifestManager({
  appName: config.appName,
  rootPath: appRoot,
});

/**
 * Adapts the disconnected layout service middleware (expecting an express request/response)
 * into a function that we can use to extract JSON from the middleware response to server-side-render
 */
function layoutServiceMiddlewareAsDataAdapter(fakeLayoutServiceMiddleware) {
  return function Adapter(path, language) {
    const fakeRequest = {
      query: {
        sc_lang: language,
        item: path === '' ? '/' : path,
      },
    };

    return new Promise((resolve, reject) => {
      const fakeResponse = {
        sendStatus: function (statusCode) {
          resolve({ statusCode });
        },
        json: function (result) {
          resolve(result);
        },
      };

      fakeLayoutServiceMiddleware(fakeRequest, fakeResponse);
    });
  };
}

/** Given layout service data, performs server-side rendering on it as a promise */
function renderViewToHtmlFromData(renderView, data, path) {
  return new Promise((resolve, reject) => {
    const renderCallback = (error, content) => {
      if (error) reject(error);
      resolve(content);
    };

    renderView(renderCallback, path, data, {});
  });
}

/**
 * Creates SSR middleware that will SSR the app based on a LS data adapter
 * returned by layoutServiceMiddlewareAsDataAdapter().
 */
function createSsrMiddleware(adapter) {
  return function serverSideRenderingMiddleware(request, response) {
    const parsedUrl = app.parseRouteUrl
      ? app.parseRouteUrl(request.baseUrl)
      : { sitecoreRoute: request.baseUrl };

    return adapter(parsedUrl.sitecoreRoute, 'en')
      .then((lsData) => renderViewToHtmlFromData(app.renderView, lsData, parsedUrl.sitecoreRoute))
      .then((content) => {
        if (response.statusCode !== 301 && content.status) {
          response.statusCode = content.status;
        }
        response.send(content.html);
      })
      .catch((error) => {
        console.log('Error', error);
        response.statusCode = 500;
        response.send('An error has occurred.');
      });
  };
}

manifestManager.getManifest(config.language).then((manifest) => {
  // creates a fake version of the Sitecore Layout Service that is powered by your disconnected manifest file
  const layoutService = createDisconnectedLayoutService({
    manifest,
  });

  // creates a middleware that serves media files from the manifest, as well as from /assets
  const assetMiddleware = createDisconnectedAssetMiddleware({
    manifestPath: manifestManager.getManifestPath(),
    staticRootPath: appRoot,
  });

  // Serve static app assets from local /dist folder
  const staticFileMiddleware = express.static('dist', {
    fallthrough: false, // force 404 for unknown assets under /dist
  });

  const layoutServiceDataAdapter = layoutServiceMiddlewareAsDataAdapter(layoutService.middleware);

  const ssrMiddleware = createSsrMiddleware(layoutServiceDataAdapter);

  if (process.env.HEROKU) {
    server.use(enforce.HTTPS({ trustProtoHeader: true }));
    server.use(
      forceDomain({
        hostname: 'jss.sitecore.com',
        protocol: 'https',
        excludeRule: /[a-zA-Z0-9][a-zA-Z0-9-]+\.herokuapp\.com||localhost/i,
      })
    );
  }
  server.use(compression());

  // attach our disconnected service mocking middleware to webpack dev server
  server.use('/sitecore/api/layout/render', layoutService.middleware);
  server.use('/assets', assetMiddleware);
  server.use('/dist', staticFileMiddleware);
  server.use('/docs/getting-started/:path', (req, res) => {
    req.url = `/docs/client-frameworks/getting-started/${req.params.path}`;
    res.redirect(301, req.url);
  })
  server.use('/docs/nextjs/data-fetching/getStaticPaths', (req, res) => {
    req.url = `/docs/nextjs/page-routing/getStaticPaths`;
    res.redirect(301, req.url);
  })
  server.use('/docs/fundamentals/services/layout-service', (req, res) => {
    req.url = `/docs/fundamentals/services/layout/sitecore-layout-service`;
    res.redirect(301, req.url);
  })
  server.use('*', ssrMiddleware);

  server.listen(config.devServerPort, (err) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(`Starting docs server on port ${config.devServerPort}...`);
  });
});
