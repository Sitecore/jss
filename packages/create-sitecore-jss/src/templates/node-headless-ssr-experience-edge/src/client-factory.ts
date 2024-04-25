import {
  GraphQLRequestClientFactoryConfig,
  GraphQLRequestClient,
} from '@sitecore-jss/sitecore-jss';
import { config } from './config';

// The GraphQLRequestClientFactory serves as the central hub for executing GraphQL requests within the application

/**
 * Creates a new GraphQLRequestClientFactory instance
 * @returns GraphQLRequestClientFactory instance
 */
export const createGraphQLClientFactory = () => {
  let clientConfig: GraphQLRequestClientFactoryConfig;

  if (config.endpoint && config.apiKey) {
    clientConfig = {
      endpoint: config.endpoint,
      apiKey: config.apiKey,
    };
  } else {
    throw new Error('Please configure your endpoint and apiKey.');
  }

  return GraphQLRequestClient.createClientFactory(clientConfig);
};

export const clientFactory = createGraphQLClientFactory();
