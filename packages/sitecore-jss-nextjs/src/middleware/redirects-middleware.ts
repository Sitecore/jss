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
export type RedirectsMiddlewareConfig = Omit<GraphQLRedirectsServiceConfig, 'fetch'>;

/**
 * Middleware / handler fetches all redirects from Sitecore instance by grapqhl service
 * compares with current url and redirects to target url
 */
export class RedirectsMiddleware {
  private redirectsService: GraphQLRedirectsService;

  /**
   * NOTE: we provide native fetch for compatibility on Next.js Edge Runtime
   * (underlying default 'cross-fetch' is not currently compatible: https://github.com/lquixada/cross-fetch/issues/78)
   * @param config
   */
  constructor(config: RedirectsMiddlewareConfig) {
    this.redirectsService = new GraphQLRedirectsService({ ...config, fetch: fetch });
  }

  public getHandler(): (req: NextRequest) => Promise<NextResponse> {
    return this.handler;
  }

  private handler = async (req: NextRequest): Promise<NextResponse> => {
    const url = req.nextUrl.clone();
    // Find the redirect from result of RedirectService

    const existsRedirect = await this.getExistsRedirect(url);

    if (!existsRedirect) {
      return NextResponse.next();
    }

    url.search = existsRedirect.isQueryStringPreserved ? url.search : '';
    url.pathname = existsRedirect.target;

    /** return Response redirect with http code of redirect type **/
    switch (existsRedirect.redirectType) {
      case REDIRECT_TYPE_301:
        return NextResponse.redirect(url, 301);
      case REDIRECT_TYPE_302:
        return NextResponse.redirect(url, 302);
      case REDIRECT_TYPE_SERVER_TRANSFER:
        return NextResponse.rewrite(url);
      default:
        return NextResponse.next();
    }
  };

  /**
   * Method returns RedirectInfo when matches
   * @param url
   * @return Promise<RedirectInfo>
   * @private
   */
  public async getExistsRedirect(url: URL): Promise<RedirectInfo | undefined> {
    const redirects = await this.redirectsService.fetchRedirects();

    return redirects.find((redirect: RedirectInfo) =>
      regexParser(redirect.pattern).test(url.pathname)
    );
  }
}
