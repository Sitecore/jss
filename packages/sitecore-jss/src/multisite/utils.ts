export const SITE_PREFIX = '_site_';

export type MultisiteRewriteData = {
  siteName: string;
};

/**
 * Get a multisite rewrite path for given pathname
 * @param {string} pathname the pathname
 * @param {MultisiteRewriteData} data the multisite data to include in the rewrite
 * @returns {string} the rewrite path
 */
export function getMultisiteRewrite(pathname: string, data: MultisiteRewriteData): string {
  const path = pathname.startsWith('/') ? pathname : '/' + pathname;
  return `/${SITE_PREFIX}${data.siteName}${path}`;
}

/**
 * Get personalize data from the rewrite path
 * @param {string} pathname the pathname
 * @returns {MultisiteRewriteData} the personalize data from the rewrite
 */
export function getMultisiteRewriteData(pathname: string): MultisiteRewriteData {
  const data: MultisiteRewriteData = {
    siteName: '',
  };
  const path = pathname.endsWith('/') ? pathname : pathname + '/';
  const result = path.match(`${SITE_PREFIX}(.*?)\\/`);
  if (result) {
    data.siteName = result[1];
  }
  return data;
}
