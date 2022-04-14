import { NextResponse, NextRequest } from 'next/server';
import { GraphQLSitemapService, GraphQLSitemapServiceConfig } from '@sitecore-jss/sitecore-jss/site';

/**
 * extended RedirectsMiddlewareConfig config type for RedirectsMiddleware
 */
export type SitemapMiddlewareConfig = Omit<GraphQLSitemapServiceConfig, 'fetch'>;

/**
 * Middleware / handler fetches all redirects from Sitecore instance by grapqhl service
 * compares with current url and redirects to target url
 */
export class RedirectsMiddleware {
  private sitemapService: GraphQLSitemapService;

  /**
   * NOTE: we provide native fetch for compatibility on Next.js Edge Runtime
   * (underlying default 'cross-fetch' is not currently compatible: https://github.com/lquixada/cross-fetch/issues/78)
   * @param {RedirectsMiddlewareConfig} [config] redirects middleware config
   */
  constructor(config: SitemapMiddlewareConfig) {
    this.sitemapService = new GraphQLSitemapService({ ...config, fetch: fetch });
  }

  /**
   * Gets the Next.js API route handler
   * @returns route handler
   */
  public getHandler(): (req: NextRequest) => Promise<NextResponse> {
    return this.handler;
  }

  private handler = async (req: NextRequest): Promise<NextResponse> => {
    const url = req.nextUrl.clone();
    // Find the redirect from result of RedirectService

    const existsSitemap = await this.getExistsRedirect(url);

    if(existsSitemap) {
      return NextResponse.rewrite(existsSitemap);
    }

    return NextResponse.next();
  };

  /**
   * Method returns RedirectInfo when matches
   * @param url
   * @return Promise<RedirectInfo>
   * @private
   */
  private async getExistsRedirect(url: URL): Promise<string | undefined> {
    const sitemaps = await this.sitemapService.fetchSitemap();

    return sitemaps.find((sitemap: string) => sitemap == url.pathname );
  }
}
