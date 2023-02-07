import { GraphQLClient, GraphQLRequestClient, PageInfo } from '@sitecore-jss/sitecore-jss/graphql';
import { debug } from '@sitecore-jss/sitecore-jss';
import { getPersonalizedRewrite } from '@sitecore-jss/sitecore-jss/personalize';
import { getSiteRewrite } from '@sitecore-jss/sitecore-jss/site';

/** @private */
export const languageError = 'The list of languages cannot be empty';
export const sitesError = 'The list of sites cannot be empty';

/**
 * @param {string} siteName to inject into error text
 * @private
 */
export function getSiteEmptyError(siteName: string) {
  return `Site "${siteName}" does not exist or site item tree is missing`;
}

const languageEmptyError = 'The language must be a non-empty string';

/**
 * GQL query made dynamic based on schema differences between SXP and XM Cloud
 * @param {boolean} usesPersonalize flag to detrmine which variation of a query to run
 * @returns GraphQL query to fetch site paths with
 */
const defaultQuery = (usesPersonalize?: boolean) => /* GraphQL */ `
query ${usesPersonalize ? 'PersonalizeSitemapQuery' : 'DefaultSitemapQuery'}(
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
      ){
        total
        pageInfo {
          endCursor
          hasNext
        }
        results {
          path: routePath
          ${
            usesPersonalize
              ? `
              route {
                personalization {
                  variantIds
                }
              }`
              : ''
          }
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
  route?: {
    personalization?: {
      variantIds: string[];
    };
  };
};

/**
 * Configuration options for @see GraphQLSitemapService instances
 */
export interface GraphQLSitemapServiceConfig
  extends Omit<SiteRouteQueryVariables, 'language' | 'siteName'> {
  /**
   * Your Graphql endpoint
   */
  endpoint: string;

  /**
   * The API key to use for authentication.
   */
  apiKey: string;

  /**
   * Names of the configured sites
   */
  sites: string[];

  /**
   * A flag for whether to include personalized routes in service output - only works on XM Cloud
   * turned off by default
   */
  includePersonalizedRoutes?: boolean;
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
    return defaultQuery(this.options.includePersonalizedRoutes);
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
    const paths = new Array<StaticPath>();
    if (!languages.length) {
      throw new RangeError(languageError);
    }

    // Get all sites
    const sites = this.options.sites;
    if (!sites || !sites.length) {
      throw new RangeError(sitesError);
    }

    // Fetch paths for each site
    for (let i = 0; i < sites.length; i++) {
      const siteName = sites[i];
      const multiSiteName = sites.length > 1 ? siteName : undefined;

      // Fetch paths using all locales
      await Promise.all(
        languages.map(async (language) => {
          if (language === '') {
            throw new RangeError(languageEmptyError);
          }
          debug.sitemap('fetching sitemap data for %s %s', language, siteName);
          const results = await this.fetchLanguageSitePaths(language, siteName);
          const transformedPaths = await this.transformLanguageSitePaths(
            results,
            formatStaticPath,
            language,
            multiSiteName
          );
          paths.push(...transformedPaths);
        })
      );
    }

    return ([] as StaticPath[]).concat(...paths);
  }

  protected async transformLanguageSitePaths(
    sitePaths: RouteListQueryResult[],
    formatStaticPath: (path: string[], language: string) => StaticPath,
    language: string,
    multiSiteName?: string
  ): Promise<StaticPath[]> {
    const formatPath = (path: string) =>
      formatStaticPath(path.replace(/^\/|\/$/g, '').split('/'), language);

    const aggregatedPaths: StaticPath[] = [];

    sitePaths.forEach((item) => {
      if (!item) return;

      if (!multiSiteName) {
        aggregatedPaths.push(formatPath(item.path));
      } else {
        aggregatedPaths.push(formatPath(getSiteRewrite(item.path, { siteName: multiSiteName })));
      }

      // check for type safety's sake - personalize may be empty depending on query type
      if (item.route?.personalization?.variantIds.length) {
        multiSiteName
          ? aggregatedPaths.push(
              ...(item.route?.personalization?.variantIds.map((varId) =>
                formatPath(
                  getPersonalizedRewrite(getSiteRewrite(item.path, { siteName: multiSiteName }), {
                    variantId: varId,
                  })
                )
              ) || {})
            )
          : aggregatedPaths.push(
              ...(item.route?.personalization?.variantIds.map((varId) =>
                formatPath(getPersonalizedRewrite(item.path, { variantId: varId }))
              ) || {})
            );
      }
    });

    return aggregatedPaths;
  }

  protected async fetchLanguageSitePaths(
    language: string,
    siteName: string
  ): Promise<RouteListQueryResult[]> {
    const args: SiteRouteQueryVariables = {
      siteName: siteName,
      language: language,
      pageSize: this.options.pageSize,
      includedPaths: this.options.includedPaths,
      excludedPaths: this.options.excludedPaths,
    };
    let results: RouteListQueryResult[] = [];
    let hasNext = true;
    let after = '';

    while (hasNext) {
      const fetchResponse = await this.graphQLClient.request<
        SiteRouteQueryResult<RouteListQueryResult>
      >(this.query, {
        ...args,
        after,
      });

      if (!fetchResponse?.site?.siteInfo) {
        throw new RangeError(getSiteEmptyError(siteName));
      } else {
        results = results.concat(fetchResponse.site.siteInfo.routes?.results);
        hasNext = fetchResponse.site.siteInfo.routes?.pageInfo.hasNext;
        after = fetchResponse.site.siteInfo.routes?.pageInfo.endCursor;
      }
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
