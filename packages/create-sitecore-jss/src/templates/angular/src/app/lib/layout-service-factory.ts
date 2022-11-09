import {
  LayoutService,
  GraphQLLayoutService,
  RestLayoutService,
  constants,
} from '@sitecore-jss/sitecore-jss-angular';
import { environment } from '../../environments/environment';

export class LayoutServiceFactory {
  create(): LayoutService {
    return process.env.FETCH_WITH === constants.FETCH_WITH.GRAPHQL
      ? new GraphQLLayoutService({
          endpoint: environment.graphQLEndpoint,
          apiKey: environment.sitecoreApiKey,
          siteName: environment.jssAppName,
        })
      : new RestLayoutService({
          apiHost: environment.sitecoreApiHost,
          apiKey: environment.sitecoreApiKey,
          siteName: environment.jssAppName,
          configurationName: 'default',
        });
  }
}

export const layoutServiceFactory = new LayoutServiceFactory();
