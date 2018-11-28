import { HttpJsonFetcher, HttpResponse, isServer } from '@sitecore-jss/sitecore-jss';
import { CampaignInstance, EventInstance, GoalInstance, OutcomeInstance, PageViewInstance } from './dataModels';
import { TrackingRequestOptions } from './trackingRequestOptions';

class ResponseError extends Error {
  constructor(message: string, response: HttpResponse<any>) {
    super(message);

    Object.setPrototypeOf(this, ResponseError.prototype);
    this.response = response;
  }

  response: HttpResponse<any>;
}

function checkStatus(response: HttpResponse<any>) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new ResponseError(response.statusText, response);
  throw error;
}

// note: encodeURIComponent is available via browser (window) or natively in node.js
// if you use another js engine for server-side rendering you may not have native encodeURIComponent
// and would then need to install a package for that functionality
function getQueryString(params: { [key: string]: any }) {
  return Object.keys(params)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join('&');
}

// note: axios needs to use `withCredentials: true` in order for Sitecore cookies to be included in CORS requests
// which is necessary for analytics and such
function fetchData<T>(
  url: string,
  data: any,
  fetcher: HttpJsonFetcher<T>,
  params: { [key: string]: any } = {}) {

  const qs = getQueryString(params);
  const fetchUrl = url.indexOf('?') !== -1 ? `${url}&${qs}` : `${url}?${qs}`;

  return fetcher(fetchUrl, data)
    .then(checkStatus)
    .then((response: HttpResponse<T>) => {
      // axios auto-parses JSON responses, don't need to JSON.parse
      return response.data;
    });
}

function resolveTrackingUrl(options: TrackingRequestOptions) {
  const { host = '', serviceUrl = '/sitecore/api/jss/track', action = 'event' } = options;

  return `${host}${serviceUrl}/${action}`;
}

/**
 * Makes a request to Sitecore Layout Service for the specified route item path.
 */
export function trackEvent(
  events: Array<EventInstance | GoalInstance | OutcomeInstance | CampaignInstance | PageViewInstance>,
  options: TrackingRequestOptions
): Promise<void> {
  const { querystringParams } = options;

  if (!options.test && isServer()) {
    // do nothing for SSR, only track events when a browser requests it
    return Promise.resolve();
  }

  if (!Array.isArray(events)) {
    events = [ events ];
  }

  const fetchUrl = resolveTrackingUrl(options);

  return fetchData<void>(fetchUrl, events, options.fetcher, querystringParams);
}
