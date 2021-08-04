import { RestDictionaryService } from '@sitecore-jss/sitecore-jss-nextjs';
import config from '../temp/config';

export class DictionaryServiceFactory {
  create() {
    return new RestDictionaryService({
      apiHost: config.sitecoreApiHost,
      apiKey: config.sitecoreApiKey,
      siteName: config.jssAppName,
    });
  }
}

export const dictionaryServiceFactory = new DictionaryServiceFactory();
