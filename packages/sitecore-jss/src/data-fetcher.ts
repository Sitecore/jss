import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios';

export type AxiosDataFetcherHandlers = {
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
};

export type AxiosDataFetcherConfig = AxiosRequestConfig & AxiosDataFetcherHandlers;

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
    if (onReq) {
      this.instance.interceptors.request.use(onReq, onReqError);
    }
    if (onRes) {
      this.instance.interceptors.response.use(onRes, onResError);
    }
  }

  /**
   * Implements a data fetcher. @see HttpJsonFetcher<T> type for implementation details/notes.
   * @param {string} url The URL to request; may include query string
   * @param {any} [data] Optional data to POST with the request.
   * @returns {Promise<AxiosResponse>} response
   */
  fetch(url: string, data?: unknown): Promise<AxiosResponse> {
    return this.instance.request({
      url,
      method: data ? 'POST' : 'GET',
      data,
    });
  }

  /**
   * Perform a GET request
   * @param {string} url The URL to request; may include query string
   * @returns {Promise<AxiosResponse>} response
   */
  get(url: string): Promise<AxiosResponse> {
    return this.instance.get(url);
  }

  /**
   * Perform a HEAD request
   * @param {string} url The URL to request; may include query string
   * @returns {Promise<AxiosResponse>} response
   */
  head(url: string): Promise<AxiosResponse> {
    return this.instance.head(url);
  }

  /**
   * Perform a POST request
   * @param {string} url The URL to request; may include query string
   * @param {any} [data] Data to POST with the request.
   * @returns {Promise<AxiosResponse>} response
   */
  post(url: string, data?: unknown): Promise<AxiosResponse> {
    return this.instance.post(url, data);
  }

  /**
   * Perform a PUT request
   * @param {string} url The URL to request; may include query string
   * @param {any} [data] Data to PUT with the request.
   * @returns {Promise<AxiosResponse>} response
   */
  put(url: string, data?: unknown): Promise<AxiosResponse> {
    return this.instance.put(url, data);
  }

  /**
   * Perform a DELETE request
   * @param {string} url The URL to request; may include query string
   * @returns {Promise<AxiosResponse>} response
   */
  delete(url: string): Promise<AxiosResponse> {
    return this.instance.delete(url);
  }
}
