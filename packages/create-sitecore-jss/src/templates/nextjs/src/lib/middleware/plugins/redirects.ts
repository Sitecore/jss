import { NextRequest, NextResponse } from 'next/server';
import { RedirectType, GraphQLRedirectsService } from '@sitecore-jss/sitecore-jss-nextjs';
import config from 'temp/config';
import { MiddlewarePlugin } from '..';

const REDIRECT_TYPE_PREFIX = 'REDIRECT_';
const REDIRECT_TYPE_DEFAULT = 301;

class RedirectsPlugin implements MiddlewarePlugin {
  private redirectsService: GraphQLRedirectsService;
  order = 0;

  constructor() {
    this.redirectsService = new GraphQLRedirectsService({
      endpoint: config.graphQLEndpoint,
      apiKey: config.sitecoreApiKey,
      siteName: config.jssAppName,
    });
  }

  /**
   * exec async method - to find coincidence in url.pathname and redirects of site
   * @param req<NextRequest>
   * @returns Promise<NextResponse>
   */
  async exec(req: NextRequest): Promise<NextResponse> {
    let existsRedirect: RedirectType | undefined;
    let redirectType: number | undefined;
    const url = req.nextUrl.clone();
    // Find the redirect from result of RedirectService
    const redirects = await this.redirectsService.fetchRedirects();

    if (redirects?.length) {
      existsRedirect = redirects.find(
        (redirect: RedirectType) => redirect.pattern === url.pathname
      );
    }

    if (existsRedirect) {
      url.pathname = existsRedirect.target;
      /** http code of redirect type **/
      redirectType = existsRedirect.redirectType.includes(REDIRECT_TYPE_PREFIX)
        ? Number(existsRedirect.redirectType.substring(REDIRECT_TYPE_PREFIX.length))
        : REDIRECT_TYPE_DEFAULT;

      return NextResponse.redirect(url, redirectType);
    }

    return NextResponse.next();
  }
}

export const redirectsPlugin = new RedirectsPlugin();
