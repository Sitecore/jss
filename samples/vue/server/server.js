import { createRenderer } from 'vue-server-renderer';
import serializeJavascript from 'serialize-javascript';
import i18ninit from '../src/i18n';
import { createApp } from '../src/createApp';
import { createRouter } from '../src/router';
import indexTemplate from '../dist/index.html';

/**
 * Main entry point to the application when run via Server-Side Rendering,
 * either in Integrated Mode, or with a Node proxy host like the node-express-ssr sample.
 * This function will be invoked by the server to return the rendered HTML.
 * @param {Function} callback Function to call when rendering is complete. Signature callback(error, successData).
 * @param {string} path Current route path being rendered
 * @param {string} data JSON Layout service data for the rendering from Sitecore
 * @param {string} viewBag JSON view bag data from Sitecore (extensible context stuff)
 */
export function renderView(callback, path, data, viewBag) {
  try {
    const state = parseServerData(data, viewBag);

    initializei18n(state)
      .then((i18n) => {
        return createApp(state, i18n);
      })
      .then(({ app, router, graphQLProvider }) => {
        // set server-side router's location
        router.push(path);

        // since there could potentially be asynchronous route hooks or components,
        // we will be returning a Promise so that we can wait until everything is ready before rendering.
        return new Promise((resolve, reject) => {
          router.onReady(() => {
            const matchedComponents = router.getMatchedComponents();
            // no matched routes, reject
            if (!matchedComponents.length) {
              reject(new Error(`No matched components found by router for route '${path}'`));
            }
            resolve(matchedComponents);
          }, reject);
        })
          .then((matchedComponents) => {
            // The Vue SSR renderer does not wait for async actions, invoked by components, to complete.
            // vue-apollo handles this by "pre-fetching" GraphQL queries attached to Vue components (via the `.apollo` property).
            // So when those components are rendering, the GraphQL queries use the apollo-client cache for their data.
            // The biggest caveat to this approach is that when pre-fetching, the queries don't have access
            // to their Vue component instance. In other words, SSR pre-fetch queries can't set query variables
            // based on component props, state, etc...
            // Prefetch queries only have access to the context data that are provided via the `prefetchAll`
            // method below. In this scenario we provide current route and state data provided by the server.
            return graphQLProvider.prefetchAll(
              { route: router.currentRoute, state },
              matchedComponents
            );
          })
          .then(() => {
            const renderer = createRenderer();
            // `renderToString` expects an actual `Vue` instance (e.g. `new Vue()`), not just a component definition
            // `renderToString` returns a promise
            return renderer.renderToString(app).then((renderedApp) => {
              // We add the GraphQL state to the SSR state so that we can avoid refetching queries after client load
              // Not using GraphQL? Get rid of this.
              state.APOLLO_STATE = graphQLProvider.getStates();
              return {
                renderedApp,
                app,
              };
            });
          });
      })
      .then(({ renderedApp, app }) => {
        const meta = app.$meta().inject();

        // We remove the viewBag from the server-side state before sending it back to the client.
        // This saves bandwidth, because by default the viewBag contains the translation dictionary,
        // which is better cached as a separate client HTTP request than on every page, and HTTP context
        // information that is not meaningful to the client-side rendering.
        // If you wish to place items in the viewbag that are needed by client-side rendering, this
        // can be removed - but still delete state.viewBag.dictionary, at least.
        delete state.viewBag;

        // Inject the rendered app into the index.html template (built from /public/index.html)
        // IMPORTANT: use serialize-javascript or similar instead of JSON.stringify() to emit initial state,
        // or else you're vulnerable to XSS.
        const html = indexTemplate
          // write the Vue app
          .replace('<div id="root"></div>', `<div id="root">${renderedApp}</div>`)
          // write the string version of our state
          .replace('__JSS_STATE__ = null', `__JSS_STATE__ = ${serializeJavascript(state)}`)
          // render vue-meta data
          .replace('<html>', `<html data-vue-meta-server-rendered ${meta.htmlAttrs.text()}>`)
          .replace(
            '<head>',
            `<head>
              ${meta.meta.text()}
              ${meta.title.text()}
              ${meta.link.text()}
              ${meta.style.text()}
              ${meta.script.text()}
              ${meta.noscript.text()}
            </head>`
          )
          .replace('<body>', `<body ${meta.bodyAttrs.text()}>`);

        callback(null, {
          html,
        });
      })
      .catch((error) => callback(error, null));
  } catch (err) {
    // need to ensure the callback is always invoked no matter what
    // or else SSR will hang
    callback(err, null);
  }
}

/**
 * Parses an incoming url to match against the route table. This function is implicitly used
 * by node-express-ssr when rendering the site in headless mode. It enables rewriting the incoming path,
 * say '/en-US/hello', to the path and language to pass to Layout Service (a Sitecore item path), say
 * { sitecoreRoute: '/hello', lang: 'en-US' }.
 * This function is _not_ used in integrated mode, as Sitecore's built in route parsing is used.
 * If no URL transformations are required (i.e. single language site), then this function can be removed.
 * @param {string} url The incoming URL to the proxy server
 * @returns { sitecoreRoute?: string, lang?: string }
 */
export function parseRouteUrl(url) {
  if (!url) {
    return null;
  }

  // use vue-router to find the route matching the incoming URL then return its match params.
  // note: createRouter() creates a router with mode set to 'history'. This is for client-side rendering.
  // vue-router will automatically switch to 'abstract' mode when not running in browser (i.e. server-side rendering).
  const router = createRouter();
  const match = router.match(url);
  return match && match.params ? match.params : null;
}

function parseServerData(data, viewBag) {
  const parsedData = data instanceof Object ? data : JSON.parse(data);
  const parsedViewBag = viewBag instanceof Object ? viewBag : JSON.parse(viewBag);

  return {
    viewBag: parsedViewBag,
    sitecore: parsedData && parsedData.sitecore,
  };
}

function initializei18n(state) {
  // don't init i18n for not found routes
  if (!state || !state.sitecore || !state.sitecore.context) return Promise.resolve();

  return i18ninit(state.sitecore.context.language, state.viewBag.dictionary);
}
