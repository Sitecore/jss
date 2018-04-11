import React from 'react';
import ReactDOM from 'react-dom';
import componentFactory from './boot/componentFactory';

/* eslint-disable no-underscore-dangle */

/*
  Main entry point to the application when run in a browser (client).
*/

/*
  SSR Data
  If we're running in a server-side rendering scenario,
  the ServerHtml component will provide the window.__jss_components__ object.
  This object contains an array of component data to be used for re-hydrating the client-side
  version of components with SSR data.

  SSR is initiated from server.js.
*/

if (window.__jss_components__) {
  window.__jss_components__.forEach((component) => {
    const ComponentInstance = componentFactory(component.name);
    const mountTarget = document.getElementById(component.id);
    const props = component.data;
    ReactDOM.hydrate(<ComponentInstance {...props} />, mountTarget);
  });
}
