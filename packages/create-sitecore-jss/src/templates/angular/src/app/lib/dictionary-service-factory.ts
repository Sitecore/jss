import {
  DictionaryService,
  GraphQLDictionaryService,
  RestDictionaryService,
  constants,
} from '@sitecore-jss/sitecore-jss-angular';
import { environment as env } from '../../environments/environment';
import { clientFactory } from './client-factory';

export class DictionaryServiceFactory {
  create(): DictionaryService {
    return process.env.FETCH_WITH === constants.FETCH_WITH.GRAPHQL
      ? new GraphQLDictionaryService({
          clientFactory,
          siteName: env.sitecoreSiteName,
          /*
            The Dictionary Service needs a root item ID in order to fetch dictionary phrases for the current
            app. If your Sitecore instance only has 1 JSS App, you can specify the root item ID here;
            otherwise, the service will attempt to figure out the root item for the current JSS App using GraphQL and app name.
            rootItemId: '{GUID}'
          */
        })
      : new RestDictionaryService({
          apiHost: env.sitecoreApiHost,
          apiKey: env.sitecoreApiKey,
          siteName: env.sitecoreSiteName,
        });
  }
}

export const dictionaryServiceFactory = new DictionaryServiceFactory();
