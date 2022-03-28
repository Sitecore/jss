import { NextRequest, NextResponse } from 'next/server';
import { RedirectService, RedirectType } from '@sitecore-jss/sitecore-jss-nextjs';
import config from 'temp/config';
import { MiddlewarePlugin } from '..';

class RedirectPlugin implements MiddlewarePlugin {
  private redirectService: RedirectService;
  order = 0;

  constructor() {
    this.redirectService = new RedirectService({
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
    const redirects = await RedirectService.fetchRedirects();

    if (redirects?.length) {
      existsRedirect = redirects.find(
        (redirect: RedirectType) => redirect.pattern === url.pathname
      );
    }

    if (existsRedirect) {
      url.pathname = existsRedirect.target;
      redirectType = Number(existsRedirect.redirectType.substring('REDIRECT_'.length)); // http code of redirect type

      return NextResponse.redirect(url, redirectType);
    }

    return NextResponse.next();
  }
}

export const redirectPlugin = new RedirectPlugin();
