import React from 'react';
import ReactDOM from 'react-dom';

import initialState from './boot/initialState';
import Root from 'boot/Root';
import { getRouteData } from 'app/data';

/*
  Main entry point to the application when run in a browser (client).
  The render() function is the primary bootstrap.
*/

const render = (state) => {
  // remove when not testing; this is all the data we got to render with
  console.log('state', state);

  const rootElement = document.getElementById('app');

  ReactDOM.render(
    <Root initialState={state} />,
    rootElement
  );
};

/*
  SSR Data
  If we're running in a server-side rendering scenario,
  the ServerHtml component will provide the window.__data object
  for us to acquire the initial React state.

  SSR is initiated from server.js.
*/
if (window.__data) {
  render(window.__data);
} else {
  /*
    Local rendering 
    When rendering for local development, fake route data
    replaces Sitecore-provided data.

    If supporting local dev when connected to Sitecore,
    like the advanced app does, this is where your requests
    to the connected Layout Service would go.
  */
  const state = initialState();

  // get data client-side (typically for dev/disconnected mode)
  // in this case from the app/data.js file
  state.sitecore.route = getRouteData('/');

  render(state);
}
