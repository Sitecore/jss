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

  /**
   * The API key to use for authentication.
   */
  apiKey: string;

  /**
   * How many dictionary items to fetch in each GraphQL call. This is needed for pagination.
   * @default 10
   */
  pageSize?: number;
}

/**
 * A reply from the GraphQL endpoint for the 'SitePageQuery' query
 */
type SitePageQueryResult = {
  search: {
    /**
     * Data needed to paginate the results
     */
    pageInfo: {
      /**
       * string token that can be used to fetch the next page of results
       */
      endCursor: string;
      /**
       * a value that indicates whether more pages of results are available
       */
      hasNext: boolean;
    };
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
  constructor(public options: GraphQLSitemapServiceConfig) {
    this.options.pageSize = this.options.pageSize ?? DEFAULTS.pageSize;
  }

  /**
   * Fetch sitemap which could be used for generation of static pages during `next export`.
   * The `locale` parameter will be used in the item query, but since i18n is not supported,
   * the output paths will not include a `language` property.
   * @param {string} locale which application supports
   * @param {string} rootItemPath root item path
   * @throws {RangeError} if a valid root item ID cannot be determined from the specified root item path.
   * @throws {RangeError} if the specified list of locales is empty or contains invalid values.
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
   * @param {string[]} locales locales which application supports
   * @param {string} rootItemPath root item path
   * @throws {RangeError} if a valid root item ID cannot be determined from the specified root item path.
   * @throws {RangeError} if the specified locale is not valid.
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
   * @throws {RangeError} if a valid root item ID cannot be determined from the specified root item path.
   * @throws {RangeError} if the specified language list is not valid.
   */
  async fetchSitemap(
    languages: string[],
    rootItemPath: string,
    formatStaticPath: (path: string[], language: string) => StaticPath
  ): Promise<StaticPath[]> {
    if (!languages.length) {
      throw new RangeError('The list of languages cannot be empty');
    }

    if (!rootItemPath) {
      throw new RangeError('The root item path must be a non-empty string');
    }

    const client = new GraphQLRequestClient(this.options.endpoint, this.options.apiKey);
    const rootItemId = await this.getRootItemId(client, rootItemPath);

    if (!rootItemId) {
      throw new Error(`The item path ${rootItemPath} did not return a valid item ID`);
    }

    // Fetch paths using all locales
    const paths = await Promise.all(
      languages.map((language) => {
        return this.fetch(client, language, rootItemId, formatStaticPath);
      })
    );

    // merge promises result
    return ([] as StaticPath[]).concat(...paths);
  }

  private async fetch(
    client: GraphQLRequestClient,
    language: string,
    rootItemId: string,
    formatStaticPath: (path: string[], language: string) => StaticPath
  ): Promise<StaticPath[]> {
    if (!language) {
      throw new RangeError('The language value must be a non-empty string');
    }

    const results: StaticPath[] = [];
    let hasNext = true;
    let after = '';

    while (hasNext) {
      const fetchResponse = await client.request<SitePageQueryResult>(query, {
        rootItemId,
        language,
        pageSize: this.options.pageSize,
        after,
      });

      // transform to array of paths
      fetchResponse?.search?.results.forEach((item: { url: { path: string } }) => {
        // replace first and last /
        const path = item.url.path.replace(/^\/|\/$/g, '').split('/');
        results.push(formatStaticPath(path, language));
      }, []);

      hasNext = fetchResponse.search.pageInfo.hasNext;
      after = fetchResponse.search.pageInfo.endCursor;
    }

    return results;
  }

  /**
   * Returns query to request root item id
   * @param {string} rootItemPath root item path
   */
  private getRootItemIdQuery(rootItemPath: string): string {
    // TODO: this should use 'layout' query, which only needs the site name (Anastasiya, March 2021)
    return `query RootItemQuery{
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
    const data = await client.request<{ item: { id: string } | null }>(query);
    return data.item?.id;
  }
}
