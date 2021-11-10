import {
  LayoutService,
  RestLayoutService,
  GraphQLLayoutService,
} from '@sitecore-jss/sitecore-jss-nextjs';
import config from 'temp/config';

export class LayoutServiceFactory {
  create(): LayoutService {
    return process.env.FETCH_WITH === 'graphql'
      ? new GraphQLLayoutService({
          endpoint: config.graphQLEndpoint,
          apiKey: config.sitecoreApiKey,
          siteName: config.jssAppName,
        })
      : new RestLayoutService({
          apiHost: config.sitecoreApiHost,
          apiKey: config.sitecoreApiKey,
          siteName: config.jssAppName,
          configurationName: 'default',
        });
  }
}

export const layoutServiceFactory = new LayoutServiceFactory();
