export const DEFAULT_VARIANT = '_default';
export const VARIANT_PREFIX = '_variantId_';

export type PersonalizedRewriteData = {
  variantId: string;
  componentVariantIds?: string[];
};

/**
 * Get a personalized rewrite path for given pathname
 * @param {string} pathname the pathname
 * @param {string[]} variantIds the variantIds to include in the rewrite
 * @returns {string} the rewrite path
 */
export function getPersonalizedRewrite(pathname: string, variantIds: string[]): string {
  const path = pathname.startsWith('/') ? pathname : '/' + pathname;
  return `${variantIds.map((variantId) => `/${VARIANT_PREFIX}${variantId}`).join('')}${path}`;
}

/**
 * Get personalize data from the rewrite path
 * @param {string} pathname the pathname
 * @returns {PersonalizedRewriteData} the personalize data from the rewrite
 */
export function getPersonalizedRewriteData(pathname: string): PersonalizedRewriteData {
  const segments = pathname.split('/');
  const variantIds: string[] = [];
  segments.forEach((segment) => {
    const result = segment.match(`${VARIANT_PREFIX}(.*$)`);
    if (result) {
      variantIds.push(result[1]);
    }
  });

  return getGroomedVariantIds(variantIds);
}

/**
 * Parses a list of variantIds and divides into layout and component variants
 * @param {string[]} variantIds the list of variant IDs for a page
 * @returns {PersonalizedRewriteData} object with variant IDs sorted
 */
export function getGroomedVariantIds(variantIds: string[]) {
  const data: PersonalizedRewriteData = {
    variantId: DEFAULT_VARIANT,
    componentVariantIds: [],
  };

  variantIds.forEach((variantId) => {
    if (variantId.includes('_')) {
      // Component-level personalization in format "<ComponentID>_<VariantID>"
      // There can be multiple
      data.componentVariantIds?.push(variantId);
    } else {
      // Embedded (page-level) personalization in format "<VariantID>"
      // There should be only one
      data.variantId = variantId;
    }
  });

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
  let segments = pathname.split('/');
  segments = segments.filter((segment) => !segment.includes(VARIANT_PREFIX));
  const result = segments.join('/');
  // return root path if all segments were personalize data
  return result ? result : '/';
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
   * @param {string} [scope] the scope value
   * @returns {string} the formatted page variant id
   */
  static getPageVariantId(
    pageId: string,
    language: string,
    variantId: string,
    scope?: string
  ): string {
    const formattedPageId = pageId.replace(/[{}-]/g, '');
    const formattedLanguage = language.replace('-', '_');
    const scopeId = scope ? `${this.normalizeScope(scope)}_` : '';
    let formattedVariantId = variantId;
    if (!variantId || variantId === DEFAULT_VARIANT) {
      formattedVariantId = 'default';
    }
    return `${scopeId}${formattedPageId}_${formattedLanguage}_${formattedVariantId}`.toLowerCase();
  }

  /**
   * Gets the friendly id for (page-level) Embedded Personalization in the required format `embedded_[<scope>_]<id>_<lang>`
   * @param {string} pageId the page id
   * @param {string} language the language
   * @param {string} [scope] the scope value
   * @returns {string} the content id
   */
  static getPageFriendlyId(pageId: string, language: string, scope?: string): string {
    const formattedPageId = pageId.replace(/[{}-]/g, '');
    const formattedLanguage = language.replace('-', '_');
    const scopeId = scope ? `${this.normalizeScope(scope)}_` : '';
    return `embedded_${scopeId}${formattedPageId}_${formattedLanguage}`.toLowerCase();
  }

  /**
   * Gets the friendly id for Component A/B Testing in the required format `component_[<scope>_]<pageId>_<componentId>_<language>*`
   * @param {string} pageId the page id
   * @param {string} componentId the component id
   * @param {string} language the language
   * @param {string} [scope] the scope value
   * @returns {string} the friendly id
   */
  static getComponentFriendlyId(
    pageId: string,
    componentId: string,
    language: string,
    scope?: string
  ): string {
    const formattedPageId = pageId.replace(/[{}-]/g, '');
    const formattedComponentId = componentId.replace(/[{}-]/g, '');
    const formattedLanguage = language.replace('-', '_');
    const scopeId = scope ? `${this.normalizeScope(scope)}_` : '';
    return `component_${scopeId}${formattedPageId}_${formattedComponentId}_${formattedLanguage}*`.toLowerCase();
  }

  /**
   * Normalizes the scope from the given string value
   * Removes all non-alphanumeric characters
   * @param {string} [scope] the scope value
   * @returns {string} normalized scope value
   */
  static normalizeScope(scope?: string): string {
    return scope?.replace(/[^a-zA-Z0-9]+/g, '') || '';
  }
}
