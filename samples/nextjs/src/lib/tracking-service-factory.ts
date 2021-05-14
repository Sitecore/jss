import { TrackingService } from '@sitecore-jss/sitecore-jss-tracking';
import config from 'temp/config';

export const trackingService = new TrackingService({
  serviceUrl: '/api/track',
  apiKey: config.sitecoreApiKey,
  siteName: config.jssAppName,
});
