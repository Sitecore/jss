/* eslint class-methods-use-this: 0 */
/* global __SC_API_HOST__, __TRANSLATION_PATH__, __SC_API_KEY__ */

import axios from 'axios';
import { RestLayoutService } from '@sitecore-jss/sitecore-jss-react';
import { config } from '../../package.json';

/**
 * Implements a route data fetcher using Axios - replace with your favorite
 * SSR-capable HTTP or fetch library if you like. See HttpDataFetcher<T> type
 * in sitecore-jss library for implementation details/notes.
 * @param {string} url The URL to request; may include query string
 * @param {any} data Optional data to POST with the request.
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

class SitecoreContentService {
  constructor() {
    this.layoutService = new RestLayoutService({
      apiHost: `${__SC_API_HOST__}`,
      apiKey: __SC_API_KEY__,
      dataFetcherResolver: () => routeDataFetcher,
      siteName: config.appName,
    });
  }

  getRouteData(route, language) {
    return this.getInitialRouteData()
      .catch(() => {
        return this.layoutService.fetchLayoutData(route, language);
      })
      .catch(() => null);
  }

  getPlaceholderData(placeholderName, route, language) {
    return this.layoutService.fetchPlaceholderData(placeholderName, route, language);
  }

  getTranslationPath() {
    const apiKeyParam = typeof __SC_API_KEY__ === 'undefined' ? '' : `?sc_apikey=${__SC_API_KEY__}`;
    return `${__SC_API_HOST__}${__TRANSLATION_PATH__}${apiKeyParam}`;
  }

  getInitialRouteData() {
    return new Promise((resolve, reject) => {
      // no initial data, reject (which will cause data fetch to occur)
      if (!this.initialRouteData) reject(new Error('No initial data'));

      // copy the initial state to a var, then empty it so it's not reused
      const data = this.initialRouteData;
      this.initialRouteData = null;

      // return the initial state
      resolve(data);
    });
  }

  setInitialRouteData(layoutServiceData) {
    this.initialRouteData = layoutServiceData;
  }
}

export default new SitecoreContentService();
