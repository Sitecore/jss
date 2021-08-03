import { GraphQLDictionaryService } from '@sitecore-jss/sitecore-jss-vue';
import config from '../temp/config';

export class DictionaryServiceFactory {
  create() {
    return new GraphQLDictionaryService({
      endpoint: config.graphQLEndpoint,
      apiKey: config.sitecoreApiKey,
      siteName: config.jssAppName,
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
