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

/**
 * Static utility class for Sitecore CDP
 */
export class CdpHelper {
  /**
   * Gets the page variant id for CDP in the required format
   * @param {string} pageId the page id
   * @param {string} language the language
   * @param {string} variantId the variant id
   * @returns {string} the formatted page variant id
   */
  static getPageVariantId(pageId: string, language: string, variantId: string): string {
    const formattedPageId = pageId.replace(/[{}-]/g, '');
    const formattedLanguage = language.replace('-', '_');
    let formattedVariantId = variantId;
    if (!variantId || variantId === DEFAULT_VARIANT) {
      formattedVariantId = 'default';
    }
    return `${formattedPageId}_${formattedLanguage}_${formattedVariantId}`.toLowerCase();
  }

  /**
   * Gets the content id for CDP in the required format `embedded_<id>_<lang>`
   * @param {string} pageId the page id
   * @param {string} language the language
   * @returns {string} the content id
   */
  static getContentId(pageId: string, language: string): string {
    const formattedPageId = pageId.replace(/[{}-]/g, '');
    const formattedLanguage = language.replace('-', '_');
    return `embedded_${formattedPageId}_${formattedLanguage}`.toLowerCase();
  }
}
