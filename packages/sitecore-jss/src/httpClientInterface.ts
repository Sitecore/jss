export interface HttpResponse<T> {
  /** HTTP status code, i.e. 200, 404 */
  status: number;
  /** HTTP status text i.e. 'OK', 'Bad Request' */
  statusText: string;
  /** Parsed JSON response data from server */
  data?: T;
}

/**
 * Interface to a HTTP fetcher that you want to use.
 * This interface conforms to Axios' public API, but should be adaptable
 * to other HTTP libraries or fetch polyfills. This HTTP implementation must:
 * - Support SSR
 * - Return non-HTTP 200 responses as status codes, not thrown exceptions (i.e. be a proper REST client)
 * - Parse response values as JSON and return them into <T>
 * - Send HTTP POST requests if `data` param is specified; GET is suggested but not required for data-less requests
 */
export type HttpJsonFetcher<T> = (url: string, data?: { [key: string]: any }) => Promise<HttpResponse<T>>;
