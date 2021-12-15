/* global __SC_API_KEY__, __SC_API_HOST__ */
/* eslint-disable import/no-extraneous-dependencies */

import { RestLayoutService } from '@sitecore-jss/sitecore-jss-react-native';
import { config } from '../../package.json';

const getRouteData = (route, { options = {}, language } = {}) => {
  const layoutService = new RestLayoutService({
    apiHost: options.apiHost || __SC_API_HOST__,
    apiKey: options.apiKey || __SC_API_KEY__,
    siteName: options.appName || config.appName,
  });

  return layoutService
    .fetchLayoutData(route, language)
    .then((data) => (data && data.sitecore ? data.sitecore.route : {}));
};

export { getRouteData };
