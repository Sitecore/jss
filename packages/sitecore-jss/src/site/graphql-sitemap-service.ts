import { GraphQLClient, GraphQLRequestClient } from '../graphql';
import { siteNameError } from '../constants';
import debug from '../debug';

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

export type GraphQLSitemapServiceConfig = {
  /**
   * Your Graphql endpoint
   */
  endpoint: string;
  /**
   * The API key to use for authentication
   */
  apiKey: string;
  /**
   * The JSS application name
   */
  siteName: string;
};

/**
 * The schema of data returned in response to sitemaps request
 */
export type SitemapQueryResult = { site: { siteInfo: { sitemap: string[] } } };

/**
 * Service that fetch the sitemaps data using Sitecore's GraphQL API.
 */
export class GraphQLSitemapService {
  private graphQLClient: GraphQLClient;

  protected get query(): string {
    return defaultQuery;
  }

  /**
   * Creates an instance of graphQL sitemaps service with the provided options
   * @param {GraphQLSitemapServiceConfig} options instance
   */
  constructor(public options: GraphQLSitemapServiceConfig) {
    this.graphQLClient = this.getGraphQLClient();
  }

  /**
   * Fetch a data of sitemap from API
   * @returns text of sitemap
   * @throws {Error} if the siteName is empty.
   */
  async fetchSitemap(): Promise<string[]> {
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
   * return exists sitemap
   * @param idSitemap{string}
   * @returns Promise{string | undefined}
   */
  async getExistsSitemap(idSitemap: string): Promise<string | undefined> {
    const searchSitemap = `${PREFIX_NAME_SITEMAP}${idSitemap}.xml`;
    const sitemaps = await this.fetchSitemap();
    const existsSitemap = sitemaps.find((sitemap: string) => sitemap.includes(searchSitemap));

    return existsSitemap;
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
