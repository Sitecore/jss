import { resolveUrl } from './utils/utils';
import { ParsedUrlQueryInput } from 'querystring';

/**
 * Response data for an HTTP request sent to an API
 * @template T the type of data model requested
 */
export interface HttpResponse<T> {
  /** HTTP status code of the response (i.e. 200, 404) */
  status: number;
  /** HTTP status text of the response (i.e. 'OK', 'Bad Request') */
  statusText: string;
  /** Response content */
  data: T;
}

/**
 * Describes functions that fetch data asynchronously (i.e. from an API endpoint).
 * This interface conforms to Axios' public API, but is adaptable to other HTTP libraries and
 * fetch polyfills.
 * The interface implementation must:
 * - Support SSR
 * - Comply with the rules of REST by returning appropriate response status codes when there is an error instead of throwing exceptions.
 * - Send HTTP POST requests if `data` param is specified; GET is suggested but not required for data-less requests
 */
export type HttpDataFetcher<T> = (url: string, data?: unknown) => Promise<HttpResponse<T>>;

export class ResponseError extends Error {
  response: HttpResponse<unknown>;

  constructor(message: string, response: HttpResponse<unknown>) {
    super(message);

    Object.setPrototypeOf(this, ResponseError.prototype);
    this.response = response;
  }
}

/**
 * @param {HttpResponse<T>} response the response to check
 * @throws {ResponseError} if response code is not ok
 */
export function checkStatus<T>(response: HttpResponse<T>) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new ResponseError(response.statusText, response);
  throw error;
}

/**
 * @param {string} url the URL to request; may include query string
 * @param {HttpDataFetcher} fetcher the fetcher to use to perform the request
 * @param {ParsedUrlQueryInput} params the query string parameters to send with the request
 */
export function fetchData<T>(
  url: string,
  fetcher: HttpDataFetcher<T>,
  params: ParsedUrlQueryInput = {}
) {
  return fetcher(resolveUrl(url, params))
    .then(checkStatus)
    .then((response) => {
      // axios auto-parses JSON responses, don't need to JSON.parse
      return response.data;
    });
}
