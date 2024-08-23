import { GraphQLRequestClientFactory, debug } from '@sitecore-jss/sitecore-jss';
import { AppRenderer } from '../headless-ssr-proxy/AppRenderer';
import { Request, Response } from 'express';
import { LayoutServicePageState } from '@sitecore-jss/sitecore-jss/layout';
import { getAllowedOriginsFromEnv } from '@sitecore-jss/sitecore-jss/utils';
import { GraphQLEditingService } from '@sitecore-jss/sitecore-jss/editing';
import { DictionaryService } from '@sitecore-jss/sitecore-jss/i18n';
/**
 * Default allowed origins for editing requests. This is used to enforce CORS, CSP headers.
 */
export const EDITING_ALLOWED_ORIGINS = ['https://pages.sitecorecloud.io'];

export type EditingRenderEndpointConfig = {
  /**
   * Custom path for the endpoint. Default is `<routerPath>/render`
   * @example
   * { path: '/foo/render' } -> <routerPath>/foo/render
   */
  path?: string;
  /**
   * GraphQl Request Client Factory provided by the server bundle
   */
  clientFactory: GraphQLRequestClientFactory;
  /**
   * The dictionary service provided by the server bundle
   */
  dictionaryService: DictionaryService;
  /**
   * The appRenderer will produce the requested route's html
   */
  renderView: AppRenderer;
  /**
   * The default language provided by the server bundle
   */
  defaultLanguage: string;
};

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
};

export const editingRenderMiddleware = (config: EditingRenderEndpointConfig) => async (
  _req: Request,
  res: Response
): Promise<unknown> => {
  try {
    const { query } = _req;

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

    const graphQLEditingService = new GraphQLEditingService({
      clientFactory: config.clientFactory,
    });

    const data = await graphQLEditingService.fetchEditingData({
      siteName: query.sc_site as string,
      itemId: query.sc_itemid as string,
      language: query.sc_lang as string,
      version: query.sc_version as string,
    });

    if (!data) {
      throw new Error(`Unable to fetch editing data for preview ${JSON.stringify(query)}`);
    }

    const viewBag = { dictionary: {} };
    viewBag.dictionary = await config.dictionaryService.fetchDictionaryData(
      data.layoutData.sitecore.context.language || config.defaultLanguage
    );

    // Restrict the page to be rendered only within the allowed origins
    res.setHeader('Content-Security-Policy', getSCPHeader());

    config.renderView(
      (err, result) => {
        if (err) {
          handleError(res, err);
          return;
        }

        if (!result) {
          debug.editing('no result returned from renderView, returning 204');

          return res.status(204);
        }

        const statusCode = data.layoutData.sitecore.route ? 200 : 404;

        debug.editing('sending response with status %s', statusCode);

        return res.status(statusCode).json({ html: result.html });
      },
      query.route as string,
      data.layoutData,
      viewBag
    );
  } catch (err) {
    handleError(res, err);
    return;
  }
};

/**
 * Gets the Content-Security-Policy header value
 * @returns Content-Security-Policy header value
 */
const getSCPHeader = () => {
  return `frame-ancestors 'self' ${[getAllowedOriginsFromEnv(), ...EDITING_ALLOWED_ORIGINS].join(
    ' '
  )}`;
};

/**
 * Handle unexpected error
 * @param {Response} res server response
 * @param {Error} err error
 */
const handleError = (res: Response, err: unknown) => {
  debug.editing('response error %o', err);

  res.status(500).send('Internal Server Error');
};
