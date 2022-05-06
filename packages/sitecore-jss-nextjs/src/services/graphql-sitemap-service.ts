import { GraphQLClient, GraphQLRequestClient, PageInfo } from '@sitecore-jss/sitecore-jss/graphql';
import { debug } from '@sitecore-jss/sitecore-jss';

/** @private */
export const languageError = 'The list of languages cannot be empty';

const languageEmptyError = 'The language must be a non-empty string';

const defaultQuery = /* GraphQL */ `
  query SitemapQuery(
    $siteName: String!
    $language: String!
    $includedPaths: [String]
    $excludedPaths: [String]
    $pageSize: Int = 10
    $after: String
  ) {
    site {
      siteInfo(site: $siteName) {
        routes(
          language: $language
          includedPaths: $includedPaths
          excludedPaths: $excludedPaths
          first: $pageSize
          after: $after
        ) {
          total
          pageInfo {
            endCursor
            hasNext
          }
          results {
            path: routePath
          }
        }
      }
    }
  }
`;
/**
 * type for input variables for the site routes query
 */
interface SiteRouteQueryVariables {
  /**
   * Required. The name of the site being queried.
   */
  siteName: string;
  /**
   * Required. The language to return routes/pages for.
   */
  language: string;
  /**
   * Optional. Only paths starting with these provided prefixes will be returned.
   */
  includedPaths?: string[];
  /**
   * Optional. Paths starting with these provided prefixes will be excluded from returned results.
   */
  excludedPaths?: string[];

  /** common variable for all GraphQL queries
   * it will be used for every type of query to regulate result batch size
   * Optional. How many result items to fetch in each GraphQL call. This is needed for pagination.
   * @default 10
   */
  pageSize?: number;
}

/**
 * Schema of data returned in response to a "site" query request
 * @template T The type of objects being requested.
 */
export interface SiteRouteQueryResult<T> {
  site: {
    siteInfo: {
      routes: {
        /**
         * Data needed to paginate the site results
         */
        pageInfo: PageInfo;
        results: T[];
      };
    };
  };
}

/**
 * The schema of data returned in response to a routes list query request
 */
export type RouteListQueryResult = {
  path: string;
};

/**
 * Configuration options for @see GraphQLSitemapService instances
 */
export interface GraphQLSitemapServiceConfig extends Omit<SiteRouteQueryVariables, 'language'> {
  /**
   * Your Graphql endpoint
   */
  endpoint: string;

  /**
   * The API key to use for authentication.
   */
  apiKey: string;
}

/**
 * Object model of a site page item.
 */
export type StaticPath = {
  params: {
    path: string[];
  };
  locale?: string;
};

/**
 * Service that fetches the list of site pages using Sitecore's GraphQL API.
 * This list is used for SSG and Export functionality.
 * @mixes SearchQueryService<PageListQueryResult>
 */
export class GraphQLSitemapService {
  private graphQLClient: GraphQLClient;

  /**
   * Gets the default query used for fetching the list of site pages
   */
  protected get query(): string {
    return defaultQuery;
  }

  /**
   * Creates an instance of graphQL sitemap service with the provided options
   * @param {GraphQLSitemapServiceConfig} options instance
   */
  constructor(public options: GraphQLSitemapServiceConfig) {
    this.graphQLClient = this.getGraphQLClient();
  }

  /**
   * Fetch sitemap which could be used for generation of static pages during `next export`.
   * The `locale` parameter will be used in the item query, but since i18n is not supported,
   * the output paths will not include a `language` property.
   * @param {string} locale which application supports
   * @returns an array of @see StaticPath objects
   */
  async fetchExportSitemap(locale: string): Promise<StaticPath[]> {
    const formatPath = (path: string[]) => ({
      params: {
        path,
      },
    });

    return this.fetchSitemap([locale], formatPath);
  }

  /**
   * Fetch sitemap which could be used for generation of static pages using SSG mode
   * @param {string[]} locales locales which application supports
   * @returns an array of @see StaticPath objects
   */
  async fetchSSGSitemap(locales: string[]): Promise<StaticPath[]> {
    const formatPath = (path: string[], locale: string) => ({
      params: {
        path,
      },
      locale,
    });

    return this.fetchSitemap(locales, formatPath);
  }

  /**
   * Fetch a flat list of all pages that belong to the specificed site and have a
   * version in the specified language(s).
   * @param {string[]} languages Fetch pages that have versions in this language(s).
   * @param {Function} formatStaticPath Function for transforming the raw search results into (@see StaticPath) types.
   * @returns list of pages
   * @throws {RangeError} if the list of languages is empty.
   * @throws {RangeError} if the any of the languages is an empty string.
   */
  protected async fetchSitemap(
    languages: string[],
    formatStaticPath: (path: string[], language: string) => StaticPath
  ): Promise<StaticPath[]> {
    if (!languages.length) {
      throw new RangeError(languageError);
    }
    const siteName = this.options.siteName;

    const args: SiteRouteQueryVariables = {
      siteName,
      language: '',
      pageSize: this.options.pageSize,
      includedPaths: this.options.includedPaths,
      excludedPaths: this.options.excludedPaths,
    };

    // Fetch paths using all locales
    const paths = await Promise.all(
      languages.map((language) => {
        if (language === '') {
          throw new RangeError(languageEmptyError);
        }
        args.language = language;
        debug.sitemap('fetching sitemap data for %s', language);

        return this.fetchLanguageSitePaths(this.query, args).then((results) => {
          return results.map((item) =>
            formatStaticPath(item.path.replace(/^\/|\/$/g, '').split('/'), language)
          );
        });
      })
    );

    // merge promises results into single result
    return ([] as StaticPath[]).concat(...paths);
  }

  protected async fetchLanguageSitePaths(
    query: string,
    args: SiteRouteQueryVariables
  ): Promise<RouteListQueryResult[]> {
    let results: RouteListQueryResult[] = [];
    let hasNext = true;
    let after = '';

    while (hasNext) {
      const fetchResponse = await this.graphQLClient.request<
        SiteRouteQueryResult<RouteListQueryResult>
      >(query, {
        ...args,
        after,
      });

      results = results.concat(fetchResponse?.site?.siteInfo?.routes?.results);
      hasNext = fetchResponse.site.siteInfo.routes.pageInfo.hasNext;
      after = fetchResponse.site.siteInfo.routes.pageInfo.endCursor;
    }
    return results;
  }

  /**
   * Gets a GraphQL client that can make requests to the API. Uses graphql-request as the default
   * library for fetching graphql data (@see GraphQLRequestClient). Override this method if you
   * want to use something else.
   * @returns {GraphQLClient} implementation
   */
  protected getGraphQLClient(): GraphQLClient {
    return new GraphQLRequestClient(this.options.endpoint, {
      apiKey: this.options.apiKey,
      debugger: debug.sitemap,
    });
  }
}
