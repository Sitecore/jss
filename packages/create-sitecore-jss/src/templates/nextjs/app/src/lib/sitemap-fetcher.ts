/* eslint-disable @typescript-eslint/no-var-requires */
import { GraphQLSitemapService, StaticPath } from '@sitecore-jss/sitecore-jss-nextjs';
import { GetStaticPathsContext } from 'next';
import config from 'temp/config';
import pkg from '../../package.json';

export class SitecoreSitemapFetcher {
  private _graphqlSitemapService: GraphQLSitemapService;

  constructor() {
    this._graphqlSitemapService = new GraphQLSitemapService({
      endpoint: config.graphQLEndpoint,
      apiKey: config.sitecoreApiKey,
      siteName: config.jssAppName,
      /*
      The Sitemap Service needs a root item ID in order to fetch the list of pages for the current
      app. If your Sitecore instance only has 1 JSS App, you can specify the root item ID here;
      otherwise, the service will attempt to figure out the root item for the current JSS App using GraphQL and app name.
      rootItemId: '{GUID}'
      */
    });
  }

  /**
   * Generates SitecoreSitemap for given mode (Export / Disconnected Export / SSG)
   * @param {GetStaticPathsContext} context
   */
  async fetch(context?: GetStaticPathsContext): Promise<StaticPath[]> {
    // If we are in Export mode
    if (process.env.EXPORT_MODE) {
      return this._graphqlSitemapService.fetchExportSitemap(pkg.config.language);
    }

    return this._graphqlSitemapService.fetchSSGSitemap(context?.locales || []);
  }
}

export const sitemapFetcher = new SitecoreSitemapFetcher();
