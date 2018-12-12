/* global __BUNDLE_OUTPUT_PATH__ */

import React from 'react';
import ReactDOM from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import initialState from './boot/initialState';
import NotFound from './app/NotFound';
import Root from './boot/Root';
import SitecoreContentService from './boot/SitecoreContentService';
import SitecoreContextFactory from './boot/SitecoreContextFactory';
import ServerHtml from './app/ServerHtml';

/*
  Main entry point to the application when run on a Node server.
  The renderView() function will be invoked by Sitecore's view engine
  to provide the data to render with.
*/

const renderView = (callback, path, data, viewBag) => {
  try {
    // push the server-provided state into the data provider
    let state = parseServerData(data, viewBag);
    SitecoreContentService.setInitialRouteData(state);

    // get the route data and then render from it
    SitecoreContentService.getRouteData(path)
      .then((routeData) => {
        if (
          // malformed route data
          !routeData ||
          !routeData.sitecore ||
          !routeData.sitecore.route ||
          !routeData.sitecore.route.placeholders ||
          // no placeholder data (this is what proxy returns for a 404 on a route)
          Object.keys(routeData.sitecore.route.placeholders).length === 0
        ) {
          // return 404
          routeData = null;
          state = null;
        }

        if (routeData) {
          SitecoreContextFactory.setSitecoreContext({
            route: routeData.sitecore.route,
            itemId: routeData.sitecore.route.itemId,
            ...routeData.sitecore.context,
          });
        }

        return {
          jsx: <Root initialState={routeData} path={path} Router={StaticRouter} />,
          statusCode: data.statusCode,
        };
      })
      .then((renderResult) => {
        // wrap the app content in a HTML shell (ServerHtml), and return it to the server
        const result = {
          html: null,
          status: renderResult.statusCode || 200,
          redirect: null,
        };

        // <ServerHtml> is the HTML wrapper (head, etc) around the app contents when SSR-ing
        result.html = ReactDOM.renderToString(
          <ServerHtml
            component={renderResult.jsx}
            initialState={state}
            distPath={__BUNDLE_OUTPUT_PATH__}
          />
        );

        result.html = '<!DOCTYPE html>\n' + result.html;
        callback(null, result);
      })
      .catch((error) => {
        // signals the server that we had an error rendering
        console.error('Error rendering', error);
        callback(error, null);
      });
  } catch (error) {
    // need to ensure the callback is always invoked no matter what
    // or else SSR will hang
    console.error('Error rendering', error);
    callback(error, null);
  }
};

const parseServerData = (data, viewBag) => {
  /*
    Data from server is double-encoded since MS JSS does not allow control
    over JSON serialization format.
  */
  const parsedData = data instanceof Object ? data : JSON.parse(data);
  const parsedViewBag = viewBag instanceof Object ? viewBag : JSON.parse(viewBag);

  const state = initialState();
  state.viewBag = parsedViewBag;

  if (parsedData) {
    state.sitecore = parsedData.sitecore;
  }

  return state;
};

const parseRouteUrl = (url) => {
  return {
    lang: 'en',
    sitecoreRoute: url,
  };
};

export { renderView, parseRouteUrl };
