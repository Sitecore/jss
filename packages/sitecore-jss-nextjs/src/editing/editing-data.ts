import { LayoutServiceData, DictionaryPhrases } from '@sitecore-jss/sitecore-jss';
import { IncomingMessage } from 'http';
import { Request } from 'express';

/**
 * Data sent from Experience Editor POST request payload
 */
export type EditingData = {
  path: string;
  language: string;
  layoutData: LayoutServiceData | null;
  dictionary: DictionaryPhrases | null;
};

// Extend Express Request with our custom editingData
declare global {
  namespace Express {
      export interface Request {
        editingData: EditingData;
      }
  }
}

/**
 * Attach editing data (from Sitecore Experience Editor) to the request
 * @param {IncomingMessage} req The http request
 * @param {EditingData} data The editing data to attach
 */
export function attachEditingDataToRequest(req: IncomingMessage, data: EditingData): void {
  (req as Request).editingData = data;
}

/**
 * Extract editing data (from Sitecore Experience Editor) from the request
 * @param {IncomingMessage} req The http request
 * @returns {EditingData} The editing data
 */
export function extractEditingDataFromRequest(req: IncomingMessage | undefined): EditingData | undefined {
  return (req as Request)?.editingData;
}
