export const DEFAULT_VARIANT = '_default';
export const VARIANT_PREFIX = '_variantId_';

export type PersonalizedRewriteData = {
  variantId: string;
};

/**
 * Get a personalized rewrite path for given pathname
 * @param {string} pathname the pathname
 * @param {PersonalizedRewriteData} data the personalize data to include in the rewrite
 * @returns {string} the rewrite path
 */
export function getPersonalizedRewrite(pathname: string, data: PersonalizedRewriteData): string {
  const path = pathname.startsWith('/') ? pathname : '/' + pathname;
  return `/${VARIANT_PREFIX}${data.variantId}${path}`;
}

/**
 * Get personalize data from the rewrite path
 * @param {string} pathname the pathname
 * @returns {PersonalizedRewriteData} the personalize data from the rewrite
 */
export function getPersonalizedRewriteData(pathname: string): PersonalizedRewriteData {
  const data: PersonalizedRewriteData = {
    variantId: DEFAULT_VARIANT,
  };
  const path = pathname.endsWith('/') ? pathname : pathname + '/';
  const result = path.match(`${VARIANT_PREFIX}(.*?)\\/`);
  if (result) {
    data.variantId = result[1];
  }
  return data;
}

/**
 * Normalize a personalized rewrite path (remove personalize data)
 * @param {string} pathname the pathname
 * @returns {string} the pathname with personalize data removed
 */
export function normalizePersonalizedRewrite(pathname: string): string {
  if (!pathname.includes(VARIANT_PREFIX)) {
    return pathname;
  }
  const result = pathname.match(`${VARIANT_PREFIX}.*?(?:\\/|$)`);
  return result === null ? pathname : pathname.replace(result[0], '');
}
