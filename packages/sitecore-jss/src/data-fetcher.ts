export interface HttpResponse<T> {
  /** HTTP status code of the response (i.e. 200, 404) */
  status: number;
  /** HTTP status text of the response (i.e. 'OK', 'Bad Request') */
  statusText: string;
  /** Response content */
  data: T;
}

/**
 * Interface for functions that fetch data asynchronously (i.e. from an API endpoint).
 * This interface conforms to Axios' public API, but is adaptable to other HTTP libraries and
 * fetch polyfills.
 * The interface implementation must:
 * - Support SSR
 * - Comply with the rules of REST by returning non-HTTP 200 status codes, not thrown exceptions (i.e. be a proper REST client)
 * - Send HTTP POST requests if `data` param is specified; GET is suggested but not required for data-less requests
 */
export type HttpDataFetcher<T> = (
  url: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: { [key: string]: any }
) => Promise<HttpResponse<T>>;
