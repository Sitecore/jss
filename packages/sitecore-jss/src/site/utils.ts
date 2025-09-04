export const SITE_PREFIX = '_site_';

export type SiteRewriteData = {
  siteName: string;
};

/**
 * Get a site rewrite path for given pathname
 * @param {string} pathname the pathname
 * @param {SiteRewriteData} data the site data to include in the rewrite
 * @returns {string} the rewrite path
 */
export function getSiteRewrite(pathname: string, data: SiteRewriteData): string {
  const path = pathname.startsWith('/') ? pathname : '/' + pathname;

  return `/${SITE_PREFIX}${data.siteName}${path}`;
}

/**
 * Get site data from the rewrite path
 * @param {string} pathname the pathname
 * @param {string} defaultSiteName the default site name
 * @returns {SiteRewriteData} the site data from the rewrite
 */
export function getSiteRewriteData(pathname: string, defaultSiteName: string): SiteRewriteData {
  const data: SiteRewriteData = {
    siteName: defaultSiteName,
  };

  const path = pathname.endsWith('/') ? pathname : pathname + '/';
  const result = path.match(`${SITE_PREFIX}(.*?)\\/`);

  if (result && result[1] !== '') {
    data.siteName = result[1];
  }

  return data;
}

/**
 * Normalize a site rewrite path (remove site data)
 * @param {string} pathname the pathname
 * @returns {string} the pathname with site data removed
 */
export function normalizeSiteRewrite(pathname: string): string {
  const result = pathname.match(`${SITE_PREFIX}.*?(?:\\/|$)`);

  return result === null ? pathname : pathname.replace(result[0], '');
}
