import { GraphQLSitemapService } from '@sitecore-jss/sitecore-jss-nextjs';
import config from 'temp/config';
import { SitemapFetcherPlugin } from '..';
import { GetStaticPathsContext } from 'next';
import { StaticPath, constants } from '@sitecore-jss/sitecore-jss-nextjs';
import { SiteConfig } from '@sitecore-jss/sitecore-jss-nextjs/middleware';

class GraphqlSitemapServicePlugin implements SitemapFetcherPlugin {
  _graphqlSitemapService: GraphQLSitemapService;

  constructor() {
    this._graphqlSitemapService = new GraphQLSitemapService({
      endpoint: config.graphQLEndpoint,
      apiKey: config.sitecoreApiKey,
    });
  }

  async exec(context?: GetStaticPathsContext): Promise<StaticPath[]> {
    const siteConfigs = JSON.parse(config.sites) as SiteConfig[];
    const sites = siteConfigs.map((siteConfig) => siteConfig.name);

    if (process.env.EXPORT_MODE) {
      // Disconnected Export mode
      if (process.env.JSS_MODE !== constants.JSS_MODE.DISCONNECTED) {
        return this._graphqlSitemapService.fetchExportSitemap(config.defaultLanguage, sites);
      }
    }
    return this._graphqlSitemapService.fetchSSGSitemap(context?.locales || [], sites);
  }
}

export const graphqlSitemapServicePlugin = new GraphqlSitemapServicePlugin();
