import { DictionaryPhrases, LayoutServiceData } from '@sitecore-jss/sitecore-jss-nextjs';
import { ParsedUrlQuery } from 'querystring';
import { ComponentProps } from './component-props';

export type SitecorePageProps = {
  locale: string;
  layoutData: LayoutServiceData | null;
  dictionary: DictionaryPhrases | null;
  componentProps: ComponentProps;
};

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
};
