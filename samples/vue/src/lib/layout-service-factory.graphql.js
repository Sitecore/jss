import { GraphQLLayoutService } from '@sitecore-jss/sitecore-jss-vue';
import config from 'temp/config';

export class LayoutServiceFactory {
  create() {
    return new GraphQLLayoutService({
      endpoint: config.graphQLEndpoint,
      apiKey: config.sitecoreApiKey,
      siteName: config.jssAppName,
    });
  }
}

export const layoutServiceFactory = new LayoutServiceFactory();
