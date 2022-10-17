import { ParsedUrlQuery } from 'querystring';
import { normalizePersonalizedRewrite } from '@sitecore-jss/sitecore-jss-nextjs';

/**
 * Extract normalized Sitecore item path from query
 * @param {ParsedUrlQuery | undefined} params
 */
export function extractPath(params: ParsedUrlQuery | undefined): string {
  if (params === undefined) {
    return '/';
  }
  let path = Array.isArray(params.path) ? params.path.join('/') : params.path ?? '/';

  // Ensure leading '/'
  if (!path.startsWith('/')) {
    path = '/' + path;
  }

  // Ensure personalized rewrite data is removed
  path = normalizePersonalizedRewrite(path);

  return path;
}
