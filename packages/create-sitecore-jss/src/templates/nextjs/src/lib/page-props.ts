import {
  DictionaryPhrases,
  ComponentPropsCollection,
  LayoutServiceData,
} from '@sitecore-jss/sitecore-jss-nextjs';

/**
 * Sitecore page props
 */
export type SitecorePageProps = {
  locale: string;
  dictionary: DictionaryPhrases;
  componentProps: ComponentPropsCollection;
  notFound: boolean;
  layoutData: LayoutServiceData;
};
