import { NextApiRequest, NextApiResponse } from 'next';
import { debug } from '@sitecore-jss/sitecore-jss';
import {
  EDITING_ALLOWED_ORIGINS,
  QUERY_PARAM_EDITING_SECRET,
} from '@sitecore-jss/sitecore-jss/editing';
import { getJssEditingSecret } from '../utils/utils';
import { RenderMiddlewareBase } from './render-middleware';
import { enforceCors } from '@sitecore-jss/sitecore-jss/utils';

/**
 * Configuration for `FEAASRenderMiddleware`.
 */
export interface FEAASRenderMiddlewareConfig {
  /**
   * Defines FEAAS page route to render.
   * This may be necessary for certain custom Next.js routing configurations.
   * @default /feaas/render
   */
  pageUrl?: string;
}

/**
 * Middleware / handler for use in the feaas render Next.js API route (e.g. '/api/editing/feaas/render')
 * which is required for Sitecore editing support.
 */
export class FEAASRenderMiddleware extends RenderMiddlewareBase {
  private pageUrl: string;
  private defaultPageUrl = '/feaas/render';

  /**
   * @param {EditingRenderMiddlewareConfig} [config] Editing render middleware config
   */
  constructor(protected config?: FEAASRenderMiddlewareConfig) {
    super();

    this.pageUrl = config?.pageUrl ?? this.defaultPageUrl;
  }

  /**
   * Gets the Next.js API route handler
   * @returns route handler
   */
  public getHandler(): (req: NextApiRequest, res: NextApiResponse) => Promise<void> {
    return this.handler;
  }

  private handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const { method, query, headers } = req;

    const startTimestamp = Date.now();

    debug.editing('feaas render middleware start: %o', {
      method,
      query,
      headers,
    });

    if (!enforceCors(req, res, EDITING_ALLOWED_ORIGINS)) {
      debug.editing(
        'invalid origin host - set allowed origins in JSS_ALLOWED_ORIGINS environment variable'
      );
      return res
        .status(401)
        .send(
          `<html><body>Requests from origin ${req.headers?.origin} are not allowed</body></html>`
        );
    }

    if (!method || !['GET', 'OPTIONS'].includes(method)) {
      debug.editing('invalid method - sent %s expected GET,OPTIONS', method);
      res.setHeader('Allow', 'GET, OPTIONS');
      return res.status(405).send(`<html><body>Invalid request method '${method}'</body></html>`);
    }

    // Validate secret
    const secret = query[QUERY_PARAM_EDITING_SECRET];
    if (secret !== getJssEditingSecret()) {
      debug.editing(
        'invalid editing secret - sent "%s" expected "%s"',
        secret,
        getJssEditingSecret()
      );
      return res.status(401).send('<html><body>Missing or invalid secret</body></html>');
    }

    // Handle preflight request
    if (method === 'OPTIONS') {
      debug.editing('preflight request');

      // CORS headers are set by enforceCors
      return res.status(204).send(null);
    }

    try {
      // Get query string parameters to propagate on subsequent requests (e.g. for deployment protection bypass)
      const params = this.getQueryParamsForPropagation(query);

      // Enable Next.js Preview Mode
      res.setPreviewData({});

      const queryParams = new URLSearchParams();

      for (const key in params) {
        if ({}.hasOwnProperty.call(params, key)) {
          queryParams.append(key, params[key]);
        }
      }

      // Pass "feaasSrc" in case a FEAASComponent is being requested
      if (query.feaasSrc) {
        queryParams.append('feaasSrc', query.feaasSrc as string);
      }

      const redirectUrl =
        this.pageUrl + (queryParams.toString() ? `?${queryParams.toString()}` : '');

      debug.editing('redirecting to page route %s', redirectUrl);

      debug.editing('feaas render middleware end in %dms', Date.now() - startTimestamp);

      res.redirect(redirectUrl);
    } catch (err) {
      const error = err as Record<string, unknown>;

      console.info(
        // eslint-disable-next-line quotes
        "Hint: for non-standard server or Next.js route configurations, you may need to override the 'pageUrl' available on the 'FEAASRenderMiddleware' config."
      );

      res.status(500).send(`<html><body>${error}</body></html>`);
    }
  };
}
