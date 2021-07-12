import { RestLayoutService } from '@sitecore-jss/sitecore-jss-react';
import config from '../temp/config';
import { getHostname } from '../util';

export const layoutService = new RestLayoutService({
  apiHost: getHostname(),
  apiKey: config.sitecoreApiKey,
  siteName: config.jssAppName,
});
