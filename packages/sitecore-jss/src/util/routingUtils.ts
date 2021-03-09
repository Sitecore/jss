/**
 * Formats an object of key/value pairs into a URL query string.
 * Note: this function uses the function `encodeURIComponent`, which is available on the global
 * scope object in browsers and in Node.js. If you use a different JS engine for server-side
 * rendering, ensure that `encodeURIComponent` is defined.
 * @param {Object} params
 * @returns the query string
 */
export function getQueryString(params: { [key: string]: string | number | boolean }): string {
  return Object.keys(params)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join('&');
};