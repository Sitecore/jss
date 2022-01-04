import serializeJavascript from 'serialize-javascript';
import React from 'react';
import { StaticRouter, matchPath } from 'react-router-dom';
import { renderToStringWithData } from 'react-apollo';
import Helmet from 'react-helmet';
import axios from 'axios';
import http from 'http';
import https from 'https';
import GraphQLClientFactory from '../src/lib/GraphQLClientFactory';
import config from '../src/temp/config';
import i18ninit from '../src/i18n';
import AppRoot, { routePatterns } from '../src/AppRoot';
import { getHtmlTemplate } from './htmlTemplateFactory';

/** Asserts that a string replace actually replaced something */
function assertReplace(string, value, replacement) {
  let success = false;
  const result = string.replace(value, () => {
    success = true;
    return replacement;
  });

  if (!success) {
    throw new Error(
      `Unable to match replace token '${value}' in public/index.html template. If the HTML shell for the app is modified, also fix the replaces in server.js. Server-side rendering has failed!`
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

// Export app configuration; this will be used when this app runs in Headless mode (ie node-headless-ssr-experience-edge or node-headless-ssr-proxy)
export const apiKey = config.sitecoreApiKey;
export const appName = config.jssAppName;
export const defaultLanguage = config.defaultLanguage;

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

    /*
      GraphQL Data
      The Apollo Client needs to be initialized to make GraphQL available to the JSS app.
      Not using GraphQL? Remove this, and the ApolloContext from `AppRoot`.
    */
    const graphQLClient = GraphQLClientFactory(config.graphQLEndpoint, true);

    /*
      App Rendering
    */
    initializei18n(state)
      .then(() =>
        // renderToStringWithData() allows any GraphQL queries to complete their async call
        // before the SSR result is returned, so that the resulting HTML from GQL query results
        // is included in the SSR'ed markup instead of whatever the 'loading' state is.
        // Not using GraphQL? Use ReactDOMServer.renderToString() instead.
        renderToStringWithData(
          <AppRoot
            path={path}
            Router={StaticRouter}
            graphQLClient={graphQLClient}
            ssrState={state}
          />
        )
      )
      .then((renderedAppHtml) =>
        // getHtmlTemplate() should return the "shell" HTML template that the rendered app
        // will be injected into. In many cases, the HTML template will be the same for client-side
        // rendering and for server-sider rendering. However, in some instances (e.g. JSS render host)
        // the HTML template needs to be modified or replaced when rendering.
        getHtmlTemplate(state).then((htmlTemplate) => ({
          htmlTemplate,
          renderedAppHtml,
        }))
      )
      .then(({ renderedAppHtml, htmlTemplate }) => {
        const helmet = Helmet.renderStatic();

        // We remove the viewBag from the server-side state before sending it back to the client.
        // This saves bandwidth, because by default the viewBag contains the translation dictionary,
        // which is better cached as a separate client HTTP request than on every page, and HTTP context
        // information that is not meaningful to the client-side rendering.
        // If you wish to place items in the viewbag that are needed by client-side rendering, this
        // can be removed - but still delete state.viewBag.dictionary, at least.
        delete state.viewBag;

        // We add the GraphQL state to the SSR state so that we can avoid refetching queries after client load
        // Not using GraphQL? Get rid of this.
        state.APOLLO_STATE = graphQLClient.cache.extract();

        // Inject the rendered app into the index.html template (built from /public/index.html)
        // IMPORTANT: use serialize-javascript or similar instead of JSON.stringify() to emit initial state,
        // or else you're vulnerable to XSS.
        let html = htmlTemplate;

        // write the React app
        html = assertReplace(
          html,
          '<div id="root"></div>',
          `<div id="root">${renderedAppHtml}</div>`
        );
        // write the string version of our state
        html = assertReplace(
          html,
          '<script type="application/json" id="__JSS_STATE__">null',
          `<script type="application/json" id="__JSS_STATE__">${serializeJavascript(state, {
            isJSON: true,
          })}`
        );

        // render <head> contents from react-helmet
        html = assertReplace(
          html,
          '<head>',
          `<head>${helmet.title.toString()}${helmet.meta.toString()}${helmet.link.toString()}`
        );

        // replace phkey attribute with key attribute so that newly added renderings
        // show correct placeholders, so save and refresh won't be needed after adding each rendering
        html = html.replace(new RegExp('phkey', 'g'), 'key');

        callback(null, { html });
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

  let result = null;

  // use react-router-dom to find the route matching the incoming URL
  // then return its match params
  // we are using .some() as a way to loop with a short circuit (so that we stop evaluating route patterns after the first match)
  routePatterns.some((pattern) => {
    const match = matchPath(url, { path: pattern });
    if (match && match.params) {
      result = match.params;
      return true;
    }

    return false;
  });

  return result;
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
