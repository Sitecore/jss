import { GraphQLDictionaryService } from './services/graphql-dictionary-service';
import config from '../temp/config';

export class DictionaryServiceFactory {
  create() {
    return new GraphQLDictionaryService({
      endpoint: config.sitecoreApiHost,
      apiKey: config.sitecoreApiKey,
      siteName: config.sitecoreSiteName,
    });
  }
}

export const dictionaryServiceFactory = new DictionaryServiceFactory();
