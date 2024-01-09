import { GraphQLSitemapService } from "@sitecore-jss/sitecore-jss-nextjs";
import type { StaticPath, SitemapFetcherPlugin } from "../index";
import clientFactory from "@lib/graphql-client-factory";
import config from "@temp/config";

class GraphqlSitemapServicePlugin implements SitemapFetcherPlugin {
  _graphqlSitemapService: GraphQLSitemapService;

  constructor() {
    this._graphqlSitemapService = new GraphQLSitemapService({
      siteName: config.sitecoreSiteName,
      clientFactory,
    });
  }

  async exec(locales: string[]): Promise<StaticPath[]> {
    const paths = await this._graphqlSitemapService.fetchSSGSitemap(locales);

    const astroPaths = paths.map((path) => {
      const concatPath = path.params.path.join("/");
      const isDefaultLocale = path.locale === config.defaultLanguage;

      if (concatPath === "") {
        return {
          params: {
            path: path.locale === config.defaultLanguage ? undefined : path.locale,
          },
        };
      }

      return {
        params: {
          path: `${isDefaultLocale ? '' : `${path.locale}/`}${concatPath}`,
        },
      };
    });

    return astroPaths;
  }
}

export const graphqlSitemapServicePlugin = new GraphqlSitemapServicePlugin();
