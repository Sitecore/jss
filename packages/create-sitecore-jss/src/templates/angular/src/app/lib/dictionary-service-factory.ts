import { 
  DictionaryService, 
<% if (fetchWith.toUpperCase() === 'GRAPHQL') { -%>
  GraphQLDictionaryService
<% } else if (fetchWith.toUpperCase() === 'REST') { -%>
  RestDictionaryService
<% } -%>  
} from '@sitecore-jss/sitecore-jss-angular';
import { environment as env } from '../../environments/environment';

export class DictionaryServiceFactory {
  create(): DictionaryService {
  <% if (fetchWith.toUpperCase() === 'GRAPHQL') { -%>
  return new GraphQLDictionaryService({
    endpoint: env.graphQLEndpoint,
    apiKey: env.sitecoreApiKey,
    siteName: env.jssAppName,
    /*
    The Dictionary Service needs a root item ID in order to fetch dictionary phrases for the current
    app. If your Sitecore instance only has 1 JSS App, you can specify the root item ID here;
    otherwise, the service will attempt to figure out the root item for the current JSS App using GraphQL and app name.
    rootItemId: '{GUID}'
    */
  });
  <% } else if (fetchWith.toUpperCase() === 'REST') { -%>
  return new RestDictionaryService({
    apiHost: env.sitecoreApiHost,
    apiKey: env.sitecoreApiKey,
    siteName: env.jssAppName,
  });
  <% } -%>
  }
}

export const dictionaryServiceFactory = new DictionaryServiceFactory();
