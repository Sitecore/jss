import "isomorphic-fetch";
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

class DisconnectedSitecoreContentService extends SitecoreContentServiceBase {
  getRouteData(route, language) {
    const routePath = route === "/" ? "" : route;
    language = language || "en";

    const routeData = this.getInitialRouteData().catch(() => {
      return fetch(`/data/routes${routePath}/${language}.json`, {
        credentials: "include"
      })
        .then(checkStatus)
        .then(response => response.json())
        .then(json => convertRouteToLayoutServiceFormat(json));
    });

    const context = this.getContext(route, language);

    return Promise.all([routeData, context]).then(results => {
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

  getPlaceholderData(placeholderName, route, language) {
    const routePath = route === "/" ? "" : route;
    language = language || "en";

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

  getContext(route, language) {
    return fetch(`/data/context/${language}.json`, { credentials: "include" })
      .then(checkStatus)
      .then(response => response.json());
  }
}

export default DisconnectedSitecoreContentService;
