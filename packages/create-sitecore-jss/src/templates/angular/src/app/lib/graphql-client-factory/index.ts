import { GraphQLRequestClient } from '@sitecore-jss/sitecore-jss-angular/cjs';
import { getGraphQLClientFactoryConfig } from './config';

// The GraphQLRequestClientFactory serves as the central hub for executing GraphQL requests within the application

/**
 * Creates a new GraphQLRequestClientFactory instance
 * @returns GraphQLRequestClientFactory instance
 */
const createGraphQLClientFactory = () => {
  const clientConfig = getGraphQLClientFactoryConfig();

  return GraphQLRequestClient.createClientFactory(clientConfig);
};

export default createGraphQLClientFactory();
