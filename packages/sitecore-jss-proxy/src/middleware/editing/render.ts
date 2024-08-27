import { GraphQLRequestClientFactory, debug } from '@sitecore-jss/sitecore-jss';
import { AppRenderer, RenderResponse } from '../../types/AppRenderer';
import { Request, Response } from 'express';
import { getAllowedOriginsFromEnv } from '@sitecore-jss/sitecore-jss/utils';
import {
  GraphQLEditingService,
  EDITING_ALLOWED_ORIGINS,
  RenderMetadataQueryParams,
} from '@sitecore-jss/sitecore-jss/editing';

/**
 * Configuration for the editing render endpoint
 */
export type EditingRenderEndpointOptions = {
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
   * The appRenderer will produce the requested route's html
   */
  renderView: AppRenderer;
};

type MetadataRequest = Request & { query: RenderMetadataQueryParams };

/**
 * Middleware to handle editing render requests
 * @param {EditingRenderEndpointOptions} config for the endpoint
 */
export const editingRenderMiddleware = (config: EditingRenderEndpointOptions) => async (
  req: MetadataRequest,
  res: Response
): Promise<void> => {
  try {
    debug.editing('editing render middleware start');

    const startTimestamp = Date.now();

    const query = req.query;

    const requiredQueryParams: (keyof RenderMetadataQueryParams)[] = [
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

      res.status(400).send(`Missing required query parameters: ${missingQueryParams.join(', ')}`);

      return;
    }

    const graphQLEditingService = new GraphQLEditingService({
      clientFactory: config.clientFactory,
    });

    const data = await graphQLEditingService.fetchEditingData({
      siteName: query.sc_site,
      itemId: query.sc_itemid,
      language: query.sc_lang,
      version: query.sc_version,
      layoutKind: query.sc_layoutKind,
    });

    if (!data || !data.layoutData || !data.dictionary) {
      throw new Error(`Unable to fetch editing data for ${JSON.stringify(query)}`);
    }

    const viewBag = { dictionary: data.dictionary };

    config.renderView(
      (err: Error | null, result: RenderResponse | null) => {
        if (err) {
          handleError(res, err);
          return;
        }

        if (!result) {
          debug.editing('editing render middleware end in %dms: %o', Date.now() - startTimestamp, {
            status: 204,
            route: query.route,
          });

          res.status(204).send();
          return;
        }

        const statusCode = data.layoutData.sitecore.route ? 200 : 404;

        // Restrict the page to be rendered only within the allowed origins
        res.setHeader('Content-Security-Policy', getSCPHeader());

        debug.editing('editing render middleware end in %dms: %o', Date.now() - startTimestamp, {
          status: statusCode,
          route: query.route,
        });

        res.status(statusCode).send(result.html);
      },
      query.route,
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
 * @returns {string} Content-Security-Policy header value
 */
export const getSCPHeader = () => {
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
