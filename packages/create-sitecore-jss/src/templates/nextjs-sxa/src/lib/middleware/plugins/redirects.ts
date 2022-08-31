import { NextRequest, NextResponse } from 'next/server';
import { RedirectsMiddleware } from '@sitecore-jss/sitecore-jss-nextjs/middleware';
import config from 'temp/config';
import { MiddlewarePlugin } from '..';

class RedirectsPlugin implements MiddlewarePlugin {
  private redirectsMiddleware: RedirectsMiddleware;
  order = 0;

  constructor() {
    this.redirectsMiddleware = new RedirectsMiddleware({
      endpoint: config.graphQLEndpoint,
      apiKey: config.sitecoreApiKey,
      siteName: config.jssAppName,
      // These are all the locales you support in your application.
      // These should match those in your next.config.js (i18n.locales).
      locales: ['en'],
    });
  }

  /**
   * exec async method - to find coincidence in url.pathname and redirects of site
   * @param req<NextRequest>
   * @returns Promise<NextResponse>
   */
  async exec(req: NextRequest): Promise<NextResponse> {
    return this.redirectsMiddleware.getHandler()(req);
  }
}

export const redirectsPlugin = new RedirectsPlugin();
