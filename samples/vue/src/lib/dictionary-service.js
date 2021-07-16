import { RestDictionaryService } from '@sitecore-jss/sitecore-jss-vue';
import config from '../temp/config';

export const dictionaryService = new RestDictionaryService({
  apiHost: config.sitecoreApiHost,
  apiKey: config.sitecoreApiKey,
  siteName: config.jssAppName,
});
