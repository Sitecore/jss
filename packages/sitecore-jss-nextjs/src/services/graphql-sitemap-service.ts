import {
  BaseGraphQLSitemapService,
  BaseGraphQLSitemapServiceConfig,
} from './base-graphql-sitemap-service';

/** @private */
export const languageError = 'The list of languages cannot be empty';
export const siteError = 'The service needs a site name';

/**
 * @param {string} siteName to inject into error text
 * @private
 */
export function getSiteEmptyError(siteName: string) {
  return `Site "${siteName}" does not exist or site item tree is missing`;
}

/**
 * Configuration options for @see GraphQLSitemapService instances
 */
export interface GraphQLSitemapServiceConfig extends BaseGraphQLSitemapServiceConfig {
  /**
   * Name of the site to retrieve site paths for
   */
  siteName: string;
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
 * Used to handle a single site
 * This list is used for SSG and Export functionality.
 * @mixes SearchQueryService<PageListQueryResult>
 */
export class GraphQLSitemapService extends BaseGraphQLSitemapService {
  /**
   * Creates an instance of graphQL sitemap service with the provided options
   * @param {GraphQLSitemapServiceConfig} options instance
   */
  constructor(public options: GraphQLSitemapServiceConfig) {
    super(options);
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

    const siteName = this.options.siteName;

    if (!siteName) {
      throw new RangeError(siteError);
    }

    paths.push(...(await this.getTranformedPaths(siteName, languages, formatStaticPath)));

    return ([] as StaticPath[]).concat(...paths);
  }
}
