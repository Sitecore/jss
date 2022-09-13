import { Redirect } from 'next';
import {
  DictionaryPhrases,
  ComponentPropsCollection,
  LayoutServiceData,
} from '@sitecore-jss/sitecore-jss-nextjs';

/**
 * Nextjs app props
 */
export type NextAppProps = {
  locale: string;
  dictionary: DictionaryPhrases;
  layoutData: LayoutServiceData;
  componentProps: ComponentPropsCollection;
};

/**
 * Sitecore page props
 */
export type SitecorePageProps = NextAppProps & {
  notFound: boolean;
  redirect?: Redirect;
};
