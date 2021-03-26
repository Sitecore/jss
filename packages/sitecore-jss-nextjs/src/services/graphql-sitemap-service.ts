import chalk from 'chalk';
import { GraphQLRequestClient } from '@sitecore-jss/sitecore-jss';

export type StaticPath = {
  params: {
    path: string[];
  };
  locale?: string;
};

// TODO: There is some code duplication between here and graphql-dictionary-service;
// this can be improved by providing a generic way to call the "search" query (Anastasiya, March 2021)

const DEFAULTS = Object.freeze({
  pageSize: 10,
});

const query = `
query SitePageQuery(
  $rootItemId: String!,
  $language: String!,
  $pageSize: Int = 10,
  $after: String
) {
  search(
    where: {
      AND:[
        { name: "_path",      value: $rootItemId },
        { name: "_language",  value: $language   },
        { name: "_hasLayout", value: "true"      }
      ]
    }
    first: $pageSize
    after: $after
  ) {
    total
    pageInfo {
      endCursor
      hasNext
    }
    results {
      url {
        path
      }
    }
  }
}`;

/**
 * Configuration options for @see GraphQLDictionaryService instances
 */
export interface GraphQLSitemapServiceConfig {
  /**
   * Your Graphql endpoint
   */
  endpoint: string;
};

/**
 * A reply from the GraphQL endpoint for the 'SitePageQuery' query
 */
type SitePageQueryResult = {
  search: {
    results: {
      url: {
        path: string;
      };
    }[];
  };
};

/**
 * Fetch the list of site pages using  Sitecore's GraphQL API. This list is used for SSG and Export functionality.
 * Note: Uses graphql-request as the default library for fetching graphql data (@see GraphQLRequestClient).
 */
export class GraphQLSitemapService {
  /**
   * Creates an instance of graphQL sitemap service with the provided options
   * @param {GraphQLSitemapServiceConfig} options instance
   */
  constructor(private config: GraphQLSitemapServiceConfig) {}

  /**
   * Fetch sitemap which could be used for generation of static pages during `next export`.
   * The `locale` parameter will be used in the item query, but since i18n is not supported,
   * the output paths will not include a `language` property.
   * @param {string} locale which application supports
   * @param {string} rootItemPath root item path
   */
  async fetchExportSitemap(locale: string, rootItemPath: string): Promise<StaticPath[]> {
    const formatPath = (path: string[]) => ({
      params: {
        path,
      },
    });

    return this.fetchSitemap([locale], rootItemPath, formatPath);
  }

  /**
   * Fetch sitemap which could be used for generation of static pages using SSG mode
   * @param {string[]} locales which application supports
   * @param {string} rootItemPath root item path
   */
  async fetchSSGSitemap(locales: string[], rootItemPath: string): Promise<StaticPath[]> {
    const formatPath = (path: string[], locale: string) => ({
      params: {
        path,
      },
      locale,
    });

    return this.fetchSitemap(locales, rootItemPath, formatPath);
  }

  /**
   * Gets the list of site pages.
   * @param {string[]} languages
   * @param {string} rootItemPath
   * @param {Function} formatStaticPath
   * @default Search query
   * query SitePageQuery(
   *   $rootItemId: String!,
   *   $language: String!,
   *   $pageSize: Int = 10,
   *   $after: String
   * ) {
   *   search(
   *     where: {
   *       AND:[
   *         { name: "_path",      value: $rootItemId },
   *         { name: "_language",  value: $language   },
   *         { name: "_hasLayout", value: "true"      }
   *       ]
   *     }
   *     first: $pageSize
   *     after: $after
   *   ) {
   *     total
   *     pageInfo {
   *       endCursor
   *       hasNext
   *     }
   *     results {
   *       url {
   *         path
   *       }
   *     }
   *   }
   * }
   */
  async fetchSitemap(
    languages: string[],
    rootItemPath: string,
    formatStaticPath: (path: string[], language: string) => StaticPath
  ): Promise<StaticPath[]> {
    if (!languages.length) {
      return [];
    }
    const client = new GraphQLRequestClient(this.options.endpoint);
    const rootItemId = await this.getRootItemId(client, rootItemPath);
    const getStaticPaths = async (language: string): Promise<StaticPath[]> => {
      const data = await client.request<SitePageQueryResult>(query, {
        rootItemId,
        language,
        pageSize: this.options.pageSize,
      });

      const items = data?.search.results ? data.search.results : [];

      // transform to array of paths
      const staticPaths = items.reduce((list: StaticPath[], item: { url: { path: string } }) => {
        // replace first and last /
        const path = item.url.path.replace(/^\/|\/$/g, '').split('/');

        return list.concat(formatStaticPath(path, language));
      }, []);

      return staticPaths;
    };

    // Fetch paths using all locales
    const paths = await Promise.all(languages.map(getStaticPaths));

    // merge promises result
    return ([] as StaticPath[]).concat(...paths);
  }

  /**
   * Returns query to request root item id
   * @param {string} rootItemPath root item path
   */
  private getRootItemIdQuery(rootItemPath: string): string {
    // TODO: this should use 'layout' query, which only needs the site name (Anastasiya, March 2021)
    return `query {
      item(path:"${rootItemPath}") {
        id
      }
    }`;
  }

  /**
   * Request root item id using the item path
   * @param {GraphQLRequestClient} client that fetches data from a GraphQL endpoint.
   * @param {string} rootItemPath root item path
   */
  private async getRootItemId(
    client: GraphQLRequestClient,
    rootItemPath: string
  ): Promise<string | undefined> {
    const query = this.getRootItemIdQuery(rootItemPath);
    const data = await client.request<{ item: { id: string } }>(query);
    const rootItemId = data?.item?.id;
    if (!rootItemId) {
      console.error(
        chalk.red(
          `Error occurred while fetching sitemap: root item id could not be found for provided rootItemPath '${rootItemPath}'`
        )
      );
    }

    return rootItemId;
  }
}
