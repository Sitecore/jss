import {
  GraphQLDictionaryService,
  RestDictionaryService,
  constants,
} from '@sitecore-jss/sitecore-jss-vue';
import config from '../temp/config';
import { clientFactory } from './client-factory';

export class DictionaryServiceFactory {
  create() {
    return process.env.VUE_APP_FETCH_WITH === constants.FETCH_WITH.GRAPHQL
      ? new GraphQLDictionaryService({
          clientFactory,
          siteName: config.sitecoreSiteName,
          /*
            The Dictionary Service needs a root item ID in order to fetch dictionary phrases for the current
            app. If your Sitecore instance only has 1 JSS App, you can specify the root item ID here;
            otherwise, the service will attempt to figure out the root item for the current JSS App using GraphQL and app name.
            rootItemId: '{GUID}'
          */
        })
      : new RestDictionaryService({
          apiHost: config.sitecoreApiHost,
          apiKey: config.sitecoreApiKey,
          siteName: config.sitecoreSiteName,
        });
  }
}

export const dictionaryServiceFactory = new DictionaryServiceFactory();
