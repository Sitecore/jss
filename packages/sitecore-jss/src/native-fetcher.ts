import debuggers, { Debugger } from './debug';
import TimeoutPromise from './utils/timeout-promise';

type NativeDataFetcherOptions = {
  /**
   * Override debugger for logging. Uses 'sitecore-jss:http' by default.
   */
  debugger?: Debugger;
  /**
   * Override fetch method. Uses native (or polyfilled) fetch by default.
   */
  fetch?: typeof fetch;
  /**
   * Optional request timeout.
   */
  timeout?: number;
};

/**
 * Response data for an HTTP request sent to an API
 * @template T the type of data model requested
 */
export interface NativeDataFetcherResponse<T> {
  /** HTTP status code of the response (i.e. 200, 404) */
  status: number;
  /** HTTP status text of the response (i.e. 'OK', 'Bad Request') */
  statusText: string;
  /** Response content */
  data: T;
  /** header */
  headers?: HeadersInit;
}

/**
 * Native fetcher error type to include response text and status
 */
export type NativeDataFetcherError = Error & {
  response: NativeDataFetcherResponse<unknown>;
};

/**
 * A function that fetches data from a given URL and returns a `NativeDataFetcherResponse`.
 * @param {string} url The URL to request (can include query string parameters).
 * @param {unknown} [data] Optional data to send with the request (e.g., for POST or PUT requests).
 * @returns {Promise<NativeDataFetcherResponse<T>>} A promise that resolves to a `NativeDataFetcherResponse<T>`,
 */
export type NativeDataFetcherFunction<T> = (
  url: string,
  data?: RequestInit
) => Promise<NativeDataFetcherResponse<T>>;

export type NativeDataFetcherConfig = NativeDataFetcherOptions & RequestInit;

export class NativeDataFetcher {
  private abortTimeout?: TimeoutPromise;

  constructor(protected config: NativeDataFetcherConfig = {}) {
    if (config.credentials === undefined) {
      config.credentials = 'include';
    }
  }

  /**
   * Implements a data fetcher.
   * @param {string} url The URL to request (may include query string)
   * @param {RequestInit} [options] Optional fetch options
   * @returns {Promise<NativeDataFetcherResponse<T>>} response
   */
  async fetch<T>(url: string, options: RequestInit = {}): Promise<NativeDataFetcherResponse<T>> {
    const { debugger: debugOverride, fetch: fetchOverride, ...init } = this.config;
    const startTimestamp = Date.now();
    const fetchImpl = fetchOverride || fetch;
    const debug = debugOverride || debuggers.http;
    // merge options from fetcher config and fetch call
    const requestInit = this.getRequestInit({ ...init, ...options });

    const fetchWithOptionalTimeout = [fetchImpl(url, requestInit)];
    if (init.timeout) {
      this.abortTimeout = new TimeoutPromise(init.timeout);
      fetchWithOptionalTimeout.push(this.abortTimeout.start as Promise<Response>);
    }

    // Note a goal here is to provide consistent debug logging and error handling
    // as we do in GraphQLRequestClient

    const { headers: reqHeaders, ...rest } = requestInit;

    debug('request: %o', { url, headers: this.extractDebugHeaders(reqHeaders), ...rest });
    const response = await Promise.race(fetchWithOptionalTimeout)
      .then((res) => {
        this.abortTimeout?.clear();
        return res;
      })
      .catch((error) => {
        this.abortTimeout?.clear();
        debug('request error: %o', error);
        console.error('Fetch failed with:', error.message, 'Stack:', error.stack);
        throw error;
      });

    // Note even an error status may send useful json data in response (which we want for logging)
    let respData: unknown = undefined;
    const isJson = response.headers.get('Content-Type')?.includes('application/json');
    if (isJson) {
      respData = await response.json().catch((error) => {
        debug('response.json() error: %o', error);
      });
    } else {
      // if not JSON, just read the response as text
      respData = await response.text().catch((error) => {
        debug('response.text() error: %o', error);
      });
    }

    const debugResponse = {
      status: response.status,
      statusText: response.statusText,
      headers: this.extractDebugHeaders(response.headers),
      url: response.url,
      redirected: response.redirected,
      data: respData,
    };

    if (!response.ok) {
      debug('response error: %o', debugResponse);
      const error: NativeDataFetcherError = {
        ...new Error(`HTTP ${response.status} ${response.statusText}`),
        response: {
          ...debugResponse,
          ...response,
        },
      };
      throw error;
    }

    debug('response in %dms: %o', Date.now() - startTimestamp, debugResponse);
    return {
      ...response,
      data: respData as T,
    };
  }

  /**
   * Perform a GET request
   * @param {string} url The URL to request (may include query string)
   * @param {RequestInit} [options] Fetch options
   * @returns {Promise<NativeDataFetcherResponse<T>>} response
   */
  async get<T>(url: string, options: RequestInit = {}): Promise<NativeDataFetcherResponse<T>> {
    return this.fetch(url, { method: 'GET', ...options });
  }

  /**
   * Perform a POST request
   * @param {string} url The URL to request (may include query string)
   * @param {unknown} body The data to send with the request
   * @param {RequestInit} [options] Fetch options
   * @returns {Promise<NativeDataFetcherResponse<T>>} response
   */
  async post<T>(
    url: string,
    body: unknown,
    options: RequestInit = {}
  ): Promise<NativeDataFetcherResponse<T>> {
    return this.fetch(url, { method: 'POST', body: JSON.stringify(body), ...options });
  }

  /**
   * Perform a DELETE request
   * @param {string} url The URL to request (may include query string)
   * @param {RequestInit} [options] Fetch options
   * @returns {Promise<NativeDataFetcherResponse<T>>} response
   */
  async delete<T>(url: string, options: RequestInit = {}): Promise<NativeDataFetcherResponse<T>> {
    return this.fetch(url, { method: 'DELETE', ...options });
  }

  /**
   * Perform a PUT request
   * @param {string} url The URL to request (may include query string)
   * @param {unknown} body The data to send with the request
   * @param {RequestInit} [options] Fetch options
   * @returns {Promise<NativeDataFetcherResponse<T>>} response
   */
  async put<T>(
    url: string,
    body: unknown,
    options: RequestInit = {}
  ): Promise<NativeDataFetcherResponse<T>> {
    return this.fetch(url, { method: 'PUT', body: JSON.stringify(body), ...options });
  }

  /**
   * Perform a HEAD request
   * @param {string} url The URL to request (may include query string)
   * @param {RequestInit} [options] Fetch options
   * @returns {Promise<NativeDataFetcherResponse<T>>} response
   */
  head<T>(url: string, options: RequestInit = {}): Promise<NativeDataFetcherResponse<T>> {
    return this.fetch(url, { method: 'HEAD', ...options });
  }

  /**
   * Determines settings for the request
   * @param {RequestInit} init Custom settings for request
   * @returns {RequestInit} The final request settings
   */
  protected getRequestInit(init: RequestInit = {}): RequestInit {
    const headers = new Headers(init.headers);

    if (!init.method) {
      init.method = init.body ? 'POST' : 'GET';
    }

    headers.set('Content-Type', 'application/json');
    init.headers = headers;

    return init;
  }

  /**
   * Safely extract all headers for debug logging
   * @param {HeadersInit} incomingHeaders Incoming headers
   * @returns Object with headers as key/value pairs
   */
  protected extractDebugHeaders(incomingHeaders: HeadersInit = {}) {
    const headers = {} as { [key: string]: string | string[] };

    if (typeof incomingHeaders?.forEach !== 'string' && incomingHeaders.forEach) {
      incomingHeaders?.forEach((value, key) => {
        headers[key] = value;
      });
    }

    return headers;
  }
}
