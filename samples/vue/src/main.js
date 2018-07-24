import i18ninit from './i18n';
import { createApp } from './createApp';
import './registerServiceWorker';

/* eslint-disable no-underscore-dangle */

/*
  SSR Data
  If we're running in a server-side rendering scenario,
  the server will provide the window.__JSS_STATE__ object
  for us to acquire the initial state to run with on the client.

  This enables us to skip a network request to load up the layout data.

  SSR is initiated from /server/server.js.
*/

// initialize the dictionary, then render the app
// note: if not making a multlingual app, the dictionary init can be removed.
i18ninit().then((i18n) => {
  // HTML element to place the app into
  const rootElement = document.getElementById('root');

  // retrieve the initial app state if it is defined
  const initialState = window.__JSS_STATE__ || null;

  const { app } = createApp(initialState, i18n);
  app.$mount(rootElement);
});
