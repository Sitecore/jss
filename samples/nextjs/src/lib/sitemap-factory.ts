import {
  GraphQLSitemapService,
  DisconnectedSitemapService,
  StaticPath,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { GetStaticPathsContext } from 'next';
import config from 'temp/config';
import { config as packageConfig } from '../../package.json';

export class SitecoreSitemapFactory {
  private GRAPHQL_ROOT_ITEM_PATH = `/sitecore/content/${config.jssAppName}/home`;
  private DISCONNECTED_SITEMAP_SERVICE_ENDPOINT = `${config.sitecoreApiHost}/sitecore/api/sitemap`;

  private _graphqlSitemapService: GraphQLSitemapService;
  private _disconnectedSitemapService: DisconnectedSitemapService;

  constructor() {
    this._graphqlSitemapService = new GraphQLSitemapService({
      endpoint: config.graphqlEndpoint,
    });

    this._disconnectedSitemapService = new DisconnectedSitemapService({
      endpoint: this.DISCONNECTED_SITEMAP_SERVICE_ENDPOINT,
    });
  }

  /**
   * Create SitecoreSitemap for given mode (Export / Disconnected Export / SSG)
   * @param {GetStaticPathsContext} context
   */
  async create(context?: GetStaticPathsContext): Promise<StaticPath[]> {
    // If we are in Export/Disconnected Export mode
    if (process.env.EXPORT_MODE) {
      return process.env.JSS_MODE === 'disconnected'
        ? this._disconnectedSitemapService.fetchExportSitemap(packageConfig.language)
        : this._graphqlSitemapService.fetchExportSitemap(
            packageConfig.language,
            this.GRAPHQL_ROOT_ITEM_PATH
          );
    }

    return this._graphqlSitemapService.fetchSSGSitemap(
      context?.locales || [],
      this.GRAPHQL_ROOT_ITEM_PATH
    );
  }
}

export const sitemapFactory = new SitecoreSitemapFactory();
