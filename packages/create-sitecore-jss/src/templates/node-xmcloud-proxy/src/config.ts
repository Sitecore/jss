import { Config, ServerBundle } from './types';
import { PersonalizeConfig } from '@sitecore-jss/sitecore-jss-proxy';
/**
 * The server.bundle.js file from your pre-built SPA app.
 */
const bundlePath = process.env.PROXY_BUNDLE_PATH || '../dist/server.bundle';

let serverBundle: ServerBundle;

try {
  serverBundle = require(bundlePath);
} catch (error) {
  throw new Error(`ERROR: The server.bundle.js error. ${error}`);
}
const graphQLEndpoint = new URL(serverBundle.getClientFactoryConfig().endpoint);
const bundleEdgeEndpoint = `${graphQLEndpoint.protocol}//${graphQLEndpoint.hostname}`;
const bundleEdgeId = graphQLEndpoint.searchParams.get('sitecoreContextId');

const { clientFactory } = serverBundle;

export const config: Config = {
  /**
   * The require'd server.bundle.js file from your pre-built SPA app.
   */
  serverBundle,
  /**
   * Port which will be used when start the proxy
   */
  port: process.env.PROXY_PORT || 3000,
};

export const personalizeConfig: PersonalizeConfig = {
  // Configuration for your Sitecore Experience Edge endpoint
  edgeConfig: {
    clientFactory,
    timeout:
      (process.env.PERSONALIZE_MIDDLEWARE_EDGE_TIMEOUT &&
        parseInt(process.env.PERSONALIZE_MIDDLEWARE_EDGE_TIMEOUT)) ||
      400,
  },
  // Configuration for your Sitecore CDP endpoint
  // Edge URL and ID can be taken from proxy env, or the base SPA app
  cdpConfig: {
    sitecoreEdgeUrl: bundleEdgeEndpoint,
    sitecoreEdgeContextId: bundleEdgeId || '',
    timeout:
      (process.env.PERSONALIZE_MIDDLEWARE_CDP_TIMEOUT &&
        parseInt(process.env.PERSONALIZE_MIDDLEWARE_CDP_TIMEOUT)) ||
      400,
  },
  // Optional Sitecore Personalize scope identifier.
  scope: process.env.PERSONALIZE_SCOPE,
  // This function determines if the personalization should be turned off.
  // IMPORTANT: You should implement based on your cookie consent management solution of choice.
  // You may wish to keep it disabled while in development mode.
  // Personalization should also be disabled when edge context id is missing
  disabled: () => process.env.NODE_ENV === 'development' || !bundleEdgeId,
  // This function determines if a route should be excluded from personalization.
  excludeRoute: () => false,
  sitecoreSiteName: serverBundle.sitecoreSiteName || '',
  // defaultLanguage will be used as fallback for personalization, if language cannot be read from layout service data
  defaultLanguage: serverBundle.defaultLanguage,
};
