/* global __SC_API_HOST__, __SC_TUNNEL_HOST__ */
/* eslint-disable import/no-extraneous-dependencies */

import { getRouteData as baseGetRouteData } from './dataService.connected';
import { mapNestedJson } from './util';

const processObjectProperty = (key, value) => {
  // replace 'jssbasicapp' with ngrok URL.
  // urls returned from layout service will resolve to the Sitecore site host, e.g. http://jssbasicapp.
  // need to replace 'http://jssbasicapp' with the tunnel host so that urls resolve correctly via the tunnel.
  if (key === 'src') {
    const src = value.replace(__SC_API_HOST__, __SC_TUNNEL_HOST__);
    return src;
  }
  return value;
};

const getRouteData = (route, options) => {
  const newOptions = { host: __SC_TUNNEL_HOST__, ...options };
  return baseGetRouteData(route, newOptions).then((data) => {
    const newData = mapNestedJson(data, processObjectProperty);
    return newData;
  });
};

export { getRouteData };
