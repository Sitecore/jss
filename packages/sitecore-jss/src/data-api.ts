import { LayoutServiceData, PlaceholderData } from './layout/models';
import { HttpDataFetcher, HttpResponse } from './data-fetcher';
import { urlUtil } from './util';

class ResponseError extends Error {
  response: HttpResponse<unknown>;

  constructor(message: string, response: HttpResponse<unknown>) {
    super(message);

    Object.setPrototypeOf(this, ResponseError.prototype);
    this.response = response;
  }
}

/**
 * @param {HttpResponse<T>} response
 */
function checkStatus<T>(response: HttpResponse<T>) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new ResponseError(response.statusText, response);
  throw error;
}

/**
 * @param {string} url
 * @param {HttpDataFetcher} fetcher
 * @param {Object} params
 */
export function fetchData<T>(
  url: string,
  fetcher: HttpDataFetcher<T>,
  params: { [key: string]: string | number | boolean } = {}
) {
  return fetcher(urlUtil.resolve(url, params))
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
  querystringParams?: { [key: string]: string | number | boolean };

  /** The fetcher that performs the HTTP request and returns a promise to JSON */
  fetcher: HttpDataFetcher<T>;
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
 * @param {string} itemPath
 * @param {LayoutServiceRequestOptions<LayoutServiceData>} options
 * @returns {Promise<LayoutServiceData>} layout data
 */
export function fetchRouteData(
  itemPath: string,
  options: LayoutServiceRequestOptions<LayoutServiceData>
): Promise<LayoutServiceData> {
  const { querystringParams, layoutServiceConfig } = options;

  const fetchUrl = resolveLayoutServiceUrl(layoutServiceConfig, 'render');

  return fetchData(fetchUrl, options.fetcher, { item: itemPath, ...querystringParams });
}

/**
 * Makes a request to Sitecore Layout Service for the specified placeholder in
 * a specific route item. Allows you to retrieve rendered data for individual placeholders instead of entire routes.
 * @deprecated Will be removed in a future release. Please use LayoutService.fetchPlaceholderData instead,
 * @see {LayoutService} - fetchPlaceholderData
 * @param {string} placeholderName
 * @param {string} itemPath
 * @param {LayoutServiceRequestOptions<PlaceholderData>} options
 * @returns {Promise<PlaceholderData>} placeholder data
 */
export function fetchPlaceholderData(
  placeholderName: string,
  itemPath: string,
  options: LayoutServiceRequestOptions<PlaceholderData>
): Promise<PlaceholderData> {
  const { querystringParams, layoutServiceConfig } = options;

  const fetchUrl = resolveLayoutServiceUrl(layoutServiceConfig, 'placeholder');

  return fetchData(fetchUrl, options.fetcher, {
    placeholderName,
    item: itemPath,
    ...querystringParams,
  });
}
