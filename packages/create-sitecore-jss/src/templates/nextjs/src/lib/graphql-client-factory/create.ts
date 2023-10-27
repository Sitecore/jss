import {
  GraphQLRequestClientFactoryConfig,
  getEdgeProxyContentUrl,
  GraphQLRequestClient,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { JssConfig } from 'lib/config';

/**
 * Creates a new GraphQLRequestClientFactory instance
 * @param config jss config
 * @returns GraphQLRequestClientFactory instance
 */
export const createGraphQLClientFactory = (config: JssConfig) => {
  let clientConfig: GraphQLRequestClientFactoryConfig;

  if (config.sitecoreEdgeContextId) {
    clientConfig = {
      endpoint: getEdgeProxyContentUrl(config.sitecoreEdgeContextId, config.sitecoreEdgeUrl),
    };
  } else if (config.graphQLEndpoint && config.sitecoreApiKey) {
    clientConfig = {
      endpoint: config.graphQLEndpoint,
      apiKey: config.sitecoreApiKey,
    };
  } else {
    throw new Error(
      'Please configure either your sitecoreEdgeContextId, or your graphQLEndpoint and sitecoreApiKey.'
    );
  }

  return GraphQLRequestClient.createClientFactory(clientConfig);
};
