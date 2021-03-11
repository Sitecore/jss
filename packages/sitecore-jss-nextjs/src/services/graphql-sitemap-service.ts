import chalk from 'chalk';
import { GraphQLRequestClient } from '@sitecore-jss/sitecore-jss';
import { StaticPath } from '../sharedTypes/sitemap';

export type GraphQLSitemapServiceConfig = {
  /**
   * Your Graphql endpoint
   */
  endpoint: string;
};

type SearchResult = {
  search: {
    results: { url: { path: string } }[];
  };
};

export class GraphQLSitemapService {
  /**
   * Provides ability to fetch sitemap from graphql endpoint.
   * Sitemap can be used for SSG/Export
   * @param {GraphQLSitemapServiceConfig} config graphql sitemap service config
   */
  constructor(private config: GraphQLSitemapServiceConfig) { }

  /**
   * Fetch sitemap which could be used for generation of static pages during `next export`.
   * The `locale` parameter will be used in the item query, but since i18n is not supported,
   * the output paths will not include a `locale` property.
   * @param {string} locale locale which application supports
   * @param {string} rootItemPath root item path
   * @param {Function} [formatSearchQuery] override default search query
   *
   * @default
   * Search query
   * search(
   *    where: {
   *      AND:[
   *        {
   *           name:"_path",
   *          value:"${rootItemId.toLowerCase()}"
   *        },
   *        {
   *          name:"_language",
   *          value:"${locale}"
   *        },
   *        {
   *          name:"_hasLayout",
   *          value :"true"
   *        }
   *      ]
   *    }
   *  )
   */
  async fetchExportSitemap(
    locale: string,
    rootItemPath: string,
    formatSearchQuery?: (rootItemId: string, locale: string) => string
  ): Promise<StaticPath[]> {
    const formatPath = (path: string[]) => ({
      params: {
        path,
      },
    });

    return this.fetch([locale], rootItemPath, formatPath, formatSearchQuery);
  }

  /**
   * Fetch sitemap which could be used for generation of static pages using SSG mode
   * @param {string[]} locales locales which application supports
   * @param {string} rootItemPath root item path
   * @param {Function} [formatSearchQuery] override default search query
   *
   * @default
   * Search query
   * search(
   *    where: {
   *      AND:[
   *        {
   *           name:"_path",
   *          value:"${rootItemId.toLowerCase()}"
   *        },
   *        {
   *          name:"_language",
   *          value:"${locale}"
   *        },
   *        {
   *          name:"_hasLayout",
   *          value :"true"
   *        }
   *      ]
   *    }
   *  )
   */
  async fetchSSGSitemap(
    locales: string[],
    rootItemPath: string,
    formatSearchQuery?: (rootItemId: string, locale: string) => string
  ): Promise<StaticPath[]> {
    const formatPath = (path: string[], locale: string) => ({
      params: {
        path,
      },
      locale,
    });

    return this.fetch(locales, rootItemPath, formatPath, formatSearchQuery);
  }

  /**
   * Internal fetch
   * @param {string[]} locales
   * @param {string} rootItemPath
   * @param {Function} formatStaticPath
   * @param {Function} [formatSearchQuery]
   */
  private async fetch(
    locales: string[],
    rootItemPath: string,
    formatStaticPath: (path: string[], locale: string) => StaticPath,
    formatSearchQuery?: (rootItemId: string, locale: string) => string
  ): Promise<StaticPath[]> {
    if (!locales.length) {
      return [];
    }

    const rootItemId = await this.getRootItemId(rootItemPath);

    if (!rootItemId) {
      console.error(
        chalk.red(
          `Error occurred while fetching sitemap: root item id could not be found for provided rootItemPath '${rootItemPath}'`
        )
      );
      return [];
    }

    const getStaticPaths = async (locale: string): Promise<StaticPath[]> => {
      const query = this.getSitemapQuery(rootItemId, locale, formatSearchQuery);

      const data = await this.createClient()
        .request<SearchResult>(query)
        .catch((error) => {
          console.error(
            chalk.red('Error occurred while fetching sitemap:'),
            error.response || error
          );

          return null;
        });

      const items = data?.search.results ? data.search.results : [];

      // todo: convert to array.map
      const staticPaths = items.reduce((list: StaticPath[], item: { url: { path: string } }) => {
        // replace first and last /
        // transform to array of paths
        const path = item.url.path.replace(/^\/|\/$/g, '').split('/');

        return list.concat(formatStaticPath(path, locale));
      }, []);

      return staticPaths;
    };

    // Fetch paths using all locales
    const paths = await Promise.all(locales.map(getStaticPaths));

    // merge promises result
    return ([] as StaticPath[]).concat(...paths);
  }

  /**
   * Returns new graphql client instance
   */
  private createClient(): GraphQLRequestClient {
    const { endpoint } = this.config;

    return new GraphQLRequestClient(endpoint);
  }

  /**
   * Returns query to request root item id
   * @param {string} rootItemPath root item path
   */
  private getRootItemIdQuery(rootItemPath: string): string {
    return `query {
      item(path:"${rootItemPath}") {
        id
      }
    }`;
  }

  /**
   * Request root item id using path
   * @param {string} rootItemPath root item path
   */
  private async getRootItemId(rootItemPath: string): Promise<string | undefined> {
    const query = this.getRootItemIdQuery(rootItemPath);

    const data = await this.createClient()
      .request<{ item: { id: string } }>(query)
      .catch((error) => {
        console.error(
          chalk.red('Error occurred while fetching root item id:'),
          error.response || error
        );

        return null;
      });

    return data?.item?.id;
  }

  /**
   * Graphql query in order to fetch sitemap
   * @param {string} rootItemId
   * @param {string} locale
   * @param {Function} [formatSearchQuery] generate custom search query
   */
  private getSitemapQuery(
    rootItemId: string,
    locale: string,
    formatSearchQuery?: (rootItemId: string, locale: string) => string
  ): string {
    const searchQuery = formatSearchQuery
      ? formatSearchQuery(rootItemId, locale)
      : `search(
      where: {
        AND:[
          {
            name:"_path",
            value:"${rootItemId.toLowerCase()}"
          },
          {
            name:"_language",
            value:"${locale}"
          },
          {
            name:"_hasLayout",
            value :"true"
          }
        ]
      }
    )`;

    return `query {
      ${searchQuery}{
        results {
          url {
            path
          }
        }
      }
    }`;
  }
}
