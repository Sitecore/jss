import { DictionaryService } from '@sitecore-jss/sitecore-jss-nextjs';
import config from 'temp/config';

const dictionaryService = new DictionaryService({
  apiHost: config.sitecoreApiHost,
  apiKey: config.sitecoreApiKey,
  siteName: config.jssAppName,
});

export { dictionaryService };
