import regexParser from 'regex-parser';
import { NextResponse, NextRequest } from 'next/server';
import {
  RedirectInfo,
  GraphQLRedirectsService,
  GraphQLRedirectsServiceConfig,
  REDIRECT_TYPE_301,
  REDIRECT_TYPE_302,
  REDIRECT_TYPE_SERVER_TRANSFER,
  SiteInfo,
} from '@sitecore-jss/sitecore-jss/site';

/**
 * extended RedirectsMiddlewareConfig config type for RedirectsMiddleware
 */
export type RedirectsMiddlewareConfig = Omit<GraphQLRedirectsServiceConfig, 'fetch'> & {
  locales: string[];
  /**
   * Function used to determine if route should be excluded from RedirectsMiddleware.
   * By default, files (pathname.includes('.')), Next.js API routes (pathname.startsWith('/api/')), and Sitecore API routes (pathname.startsWith('/sitecore/')) are ignored.
   * This is an important performance consideration since Next.js Edge middleware runs on every request.
   * @param {string} pathname The pathname
   * @returns {boolean} Whether to exclude the route from RedirectsMiddleware
   */
  excludeRoute?: (pathname: string) => boolean;
  /**
   * function, determines if middleware should be turned off, based on cookie, header, or other considerations
   *  @param {NextRequest} [req] optional: request object from middleware handler
   *  @param {NextResponse} [res] optional: response object from middleware handler
   * @returns {boolean} false by default
   */
  disabled?: (req?: NextRequest, res?: NextResponse) => boolean;
  /**
   * function used to resolve site for given hostname
   */
  getSite: (hostname: string) => SiteInfo;
  /**
   * fallback hostname in case `host` header is not present
   * @default localhost
   */
  defaultHostname?: string;
};
/**
 * Middleware / handler fetches all redirects from Sitecore instance by grapqhl service
 * compares with current url and redirects to target url
 */
export class RedirectsMiddleware {
  private redirectsService: GraphQLRedirectsService;
  private locales: string[];
  private defaultHostname: string;

  /**
   * @param {RedirectsMiddlewareConfig} [config] redirects middleware config
   */
  constructor(protected config: RedirectsMiddlewareConfig) {
    // NOTE: we provide native fetch for compatibility on Next.js Edge Runtime
    // (underlying default 'cross-fetch' is not currently compatible: https://github.com/lquixada/cross-fetch/issues/78)
    this.redirectsService = new GraphQLRedirectsService({ ...config, fetch: fetch });
    this.locales = config.locales;
    this.defaultHostname = config.defaultHostname || 'localhost';
  }

  /**
   * Gets the Next.js API route handler
   * @returns route handler
   */
  public getHandler(): (req: NextRequest, res?: NextResponse) => Promise<NextResponse> {
    return this.handler;
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

  protected getHostname(req: NextRequest) {
    const hostHeader = req.headers.get('host')?.split(':')[0];
    return hostHeader || this.defaultHostname;
  }

  private handler = async (req: NextRequest, res?: NextResponse): Promise<NextResponse> => {
    const hostname = this.getHostname(req);
    const siteName = res?.cookies.get('sc_site') || this.config.getSite(hostname).name;

    const createResponse = async () => {
      if (
        (this.config.disabled && this.config.disabled(req, NextResponse.next())) ||
        this.excludeRoute(req.nextUrl.pathname) ||
        (this.config.excludeRoute && this.config.excludeRoute(req.nextUrl.pathname))
      ) {
        return res || NextResponse.next();
      }
      // Find the redirect from result of RedirectService
      const existsRedirect = await this.getExistsRedirect(req, siteName);

      if (!existsRedirect) {
        return res || NextResponse.next();
      }

      const url = req.nextUrl.clone();
      const absoluteUrlRegex = new RegExp('^(?:[a-z]+:)?//', 'i');
      if (absoluteUrlRegex.test(existsRedirect.target)) {
        url.href = existsRedirect.target;
        url.locale = req.nextUrl.locale;
      } else {
        url.search = existsRedirect.isQueryStringPreserved ? url.search : '';
        const urlFirstPart = existsRedirect.target.split('/')[1];
        if (this.locales.includes(urlFirstPart)) {
          url.locale = urlFirstPart;
          url.pathname = existsRedirect.target.replace(`/${urlFirstPart}`, '');
        } else {
          url.pathname = existsRedirect.target;
        }
      }

      const redirectUrl = decodeURIComponent(url.href);

      /** return Response redirect with http code of redirect type **/
      switch (existsRedirect.redirectType) {
        case REDIRECT_TYPE_301:
          return NextResponse.redirect(redirectUrl, 301);
        case REDIRECT_TYPE_302:
          return NextResponse.redirect(redirectUrl, 302);
        case REDIRECT_TYPE_SERVER_TRANSFER:
          return NextResponse.rewrite(redirectUrl);
        default:
          return NextResponse.next();
      }
    };

    const response = await createResponse(res);

    // Share site name with the following executed middlewares
    response.cookies.set('sc_site', siteName);

    return response;
  };

  /**
   * Method returns RedirectInfo when matches
   * @param {NextRequest} req request
   * @param {string} siteName site name
   * @returns Promise<RedirectInfo | undefined>
   * @private
   */
  private async getExistsRedirect(
    req: NextRequest,
    siteName: string
  ): Promise<RedirectInfo | undefined> {
    const redirects = await this.redirectsService.fetchRedirects(siteName);

    return redirects.length
      ? redirects.find((redirect: RedirectInfo) => {
          return (
            (regexParser(redirect.pattern.toLowerCase()).test(req.nextUrl.pathname.toLowerCase()) ||
              regexParser(redirect.pattern.toLowerCase()).test(
                `/${req.nextUrl.locale}${req.nextUrl.pathname}`.toLowerCase()
              )) &&
            (redirect.locale
              ? redirect.locale.toLowerCase() === req.nextUrl.locale.toLowerCase()
              : true)
          );
        })
      : undefined;
  }
}
