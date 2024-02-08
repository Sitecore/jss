import {
  QUERY_PARAM_PROTECTION_BYPASS_SITECORE,
  QUERY_PARAM_PROTECTION_BYPASS_VERCEL,
} from './constants';

/**
 * Base class for middleware that handles pages and components rendering in Sitecore Editors.
 */
export abstract class RenderMiddlewareBase {
  /**
   * Gets query parameters that should be passed along to subsequent requests (e.g. for deployment protection bypass)
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
}
