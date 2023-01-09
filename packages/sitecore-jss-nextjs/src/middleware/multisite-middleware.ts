import { NextResponse, NextRequest } from 'next/server';
import { getSiteRewrite, SiteInfo } from '@sitecore-jss/sitecore-jss/site';
import { debug } from '@sitecore-jss/sitecore-jss';

export type MultisiteMiddlewareConfig = {
  /**
   * Function used to determine if route should be excluded during execution.
   * By default, files (pathname.includes('.')), Next.js API routes (pathname.startsWith('/api/')), and Sitecore API routes (pathname.startsWith('/sitecore/')) are ignored.
   * This is an important performance consideration since Next.js Edge middleware runs on every request.
   * @param {string} pathname The pathname
   * @returns {boolean} Whether to exclude the route
   */
  excludeRoute?: (pathname: string) => boolean;
  /**
   * function used to resolve site for given hostname
   */
  getSite: (hostname: string) => SiteInfo;
  /**
   * Fallback hostname in case `host` header is not present
   */
  defaultHostname?: string;
};

/**
 * Middleware / handler for multisite support
 */
export class MultisiteMiddleware {
  private defaultHostname: string;

  /**
   * @param {MultisiteMiddlewareConfig} [config] Multisite middleware config
   */
  constructor(protected config: MultisiteMiddlewareConfig) {
    this.defaultHostname = config.defaultHostname || 'localhost';
  }

  /**
   * Gets the Next.js middleware handler with error handling
   * @returns middleware handler
   */
  public getHandler(): (req: NextRequest, res?: NextResponse) => Promise<NextResponse> {
    return async (req, res) => {
      try {
        return await this.handler(req, res);
      } catch (error) {
        console.log('Multisite middleware failed:');
        console.log(error);
        return res || NextResponse.next();
      }
    };
  }

  protected excludeRoute(pathname: string) {
    if (
      pathname.includes('.') || // Ignore files
      pathname.startsWith('/api/') || // Ignore Next.js API calls
      pathname.startsWith('/sitecore/') || // Ignore Sitecore API calls
      pathname.startsWith('/_next') // Ignore next service calls
    ) {
      return true;
    }
    return false;
  }

  protected extractDebugHeaders(incomingHeaders: Headers) {
    const headers = {} as { [key: string]: string };
    incomingHeaders.forEach((value, key) => (headers[key] = value));
    return headers;
  }

  private handler = async (req: NextRequest, res?: NextResponse): Promise<NextResponse> => {
    const pathname = req.nextUrl.pathname;
    const hostname = req.headers.get('host')?.split(':')[0] || this.defaultHostname;

    debug.multisite('multisite middleware start: %o', {
      pathname,
      hostname,
    });

    // Response will be provided if other middleware is run before us (e.g. redirects)
    let response = res || NextResponse.next();

    if (
      this.excludeRoute(pathname) ||
      (this.config.excludeRoute && this.config.excludeRoute(pathname))
    ) {
      debug.multisite('skipped (%s)', 'route excluded');
      return response;
    }

    const { name: siteName } = this.config.getSite(hostname);

    // Rewrite to persononalized path
    const rewritePath = getSiteRewrite(pathname, {
      siteName,
    });

    // Note an absolute URL is required: https://nextjs.org/docs/messages/middleware-relative-urls
    const rewriteUrl = req.nextUrl.clone();

    rewriteUrl.pathname = rewritePath;

    response = NextResponse.rewrite(rewriteUrl);

    response.cookies.set('sc_site', siteName);

    debug.multisite('multisite middleware end: %o', {
      rewritePath,
      siteName,
      headers: this.extractDebugHeaders(response.headers),
      cookies: response.cookies,
    });

    return response;
  };
}
