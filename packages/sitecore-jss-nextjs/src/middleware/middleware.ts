import { NextRequest } from 'next/server';

export type MiddlewareBaseConfig = {
  /**
   * Function used to determine if route should be excluded.
   * By default, files (pathname.includes('.')), Next.js API routes (pathname.startsWith('/api/')), and Sitecore API routes (pathname.startsWith('/sitecore/')) are ignored.
   * This is an important performance consideration since Next.js Edge middleware runs on every request.
   * @param {string} pathname The pathname
   * @returns {boolean} Whether to exclude the route
   */
  excludeRoute?: (pathname: string) => boolean;
  /**
   * Fallback hostname in case `host` header is not present
   * @default localhost
   */
  defaultHostname?: string;
};

export abstract class MiddlewareBase {
  protected SITE_SYMBOL = 'sc_site';
  protected defaultHostname: string;

  constructor(protected config?: MiddlewareBaseConfig) {
    this.defaultHostname = config?.defaultHostname || 'localhost';
  }

  /**
   * Determines if mode is preview
   * @param {NextRequest} req request
   * @returns {boolean} is preview
   */
  protected isPreview(req: NextRequest) {
    return !!(
      req.cookies.get('__prerender_bypass')?.value || req.cookies.get('__next_preview_data')?.value
    );
  }

  protected excludeRoute(pathname: string) {
    return (
      pathname.includes('.') || // Ignore files
      pathname.startsWith('/api/') || // Ignore Next.js API calls
      pathname.startsWith('/sitecore/') || // Ignore Sitecore API calls
      pathname.startsWith('/_next') || // Ignore next service calls
      (this.config?.excludeRoute && this.config?.excludeRoute(pathname))
    );
  }

  /**
   * Safely extract all headers for debug logging
   * Necessary to avoid middleware issue https://github.com/vercel/next.js/issues/39765
   * @param {Headers} incomingHeaders Incoming headers
   * @returns Object with headers as key/value pairs
   */
  protected extractDebugHeaders(incomingHeaders: Headers) {
    const headers = {} as { [key: string]: string };
    incomingHeaders.forEach((value, key) => (headers[key] = value));
    return headers;
  }

  /**
   * Provides used language
   * @param {NextRequest} req request
   * @returns {string} language
   */
  protected getLanguage(req: NextRequest) {
    return req.nextUrl.locale || req.nextUrl.defaultLocale || 'en';
  }

  /**
   * Extract 'host' header
   * @param {NextRequest} req request
   */
  protected getHostHeader(req: NextRequest) {
    return req.headers.get('host')?.split(':')[0];
  }
}
