/* global __BUNDLE_OUTPUT_PATH__ */

import React from 'react';
import ReactDOM from 'react-dom/server';
import ServerHtml from 'app/components/ServerHtml';
import { ConnectedRouter } from 'react-router-redux';
import createMemoryHistory from 'history/createMemoryHistory';
import Root from 'boot/Root';
import { init as initStore } from 'boot/store';
import initialState from 'boot/initialState';
import App from 'app/components/AppContainer';
import { parseRouteUrl } from 'app/sitecoreRoutes';
import { resolveCurrentRoute, i18nInit } from 'app/i18n';

/*
  Main entry point to the application when run on a Node server.
  The renderView() function will be invoked by Sitecore's view engine
  to provide the data to render with.
*/

const renderView = (callback, path, data, viewBag) => {
  /*
    Data from server is double-encoded since MS JSS does not allow control
    over JSON serialization format.
  */
  const parsedData = data instanceof Object ? data : JSON.parse(data);
  const parsedViewBag = viewBag instanceof Object ? viewBag : JSON.parse(viewBag);
  const result = {
    html: null,
    status: 404,
    redirect: null,
  };
  const state = initialState();
  state.viewBag = parsedViewBag;

  if (parsedData) {
    state.sitecore = parsedData.sitecore;
  }

  // init i18n
  const routeParams = resolveCurrentRoute(path, parsedViewBag);
  i18nInit(routeParams.currentLang, false /* isClient */, parsedViewBag.dictionary);
  state.app = {
    ...routeParams
  };

  const store = initStore(state);
  const history = createMemoryHistory({
    initialEntries: [path],
  });
  const context = {};
  const component = (
    <Root store={store}>
      <ConnectedRouter context={context} history={history}>
        <App />
      </ConnectedRouter>
    </Root>
  );
  const html = ReactDOM.renderToString(<ServerHtml component={component} initialState={state} distPath={__BUNDLE_OUTPUT_PATH__} />);

  if (context.url) {
    result.redirect = context.url;
  } else {
    result.html = html;
  }

  if (context.status) {
    result.status = context.status;
  } else if (result.html) {
    result.status = 200;
  }

  callback(null, result);
};

// expose parseRouteUrl to allow parsing of URL from express/connect server as well
export { renderView, parseRouteUrl };
