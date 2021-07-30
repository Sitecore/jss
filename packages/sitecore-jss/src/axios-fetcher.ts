import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import debuggers, { Debugger } from './debug';

type AxiosDataFetcherOptions = {
  /**
   * Callback which executed before request is sent. You can modify axios config.
   * {@link https://github.com/axios/axios#interceptors}
   * @param {AxiosRequestConfig} config axios config
   */
  onReq?: (config: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>;
  /**
   * Callback which invoked when request error happened.
   * {@link https://github.com/axios/axios#interceptors}
   * @param {unknown} error
   */
  onReqError?: (error: unknown) => unknown;
  /**
   * Callback which invoked when got response from server.
   * {@link https://github.com/axios/axios#interceptors}
   * @param {AxiosResponse} serverRes server response
   */
  onRes?: (serverRes: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>;
  /**
   * Callback which invoked when status codes fallen outside the range of 2xx.
   * {@link https://github.com/axios/axios#interceptors}
   * @param {unknown} error
   */
  onResError?: (error: unknown) => unknown;
  /**
   * Override debugger for logging. Uses 'sitecore-jss:http' by default.
   */
  debugger?: Debugger;
};

export type AxiosDataFetcherConfig = AxiosRequestConfig & AxiosDataFetcherOptions;

/**
 * Determines whether error is AxiosError
 * @param {unknown} error
 */
const isAxiosError = (error: unknown): error is AxiosError => {
  return (error as AxiosError).isAxiosError !== undefined;
};

export class AxiosDataFetcher {
  private instance: AxiosInstance;

  /**
   * @param {AxiosDataFetcherConfig} dataFetcherConfig Axios data fetcher configuration.
   * Note `withCredentials` is set to `true` by default in order for Sitecore cookies to
   * be included in CORS requests (which is necessary for analytics and such).
   */
  constructor(dataFetcherConfig: AxiosDataFetcherConfig = {}) {
    const { onReq, onRes, onReqError, onResError, ...axiosConfig } = dataFetcherConfig;
    if (axiosConfig.withCredentials === undefined) {
      axiosConfig.withCredentials = true;
    }
    this.instance = axios.create(axiosConfig);

    const debug = dataFetcherConfig.debugger || debuggers.http;

    // Note Axios response interceptors are applied in registered order;
    // however, request interceptors are REVERSED (https://github.com/axios/axios/issues/1663).
    // Hence, we're adding our request debug logging first (since we want that performed after any onReq)
    // and our response debug logging second (since we want that performed after any onRes).
    if (debug.enabled) {
      this.instance.interceptors.request.use(
        (config: AxiosRequestConfig) => {
          debug('request: %o', config);
          return config;
        },
        (error: unknown) => {
          debug('request error: %o', isAxiosError(error) ? (error as AxiosError).toJSON() : error);
          return Promise.reject(error);
        }
      );
    }
    if (onReq) {
      this.instance.interceptors.request.use(onReq, onReqError);
    }
    if (onRes) {
      this.instance.interceptors.response.use(onRes, onResError);
    }
    if (debug.enabled) {
      this.instance.interceptors.response.use(
        (response: AxiosResponse) => {
          // Note we're removing redundant properties (already part of request log above) to trim down log entry
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { request, config, ...rest } = response;
          debug('response: %o', rest);
          return response;
        },
        (error: unknown) => {
          debug('response error: %o', isAxiosError(error) ? (error as AxiosError).toJSON() : error);
          return Promise.reject(error);
        }
      );
    }
  }

  /**
   * Implements a data fetcher. @see HttpDataFetcher<T> type for implementation details/notes.
   * @param {string} url The URL to request; may include query string
   * @param {any} [data] Optional data to POST with the request.
   * @returns {Promise<AxiosResponse<T>>} response
   */
  fetch<T>(url: string, data?: unknown): Promise<AxiosResponse<T>> {
    return this.instance.request({
      url,
      method: data ? 'POST' : 'GET',
      data,
    });
  }

  /**
   * Perform a GET request
   * @param {string} url The URL to request; may include query string
   * @param {AxiosRequestConfig} [config] Axios config
   * @returns {Promise<AxiosResponse<T>>} response
   */
  get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.get(url, config);
  }

  /**
   * Perform a HEAD request
   * @param {string} url The URL to request; may include query string
   * @param {AxiosRequestConfig} [config] Axios config
   * @returns {Promise<AxiosResponse>} response
   */
  head(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.instance.head(url, config);
  }

  /**
   * Perform a POST request
   * @param {string} url The URL to request; may include query string
   * @param {any} [data] Data to POST with the request.
   * @param {AxiosRequestConfig} [config] Axios config
   * @returns {Promise<AxiosResponse>} response
   */
  post(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.instance.post(url, data, config);
  }

  /**
   * Perform a PUT request
   * @param {string} url The URL to request; may include query string
   * @param {any} [data] Data to PUT with the request.
   * @param {AxiosRequestConfig} [config] Axios config
   * @returns {Promise<AxiosResponse>} response
   */
  put(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.instance.put(url, data, config);
  }

  /**
   * Perform a DELETE request
   * @param {string} url The URL to request; may include query string
   * @param {AxiosRequestConfig} [config] Axios config
   * @returns {Promise<AxiosResponse>} response
   */
  delete(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.instance.delete(url, config);
  }
}
