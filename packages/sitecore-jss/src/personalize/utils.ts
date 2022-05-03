export const DEFAULT_SEGMENT = '_default';
export const SEGMENT_PREFIX = '_segmentId_';

export type PersonalizedRewriteData = {
  segmentId: string;
};

/**
 * Get a personalized rewrite path for given pathname
 * @param {string} pathname the pathname
 * @param {PersonalizedRewriteData} data the personalize data to include in the rewrite
 * @returns {string} the rewrite path
 */
export function getPersonalizedRewrite(pathname: string, data: PersonalizedRewriteData): string {
  const path = pathname.startsWith('/') ? pathname : '/' + pathname;
  return `/${SEGMENT_PREFIX}${data.segmentId}${path}`;
}

/**
 * Get personalize data from the rewrite path
 * @param {string} pathname the pathname
 * @returns {PersonalizedRewriteData} the personalize data from the rewrite
 */
export function getPersonalizedRewriteData(pathname: string): PersonalizedRewriteData {
  const data: PersonalizedRewriteData = {
    segmentId: DEFAULT_SEGMENT,
  };
  const path = pathname.endsWith('/') ? pathname : pathname + '/';
  const result = path.match(`${SEGMENT_PREFIX}(.*?)\\/`);
  if (result) {
    data.segmentId = result[1];
  }
  return data;
}

/**
 * Normalize a personalized rewrite path (remove personalize data)
 * @param {string} pathname the pathname
 * @returns {string} the pathname with personalize data removed
 */
export function normalizePersonalizedRewrite(pathname: string): string {
  if (!pathname.includes(SEGMENT_PREFIX)) {
    return pathname;
  }
  const result = pathname.match(`${SEGMENT_PREFIX}.*?(?:\\/|$)`);
  return result === null ? pathname : pathname.replace(result[0], '');
}
