import { NativeDataFetcher, NativeDataFetcherResponse } from '@sitecore-jss/sitecore-jss-nextjs';

/**
 * Implements a data fetcher using NativeDataFetcher - replace with your favorite
 * SSR-capable HTTP or fetch library if you like. See HttpDataFetcher<T> type
 * in sitecore-jss library for implementation details/notes.
 * @param {string} url The URL to request; may include query string
 * @param {RequestInit} data Optional data to POST with the request.
 */
export function dataFetcher<ResponseType>(
  url: string,
  data?: RequestInit
): Promise<NativeDataFetcherResponse<ResponseType>> {
  return new NativeDataFetcher().fetch<ResponseType>(url, data);
}
