import { TrackingService } from '@sitecore-jss/sitecore-jss-tracking';
import config from 'temp/config';

export const trackingService = new TrackingService({
  endpoint: config.trackingEndpoint,
  apiKey: config.sitecoreApiKey,
  siteName: config.jssAppName,
});
