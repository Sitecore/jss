import { NextRequest, NextResponse } from 'next/server';
import { SitemapMiddleware } from '@sitecore-jss/sitecore-jss-nextjs/edge';
import config from 'temp/config';
import { MiddlewarePlugin } from '..';

class SitemapPlugin implements MiddlewarePlugin {
  private sitemapMiddleware: SitemapMiddleware;
  order = 0;

  /**
   * create sitemap middleware
   */
  constructor() {
    this.sitemapMiddleware = new SitemapMiddleware({
      endpoint: config.graphQLEndpoint,
      apiKey: config.sitecoreApiKey,
      siteName: config.jssAppName,
      sitecoreApiHost: config.sitecoreApiHost
    });
  }

  /**
   * exec async method - to find coincidence in url.pathname and rewrite to sitemap url of site
   * @param req<NextRequest>
   * @returns Promise<NextResponse>
   */
  async exec(req: NextRequest): Promise<NextResponse> {
    return this.sitemapMiddleware.getHandler(req);
  }
}

export const sitemapPlugin = new SitemapPlugin();
