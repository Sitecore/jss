import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';

export class AxiosDataFetcher {
  instance: AxiosInstance;
  
  constructor(config?: AxiosRequestConfig) {
    this.instance = axios.create(config);
  }

  /**
   * Implements a data fetcher. See HttpJsonFetcher<T> type
   * in sitecore-jss library for implementation details/notes.
   * @param {string} url The URL to request; may include query string
   * @param {any} data Optional data to POST with the request.
   */
  fetch(url: string, data?: any) {
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

/**
 * Implements a data fetcher using Axios - replace with your favorite
 * SSR-capable HTTP or fetch library if you like. See HttpJsonFetcher<T> type
 * in sitecore-jss library for implementation details/notes.
 * @param {string} url The URL to request; may include query string
 * @param {any} data Optional data to POST with the request.
 */
export function dataFetcher(url: string, data?: any) {
  return new AxiosDataFetcher().fetch(url, data);
}
