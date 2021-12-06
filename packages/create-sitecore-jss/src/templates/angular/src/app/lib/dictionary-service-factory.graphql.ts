import { DictionaryService, GraphQLDictionaryService } from '@sitecore-jss/sitecore-jss-angular';
import { environment as env } from '../../environments/environment';

export class DictionaryServiceFactory {
  create(): DictionaryService {
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
  }
}

export const dictionaryServiceFactory = new DictionaryServiceFactory();
// TODO: make this ejs if/else for rest/graphql
