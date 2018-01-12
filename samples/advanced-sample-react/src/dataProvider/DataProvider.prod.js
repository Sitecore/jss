/* eslint class-methods-use-this: 0 */
/* global __SC_API_HOST__ */

import { dataApi } from '@sitecore-jss/sitecore-jss-react';
import DataProviderBase from './DataProviderBase';

const { fetchRouteData, fetchPlaceholderData, fetchItemData } = dataApi;

const getFetchOptions = (language, options = {}) => {
  const params = options.params || {};
  if (language) {
    params.sc_lang = language;
  }
  params.sc_apikey = __SC_API_KEY__;
  return { host: __SC_API_HOST__, params, ...options };
};

class DataProvider extends DataProviderBase {
  getRouteData(route, language, options = {}) {
    const fetchOptions = getFetchOptions(language, options);
    return fetchRouteData(route, fetchOptions);
  }

  getPlaceholderData(placeholderName, route, language, options = {}) {
    const fetchOptions = getFetchOptions(language, options);
    return fetchPlaceholderData(placeholderName, route, fetchOptions);
  }

  getItemData(itemPath, language, options = {}) {
    const fetchOptions = getFetchOptions(language, options);
    return fetchItemData(itemPath, fetchOptions);
  }
}

export default DataProvider;
