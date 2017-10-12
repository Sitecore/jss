import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import initialState from './initialState';
import Root from './Root';
import { getRouteData } from '../app/data';

const render = (state) => {
  console.log('state', state);
  const rootElement = document.getElementById('app');

  ReactDOM.render(
    <AppContainer>
      <Root initialState={state} />
    </AppContainer>,
    rootElement
  );
};

if (window.__data) { // we have data from the server, use it
  render(window.__data);
} else {
  const state = initialState();
  // get data client-side (typically for dev/disconnected mode)
  state.sitecore.route = getRouteData('/');
  render(state);

  if (module.hot) {
    module.hot.accept();
  }
}
