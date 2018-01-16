import React from 'react';
import ReactDOM from 'react-dom';
import App from 'app/components/App';
import DataProvider from 'data-provider';

/*
  Main entry point to the application when run in a browser (client).
  The render() function is the primary bootstrap.
*/

const render = (sitecoreState) => {
    const rootElement = document.getElementById('wizard-app');
    ReactDOM.render(<App sitecoreState={sitecoreState} />, rootElement);
}

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
  DataProvider.getRouteData(__INITIAL_ROUTE__, 'en').then((sitecoreState) => {
    render(sitecoreState);
  });
}

