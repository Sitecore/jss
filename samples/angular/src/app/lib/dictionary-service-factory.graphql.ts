import { DictionaryService, GraphQLDictionaryService } from '@sitecore-jss/sitecore-jss-angular';
import { environment as env } from '../../environments/environment';

export class DictionaryServiceFactory {
  create(): DictionaryService {
    return new GraphQLDictionaryService({
      endpoint: env.graphQLEndpoint,
      apiKey: env.sitecoreApiKey,
      siteName: env.jssAppName,
    });
  }
}

export const dictionaryServiceFactory = new DictionaryServiceFactory();
