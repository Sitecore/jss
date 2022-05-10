import { ProxyConfig } from '../ProxyConfig';

const config: ProxyConfig = {
  apiHost: 'http://jssadvancedapp',
  apiKey: '{GUID}',
  layoutServiceRoute: '/sitecore/layoutsvc/render/jss',
  pathRewriteExcludeRoutes: ['/SITECORE/CONTENTSVC', '/SITECORE/LAYOUTSVC', '/SITECORE MODULES'],
  debug: true,
  serverBundle: {
    renderView: (callback, _path, _data, _viewBag) => {
      callback(null, { html: '<p>Test HTML</p>' });
    },
    parseRouteUrl: (url) => {
      return {
        sitecoreRoute: url.split('/')[0],
        lang: 'en',
      };
    },
    appName: 'APP_NAME',
    apiKey: '{GUID}',
  },
};

export default config;
