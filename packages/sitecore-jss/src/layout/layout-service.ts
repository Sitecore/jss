import * as models from './models';
import { IncomingMessage, ServerResponse } from 'http';

export interface LayoutService {
  /**
   * Indicates whether Layout service tracks page views
   */
  readonly tracking: boolean;

  /**
   * Fetch layout data for an item.
   * @param {string} itemPath
   * @param {string} [language]
   * @param {IncomingMessage} [req] Request instance
   * @param {ServerResponse} [res] Response instance
   * @returns {Promise<LayoutServiceData>} layout data
   */
  fetchLayoutData(
    itemPath: string,
    language?: string,
    req?: IncomingMessage,
    res?: ServerResponse
  ): Promise<models.LayoutServiceData>;
}

export abstract class LayoutServiceBase implements LayoutService {
  abstract readonly tracking: boolean;

  abstract fetchLayoutData(
    itemPath: string,
    language?: string,
    req?: IncomingMessage,
    res?: ServerResponse
  ): Promise<models.LayoutServiceData>;
}
