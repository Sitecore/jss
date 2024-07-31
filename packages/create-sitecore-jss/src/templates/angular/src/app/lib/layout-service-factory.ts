import {
  LayoutService,
  GraphQLLayoutService,
  <% if (!locals.xmcloud) { -%>
  RestLayoutService,
  constants,
   <% } -%>
} from '@sitecore-jss/sitecore-jss-angular';
import { environment } from '../../environments/environment';
import { clientFactory } from './graphql-client-factory';

export class LayoutServiceFactory {
  create(): LayoutService {
    const service =
    <% if (!locals.xmcloud) { -%>
      process.env.FETCH_WITH === constants.FETCH_WITH.REST
        ? new RestLayoutService({
            apiHost: environment.sitecoreApiHost,
            apiKey: environment.sitecoreApiKey,
            siteName: environment.sitecoreSiteName,
            configurationName: environment.layoutServiceConfigurationName,
          })
        : 
    <% } -%>
        new GraphQLLayoutService({
            clientFactory,
            siteName: environment.sitecoreSiteName,
          });

    return service;
  }
}

export const layoutServiceFactory = new LayoutServiceFactory();
