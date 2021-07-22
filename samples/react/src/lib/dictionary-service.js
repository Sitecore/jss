import { RestDictionaryService } from '@sitecore-jss/sitecore-jss-react';
import config from '../temp/config';
import { getHostname } from '../util';

export const dictionaryService = new RestDictionaryService({
  apiHost: getHostname(),
  apiKey: config.sitecoreApiKey,
  siteName: config.jssAppName,
});
