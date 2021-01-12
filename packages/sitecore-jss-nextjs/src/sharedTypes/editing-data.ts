import { LayoutServiceData, DictionaryPhrases } from '@sitecore-jss/sitecore-jss';

/**
 * Data sent from Experience Editor
 */
export type EditingData = {
  path: string;
  language: string;
  layoutData: LayoutServiceData;
  dictionary: DictionaryPhrases;
};

/**
 * Data for Next.js Preview (Editing) mode
 */
export interface EditingPreviewData {
  key: string;
}
