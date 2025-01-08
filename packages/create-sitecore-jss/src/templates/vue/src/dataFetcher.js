import { NativeDataFetcher } from '@sitecore-jss/sitecore-jss';

/**
 * Implements a data fetcher using NativeDataFetcher - replace with your favorite
 * SSR-capable HTTP or fetch library if you like.
 * @param {string} url The URL to request; may include query string
 * @param {any} data Optional data to POST with the request.
 */
export async function dataFetcher(url, data) {
  const fetcher = new NativeDataFetcher({ credentials: 'include' });

  try {
    if (data) {
      const response = await fetcher.post(url, data);
      return response.data;
    } else {
      const response = await fetcher.get(url);
      return response.data;
    }
  } catch (error) {
    console.error('Data fetching error:', error);
    throw error;
  }
}
