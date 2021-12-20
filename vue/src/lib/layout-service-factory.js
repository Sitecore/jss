import {
  LayoutService,
  GraphQLLayoutService
   
} from '@sitecore-jss/sitecore-jss-angular';
import config from '../temp/config';

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
