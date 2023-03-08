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
import { debug } from '@sitecore-jss/sitecore-jss';
import { MiddlewareBase, MiddlewareBaseConfig } from './middleware';

/**
 * extended RedirectsMiddlewareConfig config type for RedirectsMiddleware
 */
export type RedirectsMiddlewareConfig = Omit<GraphQLRedirectsServiceConfig, 'fetch'> &
  MiddlewareBaseConfig & {
    locales: string[];
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
  };
/**
 * Middleware / handler fetches all redirects from Sitecore instance by grapqhl service
 * compares with current url and redirects to target url
 */
export class RedirectsMiddleware extends MiddlewareBase {
  private redirectsService: GraphQLRedirectsService;
  private locales: string[];

  /**
   * @param {RedirectsMiddlewareConfig} [config] redirects middleware config
   */
  constructor(protected config: RedirectsMiddlewareConfig) {
    super({ defaultHostname: config.defaultHostname, excludeRoute: config.excludeRoute });

    // NOTE: we provide native fetch for compatibility on Next.js Edge Runtime
    // (underlying default 'cross-fetch' is not currently compatible: https://github.com/lquixada/cross-fetch/issues/78)
    this.redirectsService = new GraphQLRedirectsService({ ...config, fetch: fetch });
    this.locales = config.locales;
  }

  /**
   * Gets the Next.js API route handler
   * @returns route handler
   */
  public getHandler(): (req: NextRequest, res?: NextResponse) => Promise<NextResponse> {
    return this.handler;
  }

  private handler = async (req: NextRequest, res?: NextResponse): Promise<NextResponse> => {
    const hostHeader = this.getHostHeader(req);
    const hostname = hostHeader || this.defaultHostname;
    const siteName =
      res?.cookies.get(this.SITE_SYMBOL)?.value || this.config.getSite(hostname).name;

    const createResponse = async () => {
      if (!hostHeader) {
        debug.redirects(`host header is missing, default ${hostname} is used`);
      }

      if (this.config.disabled && this.config.disabled(req, NextResponse.next())) {
        debug.redirects('skipped (redirects middleware is disabled)');
        return res || NextResponse.next();
      }

      if (this.isPreview(req) || this.excludeRoute(req.nextUrl.pathname)) {
        debug.redirects('skipped (%s)', this.isPreview(req) ? 'preview' : 'route excluded');

        return res || NextResponse.next();
      }
      // Find the redirect from result of RedirectService
      const existsRedirect = await this.getExistsRedirect(req, siteName);

      if (!existsRedirect) {
        debug.redirects('skipped (redirect does not exist)');

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

    const response = await createResponse();

    // Share site name with the following executed middlewares
    response.cookies.set(this.SITE_SYMBOL, siteName);

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
