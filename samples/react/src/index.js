import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import AppRoot from './AppRoot';
import GraphQLClientFactory from './lib/GraphQLClientFactory';
import config from './temp/config';
import i18ninit from './i18n';

/* eslint-disable no-underscore-dangle */

let renderFunction = ReactDOM.render;

let initLanguage = config.defaultLanguage;

/*
  SSR Data
  If we're running in a server-side rendering scenario,
  the server will provide JSON in the #__JSS_STATE__ element
  for us to acquire the initial state to run with on the client.

  This enables us to skip a network request to load up the layout data.
  We are emitting a quiescent script with JSON so that we can take advantage
  of JSON.parse()'s speed advantage over parsing full JS, and enable
  working without needing `unsafe-inline` in Content Security Policies.

  SSR is initiated from /server/server.js.
*/
let __JSS_STATE__ = null;
const ssrRawJson = document.getElementById('__JSS_STATE__');
if (ssrRawJson) {
  __JSS_STATE__ = JSON.parse(ssrRawJson.innerHTML);
}
if (__JSS_STATE__) {
  // when React initializes from a SSR-based initial state, you need to render with `hydrate` instead of `render`
  renderFunction = ReactDOM.hydrate;

  // set i18n language SSR state language instead of static config default language
  initLanguage = __JSS_STATE__.sitecore.context.language;
}

/*
  GraphQL Data
  The Apollo Client needs to be initialized to make GraphQL available to the JSS app.
  Not using GraphQL? Remove this, and the ApolloContext from `AppRoot`.
*/
// Apollo supports SSR of GraphQL queries, so like JSS SSR, it has an object we can pre-hydrate the client cache from
// to avoid needing to re-run GraphQL queries after the SSR page loads
const initialGraphQLState =
  __JSS_STATE__ && __JSS_STATE__.APOLLO_STATE ? __JSS_STATE__.APOLLO_STATE : null;

const graphQLClient = GraphQLClientFactory(config.graphQLEndpoint, false, initialGraphQLState);

/*
  App Rendering
*/
// initialize the dictionary, then render the app
// note: if not making a multlingual app, the dictionary init can be removed.
i18ninit(initLanguage).then(() => {
  // HTML element to place the app into
  const rootElement = document.getElementById('root');

  renderFunction(
    <AppRoot
      path={window.location.pathname}
      Router={BrowserRouter}
      graphQLClient={graphQLClient}
      ssrState={__JSS_STATE__}
    />,
    rootElement
  );
});
