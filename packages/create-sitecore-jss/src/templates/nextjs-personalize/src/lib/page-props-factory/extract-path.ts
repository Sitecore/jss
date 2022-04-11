import { ParsedUrlQuery } from 'querystring';

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

  // Remove SegmentId part from path, otherwise layout service will not find layout data
  if (path.includes('_segmentId_')) {
    const result = path.match('_segmentId_.*?\\/');
    path = result === null ? '/' : path.replace(result[0], '');
  }

  return path;
}
