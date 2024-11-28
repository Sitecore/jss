import { NextApiRequest, NextApiResponse } from 'next';
import { STATIC_PROPS_ID, SERVER_PROPS_ID } from 'next/constants';
import { AxiosDataFetcher, debug } from '@sitecore-jss/sitecore-jss';
import { EditMode, LayoutServicePageState } from '@sitecore-jss/sitecore-jss/layout';
import { LayoutKind } from '@sitecore-jss/sitecore-jss/editing';
import { EditingData } from './editing-data';
import { EditingDataService, editingDataService } from './editing-data-service';
import { EDITING_ALLOWED_ORIGINS, QUERY_PARAM_EDITING_SECRET } from './constants';
import { getJssEditingSecret } from '../utils/utils';
import { RenderMiddlewareBase } from './render-middleware';
import { enforceCors, getAllowedOriginsFromEnv } from '@sitecore-jss/sitecore-jss/utils';
import { DEFAULT_VARIANT } from '@sitecore-jss/sitecore-jss/personalize';

/**
 * Configuration for the Editing Render Middleware.
 */
export type EditingRenderMiddlewareConfig = {
  /**
   * -- Edit Mode Chromes --
   *
   * The `AxiosDataFetcher` instance to use for API requests.
   * @default new AxiosDataFetcher()
   * @see AxiosDataFetcher
   */
  dataFetcher?: AxiosDataFetcher;
  /**
   * -- Edit Mode Chromes --
   *
   * The `EditingDataService` instance to use.
   * This would typically only be necessary if you've got a custom `EditingDataService` instance (e.g. using a custom API route).
   * By default, this is `editingDataService` (the `EditingDataService` default instance).
   * This will be `ServerlessEditingDataService` on Vercel, `BasicEditingDataService` otherwise.
   * @default editingDataService
   * @see EditingDataService
   */
  editingDataService?: EditingDataService;
  /**
   * -- Edit Mode Chromes / Metadata --
   *
   * Function used to determine route/page URL to render.
   * This may be necessary for certain custom Next.js routing configurations.
   * @param {Object} args Arguments for resolving the page URL
   * @param {string} args.serverUrl The root server URL e.g. 'http://localhost:3000'. Available in Chromes Edit Mode only.
   * @param {string} itemPath The Sitecore relative item path e.g. '/styleguide'
   * @returns {string} The URL to render
   * @default `${serverUrl}${itemPath}` In Edit Mode Chromes
   * @default `${itemPath}` In XMCloud Pages for Edit Mode Metadata
   * @see resolveServerUrl
   */
  resolvePageUrl?: (args: { serverUrl?: string; itemPath: string }) => string;
  /**
   * -- Edit Mode Chromes --
   *
   * Function used to determine the root server URL. This is used for the route/page and subsequent data API requests.
   * By default, the host header is used, with https protocol on Vercel (due to serverless function architecture) and http protocol elsewhere.
   * @param {NextApiRequest} req The current request.
   * @default `${process.env.VERCEL ? 'https' : 'http'}://${req.headers.host}`;
   * @see resolvePageUrl
   */
  resolveServerUrl?: (req: NextApiRequest) => string;
};

/**
 * Configuration for the Editing Chromes Handler.
 */
export type EditingRenderMiddlewareChromesConfig = EditingRenderMiddlewareConfig;

/**
 * Handler for the Editing Chromes POST requests.
 * This handler is responsible for rendering the page and returning the HTML content that is provided via request.
 */
export class ChromesHandler extends RenderMiddlewareBase {
  private editingDataService: EditingDataService;
  private dataFetcher: AxiosDataFetcher;
  private resolvePageUrl: (args: { serverUrl: string; itemPath: string }) => string;
  private resolveServerUrl: (req: NextApiRequest) => string;

  constructor(public config?: EditingRenderMiddlewareChromesConfig) {
    super();

    this.editingDataService = config?.editingDataService ?? editingDataService;
    this.dataFetcher = config?.dataFetcher ?? new AxiosDataFetcher({ debugger: debug.editing });
    this.resolvePageUrl = config?.resolvePageUrl ?? this.defaultResolvePageUrl;
    this.resolveServerUrl = config?.resolveServerUrl ?? this.defaultResolveServerUrl;
  }

  async render(req: NextApiRequest, res: NextApiResponse) {
    const { query, headers: incomingHeaders } = req;

    const startTimestamp = Date.now();

    try {
      // Extract data from EE payload
      const editingData = this.extractEditingData(req);

      // Resolve server URL
      const serverUrl = this.resolveServerUrl(req);

      // Get query string parameters to propagate on subsequent requests (e.g. for deployment protection bypass)
      const params = this.getQueryParamsForPropagation(query);

      // Get headers to propagate on subsequent requests
      const headers = this.getHeadersForPropagation(incomingHeaders);

      // Stash for use later on (i.e. within getStatic/ServerSideProps).
      // Note we can't set this directly in setPreviewData since it's stored as a cookie (2KB limit)
      // https://nextjs.org/docs/advanced-features/preview-mode#previewdata-size-limits)
      const previewData = await this.editingDataService.setEditingData(
        editingData,
        serverUrl,
        params
      );

      // Enable Next.js Preview Mode, passing our preview data (i.e. editingData cache key)
      res.setPreviewData(previewData);

      // Grab the Next.js preview cookies to send on to the render request
      const cookies = res.getHeader('Set-Cookie') as string[];
      headers.cookie = `${headers.cookie ? headers.cookie + ';' : ''}${cookies.join(';')}`;

      // Make actual render request for page route, passing on preview cookies as well as any approved query string parameters.
      // Note timestamp effectively disables caching the request in Axios (no amount of cache headers seemed to do it)
      debug.editing('fetching page route for %s', editingData.path);
      const requestUrl = new URL(this.resolvePageUrl({ serverUrl, itemPath: editingData.path }));
      for (const key in params) {
        if ({}.hasOwnProperty.call(params, key)) {
          requestUrl.searchParams.append(key, params[key]);
        }
      }
      requestUrl.searchParams.append('timestamp', Date.now().toString());
      const pageRes = await this.dataFetcher
        .get<string>(requestUrl.toString(), {
          headers,
        })
        .catch((err) => {
          // We need to handle not found error provided by Vercel
          // for `fallback: false` pages
          if (err.response.status === 404) {
            return err.response;
          }

          throw err;
        });

      let html = pageRes.data;
      if (!html || html.length === 0) {
        throw new Error(`Failed to render html for ${editingData.path}`);
      }

      // replace phkey attribute with key attribute so that newly added renderings
      // show correct placeholders, so save and refresh won't be needed after adding each rendering
      html = html.replace(new RegExp('phkey', 'g'), 'key');

      // When SSG, Next will attempt to perform a router.replace on the client-side to inject the query string parms
      // to the router state. See https://github.com/vercel/next.js/blob/v10.0.3/packages/next/client/index.tsx#L169.
      // However, this doesn't really work since at this point we're in the editor and the location.search has nothing
      // to do with the Next route/page we've rendered. Beyond the extraneous request, this can result in a 404 with
      // certain route configurations (e.g. multiple catch-all routes).
      // The following line will trick it into thinking we're SSR, thus avoiding any router.replace.
      html = html.replace(STATIC_PROPS_ID, SERVER_PROPS_ID);

      const body = { html };

      // Return expected JSON result
      debug.editing('editing render middleware end in %dms: %o', Date.now() - startTimestamp, {
        status: 200,
        body,
      });
      res.status(200).json(body);
    } catch (err) {
      const error = err as Record<string, unknown>;

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
  }

  /**
   * Default page URL resolution.
   * @param {Object} args Arguments for resolving the page URL
   * @param {string} args.serverUrl The root server URL e.g. 'http://localhost:3000'
   * @param {string} args.itemPath The Sitecore relative item path e.g. '/styleguide'
   * @returns {string} The URL to render
   */
  private defaultResolvePageUrl = ({
    serverUrl,
    itemPath,
  }: {
    serverUrl: string;
    itemPath: string;
  }) => {
    return `${serverUrl}${itemPath}`;
  };

  /**
   * Default server URL resolution.
   * Note we use https protocol on Vercel due to serverless function architecture.
   * In all other scenarios, including localhost (with or without a proxy e.g. ngrok)
   * and within a nodejs container, http protocol should be used.
   *
   * For information about the VERCEL environment variable, see
   * https://vercel.com/docs/environment-variables#system-environment-variables
   * @param {NextApiRequest} req
   */
  private defaultResolveServerUrl = (req: NextApiRequest) => {
    return `${process.env.VERCEL ? 'https' : 'http'}://${req.headers.host}`;
  };

  private extractEditingData(req: NextApiRequest): EditingData {
    // Sitecore editors will send the following body data structure,
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
}

/**
 * Configuration for the Editing Metadata Handler.
 */
export type EditingRenderMiddlewareMetadataConfig = Pick<
  EditingRenderMiddlewareConfig,
  'resolvePageUrl'
>;

/**
 * Query parameters appended to the page route URL
 * Appended when XMCloud Pages preview (editing) Metadata Edit Mode is used
 */
export type MetadataQueryParams = {
  secret: string;
  sc_lang: string;
  sc_itemid: string;
  sc_site: string;
  route: string;
  mode: Exclude<LayoutServicePageState, 'normal'>;
  sc_variant?: string;
  sc_version?: string;
  sc_layoutKind?: LayoutKind;
};

/**
 * Next.js API request with Metadata query parameters.
 */
type MetadataNextApiRequest = NextApiRequest & {
  query: MetadataQueryParams;
};

/**
 * Data for Next.js Preview (Editing) Metadata Edit Mode.
 */
export type EditingMetadataPreviewData = {
  site: string;
  itemId: string;
  language: string;
  editMode: EditMode.Metadata;
  pageState: Exclude<LayoutServicePageState, 'Normal'>;
  variantIds: string[];
  version?: string;
  layoutKind?: LayoutKind;
};

/**
 * Type guard for EditingMetadataPreviewData
 * @param {Object} data preview data to check
 * @returns true if the data is EditingMetadataPreviewData
 * @see EditingMetadataPreviewData
 */
export const isEditingMetadataPreviewData = (data: unknown): data is EditingMetadataPreviewData => {
  return (
    typeof data === 'object' &&
    data !== null &&
    'editMode' in data &&
    (data as EditingMetadataPreviewData).editMode === EditMode.Metadata
  );
};

/**
 * Handler for the Editing Metadata GET requests.
 * This handler is responsible for redirecting the request to the page route.
 * The page fetches the layout, dictionary and renders the page.
 */
export class MetadataHandler {
  constructor(public config: EditingRenderMiddlewareMetadataConfig) {}

  render(req: MetadataNextApiRequest, res: NextApiResponse) {
    const { query } = req;

    const startTimestamp = Date.now();

    const requiredQueryParams: (keyof MetadataQueryParams)[] = [
      'sc_site',
      'sc_itemid',
      'sc_lang',
      'route',
      'mode',
    ];

    const missingQueryParams = requiredQueryParams.filter((param) => !query[param]);

    // Validate query parameters
    if (missingQueryParams.length) {
      debug.editing('missing required query parameters: %o', missingQueryParams);

      return res.status(400).json({
        html: `<html><body>Missing required query parameters: ${missingQueryParams.join(
          ', '
        )}</body></html>`,
      });
    }

    res.setPreviewData(
      {
        site: query.sc_site,
        itemId: query.sc_itemid,
        language: query.sc_lang,
        // for sc_variantId we may employ multiple variants (page-layout + component level)
        variantIds: query.sc_variant?.split(',') || [DEFAULT_VARIANT],
        version: query.sc_version,
        editMode: EditMode.Metadata,
        pageState: query.mode,
        layoutKind: query.sc_layoutKind,
      } as EditingMetadataPreviewData,
      // Cache the preview data for 3 seconds to ensure the page is rendered with the correct preview data not the cached one
      {
        maxAge: 3,
      }
    );

    // Cookies with the SameSite=Lax policy set by Next.js setPreviewData function causes CORS issue
    // when Next.js preview mode is activated, resulting the page to render in normal mode instead.
    // By replacing it with "SameSite=None; Secure", we ensure cookies are correctly sent with
    // cross-origin requests, allowing the page to be editable. This change should be reverted
    // once vercel addresses this open issue: https://github.com/vercel/next.js/issues/49927
    const setCookieHeader = res.getHeader('Set-Cookie');

    if (setCookieHeader && Array.isArray(setCookieHeader)) {
      const modifiedCookies = setCookieHeader.map((cookie) => {
        const cookieIdentifiers: { [key: string]: RegExp } = {
          __prerender_bypass: /^__prerender_bypass=/,
          __next_preview_data: /^__next_preview_data=/,
        };

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for (const [_, regex] of Object.entries(cookieIdentifiers)) {
          if (cookie.match(regex)) {
            return cookie.replace(/SameSite=Lax/, 'SameSite=None; Secure');
          }
        }
        return cookie;
      });

      res.setHeader('Set-Cookie', modifiedCookies);
    }

    const route =
      this.config.resolvePageUrl?.({
        itemPath: query.route,
      }) || query.route;

    debug.editing(
      'editing render middleware end in %dms: redirect %o',
      Date.now() - startTimestamp,
      {
        status: 307,
        route,
      }
    );

    // Restrict the page to be rendered only within the allowed origins
    res.setHeader('Content-Security-Policy', this.getSCPHeader());

    res.redirect(route);
  }

  /**
   * Gets the Content-Security-Policy header value
   * @returns Content-Security-Policy header value
   */
  getSCPHeader() {
    return `frame-ancestors 'self' ${[getAllowedOriginsFromEnv(), ...EDITING_ALLOWED_ORIGINS].join(
      ' '
    )}`;
  }
}

/**
 * Middleware / handler for use in the editing render Next.js API route (e.g. '/api/editing/render')
 * which is required for Sitecore editing support.
 */
export class EditingRenderMiddleware extends RenderMiddlewareBase {
  /**
   * @param {EditingRenderMiddlewareConfig} [config] Editing render middleware config
   */
  constructor(public config?: EditingRenderMiddlewareConfig) {
    super();
  }

  /**
   * Gets the Next.js API route handler
   * @returns route handler
   */
  public getHandler(): (req: NextApiRequest, res: NextApiResponse) => Promise<void> {
    return this.handler;
  }

  private handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const { query, body, method, headers } = req;

    debug.editing('editing render middleware start: %o', {
      method,
      query,
      headers,
      body,
    });

    if (!enforceCors(req, res, EDITING_ALLOWED_ORIGINS)) {
      debug.editing(
        'invalid origin host - set allowed origins in JSS_ALLOWED_ORIGINS environment variable'
      );
      return res.status(401).json({
        html: `<html><body>Requests from origin ${req.headers?.origin} not allowed</body></html>`,
      });
    }

    // Validate secret
    const secret = query[QUERY_PARAM_EDITING_SECRET] ?? body?.jssEditingSecret;
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

    switch (req.method) {
      case 'GET': {
        const handler = new MetadataHandler({ resolvePageUrl: this.config?.resolvePageUrl });

        await handler.render(req as MetadataNextApiRequest, res);
        break;
      }
      case 'POST': {
        const handler = new ChromesHandler(this.config);

        await handler.render(req, res);
        break;
      }
      case 'OPTIONS': {
        debug.editing('preflight request');

        // CORS headers are set by enforceCors
        return res.status(204).send(null);
      }
      default:
        debug.editing('invalid method - sent %s expected GET/POST', req.method);
        res.setHeader('Allow', 'GET, POST');
        return res.status(405).json({
          html: `<html><body>Invalid request method '${req.method}'</body></html>`,
        });
    }
  };
}
