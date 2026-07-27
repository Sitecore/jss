import { Config, ServerBundle } from './types';
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
