import {
  LayoutService,
  GraphQLLayoutService,
  RestLayoutService,
  constants,
} from '@sitecore-jss/sitecore-jss-angular';
import { environment } from '../../environments/environment';
import { clientFactory } from './client-factory';

export class LayoutServiceFactory {
  create(): LayoutService {
    return process.env.FETCH_WITH === constants.FETCH_WITH.GRAPHQL
      ? new GraphQLLayoutService({
          clientFactory,
          siteName: environment.sitecoreSiteName,
        })
      : new RestLayoutService({
          apiHost: environment.sitecoreApiHost,
          apiKey: environment.sitecoreApiKey,
          siteName: environment.sitecoreSiteName,
          configurationName: environment.layoutServiceConfigurationName,
        });
  }
}

export const layoutServiceFactory = new LayoutServiceFactory();
