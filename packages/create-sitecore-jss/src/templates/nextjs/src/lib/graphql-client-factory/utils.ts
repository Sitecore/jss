import {
  GraphQLRequestClientFactoryConfig,
  getEdgeProxyContentUrl,
  GraphQLRequestClient,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { JssConfig } from 'scripts/config';

/**
 * Creates a new GraphQLRequestClientFactory instance
 * @param config jss config
 * @returns GraphQLRequestClientFactory instance
 */
export const createGraphQLClientFactory = (config: JssConfig) => {
  let clientConfig: GraphQLRequestClientFactoryConfig;

  if (config.sitecoreEdgeContextId && config.sitecoreEdgeUrl) {
    clientConfig = {
      endpoint: getEdgeProxyContentUrl(config.sitecoreEdgeUrl, config.sitecoreEdgeContextId),
    };
  } else if (config.graphQLEndpoint && config.sitecoreApiKey) {
    clientConfig = {
      endpoint: config.graphQLEndpoint,
      apiKey: config.sitecoreApiKey,
    };
  } else {
    throw new Error(
      'Please configure either your sitecoreEdgeUrl and sitecoreEdgeContextId, or your graphQLEndpoint and sitecoreApiKey'
    );
  }

  return GraphQLRequestClient.createClientFactory(clientConfig);
};
