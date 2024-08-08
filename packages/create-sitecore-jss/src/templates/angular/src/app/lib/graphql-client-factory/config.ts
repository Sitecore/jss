import { GraphQLRequestClientFactoryConfig } from '@sitecore-jss/sitecore-jss-angular/cjs';
import { environment as env } from '../../../environments/environment';

/**
 * Gets the configuration for the GraphQLRequestClientFactory
 * @returns GraphQLRequestClientFactoryConfig
 */
export const getGraphQLClientFactoryConfig = () => {
  let clientConfig: GraphQLRequestClientFactoryConfig;

  if (env.graphQLEndpoint && env.sitecoreApiKey) {
    clientConfig = {
      endpoint: env.graphQLEndpoint,
      apiKey: env.sitecoreApiKey,
    };
  } else {
    throw new Error('Please configure your graphQLEndpoint and sitecoreApiKey.');
  }

  return clientConfig;
};
