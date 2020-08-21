import { ManifestInstance, ItemDefinition } from '@sitecore-jss/sitecore-jss-manifest';
import { createDisconnectedLayoutService } from '@sitecore-jss/sitecore-jss-dev-tools';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { mkdirs } from 'fs-extra';
import app from '../dist/server.bundle';
import manifest from '../sitecore/manifest/sitecore-import.json';

// super prototype prerendering demo
// prerenders with SSR all defined routes in a manifest and writes them
// to /dist/prerender as HTML files. NOT CURRENTLY USED, here as an example.

prerenderRoutes(manifest);

/**
 * @param {ManifestInstance} manifest
 */
export function prerenderRoutes(manifest) {
  const routeDataFetcher = fakeLayoutServiceAdapter(manifest);

  return prerenderRoute(manifest.items.routes[0], '', routeDataFetcher);
}

function fakeLayoutServiceAdapter(manifest) {
  const fakeLayoutService = createDisconnectedLayoutService({ manifest });

  return function Adapter(path, language) {
    const fakeRequest = {
      query: {
        sc_lang: language,
        item: path,
      },
    };

    return new Promise((resolve, reject) => {
      const fakeResponse = {
        sendStatus: function(statusCode) {
          reject();
        },
        json: function(result) {
          resolve(result);
        },
      };

      fakeLayoutService.middleware(fakeRequest, fakeResponse);
    });
  };
}

/**
 * @param {ItemDefinition} route
 * @param {string} currentPath
 */
function prerenderRoute(route, currentPath, routeDataFetcher) {
  let newCurrentPath = currentPath === '' ? '/' : `${currentPath}/${route.name}`;

  if (newCurrentPath.startsWith('//')) newCurrentPath = newCurrentPath.substring(1);

  console.log(`Prerendering ${newCurrentPath}...`);

  return routeDataFetcher(newCurrentPath, 'en')
    .then((routeData) => renderViewToHtml(app.renderView, routeData, newCurrentPath))
    .then((content) => writeViewToOutputFolder(content, newCurrentPath))
    .then(() => {
      const promises = [];
      if (route.children) {
        route.children.forEach((childRoute) => {
          promises.push(prerenderRoute(childRoute, newCurrentPath, routeDataFetcher));
        });
      }

      return Promise.all(promises);
    })
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

function renderViewToHtml(renderView, data, viewPath) {
  return new Promise((resolve, reject) => {
    const renderCallback = (error, content) => {
      if (error) reject(error);
      resolve(content.html);
    };

    renderView(renderCallback, viewPath, data, {});
  });
}

function writeViewToOutputFolder(content, relativePath) {
  const path = join('./dist/prerender', relativePath);
  return mkdirs(path).then(() => writeFileSync(join(path, 'index.html'), content, 'utf8'));
}
