import { NextResponse, NextRequest } from 'next/server';
import {
  GraphQLSitemapService,
  GraphQLSitemapServiceConfig,
} from '@sitecore-jss/sitecore-jss/site';

/**
 * extended SitemapMiddlewareConfig config type for SitemapMiddleware
 */
export type SitemapMiddlewareConfig = Omit<GraphQLSitemapServiceConfig, 'fetch'>;

/**
 * Middleware / handler fetches all sitemap from Sitecore instance by grapqhl service
 * compares with current url and sitemap to target url
 */
export class SitemapMiddleware {
  private sitemapService: GraphQLSitemapService;

  /**
   * NOTE: we provide native fetch for compatibility on Next.js Edge Runtime
   * (underlying default 'cross-fetch' is not currently compatible: https://github.com/lquixada/cross-fetch/issues/78)
   * @param {SitemapMiddlewareConfig} [config] sitemap middleware config
   */
  constructor(private config: SitemapMiddlewareConfig) {
    this.sitemapService = new GraphQLSitemapService({ ...this.config, fetch: fetch });
  }

  /**
   * Gets the Next.js API route handler
   * @returns route handler
   */
  public getHandler(req: NextRequest): Promise<NextResponse> {
    return this.handler(req);
  }

  /**
   * handler which fetc sitemaps and rewrite url
   * @param req<NextRequest>
   * @returns Promise{NextResponse}
   */
  private handler = async (req: NextRequest): Promise<NextResponse> => {
    const url = req.nextUrl.clone();
    // Find the sitemap from result of SitemapService
    const existsSitemap = await this.getExistsSitemap(url);

    if (existsSitemap) {
      const url = `${this.config.sitecoreApiHost}${existsSitemap}`;
      return NextResponse.rewrite(url);
    }

    return NextResponse.next();
  };

  /**
   * Method returns SitemapInfo when matches
   * @param url{URL}
   * @returns Promise{SitemapInfo}
   * @private
   */
  private async getExistsSitemap(url: URL): Promise<string | undefined> {
    const sitemaps = await this.sitemapService.fetchSitemap();

    return sitemaps.find((sitemap: string) => sitemap.includes(url.pathname));
  }
}
