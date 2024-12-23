import {
  GraphQLRequestClientFactoryConfig,
  GraphQLRequestClient,
  getEdgeProxyContentUrl,
} from '@sitecore-jss/sitecore-jss-nextjs/graphql';
import { SitecoreNextjsConfig } from '@sitecore-jss/sitecore-jss-nextjs';

/**
 * Creates a new GraphQLRequestClientFactory instance
 * @param config jss config
 * @returns GraphQLRequestClientFactory instance
 */
export const createGraphQLClientFactory = (config: SitecoreNextjsConfig) => {
  let clientConfig: GraphQLRequestClientFactoryConfig;

  if (config.client?.xmcloud) {
    clientConfig = {
      endpoint: getEdgeProxyContentUrl(config),
    };
  } else if (config.client?.local) {
    clientConfig = {
      endpoint: config.client.local.graphqQLEndpoint,
      apiKey: config.client.local.sitecoreApiKey,
    };
  } else {
    throw new Error(
      'Please configure either your sitecoreEdgeContextId, or your graphQLEndpoint and sitecoreApiKey.'
    );
  }

  return GraphQLRequestClient.createClientFactory(clientConfig);
};
