import { LayoutServiceData } from '@sitecore-jss/sitecore-jss/layout';
import { DictionaryPhrases } from '@sitecore-jss/sitecore-jss/i18n';

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
 * @param {EditingData} data
 */
export function isEditingData(data: EditingData | unknown): data is EditingData {
  return (
    (data as EditingData).path !== undefined &&
    (data as EditingData).language !== undefined &&
    (data as EditingData).layoutData !== undefined &&
    (data as EditingData).dictionary !== undefined
  );
}

/**
 * Data for Next.js Preview (Editing) mode
 */
export interface EditingPreviewData {
  key: string;
  serverUrl: string;
}
