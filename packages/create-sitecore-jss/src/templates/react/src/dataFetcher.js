import { NativeDataFetcher } from '@sitecore-jss/sitecore-jss-react';

/**
 * Implements a data fetcher using NativeDataFetcher - replace with your favorite
 * SSR-capable HTTP or fetch library if you like. See HttpDataFetcher<T> type
 * in sitecore-jss library for implementation details/notes.
 * @param {string} url The URL to request; may include query string
 * @param {any} data Optional data to POST with the request.
 */
export async function dataFetcher(url, data) {
  const fetcher = new NativeDataFetcher({ credentials: 'include' });

  const response = await fetcher.fetch(url, {
    method: data ? 'POST' : 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    body: data ? JSON.stringify(data) : undefined,
  });

  return response.data;
}
