/* eslint class-methods-use-this: 0 */
/* global __SC_API_HOST__, __TRANSLATION_PATH__, __SC_API_KEY__ */

import { RestLayoutService } from '@sitecore-jss/sitecore-jss-react';

class SitecoreContentService {
  constructor() {
    this.layoutService = new RestLayoutService({
      apiHost: `${__SC_API_HOST__}`,
      apiKey: __SC_API_KEY__,
      siteName: 'website', // the name of the site you're "embedding" into ('website' in the sample)
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
