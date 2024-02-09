import {
  DictionaryService,
  RestDictionaryService,
  GraphQLDictionaryService,
  constants,
} from '@sitecore-jss/sitecore-jss-nextjs';
import config from 'temp/config';
import clientFactory from 'lib/graphql-client-factory';

/**
 * Factory responsible for creating a DictionaryService instance
 */
export class DictionaryServiceFactory {
  /**
   * @param {string} siteName site name
   * @returns {DictionaryService} service instance
   */
  create(siteName: string): DictionaryService {
    return process.env.FETCH_WITH === constants.FETCH_WITH.GRAPHQL
      ? new GraphQLDictionaryService({
          siteName,
          clientFactory,
          /*
            The Dictionary Service needs a root item ID in order to fetch dictionary phrases for the current app. 
            When not provided, the service will attempt to figure out the root item for the current JSS App using GraphQL and app name.
            For SXA site(s) and multisite setup there's no need to specify it - it will be autoresolved.
            Otherwise, if your Sitecore instance only has 1 JSS App (i.e. in a Sitecore XP setup), you can specify the root item ID here.
            rootItemId: '{GUID}'
          */
          /*
            GraphQL endpoint may reach its rate limit with the amount of Layout and Dictionary requests it receives and throw a rate limit error.
            GraphQL Dictionary and Layout Services can handle rate limit errors from server and attempt a retry on requests.
            For this, specify the number of retries the GraphQL client will attempt. 
            It will only try the request once by default.
            retries: 'number' 
          */
          retries:
            (process.env.GRAPH_QL_SERVICE_RETRIES &&
              parseInt(process.env.GRAPH_QL_SERVICE_RETRIES, 10)) ||
            0,
        })
      : new RestDictionaryService({
          apiHost: config.sitecoreApiHost,
          apiKey: config.sitecoreApiKey,
          siteName,
        });
  }
}

/** DictionaryServiceFactory singleton */
export const dictionaryServiceFactory = new DictionaryServiceFactory();
