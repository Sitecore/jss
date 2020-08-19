// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import { enableProdMode } from '@angular/core';
import { join } from 'path';
import { readFileSync } from 'fs';
import { JssRouteBuilderService } from './src/app/routing/jss-route-builder.service';
import { environment } from './src/environments/environment';

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Our index.html we'll use as our template
const template = readFileSync(join(__dirname, 'browser', 'index.html')).toString();

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModule, renderModule } = require('./dist/server/main');


// this is the function expected by the JSS View Engine for "integrated mode"
function renderView (callback, path, data, viewBag) {
  try {
    /*
      Data from server is double-encoded since MS JSS does not allow control
      over JSON serialization format.
    */
    const parsedData = data instanceof Object ? data : JSON.parse(data);
    const parsedViewBag = viewBag instanceof Object ? viewBag : JSON.parse(viewBag);

    const state = {
      sitecore: {
        context: {
          pageEditing: false
        },
        route: {
          placeholders: {}
        }
      },
      language: '',
      serverRoute: '',
      viewBag: parsedViewBag,
    };

    if (parsedData) {
      state.sitecore = parsedData.sitecore;
    }

    // parse the URL that's being handled by Sitecore so we can pass in the initial state to the app
    const routeParser = new JssRouteBuilderService();
    const jssRoute = routeParser.parseRouteUrl(path.split('/').filter(segment => segment));
    state.serverRoute = jssRoute.serverRoute;
    state.language = parsedViewBag.language || jssRoute.language;

    const transferState = { ...state };
    delete transferState.viewBag;

    renderModule(AppServerModule, {
      document: template,
      url: path,
      extraProviders: [
        // custom injection with the initial state that SSR should utilize
        { provide: 'JSS_SERVER_LAYOUT_DATA', useValue: transferState },
        { provide: 'JSS_SERVER_VIEWBAG', useValue: state.viewBag },
      ]
    })
    .then(html => callback(null, { html }))
    .catch(err => callback(err, null))
  } catch (err) {
    // need to ensure the callback is always invoked no matter what
    // or else SSR will hang
    callback(err, null);
  }
}

function parseRouteUrl(url) {
  const routeParser = new JssRouteBuilderService();
  const jssRoute = routeParser.parseRouteUrl(url.split('/').filter(segment => segment));
  return {
    lang: jssRoute.language,
    sitecoreRoute: jssRoute.serverRoute
  };
}

module.exports = {
  renderView,
  parseRouteUrl,
  apiKey: environment.sitecoreApiKey,
  appName: environment.jssAppName
};
