/* eslint class-methods-use-this: 0 */
/* global __SC_API_HOST__, __TRANSLATION_PATH__, __SC_API_KEY__ */

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
    layoutServiceConfig: {
      host: __SC_API_HOST__,
      configurationName: "jss-advanced-react"
    },
    querystringParams: { ...params },
    requestConfig: { ...requestOptions }
  };
};

export default class SitecoreContentService extends SitecoreContentServiceBase {
  getRouteData(route, language, options = {}) {
    const fetchOptions = getFetchOptions(language, options);
    return fetchRouteData(route, fetchOptions);
  }

  getPlaceholderData(placeholderName, route, language, options = {}) {
    const fetchOptions = getFetchOptions(language, options);
    return fetchPlaceholderData(placeholderName, route, fetchOptions);
  }

  getItemData(itemPath, language, options = {}) {
    const { layoutServiceConfig, ...otherOptions } = getFetchOptions(
      language,
      options
    );
    const fetchOptions = {
      contentServiceConfig: layoutServiceConfig,
      ...otherOptions
    };

    return fetchItemData(itemPath, fetchOptions);
  }

  getTranslationPath() {
    const apiKeyParam =
      typeof __SC_API_KEY__ === "undefined"
        ? ""
        : `?sc_apikey=${__SC_API_KEY__}`;
    return `${__SC_API_HOST__}${__TRANSLATION_PATH__}${apiKeyParam}`;
  }
}
