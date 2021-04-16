import { DummyTrackingService, TrackingService } from '@sitecore-jss/sitecore-jss-tracking';
import config from 'temp/config';

export const trackingService =
  config.isTrackingEnabled.toLocaleLowerCase() === 'true'
    ? new TrackingService({
        endpoint: config.trackingEndpoint,
        apiKey: config.sitecoreServicesApiKey,
        siteName: config.jssAppName,
      })
    : new DummyTrackingService();
