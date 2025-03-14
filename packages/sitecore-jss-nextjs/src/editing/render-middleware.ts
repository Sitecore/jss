import {
  QUERY_PARAM_VERCEL_PROTECTION_BYPASS,
  QUERY_PARAM_VERCEL_SET_BYPASS_COOKIE,
  EDITING_PASS_THROUGH_HEADERS,
} from './constants';
import { IncomingHttpHeaders } from 'http';

/**
 * Base class for middleware that handles pages and components rendering in Sitecore Editors.
 */
export abstract class RenderMiddlewareBase {
  /**
   * Gets query parameters that should be passed along to subsequent requests (e.g. for deployment protection bypass)
   * @param {object} query Object of query parameters from incoming URL
   * @returns Object of approved query parameters
   */
  protected getQueryParamsForPropagation = (
    query: Partial<{ [key: string]: string | string[] }>
  ): { [key: string]: string } => {
    const params: { [key: string]: string } = {};
    if (query[QUERY_PARAM_VERCEL_PROTECTION_BYPASS]) {
      params[QUERY_PARAM_VERCEL_PROTECTION_BYPASS] = query[
        QUERY_PARAM_VERCEL_PROTECTION_BYPASS
      ] as string;
    }
    if (query[QUERY_PARAM_VERCEL_SET_BYPASS_COOKIE]) {
      params[QUERY_PARAM_VERCEL_SET_BYPASS_COOKIE] = query[
        QUERY_PARAM_VERCEL_SET_BYPASS_COOKIE
      ] as string;
    }
    return params;
  };

  /**
   * Get headers that should be passed along to subsequent requests
   * @param {IncomingHttpHeaders} headers Incoming HTTP Headers
   * @returns Object of approved headers
   */
  protected getHeadersForPropagation = (
    headers: IncomingHttpHeaders
  ): { [key: string]: string } => {
    // Filter and normalize headers
    const filteredHeaders = EDITING_PASS_THROUGH_HEADERS.reduce((acc, header) => {
      const value = headers[header];
      if (value) {
        acc[header] = Array.isArray(value) ? value.join(', ') : value;
      }
      return acc;
    }, {} as Record<string, string>);

    return filteredHeaders;
  };
}
