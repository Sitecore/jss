import { NextResponse, NextRequest } from 'next/server';
import { debug } from '@sitecore-jss/sitecore-jss';
import { MultisiteResolver } from '@sitecore-jss/sitecore-jss/multisite';

/**
 * Middleware / handler fetches all redirects from Sitecore instance by grapqhl service
 * compares with current url and redirects to target url
 */
export class MultisiteMiddleware {
  /**
   * @param {MultiiteResolver} siteResolver SiteResolver
   */
  constructor(public siteResolver: MultisiteResolver) {}

  /**
   * Gets the Next.js middleware handler with error handling
   * @returns middleware handler
   */
  public getHandler(): (req: NextRequest, res?: NextResponse) => Promise<NextResponse> {
    return async (req, res) => {
      try {
        return await this.handler(req, res);
      } catch (error) {
        console.log('Siteresolver middleware failed:');
        console.log(error);
        return res || NextResponse.next();
      }
    };
  }

  protected excludeRoute(pathname: string) {
    if (
      pathname.startsWith('/api/') || // Ignore Next.js API calls
      pathname.startsWith('/_next') // Ignore next service calls
    ) {
      return true;
    }
    return false;
  }

  private handler = async (req: NextRequest, res?: NextResponse): Promise<NextResponse> => {
    const host = req.headers.get('host') || '';
    const pathname = req.nextUrl.pathname;

    debug.multisite('multisite middleware start: %o', {
      host,
    });

    // Response will be provided if other middleware is run before us (e.g. redirects)
    let response = res || NextResponse.next();

    if (response.redirected || this.excludeRoute(pathname)) {
      debug.multisite('skipped (%s)', response.redirected ? 'redirected' : 'route excluded');
      return response;
    }

    // Get site name for host name
    const siteConfig = this.siteResolver.getSiteForHost(host);
    if (!siteConfig) {
      debug.multisite('skipped (site config not found)');
      return response;
    }

    // Rewrite to site path
    const rewritePath = this.siteResolver.getMultisiteRewrite(pathname, siteConfig);
    // Note an absolute URL is required: https://nextjs.org/docs/messages/middleware-relative-urls
    const rewriteUrl = req.nextUrl.clone();
    rewriteUrl.pathname = rewritePath;
    response = NextResponse.rewrite(rewriteUrl);

    debug.multisite('multisite middleware end: %o', { rewritePath });

    return response;
  };
}
