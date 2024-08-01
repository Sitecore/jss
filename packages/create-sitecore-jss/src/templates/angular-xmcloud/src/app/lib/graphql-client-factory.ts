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

  // If we are in a production environment we are going to use Node XM Cloud proxy
  if (env.production === 'true') {
    if (env.proxyHost && env.sitecoreApiKey && env.graphQLEndpoint) {
      // Server side requests should go directly to the Sitecore, browser requests should go through the proxy.
      clientConfig = {
        endpoint:
          typeof window === 'undefined'
            ? env.graphQLEndpoint
            : `${env.proxyHost}${env.graphQLEndpointPath}`,
        apiKey: env.sitecoreApiKey,
      };
    } else {
      throw new Error('Please configure your proxyHost, sitecoreApiKey, graphQLEndpoint.');
    }
  } else {
    if (env.graphQLEndpoint && env.sitecoreApiKey) {
      clientConfig = {
        endpoint: env.graphQLEndpoint,
        apiKey: env.sitecoreApiKey,
      };
    } else {
      throw new Error('Please configure your graphQLEndpoint and sitecoreApiKey.');
    }
  }

  return GraphQLRequestClient.createClientFactory(clientConfig);
};

export const clientFactory = createGraphQLClientFactory();
