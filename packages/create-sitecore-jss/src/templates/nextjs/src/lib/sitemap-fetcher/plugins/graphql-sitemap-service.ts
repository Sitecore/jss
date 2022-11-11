import { GraphQLSitemapService, SiteResolver, SiteConfig } from '@sitecore-jss/sitecore-jss-nextjs';
import config from 'temp/config';
import { SitemapFetcherPlugin } from '..';
import { GetStaticPathsContext } from 'next';
import { StaticPath, constants } from '@sitecore-jss/sitecore-jss-nextjs';
import { siteResolverFactory } from 'lib/site-resolver-factory';

class GraphqlSitemapServicePlugin implements SitemapFetcherPlugin {
  _siteResolver: SiteResolver;

  constructor() {
    this._siteResolver = siteResolverFactory.create();
  }

  async exec(context?: GetStaticPathsContext): Promise<StaticPath[]> {
    if (process.env.EXPORT_MODE) {
      // Disconnected Export mode
      if (process.env.JSS_MODE !== constants.JSS_MODE.DISCONNECTED) {
        return await this.getExportSitemap();
      }
    }
    return await this.getSSGSitemap(context);
  }

  async getExportSitemap(): Promise<StaticPath[]> {
    const results: StaticPath[] = [];

    await Promise.all(
      this._siteResolver.allSites.map(async (site: SiteConfig) => {
        const graphqlSitemapService = new GraphQLSitemapService({
          endpoint: config.graphQLEndpoint,
          apiKey: config.sitecoreApiKey,
          siteName: site.name,
        });

        const paths = await graphqlSitemapService.fetchExportSitemap(config.defaultLanguage);

        const mappedPaths = paths.map(
          (path: StaticPath): StaticPath =>
            ({
              params: {
                path: this._siteResolver.getSitemapPath(path.params.path, site),
              },
              locale: path.locale,
            } as StaticPath)
        );

        results.concat(mappedPaths);
      })
    );

    return results;
  }

  async getSSGSitemap(context?: GetStaticPathsContext): Promise<StaticPath[]> {
    const results: StaticPath[] = [];

    await Promise.all(
      this._siteResolver.allSites.map(async (site: SiteConfig) => {
        const graphqlSitemapService = new GraphQLSitemapService({
          endpoint: config.graphQLEndpoint,
          apiKey: config.sitecoreApiKey,
          siteName: site.name,
        });

        const paths = await graphqlSitemapService.fetchSSGSitemap(context?.locales || []);

        const mappedPaths = paths.map(
          (path: StaticPath): StaticPath =>
            ({
              params: {
                path: this._siteResolver.getSitemapPath(path.params.path, site),
              },
              locale: path.locale,
            } as StaticPath)
        );

        results.concat(mappedPaths);
      })
    );

    return results;
  }
}

export const graphqlSitemapServicePlugin = new GraphqlSitemapServicePlugin();
