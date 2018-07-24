/* global __SC_API_KEY__, __SC_API_HOST__ */
/* eslint-disable import/no-extraneous-dependencies */

import { dataApi } from '@sitecore-jss/sitecore-jss-react-native';

const { fetchRouteData } = dataApi;

const getFetchOptions = (language, options = {}) => {
  const { params = {}, host = __SC_API_HOST__, ...requestOptions } = options;

  if (language) {
    params.sc_lang = language;
  }
  params.sc_apikey = __SC_API_KEY__;

  return {
    layoutServiceConfig: { host },
    querystringParams: { ...params },
    requestConfig: {
      ...requestOptions,
    },
  };
};

const getRouteData = (route, options) => {
  const fetchOptions = getFetchOptions('', options);

  return fetchRouteData(route, fetchOptions).then(
    (data) => (data && data.sitecore ? data.sitecore.route : {})
  );
};

export { getRouteData };
