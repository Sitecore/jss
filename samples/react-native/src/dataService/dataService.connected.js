/* global __SC_API_KEY__, __SC_API_HOST__ */
/* eslint-disable import/no-extraneous-dependencies */

import axios from 'axios';
import { RestLayoutService } from '@sitecore-jss/sitecore-jss-react-native';
import { config } from '../../package.json';

/**
 * Implements a route data fetcher using Axios - replace with your favorite
 * SSR-capable HTTP or fetch library if you like. See HttpDataFetcher<T> type
 * in sitecore-jss library for implementation details/notes.
 * @param {string} url The URL to request; may include query string
 * @param {any} data Optional data to POST with the request.
 * @returns {AxiosPromise} route data
 */
function routeDataFetcher(url, data) {
  return axios({
    url,
    method: data ? 'POST' : 'GET',
    data,
    // note: axios needs to use `withCredentials: true` in order for Sitecore cookies to be included in CORS requests
    // which is necessary for analytics and such
    withCredentials: true,
  });
}

const getFetchOptions = (language) => ({
  layoutServiceConfig: { host: __SC_API_HOST__ },
  querystringParams: { sc_lang: language, sc_apikey: __SC_API_KEY__ },
  fetcher: routeDataFetcher,
});

const getRouteData = (route, { options, language } = {}) => {
  const fetchOptions = options || getFetchOptions(language);

  const layoutService = new RestLayoutService({
    apiHost: fetchOptions.layoutServiceConfig.host,
    apiKey: fetchOptions.querystringParams.sc_apikey,
    siteName: config.appName,
    dataFetcherResolver: fetchOptions.fetcher ? () => fetchOptions.fetcher : undefined,
  });

  return layoutService
    .fetchLayoutData(route, language)
    .then((data) => (data && data.sitecore ? data.sitecore.route : {}));
};

export { getRouteData, getFetchOptions };
