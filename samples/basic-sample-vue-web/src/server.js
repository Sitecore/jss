/* global __BUNDLE_OUTPUT_PATH__ */

import Vue from 'vue';
import { createRenderer } from 'vue-server-renderer';
import initialState from 'boot/initialState';
import { createApp } from 'boot/Root';
import SitecoreContentService from 'boot/SitecoreContentService';
import SitecoreContextFactory from 'boot/SitecoreContextFactory';
import ServerHtml from 'app/ServerHtml';

/*
  Main entry point to the application when run on a Node server.
  The renderView() function will be invoked by Sitecore's view engine
  to provide the data to render with.
*/

export function renderView(callback, path, data, viewBag) {
  try {
    // push the server-provided state into the data provider
    const state = parseServerData(data, viewBag);
    SitecoreContentService.setInitialRouteData(state);

    // get the route data and then render from it
    SitecoreContentService.getRouteData(path)
      // render the app to a string using Apollo Client's SSR helper (waits for all GraphQL queries to complete)
      .then((routeData) => {
        SitecoreContextFactory.setSitecoreContext(routeData.sitecore.context);
        return createApp(routeData, path);
      })
      .then(({ app, router }) => {
        // set server-side router's location
        router.push(path);

        // since there could potentially be asynchronous route hooks or components,
        // we will be returning a Promise so that we can wait until
        // everything is ready before rendering.
        return new Promise((resolve, reject) => {
          router.onReady(() => {
            const matchedComponents = router.getMatchedComponents();
            // no matched routes, reject
            if (!matchedComponents.length) {
              reject(new Error(`No matched components found by router for route '${path}'`));
            }
            resolve(app);
          }, reject);
        });
      })
      .then((app) => {
        const renderer = createRenderer();
        return renderer.renderToString(app); // `renderToString` returns a promise
      })
      .then((content) => {
        // `ServerHtml` is the HTML wrapper (head, etc) around the app contents when SSR-ing
        // renderToString expects an actual `Vue` instance, not just a component definition, so be sure to `new Vue()`
        const serverComponent = new Vue({
          render(createElement) {
            return createElement(ServerHtml, {
              props: {
                content,
                initialState: state,
                distPath: __BUNDLE_OUTPUT_PATH__,
              },
            });
          },
        });

        const renderer = createRenderer();
        return renderer.renderToString(serverComponent); // `renderToString` returns a promise
      })
      .then((html) => {
        // return the html result to the calling server via the provided callback
        const result = { html, status: 200, redirect: null };
        callback(null, result);
      })
      .catch((error) => {
        // signals the server that we had an error rendering
        callback(error, null);
      });
  } catch (err) {
    // need to ensure the callback is always invoked no matter what
    // or else SSR will hang
    callback(err, null);
  }
}

function parseServerData(data, viewBag) {
  /*
    Data from server is double-encoded since MS JSS does not allow control
    over JSON serialization format.
  */
  const parsedData = data instanceof Object ? data : JSON.parse(data);
  const parsedViewBag = viewBag instanceof Object ? viewBag : JSON.parse(viewBag);

  const state = initialState();
  state.viewBag = parsedViewBag;

  if (parsedData) {
    state.sitecore = parsedData.sitecore;
  }

  return state;
}
