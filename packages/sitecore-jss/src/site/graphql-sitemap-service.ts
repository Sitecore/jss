import { GraphQLClient } from '../graphql';
import { siteNameError } from '../constants';
import debug from '../debug';
import { GraphQLRequestClientFactory } from '../graphql-request-client';

const PREFIX_NAME_SITEMAP = 'sitemap';

// The default query for request sitemaps
const defaultQuery = /* GraphQL */ `
  query SitemapQuery($siteName: String!) {
    site {
      siteInfo(site: $siteName) {
        sitemap
      }
    }
  }
`;

export type GraphQLSitemapXmlServiceConfig = {
  /**
   * The JSS application name
   */
  siteName: string;
  /**
   * A GraphQL Request Client Factory is a function that accepts configuration and returns an instance of a GraphQLRequestClient.
   * This factory function is used to create and configure GraphQL clients for making GraphQL API requests.
   */
  clientFactory: GraphQLRequestClientFactory;
};

/**
 * The schema of data returned in response to sitemaps request
 */
export type SitemapQueryResult = { site: { siteInfo: { sitemap: string[] } } };

/**
 * Service that fetch the sitemaps data using Sitecore's GraphQL API.
 */
export class GraphQLSitemapXmlService {
  private graphQLClient: GraphQLClient;

  protected get query(): string {
    return defaultQuery;
  }

  /**
   * Creates an instance of graphQL sitemaps service with the provided options
   * @param {GraphQLSitemapXmlServiceConfig} options instance
   */
  constructor(public options: GraphQLSitemapXmlServiceConfig) {
    this.graphQLClient = this.getGraphQLClient();
  }

  /**
   * Fetch list of sitemaps for the site
   * @returns {string[]} list of sitemap paths
   * @throws {Error} if the siteName is empty.
   */
  async fetchSitemaps(): Promise<string[]> {
    const siteName: string = this.options.siteName;

    if (!siteName) {
      throw new Error(siteNameError);
    }

    const sitemapResult: Promise<SitemapQueryResult> = this.graphQLClient.request(this.query, {
      siteName,
    });
    try {
      return sitemapResult.then((result: SitemapQueryResult) => result.site.siteInfo.sitemap);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  /**
   * Get sitemap file path for sitemap id
   * @param {string} id the sitemap id (can be empty for default 'sitemap.xml' file)
   * @returns {string | undefined} the sitemap file path or undefined if one doesn't exist
   */
  async getSitemap(id: string): Promise<string | undefined> {
    const searchSitemap = `${PREFIX_NAME_SITEMAP}${id}.xml`;
    const sitemaps = await this.fetchSitemaps();

    return sitemaps.find((sitemap: string) => sitemap.includes(searchSitemap));
  }

  /**
   * Gets a GraphQL client that can make requests to the API. Uses graphql-request as the default
   * library for fetching graphql data (@see GraphQLRequestClient). Override this method if you
   * want to use something else.
   * @returns {GraphQLClient} implementation
   */
  protected getGraphQLClient(): GraphQLClient {
    if (!this.options.clientFactory) {
      throw new Error('clientFactory needs to be provided when initializing GraphQL client.');
    }

    return this.options.clientFactory({
      debugger: debug.sitemap,
    });
  }
}
