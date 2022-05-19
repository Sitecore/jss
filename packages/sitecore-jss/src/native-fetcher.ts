import { DataFetcher, HttpResponse } from './data-fetcher';
import debuggers, { Debugger } from './debug';

type NativeDataFetcherOptions = {
  /**
   * Override debugger for logging. Uses 'sitecore-jss:http' by default.
   */
  debugger?: Debugger;
  /**
   * Override fetch method. Uses native (or polyfilled) fetch by default.
   */
  fetch?: typeof fetch;
};

export type NativeDataFetcherConfig = NativeDataFetcherOptions & RequestInit;

export class NativeDataFetcher implements DataFetcher {
  constructor(protected config: NativeDataFetcherConfig) {}

  /**
   * Implements a data fetcher. @see HttpDataFetcher<T> type for implementation details/notes.
   * @param {string} url The URL to request; may include query string
   * @param {unknown} [data] Optional data to POST with the request.
   * @returns {Promise<HttpResponse<T>>} response
   */
  async fetch<T>(url: string, data?: unknown): Promise<HttpResponse<T>> {
    const { debugger: debugOverride, fetch: fetchOverride, ...requestInit } = this.config;

    // This is a focused implementation (GET or POST only using JSON input/output)
    // so we are opinionated about method, body, and Content-Type
    requestInit.method = data ? 'POST' : 'GET';
    requestInit.body = data ? JSON.stringify(data) : undefined;
    const headers = new Headers(requestInit.headers);
    headers.set('Content-Type', 'application/json');
    requestInit.headers = headers;

    const fetchImpl = fetchOverride || fetch;
    const debug = debugOverride || debuggers.http;

    // Note a goal here is to provide consistent debug logging and error handling
    // as we do in AxiosDataFetcher and GraphQLRequestClient
    debug('request: %o', { url, ...requestInit });
    const response = await fetchImpl(url, requestInit).catch((error) => {
      debug('request error: %o', error);
      throw error;
    });

    const isJson = response.headers.get('Content-Type')?.includes('application/json');
    const respData = isJson ? await response.json() : null;
    const debugResponse = {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      url: response.url,
      redirected: response.redirected,
      data: respData,
    };

    if (!response.ok) {
      debug('response error: %o', debugResponse);
      throw new Error(`HTTP ${response.status} ${response.statusText}`);
    }
    debug('response: %o', debugResponse);
    return {
      ...response,
      data: respData as T,
    };
  }
}
