import {
  LayoutService,
  RestLayoutService,
  GraphQLLayoutService,
  constants,
} from '@sitecore-jss/sitecore-jss-nextjs';
import config from 'temp/config';

export class LayoutServiceFactory {
  create(): LayoutService {
    return process.env.FETCH_WITH === constants.FETCH_WITH.GRAPHQL
      ? new GraphQLLayoutService({
          endpoint: config.graphQLEndpoint,
          apiKey: config.sitecoreApiKey,
        })
      : new RestLayoutService({
          apiHost: config.sitecoreApiHost,
          apiKey: config.sitecoreApiKey,
          configurationName: 'default',
        });
  }
}

export const layoutServiceFactory = new LayoutServiceFactory();
