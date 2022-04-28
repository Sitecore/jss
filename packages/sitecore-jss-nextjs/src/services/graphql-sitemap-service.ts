import {
  GraphQLClient,
  GraphQLRequestClient,
  SiteQueryVariables,
  SiteQueryService,
} from '@sitecore-jss/sitecore-jss/graphql';
import { debug } from '@sitecore-jss/sitecore-jss';

/** @private */
export const languageError = 'The list of languages cannot be empty';

const languageEmptyError = 'The language must be a non-empty string';

const defaultQuery = /* GraphQL */ `
query SitemapQuery(
  $siteName: String!,
  $language: String!,
  $includedPaths: String[],
  $excludedPaths: String[],
  $pageSize: Int = 10,
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
      ){
        total
        pageInfo {
          endCursor
          hasNext
        }
        results: routesResult{
          path: routePath 
        }
      }
    }
  }
} 
`;

/**
 * The schema of data returned in response to a routes list query request
 */
export type RouteListQueryResult = {
  path: string;
};

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
export interface GraphQLSitemapServiceConfig extends Omit<SiteQueryVariables, 'language'> {
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
 * Service that fetches the list of site pages using Sitecore's GraphQL API.
 * This list is used for SSG and Export functionality.
 * @mixes SearchQueryService<PageListQueryResult>
 */
export class GraphQLSitemapService {
  private graphQLClient: GraphQLClient;
  private siteService: SiteQueryService<RouteListQueryResult>;

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
    this.siteService = new SiteQueryService<RouteListQueryResult>(this.graphQLClient);
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
   * @throws {RangeError} if the any of the languages is an empty string.
   * @throws {Error} if the app root was not found for the specified site and language.
   */
  protected async fetchSitemap(
    languages: string[],
    formatStaticPath: (path: string[], language: string) => StaticPath
  ): Promise<StaticPath[]> {
    if (!languages.length) {
      throw new RangeError(languageError);
    }
    const siteName = this.options.siteName;

    // Fetch paths using all locales
    const paths = await Promise.all(
      languages.map((language) => {
        if (language === '') {
          throw new RangeError(languageEmptyError);
        }
        debug.sitemap('fetching sitemap data for %s', language);
        return this.siteService
          .fetch(this.query, {
            siteName,
            language,
            pageSize: this.options.pageSize,
            includedPaths: this.options.includedPaths,
            excludedPaths: this.options.excludedPaths,
          })
          .then((results) => {
            return results.map((item) =>
              formatStaticPath(item.path.replace(/^\/|\/$/g, '').split('/'), language)
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
  protected getSearchService(): SiteQueryService<RouteListQueryResult> {
    return new SiteQueryService<RouteListQueryResult>(this.graphQLClient);
  }
}
