import { LayoutServiceData } from '@sitecore-jss/sitecore-jss-nextjs';
import { ParsedUrlQuery } from 'querystring';

export interface SitecorePageProps {
    locale: string,
    layoutData: LayoutServiceData | null,
    dictionary: object | null
}

export const extractPath = (params: ParsedUrlQuery | undefined): string => {
  if (params === undefined) {
    return '/';
  }
  let path = Array.isArray(params.path) ? params.path.join('/') : params.path ?? '/';

  // Ensure leading '/'
  if (!path.startsWith('/')) {
    path = '/' + path;
  }

  return path;
}