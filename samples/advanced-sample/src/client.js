/* eslint-env browser */
/* eslint no-underscore-dangle: 0 */

import { init as initStore } from 'boot/store';
import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory'
import Root from 'boot/Root';
import initialState from 'boot/initialState';
import { fetchInitialRoute } from 'app/actions';
import { NOT_FOUND_ROUTE, SERVER_ERROR_ROUTE } from 'app/constants';
import App from 'app/components/AppContainer';
import { resolveLanguage, i18nInit } from 'app/i18n'
// import { AppContainer as HotAppContainer } from 'react-hot-loader';

const render = (store, history) => {
  const rootElement = document.getElementById('app');

  ReactDOM.render(
    <Root store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Root>,
    rootElement);

  /*
  if (module.hot) {
    // do not hot accept the <Root /> component, it does NOT work
    // also, be sure to hot accept ./app/routes
    // still doesn't work with <Router /> in place though. works ok without <Router />
    module.hot.accept(['./app/components/AppContainer', './app/routes'], () => {
      ReactDOM.render(
        <HotAppContainer>
          <Root store={store}>
            <Router routes={getRoutes()} history={history} store={store} />
          </Root>
        </HotAppContainer>,
        rootElement,
      );
    });
  }*/
};

const initialize = (state, lang, history) => {
  state.app = {
    currentLang: lang
  };
  const store = initStore(state, history);
  render(store, history);
  return store;
};

let viewBag;
if (window.__data) {
  viewBag = window.__data.viewBag;
}

//init i18n
let lang = resolveLanguage(window.location.pathname, viewBag);
i18nInit(lang, true /* isClient */, viewBag ? viewBag.dictionary : null);

const history = createHistory();
if (window.__data) { // we have data from the server, use it
  initialize(window.__data, lang, history);
} else {
  // init with empty object
  const state = initialState();
  const store = initialize(state, lang, history);
  store.dispatch(fetchInitialRoute(window.location.pathname, window.location.search));
}
