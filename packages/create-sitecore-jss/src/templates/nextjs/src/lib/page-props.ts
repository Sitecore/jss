import { Redirect } from 'next';
import {
  DictionaryPhrases,
  ComponentPropsCollection,
  LayoutServiceData,
} from '@sitecore-jss/sitecore-jss-nextjs';

/**
 * Sitecore page props
 */
export type SitecorePageProps = {
  notFound: boolean;
  redirect?: Redirect;
  locale: string;
  dictionary: DictionaryPhrases;
  layoutData: LayoutServiceData;
  componentProps: ComponentPropsCollection;
};
