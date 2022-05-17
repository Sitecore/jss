import { NextRequest, NextResponse } from 'next/server';
import { RedirectsMiddleware } from '@sitecore-jss/sitecore-jss-nextjs/edge';
import config from 'temp/config';
import { MiddlewarePlugin } from '..';
import nextConfig from '../../../../next.config';

class RedirectsPlugin implements MiddlewarePlugin {
  private redirectsMiddleware: RedirectsMiddleware;
  private locales: string[];
  order = 0;

  constructor() {
    this.redirectsMiddleware = new RedirectsMiddleware({
      endpoint: config.graphQLEndpoint,
      apiKey: config.sitecoreApiKey,
      siteName: config.jssAppName,
    });
    this.locales = nextConfig().i18n.locales;
  }

  /**
   * exec async method - to find coincidence in url.pathname and redirects of site
   * @param req<NextRequest>
   * @returns Promise<NextResponse>
   */
  async exec(req: NextRequest): Promise<NextResponse> {
    return this.redirectsMiddleware.getHandler()(req, this.locales);
  }
}

export const redirectsPlugin = new RedirectsPlugin();
