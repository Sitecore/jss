import { NextApiRequest, NextApiResponse } from 'next';
import { AxiosDataFetcher } from '@sitecore-jss/sitecore-jss';
import { EditingData } from '../sharedTypes/editing-data';
import { EditingDataService, editingDataService } from '../services/editing-data-service';
import { QUERY_PARAM_EDITING_SECRET } from '../services/editing-data-service';
import { getJssEditingSecret } from '../utils';

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
   * By default, this is `editingDataService` (an `EditingDataService` singleton).
   * @default editingDataService
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
   * @see resolveServerUrl
   */
  resolvePageUrl?: (serverUrl: string, itemPath: string) => string;
  /**
   * Function used to determine the root server URL. This is used for the route/page and subsequent data API requests.
   * By default, the host header is used, unless the VERCEL_URL environment variable is present (for Vercel hosting).
   * @param {NextApiRequest} req The current request.
   * @default process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : `http://${req.headers.host}`;
   * @see resolvePageUrl
   */
  resolveServerUrl?: (req: NextApiRequest) => string;
}

/**
 * Middleware / handler for use in the editing render Next.js API route (e.g. '/api/editing/render')
 * which is required for Sitecore Experience Editor support.
 */
export class EditingRenderMiddleware {
  private editingDataService: EditingDataService;
  private dataFetcher: AxiosDataFetcher;
  private resolvePageUrl: (serverUrl: string, itemPath: string) => string;
  private resolveServerUrl: (req: NextApiRequest) => string;

  /**
   * @param {EditingRenderMiddlewareConfig} [config] Editing render middleware config
   */
  constructor(config?: EditingRenderMiddlewareConfig) {
    this.editingDataService = config?.editingDataService ?? editingDataService;
    this.dataFetcher = config?.dataFetcher ?? new AxiosDataFetcher();
    this.resolvePageUrl = config?.resolvePageUrl ?? this.defaultResolvePageUrl;
    this.resolveServerUrl = config?.resolveServerUrl ?? this.defaultResolveServerUrl;
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
        html: `<html><body>Invalid request method '${method}'</body></html>`,
      });
    }

    // Validate secret
    const secret = query[QUERY_PARAM_EDITING_SECRET] ?? body?.jssEditingSecret;
    if (secret !== getJssEditingSecret()) {
      return res.status(401).json({
        html: '<html><body>Missing or invalid secret</body></html>',
      });
    }

    try {
      // Extract data from EE payload
      const editingData = extractEditingData(req);

      // Resolve server URL
      const serverUrl = this.resolveServerUrl(req);

      // Stash for use later on (i.e. within getStatic/ServerSideProps).
      // This ultimately gets stored on disk (using our EditingDataDiskCache) for compatibility with Vercel Serverless Functions.
      // Note we can't set this directly in setPreviewData since it's stored as a cookie (2KB limit)
      // https://nextjs.org/docs/advanced-features/preview-mode#previewdata-size-limits
      const previewData = await this.editingDataService.setEditingData(editingData, serverUrl);

      // Enable Next.js Preview Mode, passing our preview data (i.e. editingData cache key)
      res.setPreviewData(previewData);

      // Grab the Next.js preview cookies to send on to the render request
      const cookies = res.getHeader('Set-Cookie') as string[];

      // Make actual render request for page route, passing on preview cookies.
      // Note timestamp effectively disables caching the request in Axios (no amount of cache headers seemed to do it)
      const requestUrl = this.resolvePageUrl(serverUrl, editingData.path);
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

      if (error.response || error.request) {
        // Axios error, which could mean the server or page URL isn't quite right, so provide a more helpful hint
        console.info(
          // eslint-disable-next-line quotes
          "Hint: for non-standard server or Next.js route configurations, you may need to override the 'resolveServerUrl' or 'resolvePageUrl' available on the 'EditingRenderMiddleware' config."
        );
      }
      res.status(500).json({
        html: `<html><body>${error}</body></html>`,
      });
    }
  };

  private defaultResolvePageUrl = (serverUrl: string, itemPath: string) => {
    return `${serverUrl}${itemPath}`;
  };

  private defaultResolveServerUrl = (req: NextApiRequest) => {
    return process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : `http://${req.headers.host}`;
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
