import * as models from './models';
import { IncomingMessage, ServerResponse } from 'http';

export interface LayoutService {
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

/**
 * Base abstraction to implement custom layout service
 */
export abstract class LayoutServiceBase implements LayoutService {
  abstract fetchLayoutData(
    itemPath: string,
    language?: string,
    req?: IncomingMessage,
    res?: ServerResponse
  ): Promise<models.LayoutServiceData>;
}
