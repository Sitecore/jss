import { NextApiRequest, NextApiResponse } from 'next';
import { debug } from '@sitecore-jss/sitecore-jss';
import { QUERY_PARAM_EDITING_SECRET } from './constants';
import { getJssEditingSecret } from '../utils/utils';
import { RenderMiddlewareBase, RenderMiddlewareBaseConfig } from './render-middleware';

/**
 * Configuration for `FEAASRenderMiddleware`.
 */
export type FEAASRenderMiddlewareConfig = RenderMiddlewareBaseConfig & {
  /**
   * Function used to determine FEAAS page URL to render.
   * This may be necessary for certain custom Next.js routing configurations.
   * @param {string} serverUrl The root server URL e.g. 'http://localhost:3000'
   * @returns {string} The URL to render
   * @default `${serverUrl}/feaas/render`
   * @see resolveServerUrl
   */
  resolvePageUrl?: (serverUrl: string) => string;
};

/**
 * Middleware / handler for use in the feaas render Next.js API route (e.g. '/api/editing/feaas/render')
 * which is required for Sitecore editing support.
 */
export class FEAASRenderMiddleware extends RenderMiddlewareBase {
  private resolvePageUrl: (serverUrl: string) => string;

  /**
   * @param {EditingRenderMiddlewareConfig} [config] Editing render middleware config
   */
  constructor(protected config?: FEAASRenderMiddlewareConfig) {
    super(config);

    this.resolvePageUrl = config?.resolvePageUrl ?? this.defaultResolvePageUrl;
  }

  /**
   * Gets the Next.js API route handler
   * @returns route handler
   */
  public getHandler(): (req: NextApiRequest, res: NextApiResponse) => Promise<void> {
    return this.handler;
  }

  private handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const { method, query, body, headers } = req;

    const startTimestamp = Date.now();

    debug.editing('feaas render middleware start: %o', {
      method,
      query,
      headers,
      body,
    });

    if (method !== 'GET') {
      debug.editing('invalid method - sent %s expected GET', method);
      res.setHeader('Allow', 'GET');
      return res.status(405).json({
        html: `<html><body>Invalid request method '${method}'</body></html>`,
      });
    }

    // Validate secret
    const secret = query[QUERY_PARAM_EDITING_SECRET];
    if (secret !== getJssEditingSecret()) {
      debug.editing(
        'invalid editing secret - sent "%s" expected "%s"',
        secret,
        getJssEditingSecret()
      );
      return res.status(401).json({
        html: '<html><body>Missing or invalid secret</body></html>',
      });
    }

    try {
      // Resolve server URL
      const serverUrl = this.resolveServerUrl(req);

      // Get query string parameters to propagate on subsequent requests (e.g. for deployment protection bypass)
      const params = this.getQueryParamsForPropagation(query);

      // Enable Next.js Preview Mode
      res.setPreviewData({});

      // Grab the Next.js preview cookies to send on to the render request
      const cookies = res.getHeader('Set-Cookie') as string[];

      // Make actual render request for page route, passing on preview cookies as well as any approved query string parameters.
      // Note timestamp effectively disables caching the request in Axios (no amount of cache headers seemed to do it)
      const requestUrl = new URL(this.resolvePageUrl(serverUrl));

      for (const key in params) {
        if ({}.hasOwnProperty.call(params, key)) {
          requestUrl.searchParams.append(key, params[key]);
        }
      }

      // Pass "feaasSrc" in case a FEAASComponent is being requested
      if (query.feaasSrc) {
        requestUrl.searchParams.append('feaasSrc', query.feaasSrc as string);
      }

      requestUrl.searchParams.append('timestamp', Date.now().toString());

      debug.editing('fetching page route for %s', requestUrl.toString());

      const pageRes = await this.dataFetcher.get<string>(requestUrl.toString(), {
        headers: {
          Cookie: cookies.join(';'),
        },
      });

      const html = pageRes.data;

      if (!html || html.length === 0) {
        throw new Error('Failed to render html');
      }

      // Return expected JSON result
      debug.editing('feaas render middleware end in %dms: %o', Date.now() - startTimestamp, {
        status: 200,
        html,
      });
      res.status(200).send(html);
    } catch (err) {
      const error = err as Record<string, unknown>;

      if (error.response || error.request) {
        // Axios error, which could mean the server or page URL isn't quite right, so provide a more helpful hint
        console.info(
          // eslint-disable-next-line quotes
          "Hint: for non-standard server or Next.js route configurations, you may need to override the 'resolveServerUrl' or 'resolvePageUrl' available on the 'FEAASRenderMiddleware' config."
        );
      }
      res.status(500).json({
        html: `<html><body>${error}</body></html>`,
      });
    }
  };

  /**
   * Default FEAAS page URL resolution.
   * @param {string} serverUrl The root server URL e.g. 'http://localhost:3000'
   */
  private defaultResolvePageUrl = (serverUrl: string) => {
    return `${serverUrl}/feaas/render`;
  };
}
