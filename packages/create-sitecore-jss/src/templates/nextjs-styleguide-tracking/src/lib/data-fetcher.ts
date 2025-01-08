import { NativeDataFetcher } from '@sitecore-jss/sitecore-jss-nextjs';

/**
 * Implements a data fetcher using NativeDataFetcher - replace with your favorite
 * SSR-capable HTTP or fetch library if you like. See HttpDataFetcher<T> type
 * in sitecore-jss library for implementation details/notes.
 * @param {string} url The URL to request; may include query string
 * @param {unknown} data Optional data to POST with the request.
 */
export async function dataFetcher<ResponseType>(
  url: string,
  data?: unknown
): Promise<{ status: number; statusText: string; data: ResponseType }> {
  const fetcher = new NativeDataFetcher();
  if (data) {
    const response = await fetcher.post<ResponseType>(url, data);
    return response;
  } else {
    const response = await fetcher.get<ResponseType>(url);
    return response;
  }
}
