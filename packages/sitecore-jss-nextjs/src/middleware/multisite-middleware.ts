import { NextResponse, NextRequest } from 'next/server';
import { getSiteRewrite } from '@sitecore-jss/sitecore-jss/site';
import { debug } from '@sitecore-jss/sitecore-jss';
import { MiddlewareBase, MiddlewareBaseConfig } from './middleware';

export type MultisiteMiddlewareConfig = Omit<MiddlewareBaseConfig, 'disabled'> & {
  /**
   * Function used to determine if site should be resolved from sc_site cookie when present
   */
  useCookieResolution?: (req: NextRequest) => boolean;
};

/**
 * Middleware / handler for multisite support
 */
export class MultisiteMiddleware extends MiddlewareBase {
  /**
   * @param {MultisiteMiddlewareConfig} [config] Multisite middleware config
   */
  constructor(protected config: MultisiteMiddlewareConfig) {
    super(config);
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

  protected excludeRoute(pathname: string): boolean | undefined {
    // ignore files
    return pathname.includes('.') || super.excludeRoute(pathname);
  }

  private handler = async (req: NextRequest, res?: NextResponse): Promise<NextResponse> => {
    const pathname = req.nextUrl.pathname;
    const language = this.getLanguage(req);
    const hostname = this.getHostHeader(req) || this.defaultHostname;

    debug.multisite('multisite middleware start: %o', {
      pathname,
      language,
      hostname,
    });

    // Response will be provided if other middleware is run before us
    let response = res || NextResponse.next();

    if (this.isPreview(req) || this.excludeRoute(pathname)) {
      debug.multisite('skipped (%s)', this.isPreview(req) ? 'preview' : 'route excluded');

      return response;
    }

    // Site name can be forced by query string parameter or cookie
    const siteName =
      req.nextUrl.searchParams.get(this.SITE_SYMBOL) ||
      (this.config.useCookieResolution &&
        this.config.useCookieResolution(req) &&
        req.cookies.get(this.SITE_SYMBOL)?.value) ||
      this.config.siteResolver.getByHost(hostname).name;

    // Rewrite to site specific path
    const rewritePath = getSiteRewrite(pathname, {
      siteName,
    });

    // Note an absolute URL is required: https://nextjs.org/docs/messages/middleware-relative-urls
    const rewriteUrl = req.nextUrl.clone();

    rewriteUrl.pathname = rewritePath;

    response = NextResponse.rewrite(rewriteUrl);

    // Share site name with the following executed middlewares
    response.cookies.set(this.SITE_SYMBOL, siteName);
    // Share rewrite path with following executed middlewares
    response.headers.set('x-sc-rewrite', rewritePath);

    debug.multisite('multisite middleware end: %o', {
      rewritePath,
      siteName,
      headers: this.extractDebugHeaders(response.headers),
      cookies: response.cookies,
    });

    return response;
  };
}
