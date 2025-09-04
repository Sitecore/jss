import { isServer, resolveUrl } from './../utils';
import {
  CampaignInstance,
  EventInstance,
  GoalInstance,
  OutcomeInstance,
  PageViewInstance,
} from './dataModels';
import { TrackingRequestOptions } from './trackingRequestOptions';
import querystring from 'querystring';
import { HttpDataFetcher, HttpResponse } from '../data-fetcher';
import { NativeDataFetcherFunction } from '../native-fetcher';

/**
 * Note: fetch api needs to use `credentials: include` in order for Sitecore cookies to be included in CORS requests
 * which is necessary for analytics and such
 * @param {string} url url to fetch
 * @param {unknown[]} data data to send
 * @param {HttpDataFetcher<T>} fetcher data fetcher
 * @param {querystring.ParsedUrlQueryInput} params additional params to send
 */
async function fetchData<T>(
  url: string,
  data: unknown,
  fetcher: HttpDataFetcher<T> | NativeDataFetcherFunction<T>,
  params: querystring.ParsedUrlQueryInput = {}
): Promise<T> {
  const requestData = {
    ...(typeof data === 'object' && data !== null ? data : {}),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(typeof data === 'object' && data !== null && 'headers' in data
        ? (data as { headers: Record<string, string> }).headers
        : {}),
    },
    body: JSON.stringify(data),
  };

  return fetcher(resolveUrl(url, params), requestData).then((response: HttpResponse<unknown>) => {
    return response.data as T;
  });
}

/**
 * Resolve tracking endpoint url
 * @param {TrackingRequestOptions} options options for the tracking service
 * @returns {string} tracking api url
 */
function resolveTrackingUrl(options: TrackingRequestOptions) {
  const { host = '', serviceUrl = '/sitecore/api/jss/track', action = 'event' } = options;

  return `${host}${serviceUrl}/${action}`;
}

/**
 * Makes a request to Sitecore Layout Service for the specified route item path.
 * @param {Array<EventInstance | GoalInstance | OutcomeInstance | CampaignInstance | PageViewInstance>} events events to send
 * @param {TrackingRequestOptions} options options for the tracking service
 * @returns {Promise<void>} void
 */
export function trackEvent(
  events: Array<
    EventInstance | GoalInstance | OutcomeInstance | CampaignInstance | PageViewInstance
  >,
  options: TrackingRequestOptions
): Promise<void> {
  const { querystringParams } = options;

  if (!options.test && isServer()) {
    // do nothing for SSR, only track events when a browser requests it
    return Promise.resolve();
  }

  if (!Array.isArray(events)) {
    events = [events];
  }

  const fetchUrl = resolveTrackingUrl(options);

  return fetchData<void>(fetchUrl, events, options.fetcher, querystringParams);
}
