import { LayoutServiceData, PlaceholderData } from './dataModels';
import { HttpJsonFetcher, HttpResponse } from './httpClientInterface';

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
function getQueryString(params: { [key: string]: any }): string {
  return Object.keys(params)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join('&');
}

function fetchData<T>(
  url: string,
  fetcher: HttpJsonFetcher<T>,
  params: { [key: string]: any } = {}
) {
  const qs = getQueryString(params);
  const fetchUrl = url.indexOf('?') !== -1 ? `${url}&${qs}` : `${url}?${qs}`;

  return fetcher(fetchUrl)
    .then(checkStatus)
    .then((response) => {
      // axios auto-parses JSON responses, don't need to JSON.parse
      return response.data;
    });
}

export interface LayoutServiceConfig {
  /**
   * Host name of the Sitecore instance serving Layout Service requests.
   */
  host?: string;

  /**
   * Layout Service "named" configuration
   */
  configurationName?: string;

  /**
   * This value overrides the default layout service URL.
   * Note: `host` and `configurationName` options are ignored if `layoutServiceUrl` is set.
   */
  serviceUrl?: string;
}

export interface BaseRequestOptions<T> {
  /**
   * An object of key:value pairs to be stringified and used as querystring parameters.
   */
  querystringParams?: { [key: string]: any };

  /** The fetcher that performs the HTTP request and returns a promise to JSON */
  fetcher: HttpJsonFetcher<T>;
}

export interface LayoutServiceRequestOptions<T> extends BaseRequestOptions<T> {
  /**
   * Configuration options for Layout Service requests.
   */
  layoutServiceConfig?: LayoutServiceConfig;
}

const resolveLayoutServiceUrl = (options: LayoutServiceConfig = {}, verb: string) => {
  const { host = '', configurationName = 'jss', serviceUrl } = options;

  if (serviceUrl) {
    return serviceUrl;
  }

  return `${host}/sitecore/api/layout/${verb}/${configurationName}`;
};

/**
 * Makes a request to Sitecore Layout Service for the specified route item path.
 * @deprecated Will be removed in a future release. Please use LayoutService.fetchLayoutData instead,
 * @see {LayoutService} - fetchLayoutData
 */
export function fetchRouteData(
  itemPath: string,
  options: LayoutServiceRequestOptions<LayoutServiceData>
): Promise<LayoutServiceData> {
  const { querystringParams, layoutServiceConfig } = options;

  const fetchUrl = resolveLayoutServiceUrl(layoutServiceConfig, 'render');

  return fetchData(
    fetchUrl,
    options.fetcher,
    { item: itemPath, ...querystringParams });
}

/**
 * Makes a request to Sitecore Layout Service for the specified placeholder in
 * a specific route item. Allows you to retrieve rendered data for individual placeholders instead of entire routes.
 * @deprecated Will be removed in a future release. Please use LayoutService.fetchPlaceholderData instead,
 * @see {LayoutService} - fetchPlaceholderData
 */
export function fetchPlaceholderData(
  placeholderName: string,
  itemPath: string,
  options: LayoutServiceRequestOptions<PlaceholderData>
): Promise<PlaceholderData> {
  const { querystringParams, layoutServiceConfig } = options;

  const fetchUrl = resolveLayoutServiceUrl(layoutServiceConfig, 'placeholder');

  return fetchData(
    fetchUrl,
    options.fetcher,
    { placeholderName, item: itemPath, ...querystringParams }
  );
}
