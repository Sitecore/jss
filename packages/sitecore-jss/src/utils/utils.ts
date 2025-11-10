import isServer from './is-server';
import { ParsedUrlQueryInput } from 'querystring';
import { AxiosError } from 'axios';
import { ResponseError } from '../data-fetcher';

/**
 * note: encodeURIComponent is available via browser (window) or natively in node.js
 * if you use another js engine for server-side rendering you may not have native encodeURIComponent
 * and would then need to install a package for that functionality
 * @param {ParsedUrlQueryInput} params query string parameters
 * @returns {string} query string
 */
function getQueryString(params: ParsedUrlQueryInput) {
  return Object.keys(params)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(String(params[k]))}`)
    .join('&');
}

/**
 * Resolves a base URL that may contain query string parameters and an additional set of query
 * string parameters into a unified string representation.
 * @param {string} urlBase the base URL that may contain query string parameters
 * @param {ParsedUrlQueryInput} params query string parameters
 * @returns a URL string
 * @throws {RangeError} if the provided url is an empty string
 */
export function resolveUrl(urlBase: string, params: ParsedUrlQueryInput = {}): string {
  if (!urlBase) {
    throw new RangeError('url must be a non-empty string');
  }

  // This is a better way to work with URLs since it handles different user input
  // edge cases. This works in Node and all browser except IE11.
  // https://developer.mozilla.org/en-US/docs/Web/API/URL
  // TODO: Verify our browser support requirements.
  if (isServer()) {
    const url = new URL(urlBase);
    for (const key in params) {
      if ({}.hasOwnProperty.call(params, key)) {
        url.searchParams.append(key, String(params[key]));
      }
    }
    const result = url.toString();
    return result;
  }

  const qs = getQueryString(params);
  const result = urlBase.indexOf('?') !== -1 ? `${urlBase}&${qs}` : `${urlBase}?${qs}`;
  return result;
}

export const isAbsoluteUrl = (url: string) => {
  if (!url) {
    return false;
  }

  if (typeof url !== 'string') {
    throw new TypeError('Expected a string');
  }

  return /^[a-z][a-z0-9+.-]*:/.test(url);
};

/**
 * Indicates whether the error is a timeout error
 * @param {unknown} error error
 * @returns {boolean} is timeout error
 */
export const isTimeoutError = (error: unknown) => {
  return (
    (error as AxiosError).code === '408' ||
    (error as AxiosError).code === 'ECONNABORTED' ||
    (error as AxiosError).code === 'ETIMEDOUT' ||
    (error as ResponseError).response?.status === 408 ||
    (error as Error).name === 'AbortError'
  );
};

/**
 * Gets allowed origins from JSS_ALLOWED_ORIGINS env variable
 * @returns {string[]} list of allowed origins from JSS_ALLOWED_ORIGINS env variable
 */
export const getAllowedOriginsFromEnv = () =>
  process.env.JSS_ALLOWED_ORIGINS
    ? process.env.JSS_ALLOWED_ORIGINS.replace(' ', '').split(',')
    : [];

/**
 * Determines whether the given input is a regular expression or resembles a URL.
 * @param {string} input - The input string to evaluate.
 * @returns {'regex' | 'url'} - Returns 'url' if the input looks like a URL, otherwise 'regex'.
 */
export const isRegexOrUrl = (input: string): 'regex' | 'url' => {
  // Remove the trailing slash.
  input = input.slice(0, -1);

  // Check if the string resembles a URL.
  const isUrlLike = /^\/[a-zA-Z0-9\-\/]+(\?([a-zA-Z0-9\-_]+=[a-zA-Z0-9\-_]+)(&[a-zA-Z0-9\-_]+=[a-zA-Z0-9\-_]+)*)?$/.test(
    input
  );

  if (isUrlLike) {
    return 'url';
  }

  // If it doesn't resemble a URL, it's likely a regular expression.
  return 'regex';
};

/**
 * Compares two URLSearchParams objects to determine if they are equal.
 * @param {URLSearchParams} params1 - The first set of URL search parameters.
 * @param {URLSearchParams} params2 - The second set of URL search parameters.
 * @returns {boolean} - Returns true if the parameters are equal, otherwise false.
 */
export const areURLSearchParamsEqual = (
  params1: URLSearchParams,
  params2: URLSearchParams
): boolean => {
  // Generates a sorted string representation of URL search parameters.
  const getSortedParamsString = (params: URLSearchParams): string => {
    return [...params.entries()]
      .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
  };

  // Compare the sorted strings of both parameter sets.
  return getSortedParamsString(params1) === getSortedParamsString(params2);
};

/**
 * Escapes non-special "?" characters in a string or regex.
 * - For regular strings, it escapes all unescaped "?" characters by adding a backslash (`\`).
 * - For regex patterns (strings enclosed in `/.../`), it analyzes each "?" to determine if it has special meaning
 *   (e.g., `?` in `(abc)?`, `.*?`, `(?!...)`) or is just a literal character. Only literal "?" characters are escaped.
 * @param {string} input - The input string or regex pattern.
 * @returns {string} - The modified string or regex with non-special "?" characters escaped.
 */
export const escapeNonSpecialQuestionMarks = (input: string): string => {
  // If the input is already a regex pattern (starts with ^ or ends with $), return it unchanged
  if (input.startsWith('^') || input.endsWith('$')) {
    return input;
  }

  // For non-regex strings, escape literal "?" characters
  return input.replace(/\?/g, '\\?');
};

/**
 * Merges two URLSearchParams objects. If both objects contain the same key, the value from the second object overrides the first.
 * @param {URLSearchParams} params1 - The first set of URL search parameters.
 * @param {URLSearchParams} params2 - The second set of URL search parameters.
 * @returns {string} - A string representation of the merged URL search parameters.
 */
export const mergeURLSearchParams = (
  params1: URLSearchParams,
  params2: URLSearchParams
): string => {
  const merged = new URLSearchParams();

  // Add all keys and values from the first object.
  for (const [key, value] of params1.entries()) {
    merged.set(key, value);
  }

  // Add all keys and values from the second object, replacing existing ones.
  for (const [key, value] of params2.entries()) {
    merged.set(key, value);
  }

  return merged.toString();
};
