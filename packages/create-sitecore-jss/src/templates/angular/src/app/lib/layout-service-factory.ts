import { 
  LayoutService,
<% if (fetchWith.toUpperCase() === 'GRAPHQL') { -%>
  GraphQLLayoutService
<% } else if (fetchWith.toUpperCase() === 'REST') { -%>
  RestLayoutService
<% } -%> 
} from '@sitecore-jss/sitecore-jss-angular';
import { environment } from '../../environments/environment';

export class LayoutServiceFactory {
  create(): LayoutService {
    <% if (fetchWith.toUpperCase() === 'GRAPHQL') { -%>
    return new GraphQLLayoutService({
      endpoint: environment.graphQLEndpoint,
      apiKey: environment.sitecoreApiKey,
      siteName: environment.jssAppName,
    });
    <% } else if (fetchWith.toUpperCase() === 'REST') { -%>
    return new RestLayoutService({
      apiHost: environment.sitecoreApiHost,
      apiKey: environment.sitecoreApiKey,
      siteName: environment.jssAppName,
      configurationName: 'default',
    });
    <% } -%>
  }
}

export const layoutServiceFactory = new LayoutServiceFactory();
