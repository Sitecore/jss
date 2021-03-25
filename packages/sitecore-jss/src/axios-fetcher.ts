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
