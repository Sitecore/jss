import { renderToString } from '@vue/server-renderer';
import serializeJavascript from 'serialize-javascript';
import { renderMetaToString } from 'vue-meta/ssr';
import axios from 'axios';
import http from 'http';
import https from 'https';
import i18ninit from '../src/i18n';
import { createApp } from '../src/createApp';
import { createRouter } from '../src/router';
import indexTemplate from '../dist/index.html';
import { getStates } from '@vue/apollo-ssr';
import config from '../src/temp/config';
/** Asserts that a string replace actually replaced something */
function assertReplace(string, value, replacement) {
  let success = false;
  const result = string.replace(value, () => {
    success = true;
    return replacement;
  });

  if (!success) {
    throw new Error(
      `Unable to match replace token '${value}' in dist/index.html template. If the HTML shell for the app is modified, also fix the replaces in server.js. Server-side rendering has failed!`
    );
  }

  return result;
}

// Setup Http/Https agents for keep-alive. Used in headless-proxy
export const setUpDefaultAgents = (httpAgent, httpsAgent) => {
  axios.defaults.httpAgent = httpAgent;
  axios.defaults.httpsAgent = httpsAgent;

  http.globalAgent = httpAgent;
  https.globalAgent = httpsAgent;
};

/** Export the API key. This will be used by default in Headless mode, removing the need to manually configure the API key on the proxy. */
export const apiKey = config.sitecoreApiKey;

/** Export the app name. This will be used by default in Headless mode, removing the need to manually configure the app name on the proxy. */
export const appName = config.jssAppName;

/**
 * Main entry point to the application when run via Server-Side Rendering,
 * either in Integrated Mode, or with a Node proxy host like the node-headless-ssr-proxy sample.
 * This function will be invoked by the server to return the rendered HTML.
 * @param {Function} callback Function to call when rendering is complete. Signature callback(error, successData).
 * @param {string} path Current route path being rendered
 * @param {string} data JSON Layout service data for the rendering from Sitecore
 * @param {string} viewBag JSON view bag data from Sitecore (extensible context stuff)
 */
export function renderView(callback, path, data, viewBag) {
  try {
    const state = parseServerData(data, viewBag);

    const ctx = {};

    initializei18n(state)
      .then((i18n) => createApp(state, i18n, true))
      .then(({ app, router, graphQLProvider }) => {
        // set server-side router's location
        router.push(path);

        // since there could potentially be asynchronous route hooks or components,
        // we will be returning a Promise so that we can wait until everything is ready before rendering.
        return router.isReady().then(() => {
          // `renderToString` expects an actual `App` instance
          // `renderToString` returns a promise
          return renderToString(app, ctx).then((renderedApp) => {
            // We add the GraphQL state to the SSR state so that we can avoid refetching queries after client load
            // Not using GraphQL? Get rid of this.
            state.APOLLO_STATE = getStates({ state: graphQLProvider }).state;
            return {
              renderedApp,
              app,
            };
          });
        });
      })
      .then(async ({ app, renderedApp }) => {
        const meta = await renderMetaToString(app, ctx);

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
        let html = indexTemplate;
        // write the Vue app
        html = assertReplace(html, '<div id="root"></div>', `<div id="root">${renderedApp}</div>`);
        // write the string version of our state
        html = assertReplace(
          html,
          '<script type="application/json" id="__JSS_STATE__">null',
          `<script type="application/json" id="__JSS_STATE__">${serializeJavascript(state, {
            isJSON: true,
          })}`
        );
        if (meta.teleports) {
          // render vue-meta data
          html = assertReplace(
            html,
            '<html>',
            `<html data-vue-meta-server-rendered ${meta.teleports.htmlAttrs || ''}>`
          );
          html = assertReplace(html, '<head>', `<head>${meta.teleports.head || ''}`);
          html = assertReplace(html, '<body>', `<body ${meta.teleports.bodyAttrs || ''}>`);
        }

        html = html.replace(new RegExp('phkey', 'g'), 'key');

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
 * by node-headless-ssr-proxy when rendering the site in headless mode. It enables rewriting the incoming path,
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
  const router = createRouter(true);
  const match = router.resolve(url);

  if (!match || !match.params) return null;

  // vue-router provides array instead of string
  match.params.sitecoreRoute = match.params.sitecoreRoute
    ? match.params.sitecoreRoute.join('/')
    : undefined;

  return match.params;
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
