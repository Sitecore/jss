import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios';

export class AxiosDataFetcher {
  instance: AxiosInstance;

  constructor(config?: AxiosRequestConfig) {
    this.instance = axios.create(config);
  }

  /**
   * Implements a data fetcher. @see HttpJsonFetcher<T> type for implementation details/notes.
   * @param {string} url The URL to request; may include query string
   * @param {any} data Optional data to POST with the request.
   */
  fetch(url: string, data?: unknown): Promise<AxiosResponse> {
    return this.instance.request({
      url,
      method: data ? 'POST' : 'GET',
      data,
      // note: axios needs to use `withCredentials: true` in order for Sitecore cookies to be included in CORS requests
      // which is necessary for analytics and such
      withCredentials: true,
    });
  }
}
