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

};

/**
 * Sitecore page props
 */
export type SitecorePageProps = NextAppProps & {
  locale: string;
  dictionary: DictionaryPhrases;
  componentProps: ComponentPropsCollection;
  notFound: boolean;
  layoutData: LayoutServiceData;
  redirect?: Redirect;
};
