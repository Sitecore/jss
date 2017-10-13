/* global __BUNDLE_OUTPUT_PATH__ */

import React from 'react';
import ReactDOM from 'react-dom/server';
import Html from 'app/components/Html';
import { ConnectedRouter } from 'react-router-redux';
import createMemoryHistory from 'history/createMemoryHistory';
import Root from 'boot/Root';
import { init as initStore } from 'boot/store';
import initialState from 'boot/initialState';
import { convertRawLayoutData } from '@sitecore-jss/sitecore-jss-react';
import App from 'app/components/AppContainer';
import { parseRouteUrl } from 'app/sitecoreRoutes';
import { resolveLanguage, i18nInit } from 'app/i18n';

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
    const convertedData = convertRawLayoutData(parsedData);
    state.sitecore = convertedData.sitecore;
  }

  // init i18n
  const lang = resolveLanguage(path, parsedViewBag);
  i18nInit(lang, false /* isClient */, parsedViewBag.dictionary);
  state.app = {
    currentLang: lang,
  };

  const store = initStore(state);
  const history = createMemoryHistory({
    initialEntries: [path]
  });
  const context = {};
  const component = (
    <Root store={store}>
      <ConnectedRouter context={context} history={history}>
        <App />
      </ConnectedRouter>
    </Root>
  );
  const html = ReactDOM.renderToString(<Html component={component} initialState={state} distPath={__BUNDLE_OUTPUT_PATH__} />);

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
