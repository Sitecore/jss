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
import { HttpDataFetcher, HttpResponse } from './../data-fetcher';

class ResponseError extends Error {
  response: HttpResponse<unknown>;

  constructor(message: string, response: HttpResponse<unknown>) {
    super(message);

    Object.setPrototypeOf(this, ResponseError.prototype);
    this.response = response;
  }
}

/**
 * @param {HttpResponse<T>} response response from fetch
 * @returns {HttpResponse<unknown>} response
 */
export function checkStatus<T>(response: HttpResponse<T>) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new ResponseError(response.statusText, response);
  throw error;
}

/**
 * Note: axios needs to use `withCredentials: true` in order for Sitecore cookies to be included in CORS requests
 * which is necessary for analytics and such
 * @param {string} url url to fetch
 * @param {unknown[]} data data to send
 * @param {HttpDataFetcher<T>} fetcher data fetcher
 * @param {querystring.ParsedUrlQueryInput} params additional params to send
 */
function fetchData<T>(
  url: string,
  data: unknown[],
  fetcher: HttpDataFetcher<T>,
  params: querystring.ParsedUrlQueryInput = {}
) {
  return fetcher(resolveUrl(url, params), data)
    .then(checkStatus)
    .then((response: HttpResponse<unknown>) => {
      // axios auto-parses JSON responses, don't need to JSON.parse
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
