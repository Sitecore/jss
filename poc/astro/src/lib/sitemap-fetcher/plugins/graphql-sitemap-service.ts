import { SiteInfo, MultisiteGraphQLSitemapService } from "@sitecore-jss/sitecore-jss-nextjs";
import type { StaticPath, SitemapFetcherPlugin } from "../index";
import clientFactory from "@lib/graphql-client-factory";
import config from "@temp/config";
import { siteResolver } from '@lib/site-resolver';
import { pathExtractor } from "@lib/extract-path";

class GraphqlSitemapServicePlugin implements SitemapFetcherPlugin {
  _graphqlSitemapService: MultisiteGraphQLSitemapService;

  constructor() {
    this._graphqlSitemapService = new MultisiteGraphQLSitemapService({
      sites: [...new Set(siteResolver.sites.map((site: SiteInfo) => site.name))],
      clientFactory,
      includePersonalizedRoutes: true,
    });
  }

  async exec(locales: string[]): Promise<StaticPath[]> {
    const paths = await this._graphqlSitemapService.fetchSSGSitemap(locales);

    let astroPaths = paths.map((path) => {
      const concatPath = path.params.path.join("/");
      const extractedPath = pathExtractor.extract(path.params);
      const isDefaultLocale = path.locale === config.defaultLanguage;

      if (!isDefaultLocale) {
        return {
          params: {
            path: `${concatPath.replace(extractedPath, '')}/${path.locale}${extractedPath}`
          }
        }
      }

      return {
        params: {
          path: concatPath
        }
      }
    });

    return astroPaths;
  }
}

export const graphqlSitemapServicePlugin = new GraphqlSitemapServicePlugin();
