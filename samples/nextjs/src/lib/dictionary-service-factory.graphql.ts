import { DictionaryService, GraphQLDictionaryService } from '@sitecore-jss/sitecore-jss-nextjs';
import config from 'temp/config';

export class DictionaryServiceFactory {
  create(): DictionaryService {
    return new GraphQLDictionaryService({
      endpoint: config.graphQLEndpoint,
      siteName: config.jssAppName,
    });
  }
}

export const dictionaryServiceFactory = new DictionaryServiceFactory();
