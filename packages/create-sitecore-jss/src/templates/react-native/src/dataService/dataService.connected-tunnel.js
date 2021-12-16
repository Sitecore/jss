/* global __SC_API_HOST__, __SC_TUNNEL_HOST__ */
/* eslint-disable import/no-extraneous-dependencies */

import { getRouteData as baseGetRouteData } from './dataService.connected';
import { mapNestedJson } from './util';

// eslint-disable-next-line no-underscore-dangle
global.__SC_API_HOST__ = __SC_API_HOST__;

const processObjectProperty = (key, value) => {
  // replace 'jssreactnative' with ngrok URL.
  // urls returned from layout service will resolve to the Sitecore site host, e.g. http://jssreactnative.
  // need to replace 'http://jssreactnative' with the tunnel host so that urls resolve correctly via the tunnel.
  if (key === 'src') {
    const src = value.toLowerCase().replace(__SC_API_HOST__.toLowerCase(), __SC_TUNNEL_HOST__);
    return src;
  }
  return value;
};

const getRouteData = (route, { options = {}, language } = {}) =>
  baseGetRouteData(route, {
    options: { ...options, apiHost: __SC_TUNNEL_HOST__ },
    language,
  }).then((data) => {
    const newData = mapNestedJson(data, processObjectProperty);
    return newData;
  });

export { getRouteData };
