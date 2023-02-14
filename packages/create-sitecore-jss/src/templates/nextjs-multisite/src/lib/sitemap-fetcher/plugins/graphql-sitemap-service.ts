import {
  GraphQLSitemapService,
  StaticPath,
  constants,
  SiteInfo,
} from '@sitecore-jss/sitecore-jss-nextjs';
import config from 'temp/config';
import { SitemapFetcherPlugin } from '..';
import { GetStaticPathsContext } from 'next';
import { siteResolver } from 'lib/site-resolver';

class GraphqlSitemapServicePlugin implements SitemapFetcherPlugin {
  _graphqlSitemapService: GraphQLSitemapService;

  constructor() {
    this._graphqlSitemapService = new GraphQLSitemapService({
      endpoint: config.graphQLEndpoint,
      apiKey: config.sitecoreApiKey,
      sites: siteResolver.sites.map((site: SiteInfo) => site.name),
    });
  }

  async exec(context?: GetStaticPathsContext): Promise<StaticPath[]> {
    if (process.env.EXPORT_MODE) {
      // Disconnected Export mode
      if (process.env.JSS_MODE !== constants.JSS_MODE.DISCONNECTED) {
        return this._graphqlSitemapService.fetchExportSitemap(config.defaultLanguage);
      }
    }
    return this._graphqlSitemapService.fetchSSGSitemap(context?.locales || []);
  }
}

export const graphqlSitemapServicePlugin = new GraphqlSitemapServicePlugin();
