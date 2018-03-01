/* global __SC_API_HOST__ */

import { dataApi } from "@sitecore-jss/sitecore-jss-react";
import SitecoreContentServiceBase from "./SitecoreContentServiceBase";

const { fetchRouteData, fetchPlaceholderData, fetchItemData } = dataApi;

const getFetchOptions = (language, options = {}) => {
  const { params = {}, ...requestOptions } = options;
  if (language) {
    params.sc_lang = language;
  }
  params.sc_apikey = __SC_API_KEY__;

  return {
    layoutServiceConfig: { host: __SC_API_HOST__ },
    querystringParams: { ...params },
    requestConfig: { ...requestOptions }
  };
};

class ConnectedSitecoreContentService extends SitecoreContentServiceBase {
  getRouteData(route, language, options = {}) {
    return this.getInitialRouteData()
      .catch(() => {
        const fetchOptions = getFetchOptions(language, options);
        return fetchRouteData(route, fetchOptions);
      })
      .catch(() => {
        return null;
      });
  }

  getPlaceholderData(placeholderName, route, language, options = {}) {
    const fetchOptions = getFetchOptions(language, options);
    return fetchPlaceholderData(placeholderName, route, fetchOptions);
  }
}

export default ConnectedSitecoreContentService;
