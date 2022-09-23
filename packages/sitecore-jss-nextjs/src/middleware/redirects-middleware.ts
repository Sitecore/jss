import regexParser from 'regex-parser';
import { NextResponse, NextRequest } from 'next/server';
import {
  RedirectInfo,
  GraphQLRedirectsService,
  GraphQLRedirectsServiceConfig,
  REDIRECT_TYPE_301,
  REDIRECT_TYPE_302,
  REDIRECT_TYPE_SERVER_TRANSFER,
} from '@sitecore-jss/sitecore-jss/site';

/**
 * extended RedirectsMiddlewareConfig config type for RedirectsMiddleware
 */
export type RedirectsMiddlewareConfig = Omit<GraphQLRedirectsServiceConfig, 'fetch'> & {
  locales: string[];
};
/**
 * Middleware / handler fetches all redirects from Sitecore instance by grapqhl service
 * compares with current url and redirects to target url
 */
export class RedirectsMiddleware {
  private redirectsService: GraphQLRedirectsService;
  private locales: string[];

  /**
   * @param {RedirectsMiddlewareConfig} [config] redirects middleware config
   */
  constructor(config: RedirectsMiddlewareConfig) {
    // NOTE: we provide native fetch for compatibility on Next.js Edge Runtime
    // (underlying default 'cross-fetch' is not currently compatible: https://github.com/lquixada/cross-fetch/issues/78)
    this.redirectsService = new GraphQLRedirectsService({ ...config, fetch: fetch });
    this.locales = config.locales;
  }

  /**
   * Gets the Next.js API route handler
   * @returns route handler
   */
  public getHandler(): (req: NextRequest) => Promise<NextResponse> {
    return this.handler;
  }

  private handler = async (req: NextRequest): Promise<NextResponse> => {
    // Find the redirect from result of RedirectService
    const existsRedirect = await this.getExistsRedirect(req);

    if (!existsRedirect) {
      return NextResponse.next();
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

  /**
   * Method returns RedirectInfo when matches
   * @param {NextRequest} req
   * @returns Promise<RedirectInfo | undefined>
   * @private
   */
  private async getExistsRedirect(req: NextRequest): Promise<RedirectInfo | undefined> {
    const redirects = await this.redirectsService.fetchRedirects();

    return redirects.find((redirect: RedirectInfo) => {
      return (
        (regexParser(redirect.pattern.toLowerCase()).test(req.nextUrl.pathname.toLowerCase()) ||
          regexParser(redirect.pattern.toLowerCase()).test(
            `/${req.nextUrl.locale}${req.nextUrl.pathname}`.toLowerCase()
          )) &&
        (redirect.locale ? redirect.locale.toLowerCase() === req.nextUrl.locale.toLowerCase() : true)
      );
    });
  }
}
