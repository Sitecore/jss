import {
  GraphQLRequestClientFactoryConfig,
  getEdgeProxyContentUrl,
} from '@sitecore-jss/sitecore-jss-angular/cjs';
import { environment as env } from '../../../environments/environment';

/**
 * Gets the configuration for the GraphQLRequestClientFactory
 * @returns GraphQLRequestClientFactoryConfig
 */
export const getGraphQLClientFactoryConfig = () => {
  let clientConfig: GraphQLRequestClientFactoryConfig;

  // Server side requests should go directly to the Sitecore, browser requests should go through the proxy.
  const isServer = typeof window === 'undefined';
  // If we are in a production environment we are going to use Node XM Cloud proxy
  const isProduction = env.production === 'true';

  if (isProduction) {
    if (env.sitecoreEdgeContextId) {
      clientConfig = {
        endpoint: isServer
          ? getEdgeProxyContentUrl(env.sitecoreEdgeContextId, env.sitecoreEdgeUrl)
          : getEdgeProxyContentUrl(env.sitecoreEdgeContextId, ''),
      };
    } else if (env.graphQLEndpoint && env.sitecoreApiKey) {
      // we ignore ssr-proxy and query CM directly in case apiKey is used (i.e. in dev docker deployments)
      clientConfig = {
        endpoint: env.graphQLEndpoint,
        apiKey: env.sitecoreApiKey,
      };
    }
  } else {
    if (env.sitecoreEdgeContextId) {
      clientConfig = {
        endpoint: getEdgeProxyContentUrl(env.sitecoreEdgeContextId, env.sitecoreEdgeUrl),
      };
    } else if (env.graphQLEndpoint && env.sitecoreApiKey) {
      clientConfig = {
        endpoint: env.graphQLEndpoint,
        apiKey: env.sitecoreApiKey,
      };
    }
  }

  if (!clientConfig?.endpoint) {
    throw new Error(
      'Please configure either your sitecoreEdgeContextId, or your graphQLEndpoint and sitecoreApiKey.'
    );
  }

  return clientConfig;
};
