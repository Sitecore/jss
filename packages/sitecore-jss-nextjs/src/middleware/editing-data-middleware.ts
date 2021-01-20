import { NextApiRequest, NextApiResponse } from 'next';
import { EditingDataCache, editingDataDiskCache } from './editing-data-cache';
import { EditingData, isEditingData } from '../sharedTypes/editing-data';
import { QUERY_PARAM_EDITING_SECRET } from '../services/editing-data-service';
import { getJssEditingSecret } from '../utils';

export interface EditingDataMiddlewareConfig {
  /**
   * The Next.js dynamic API route key name. This is used in the middleware to extract the data
   * key from the request query parameters. By default this is 'key' (from '/api/editing/data/[key]').
   * @default 'key'
   */
  dynamicRouteKey?: string;
  /**
   * An instance of the `EditingDataCache` implementation to use.
   * Note for Vercel deployment, which uses Serverless Functions for API routes, a disk cache is required.
   * By default, this is `editingDataDiskCache` (an `EditingDataDiskCache` singleton).
   * @default editingDataDiskCache
   * @see EditingDataCache
   * @see EditingDataDiskCache
   */
  editingDataCache?: EditingDataCache;
}

/**
 * Middleware / handler for use in the editing data Next.js API dynamic route (e.g. '/api/editing/data/[key]')
 * which is required for Sitecore Experience Editor support.
 */
export class EditingDataMiddleware {
  private queryParamKey: string;
  private editingDataCache: EditingDataCache;

  /**
   * @param {EditingDataMiddlewareConfig} [config] Editing data middleware config
   */
  constructor(config?: EditingDataMiddlewareConfig) {
    this.queryParamKey = config?.dynamicRouteKey ?? 'key';
    this.editingDataCache = config?.editingDataCache ?? editingDataDiskCache;
  }

  /**
   * Gets the Next.js API route handler
   * @returns route handler
   */
  public getHandler(): (req: NextApiRequest, res: NextApiResponse) => Promise<void> {
    return this.handler;
  }

  private handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const { method, query, body } = req;
    const secret = query[QUERY_PARAM_EDITING_SECRET];
    const key = query[this.queryParamKey];

    // Validate secret
    if (secret !== getJssEditingSecret()) {
      return res.status(401).end('Missing or invalid secret');
    }

    switch (method) {
      case 'GET': {
        // Get cache value
        const data = this.editingDataCache.get(key as string);
        res.status(200).json(data);
        break;
      }
      case 'PUT': {
        if (!isEditingData(body)) {
          res.status(400).end('Missing or invalid editing data');
        } else {
          // Set cache value
          this.editingDataCache.set(key as string, body as EditingData);
          res.status(200).end();
        }
        break;
      }
      default: {
        res.setHeader('Allow', ['GET', 'PUT']);
        res.status(405).end(`Method ${method} Not Allowed`);
      }
    }
  };
}
