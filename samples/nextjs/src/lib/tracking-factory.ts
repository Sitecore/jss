import { TrackingService } from '@sitecore-jss/sitecore-jss-tracking';

import { dataFetcher } from 'lib/data-fetcher';

import config from 'temp/config';

export const trackingService = new TrackingService({
  serviceUrl: '/api/track',
  fetcher: dataFetcher,
  querystringParams: {
    sc_site: config.jssAppName,
  },
});
