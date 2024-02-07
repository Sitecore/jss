import { AxiosDataFetcher, debug } from '@sitecore-jss/sitecore-jss';
import { NextApiRequest } from 'next';
import {
  QUERY_PARAM_PROTECTION_BYPASS_SITECORE,
  QUERY_PARAM_PROTECTION_BYPASS_VERCEL,
} from './constants';

/**
 * Configuration for `RenderMiddlewareBase`.
 */
export type RenderMiddlewareBaseConfig = {
  /**
   * The `AxiosDataFetcher` instance to use for API requests.
   * @default new AxiosDataFetcher()
   * @see AxiosDataFetcher
   */
  dataFetcher?: AxiosDataFetcher;
  /**
   * Function used to determine the root server URL. This is used for the route/page and subsequent data API requests.
   * By default, the host header is used, with https protocol on Vercel (due to serverless function architecture) and http protocol elsewhere.
   * @param {NextApiRequest} req The current request.
   * @default `${process.env.VERCEL ? 'https' : 'http'}://${req.headers.host}`;
   * @see resolvePageUrl
   */
  resolveServerUrl?: (req: NextApiRequest) => string;
};

/**
 * Base class for middleware that handles pages and components rendering in Sitecore Editors.
 */
export abstract class RenderMiddlewareBase {
  protected dataFetcher: AxiosDataFetcher;
  protected resolveServerUrl: (req: NextApiRequest) => string;

  constructor(protected config?: RenderMiddlewareBaseConfig) {
    this.dataFetcher = config?.dataFetcher ?? new AxiosDataFetcher({ debugger: debug.editing });
    this.resolveServerUrl = config?.resolveServerUrl ?? this.defaultResolveServerUrl;
  }

  /**
   * Gets query parameters that should be passed along to subsequent requests
   * @param {Object} query Object of query parameters from incoming URL
   * @returns Object of approved query parameters
   */
  protected getQueryParamsForPropagation = (
    query: Partial<{ [key: string]: string | string[] }>
  ): { [key: string]: string } => {
    const params: { [key: string]: string } = {};
    if (query[QUERY_PARAM_PROTECTION_BYPASS_SITECORE]) {
      params[QUERY_PARAM_PROTECTION_BYPASS_SITECORE] = query[
        QUERY_PARAM_PROTECTION_BYPASS_SITECORE
      ] as string;
    }
    if (query[QUERY_PARAM_PROTECTION_BYPASS_VERCEL]) {
      params[QUERY_PARAM_PROTECTION_BYPASS_VERCEL] = query[
        QUERY_PARAM_PROTECTION_BYPASS_VERCEL
      ] as string;
    }
    return params;
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
}
