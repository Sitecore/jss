import { LayoutService, GraphQLLayoutService } from '@sitecore-jss/sitecore-jss-nextjs';
import config from 'temp/config';

export class LayoutServiceFactory {
  create(tracking: boolean): LayoutService {
    return new GraphQLLayoutService({
      endpoint: config.graphQLEndpoint,
      apiKey: config.sitecoreApiKey,
      siteName: config.jssAppName,
      tracking: tracking,
    });
  }
}

export const layoutServiceFactory = new LayoutServiceFactory();
