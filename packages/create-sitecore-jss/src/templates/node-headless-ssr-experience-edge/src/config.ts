import { Config, ServerBundle } from './types';

const appName = process.env.SITECORE_JSS_APP_NAME || 'YOUR APP NAME';

const siteName = process.env.SITECORE_SITE_NAME || appName;

/**
 * The server.bundle.js file from your pre-built JSS app
 */

const bundlePath = process.env.SITECORE_JSS_SERVER_BUNDLE || `../dist/${appName}/server.bundle`;

const serverBundle: ServerBundle = require(bundlePath);

export const config: Config = {
  /**
   * The require'd server.bundle.js file from your pre-built JSS app
   */
  serverBundle,
  /**
   * Your Experience Edge endpoint
   */
  endpoint:
    process.env.SITECORE_EXPERIENCE_EDGE_ENDPOINT ||
    'http://my.experience.edge/sitecore/api/graph/edge',
  /**
   * The API key provisioned on Sitecore Experience Edge.
   * Required.
   */
  apiKey: process.env.SITECORE_API_KEY || serverBundle.apiKey || '{YOUR API KEY HERE}',
  /**
   * The Sitecore site name.
   * Required.
   */
  siteName: siteName || serverBundle.siteName,
  /**
   * Port which will be used when start sample
   */
  port: process.env.PORT || 3000,
  /*
   * The default language to use in case the context language cannot be determined (this happens
   * on initial page load, if the language is not specified in the URL)
   */
  defaultLanguage: process.env.DEFAULT_LANGUAGE || 'en',
};
