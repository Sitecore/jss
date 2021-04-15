export const isServer = (): boolean => !(typeof window !== 'undefined' && window.document);

export const isExperienceEditorActive = (): boolean => {
  if (isServer()) {
    return false;
  }
  // eslint-disable-next-line
  const sc = (window as any).Sitecore;
  return Boolean(sc && sc.PageModes && sc.PageModes.ChromeManager);
};

export const resetExperienceEditorChromes = (): void => {
  if (isExperienceEditorActive()) {
    // eslint-disable-next-line
    (window as any).Sitecore.PageModes.ChromeManager.resetChromes();
  }
};

/**
 * note: encodeURIComponent is available via browser (window) or natively in node.js
 * if you use another js engine for server-side rendering you may not have native encodeURIComponent
 * and would then need to install a package for that functionality
 * @param {Object} params
 */
function getQueryString(params: { [key: string]: string | number | boolean }) {
  return Object.keys(params)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k] as string)}`)
    .join('&');
}

/**
 * Resolves a base URL that may contain query string parameters and an additional set of query
 * string parameters into a unified string representation.
 * @param {string} urlBase the base URL that may contain query string parameters
 * @param {Object} params query string parameters
 * @returns a URL string
 * @throws {RangeError} if the provided url is an empty string
 */
function resolve(
  urlBase: string,
  params: { [key: string]: string | number | boolean } = {}
): string {
  if (!urlBase) {
    throw new RangeError('url must be a non-empty string');
  }

  // This is a better way to work with URLs since it will handle different user
  // input edge cases. This works in all browser except IE11. Need to check on our
  // support requirements.
  /*
  const url = new URL(urlBase);
  for (const key in params) {
    if ({}.hasOwnProperty.call(params, key)) {
      url.searchParams.append(key, String(params[key]));
    }
  }

  return url.toString();
  */

  const qs = getQueryString(params);
  return urlBase.indexOf('?') !== -1 ? `${urlBase}&${qs}` : `${urlBase}?${qs}`;
}

export const urlUtil = {
  resolve,
};
