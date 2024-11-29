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

const clientFactoryConfig = serverBundle.getClientFactoryConfig();

/**
 * GraphQL endpoint resolution to meet the requirements of the http-proxy-middleware
 */
export const graphQLEndpoint = (() => {
  try {
    const graphQLEndpoint = new URL(clientFactoryConfig.endpoint);
    // GraphQL endpoint URL (Edge endpoint for production and GraphQL Sitecore CM endpoint for dev)
    const graphQLEndpointUrl = `${graphQLEndpoint.protocol}//${graphQLEndpoint.hostname}`;
    // Sitecore Edge Context ID - will only be present for production
    const sitecoreEdgeContextId = graphQLEndpoint.searchParams.get('sitecoreContextId');
    // Browser request path to the proxy. Includes only the pathname.
    const pathname = graphQLEndpoint.pathname;
    // Target URL for the proxy. Can't include the query string.
    const target = `${graphQLEndpointUrl}${pathname}`;

    return {
      target,
      path: pathname,
      graphQLEndpointUrl,
      sitecoreEdgeContextId,
    };
  } catch (error) {
    throw new Error(
      `ERROR: The serverBundle should export a getClientFactoryConfig function with valid GraphQL endpoint URL returned, current value is ${clientFactoryConfig.endpoint}. ` +
        'Please check your server bundle.'
    );
  }
})();

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
    sitecoreEdgeUrl: graphQLEndpoint.graphQLEndpointUrl,
    sitecoreEdgeContextId: graphQLEndpoint.sitecoreEdgeContextId || '',
    timeout:
      (process.env.PERSONALIZE_MIDDLEWARE_CDP_TIMEOUT &&
        parseInt(process.env.PERSONALIZE_MIDDLEWARE_CDP_TIMEOUT)) ||
      400,
  },
  // Optional Sitecore Personalize scope identifier.
  scope: serverBundle.personalizeScope,
  // This function determines if the personalization should be turned off.
  // IMPORTANT: You should implement based on your cookie consent management solution of choice.
  // You may wish to keep it disabled while in development mode.
  // Personalization will also be disabled when edge context id is missing
  disabled: () => process.env.NODE_ENV === 'development' || !graphQLEndpoint.sitecoreEdgeContextId,
  // This function determines if a route should be excluded from personalization.
  excludeRoute: () => false,
  sitecoreSiteName: serverBundle.sitecoreSiteName || '',
  // defaultLanguage will be used as fallback for personalization, if language cannot be read from layout service data
  defaultLanguage: serverBundle.defaultLanguage,
};
