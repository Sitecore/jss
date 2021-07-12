import { RestLayoutService } from '@sitecore-jss/sitecore-jss-vue';
import config from '../temp/config';

export const layoutService = new RestLayoutService({
  apiHost: config.sitecoreApiHost,
  apiKey: config.sitecoreApiKey,
  siteName: config.jssAppName,
  configurationName: 'default',
});
