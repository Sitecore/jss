import { LayoutServiceData, DictionaryPhrases } from '@sitecore-jss/sitecore-jss';
import { IncomingMessage } from 'http';

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
 * Request with payload data from Experience Editor POST
 */
export interface EditingRequest extends IncomingMessage {
  editingData: EditingData;
}
