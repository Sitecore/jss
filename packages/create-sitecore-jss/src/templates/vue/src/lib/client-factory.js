import {
  GraphQLRequestClientFactoryConfig,
  GraphQLRequestClient,
} from '@sitecore-jss/sitecore-jss-vue';
import config from '../temp/config';

/**
 * Creates a new GraphQLRequestClientFactory instance
 * @returns GraphQLRequestClientFactory instance
 */
export const createGraphQLClientFactory = () => {
  let clientConfig;

  if (config.graphQLEndpoint && config.sitecoreApiKey) {
    clientConfig = {
      endpoint: config.graphQLEndpoint,
      apiKey: config.sitecoreApiKey,
    };
  } else {
    throw new Error('Please configure your graphQLEndpoint and sitecoreApiKey.');
  }

  return GraphQLRequestClient.createClientFactory(clientConfig);
};

export const clientFactory = createGraphQLClientFactory();
