import type { SiteInfo, SiteResolver } from "@sitecore-jss/sitecore-jss/site";
import type { APIContext } from 'astro';

export type MiddlewareContext = {
  context: APIContext;
  response: Response;
};

export type MiddlewareBaseConfig = {
  /**
   * function, determines if middleware should be turned off, based on cookie, header, or other considerations
   * @param {APIContext} [req] request object from middleware handler
   */
  disabled?: (context?: APIContext) => boolean;
  /**
   * Function used to determine if route should be excluded.
   * By default, files (pathname.includes('.')), Astro API routes (pathname.startsWith('/api/')), and Sitecore API routes (pathname.startsWith('/sitecore/')) are ignored.
   * This is an important performance consideration since Astro Edge middleware runs on every request.
   * @param {string} pathname The pathname
   * @returns {boolean} Whether to exclude the route
   */
  excludeRoute?: (pathname: string) => boolean;
  /**
   * Fallback hostname in case `host` header is not present
   * @default localhost
   */
  defaultHostname?: string;
  /**
   * Site resolution implementation by name/hostname
   */
  siteResolver: SiteResolver;
};

export abstract class MiddlewareBase {
  protected SITE_SYMBOL = "sc_site";
  protected defaultHostname: string;

  constructor(protected config: MiddlewareBaseConfig) {
    this.defaultHostname = config.defaultHostname || "localhost";
  }

  protected excludeRoute(pathname: string) {
    return (
      pathname.startsWith("/api/") || // Ignore Astro API calls
      pathname.startsWith("/sitecore/") || // Ignore Sitecore API calls
      (this.config?.excludeRoute && this.config?.excludeRoute(pathname))
    );
  }

  /**
   * Safely extract all headers for debug logging
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
   * @param {APIContext} ctx API context
   * @returns {string} language
   */
  protected getLanguage(ctx: APIContext) {
    return ctx.currentLocale || ctx.preferredLocale || 'en';
  }

  /**
   * Extract 'host' header
   * @param {APIContext} ctx API context
   */
  protected getHostHeader(ctx: APIContext) {
    return ctx.request.headers.get("host")?.split(":")[0];
  }

  /**
   * Get site information.
   * Can not be used in **Preview** mode, since site will not be resolved
   * @param {APIContext} ctx API context
   * @returns {SiteInfo} site information
   */
  protected getSite(ctx: APIContext): SiteInfo {
    const siteNameCookie = ctx.cookies.get(this.SITE_SYMBOL)?.value;

    if (siteNameCookie) return this.config.siteResolver.getByName(siteNameCookie);

    const hostname = this.getHostHeader(ctx) || this.defaultHostname;

    return this.config.siteResolver.getByHost(hostname);
  }
}
