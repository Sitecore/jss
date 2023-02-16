import { getSiteRewrite } from '@sitecore-jss/sitecore-jss/site';
import {
  GraphQLSitemapService,
  GraphQLSitemapServiceConfig,
  languageError,
  RouteListQueryResult,
  StaticPath,
} from './graphql-sitemap-service';

export const sitesError = 'The list of sites cannot be empty';

/**
 * Configuration options for @see GraphQLSitemapService instances
 */
export interface MultisiteGraphQLSitemapServiceConfig extends GraphQLSitemapServiceConfig {
  /**
   * Names of the configured sites
   */
  sites: string[];
}

/**
 * Service that fetches the list of site pages using Sitecore's GraphQL API.
 * Used to handle multiple sites
 * This list is used for SSG and Export functionality.
 * @mixes SearchQueryService<PageListQueryResult>
 */
export class MultisiteGraphQLSitemapService extends GraphQLSitemapService {
  /**
   * Creates an instance of graphQL sitemap service with the provided options
   * @param {GraphQLSitemapServiceConfig} options instance
   */
  constructor(public options: MultisiteGraphQLSitemapServiceConfig) {
    super(options);
  }

  /**
   * Fetch a flat list of all pages that belong to all the requested sites and have a
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

      // Fetch paths using all locales
      paths.push(...(await this.getTranformedPaths(siteName, languages, formatStaticPath)));
    }

    return ([] as StaticPath[]).concat(...paths);
  }

  /**
   * Fetch and return site paths for multisite implementation, with prefixes included
   * @param {string} language path language
   * @param {string} siteName site name
   * @returns modified paths
   */
  protected async fetchLanguageSitePaths(
    language: string,
    siteName: string
  ): Promise<RouteListQueryResult[]> {
    const results: RouteListQueryResult[] = await super.fetchLanguageSitePaths(language, siteName);

    results.forEach((item) => {
      if (item) {
        item.path = getSiteRewrite(item.path, { siteName: siteName });
      }
    });

    return results;
  }
}
