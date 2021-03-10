import { DictionaryService, RestDictionaryService, util } from '@sitecore-jss/sitecore-jss-nextjs';
import config from 'temp/config';

function getUrl(language: string): string {
  const qs = util.routing.getQueryString({ sc_apikey: config.sitecoreApiKey });
  return `${config.sitecoreApiHost}/sitecore/api/jss/dictionary/${config.jssAppName}/${language}?${qs}`;
}

export class DictionaryServiceFactory {
  create(): DictionaryService {
    return new RestDictionaryService({
      getUrl
    });
  }
}

export const dictionaryServiceFactory = new DictionaryServiceFactory();
