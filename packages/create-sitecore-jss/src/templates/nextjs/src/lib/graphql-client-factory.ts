import {
  getEdgeProxyContentUrl,
  GraphQLRequestClient,
  GraphQLRequestClientFactoryConfig,
} from '@sitecore-jss/sitecore-jss-nextjs';
import config from 'temp/config';

let clientConfig: GraphQLRequestClientFactoryConfig;

if (config.sitecoreEdgeContextId) {
  clientConfig = {
    endpoint: getEdgeProxyContentUrl(config.sitecoreEdgeUrl, config.sitecoreEdgeContextId),
  };
} else {
  clientConfig = {
    endpoint: config.graphQLEndpoint,
    apiKey: config.sitecoreApiKey,
  };
}

export const graphQLClientFactory = GraphQLRequestClient.createClientFactory(clientConfig);
