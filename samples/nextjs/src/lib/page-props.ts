import {
  DictionaryPhrases,
  LayoutServiceData,
  ComponentPropsCollection,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { StyleguideSitecoreContextValue } from './component-props';

/**
 * Sitecore page props
 */
export type SitecorePageProps = {
  locale: string;
  layoutData: LayoutServiceData | null;
  dictionary: DictionaryPhrases;
  componentProps: ComponentPropsCollection;
  notFound: boolean;
  sitecoreContext: StyleguideSitecoreContextValue | null;
};
