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

export class RedirectsMiddleware {
  private redirectsService: GraphQLRedirectsService;

  constructor(config: GraphQLRedirectsServiceConfig) {
    this.redirectsService = new GraphQLRedirectsService(config);
  }

  public getHandler(): (req: NextRequest) => Promise<NextResponse> {
    return this.handler;
  }

  private async handler(req: NextRequest) {
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
  }

  private async getExistsRedirect(url: URL): Promise<RedirectInfo | undefined> {
    const redirects = await this.redirectsService.fetchRedirects();

    return redirects.find((redirect: RedirectInfo) =>
      regexParser(redirect.pattern).test(url.pathname)
    );
  }
}
