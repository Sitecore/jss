import {
  GraphQLRequestClientFactoryConfig,
  GraphQLRequestClient,
} from '@sitecore-jss/sitecore-jss-angular';
import { environment as env } from '../../environments/environment';

// The GraphQLRequestClientFactory serves as the central hub for executing GraphQL requests within the application

/**
 * Creates a new GraphQLRequestClientFactory instance
 * @returns GraphQLRequestClientFactory instance
 */
export const createGraphQLClientFactory = () => {
  let clientConfig: GraphQLRequestClientFactoryConfig;

  if (env.graphQLEndpoint && env.sitecoreApiKey) {
    clientConfig = {
      endpoint: env.graphQLEndpoint,
      apiKey: env.sitecoreApiKey,
    };
  } else {
    throw new Error('Please configure your graphQLEndpoint and sitecoreApiKey.');
  }

  return GraphQLRequestClient.createClientFactory(clientConfig);
};

export const clientFactory = createGraphQLClientFactory();
