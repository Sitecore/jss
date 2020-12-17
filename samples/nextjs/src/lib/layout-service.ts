import { LayoutService } from '@sitecore-jss/sitecore-jss-nextjs';
import config from 'temp/config';

export const layoutService = new LayoutService({
  apiHost: config.sitecoreApiHost,
  apiKey: config.sitecoreApiKey,
  siteName: config.jssAppName,
});
