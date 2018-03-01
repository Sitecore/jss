/* eslint class-methods-use-this: 0 */
/* global __TRANSLATION_PATH__ */

import fetch from "isomorphic-fetch";
import { convertRouteToLayoutServiceFormat } from "@sitecore-jss/sitecore-jss-react";
import SitecoreContentServiceBase from "./SitecoreContentServiceBase";

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  return response.text().then(text => {
    const error = new Error(text || response.statusText);
    error.response = response;
    throw error;
  });
};

export default class SitecoreContentService extends SitecoreContentServiceBase {
  getRouteData(route, language) {
    const routePath = route === "/" ? "" : route;
    const getRoute = fetch(`/data/routes${routePath}/${language}.json`, {
      credentials: "include"
    })
      .then(checkStatus)
      .then(response => response.json())
      .then(json => convertRouteToLayoutServiceFormat(json));
    const context = this.getContext(route, language);

    return Promise.all([getRoute, context]).then(results => {
      if (results[0].context && results[0].route) {
        // contains context and route
        return {
          sitecore: { ...results[0] }
        };
      }
      return {
        sitecore: {
          context: results[1],
          route: results[0]
        }
      };
    });
  }

  getContext(route, language) {
    return fetch(`/data/context/${language}.json`, { credentials: "include" })
      .then(checkStatus)
      .then(response => response.json());
  }

  getPlaceholderData(placeholderName, route, language) {
    const routePath = route === "/" ? "" : route;
    return fetch(`/data/routes${routePath}/${language}.json`, {
      credentials: "include"
    })
      .then(checkStatus)
      .then(response => response.json())
      .then(json => json.placeholders[placeholderName]);
  }

  getItemData(itemPath, language) {
    return fetch(`/data${itemPath}/${language}.json`, {
      credentials: "include"
    })
      .then(checkStatus)
      .then(response => response.json())
      .then(json => convertRouteToLayoutServiceFormat(json));
  }

  getTranslationPath() {
    return `/data/dictionary/{{lng}}.json`;
  }
}
