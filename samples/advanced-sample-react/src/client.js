/* eslint-env browser */
/* eslint-disable no-underscore-dangle */

import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { init as initStore } from './boot/store';
import Root from './boot/Root';
import initialState from './boot/initialState';
import { fetchInitialRoute } from './app/actions';
import App from './app/components/AppContainer';
import { resolveCurrentRoute, i18nInit } from './app/i18n';

/*
  Main entry point to the application when run in a browser (client).
  The render() function is the primary bootstrap.
*/

const render = (store, history) => {
  const rootElement = document.getElementById('app');

  const renderFunction = window.__data ? ReactDOM.hydrate : ReactDOM.render;

  renderFunction(
    <Root store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Root>,
    rootElement
  );
};

const initialize = (state, routeParams, history) => {
  const newState = { ...state };
  newState.app = {
    ...state.app,
    ...routeParams,
  };
  const store = initStore(newState, history);
  render(store, history);
  return store;
};

let viewBag;
/*
  SSR Data
  If we're running in a server-side rendering scenario,
  the ServerHtml component will provide the window.__data object
  for us to acquire the initial React state.

  SSR is initiated from server.js.
*/
if (window.__data) {
  viewBag = window.__data.viewBag;
}

// init i18n
const routeParams = resolveCurrentRoute(window.location.pathname, viewBag);
i18nInit(routeParams.currentLang, true /* isClient */, viewBag ? viewBag.dictionary : null);

const history = createHistory();
if (window.__data) {
  // we have data from the server, use it
  initialize(window.__data, routeParams, history);
} else {
  // init with empty object
  const state = initialState();
  const store = initialize(state, routeParams, history);
  store.dispatch(fetchInitialRoute(window.location.pathname, window.location.search));
}
