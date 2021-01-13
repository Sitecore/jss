import { NextApiRequest, NextApiResponse } from 'next';
import { AxiosDataFetcher } from '@sitecore-jss/sitecore-jss';
import { EditingData } from '../sharedTypes/editing-data';
import { EditingDataService, editingDataService } from '../services/editing-data-service';
import { QUERY_PARAM_SECURITY_TOKEN } from '../services/editing-data-service';
import { getPublicUrl, getSitecoreSecurityToken } from '../utils';

export interface EditingRenderMiddlewareConfig {
  /**
   * The `AxiosDataFetcher` instance to use for API requests.
   * @default new AxiosDataFetcher()
   * @see AxiosDataFetcher
   */
  dataFetcher?: AxiosDataFetcher;
  /**
   * The `EditingDataService` instance to use.
   * This would typically only be necessary if you've got a custom `EditingDataService` instance (e.g. using a custom API route).
   * @default editingDataService (EditingDataService singleton)
   * @see EditingDataService
   */
  editingDataService?: EditingDataService;
  /**
   * Function used to determine route/page URL to render.
   * This may be necessary for certain custom Next.js routing configurations.
   * @param {string} serverUrl The root server URL e.g. 'http://localhost:3000'
   * @param {string} itemPath The Sitecore relative item path e.g. '/styleguide'
   * @returns {string} The URL to render
   * @default `${serverUrl}${itemPath}`
   */
  renderRouteResolver?: (serverUrl: string, itemPath: string) => string;
}

/**
 * Middlware / handler for use in the editing render Next.js API route (e.g. '/api/editing/render')
 * which is required for Sitecore Experience Editor support.
 */
export class EditingRenderMiddleware {
  private editingDataService: EditingDataService;
  private dataFetcher: AxiosDataFetcher;
  private renderRouteResolver: (serverUrl: string, itemPath: string) => string;

  /**
   * @param {EditingRenderMiddlewareConfig} [config] Editing render middleware config
   */
  constructor(config?: EditingRenderMiddlewareConfig) {
    this.editingDataService = config?.editingDataService ?? editingDataService;
    this.dataFetcher = config?.dataFetcher ?? new AxiosDataFetcher();
    this.renderRouteResolver = config?.renderRouteResolver ?? this.defaultRenderRouteResolver;
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

    if (method !== 'POST') {
      res.setHeader('Allow', 'POST');
      return res.status(405).json({
        html: `<html><body>Invalid request method '${method})'</body></html>`,
      });
    }

    // Validate security token
    const token = query[QUERY_PARAM_SECURITY_TOKEN] ?? body?.SecurityToken;
    if (token !== getSitecoreSecurityToken()) {
      return res.status(401).json({
        html: '<html><body>Missing or invalid security token</body></html>',
      });
    }

    try {
      // Extract data from EE payload
      const editingData = extractEditingData(req);

      // Stash for use later on (i.e. within getStatic/ServerSideProps).
      // This ultimately gets stored on disk (using our EditingDataDiskCache) for compatibility with Vercel Serverless Functions.
      // Note we can't set this directly in setPreviewData since it's stored as a cookie (2KB limit)
      // https://nextjs.org/docs/advanced-features/preview-mode#previewdata-size-limits
      const previewData = await this.editingDataService.setEditingData(editingData);

      // Enable Next.js Preview Mode, passing our preview data (i.e. editingData cache key)
      res.setPreviewData(previewData);

      // Grab the Next.js preview cookies to send on to the render request
      const cookies = res.getHeader('Set-Cookie') as string[];

      // Make actual render request for page route, passing on preview cookies.
      // Note timestamp effectively disables caching the request in Axios (no amount of cache headers seemed to do it)
      const requestUrl = this.renderRouteResolver(getPublicUrl(), editingData.path);
      const pageRes = await this.dataFetcher.get<string>(`${requestUrl}?timestamp=${Date.now()}`, {
        headers: {
          Cookie: cookies.join(';'),
        },
      });
      const html = pageRes.data;
      if (!html || html.length === 0) {
        throw new Error(`Failed to render html for ${requestUrl}`);
      }

      // Return expected JSON result
      res.status(200).json({ html });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        html: `<html><body>${error}</body></html>`,
      });
    }
  };

  private defaultRenderRouteResolver = (serverUrl: string, itemPath: string) => {
    return `${serverUrl}${itemPath}`;
  };
}

/**
 * @param {NextApiRequest} req
 */
export function extractEditingData(req: NextApiRequest): EditingData {
  // The Experience Editor will send the following body data structure,
  // though we're only concerned with the "args".
  // {
  //   id: 'JSS app name',
  //   args: ['path', 'serialized layout data object', 'serialized viewbag object'],
  //   functionName: 'renderView',
  //   moduleName: 'server.bundle'
  // }
  // The 'serialized viewbag object' structure:
  // {
  //   language: 'language',
  //   dictionary: 'key-value representation of tokens and their corresponding translations',
  //   httpContext: 'serialized request data'
  // }

  // Note req.body _should_ have already been parsed as JSON at this point (via Next.js `bodyParser` API middleware)
  const payload = req.body;
  if (!payload || !payload.args || !Array.isArray(payload.args) || payload.args.length < 3) {
    throw new Error(
      'Unable to extract editing data from request. Ensure `bodyParser` middleware is enabled on your Next.js API route.'
    );
  }

  const layoutData = JSON.parse(payload.args[1]);
  const viewBag = JSON.parse(payload.args[2]);
  // Keep backwards compatibility in case people use an older JSS version that doesn't send the path in the context
  const path = layoutData.sitecore.context.itemPath ?? viewBag.httpContext.request.path;

  return {
    path,
    layoutData,
    language: viewBag.language,
    dictionary: viewBag.dictionary,
  };
}
