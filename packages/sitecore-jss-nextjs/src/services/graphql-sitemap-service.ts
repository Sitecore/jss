import {
  GraphQLClient,
  GraphQLRequestClient,
  debug,
  getAppRootId,
  SearchServiceConfig,
  SearchQueryService,
} from '@sitecore-jss/sitecore-jss';

/** @private */
export const queryError =
  'Valid value for rootItemId not provided and failed to auto-resolve app root item.';

/** @private */
export const languageError = 'The list of languages cannot be empty';

// Even though _hasLayout should always be "true" in this query, using a variable is necessary for compatibility with Edge
const defaultQuery = /* GraphQL */ `
  query SitemapQuery(
    $rootItemId: String!
    $language: String!
    $pageSize: Int = 10
    $hasLayout: String = "true"
    $after: String
  ) {
    search(
      where: {
        AND: [
          { name: "_path", value: $rootItemId, operator: CONTAINS }
          { name: "_language", value: $language }
          { name: "_hasLayout", value: $hasLayout }
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
  }
`;

/**
 * The schema of data returned in response to a page list query request
 */
export type PageListQueryResult = { url: { path: string } };

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
 * Configuration options for @see GraphQLSitemapService instances
 */
export interface GraphQLSitemapServiceConfig extends SearchServiceConfig {
  /**
   * Your Graphql endpoint
   */
  endpoint: string;

  /**
   * The API key to use for authentication.
   */
  apiKey: string;

  /**
   * Optional. The template ID of a JSS App to use when searching for the appRootId.
   * @default '061cba1554744b918a0617903b102b82' (/sitecore/templates/Foundation/JavaScript Services/App)
   */
  jssAppTemplateId?: string;
}

/**
 * Service that fetches the list of site pages using Sitecore's GraphQL API.
 * This list is used for SSG and Export functionality.
 * @mixes SearchQueryService<PageListQueryResult>
 */
export class GraphQLSitemapService {
  private graphQLClient: GraphQLClient;
  private searchService: SearchQueryService<PageListQueryResult>;

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
    this.searchService = new SearchQueryService<PageListQueryResult>(this.graphQLClient);
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
   * Fetch a flat list of all pages that are descendants of the specified root item and have a
   * version in the specified language(s).
   * @param {string[]} languages Fetch pages that have versions in this language(s).
   * @param {Function} formatStaticPath Function for transforming the raw search results into (@see StaticPath) types.
   * @returns list of pages
   * @throws {RangeError} if the list of languages is empty.
   * @throws {Error} if the app root was not found for the specified site and language.
   */
  protected async fetchSitemap(
    languages: string[],
    formatStaticPath: (path: string[], language: string) => StaticPath
  ): Promise<StaticPath[]> {
    if (!languages.length) {
      throw new RangeError(languageError);
    }

    // If the caller does not specify a root item ID, then we try to figure it out
    const rootItemId =
      this.options.rootItemId ||
      (await getAppRootId(
        this.graphQLClient,
        this.options.siteName,
        languages[0],
        this.options.jssAppTemplateId
      ));

    if (!rootItemId) {
      throw new Error(queryError);
    }

    // Fetch paths using all locales
    const paths = await Promise.all(
      languages.map((language) => {
        debug.sitemap('fetching sitemap data for %s', language);
        return this.searchService
          .fetch(this.query, {
            rootItemId,
            language,
            pageSize: this.options.pageSize,
          })
          .then((results) => {
            return results.map((item) =>
              formatStaticPath(item.url.path.replace(/^\/|\/$/g, '').split('/'), language)
            );
          });
      })
    );

    // merge promises results into single result
    return ([] as StaticPath[]).concat(...paths);
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

  /**
   * Gets a service that can perform GraphQL "search" queries to fetch @see PageListQueryResult
   * @returns {SearchQueryService<PageListQueryResult>} the search query service
   */
  protected getSearchService(): SearchQueryService<PageListQueryResult> {
    return new SearchQueryService<PageListQueryResult>(this.graphQLClient);
  }
}
