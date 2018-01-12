/* global __BUNDLE_OUTPUT_PATH__ */

import React from 'react';
import ReactDOM from 'react-dom/server';
import { convertRawLayoutData } from '@sitecore-jss/sitecore-jss-react';

import initialState from 'boot/initialState';
import Root from 'boot/Root';
import ServerHtml from 'app/ServerHtml';

/*
  Main entry point to the application when run on a Node server.
  The renderView() function will be invoked by Sitecore's view engine
  to provide the data to render with.
*/

export function renderView(callback, path, data, viewBag) {
  
  /*
    Data from server is double-encoded since MS JSS does not allow control
    over JSON serialization format.
  */
  const parsedData = data instanceof Object ? data : JSON.parse(data);
  const parsedViewBag = viewBag instanceof Object ? viewBag : JSON.parse(viewBag);

  const state = initialState();
  state.viewBag = parsedViewBag;

  if (parsedData) {
    const convertedData = convertRawLayoutData(parsedData);
    state.sitecore = convertedData.sitecore;
  }

  const result = {
    html: null,
    status: 200,
    redirect: null,
  };

  const rootComponent = <Root initialState={state} />;
  result.html = ReactDOM.renderToString(<ServerHtml component={rootComponent} initialState={state} distPath={__BUNDLE_OUTPUT_PATH__} />);

  callback(null, result);
}
