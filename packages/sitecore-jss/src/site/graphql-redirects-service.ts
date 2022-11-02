import { GraphQLClient, GraphQLRequestClient } from '../graphql';
import { siteNameError } from '../constants';
import debug from '../debug';
import { MemoryCacheClient, CacheOptions, CacheClient } from '../cache-client';

export const REDIRECT_TYPE_301 = 'REDIRECT_301';
export const REDIRECT_TYPE_302 = 'REDIRECT_302';
export const REDIRECT_TYPE_SERVER_TRANSFER = 'SERVER_TRANSFER';

export type RedirectInfo = {
  pattern: string;
  target: string;
  redirectType: string;
  isQueryStringPreserved: boolean;
  locale: string;
};

// The default query for request redirects of site
const defaultQuery = /* GraphQL */ `
  query RedirectsQuery($siteName: String!) {
    site {
      siteInfo(site: $siteName) {
        redirects {
          pattern
          target
          redirectType
          isQueryStringPreserved
          locale
        }
      }
    }
  }
`;

export type GraphQLRedirectsServiceConfig = CacheOptions & {
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
  /**
   * Override fetch method. Uses 'GraphQLRequestClient' default otherwise.
   */
  fetch?: typeof fetch;
};

/**
 * The schema of data returned in response to redirects array request
 */
export type RedirectsQueryResult = {
  site: { siteInfo: { redirects: RedirectInfo[] } | null };
};

/**
 *  The GraphQLRedirectsService class is used to query the JSS redirects using Graphql endpoint
 */
export class GraphQLRedirectsService {
  private graphQLClient: GraphQLClient;
  private cache: CacheClient<RedirectsQueryResult>;

  protected get query(): string {
    return defaultQuery;
  }

  /**
   * Creates an instance of graphQL redirects service with the provided options
   * @param {GraphQLRedirectsServiceConfig} options instance
   */
  constructor(private options: GraphQLRedirectsServiceConfig) {
    this.graphQLClient = this.getGraphQLClient();
    this.cache = this.getCacheClient();
  }

  /**
   * Fetch an array of redirects from API
   * @returns Promise<RedirectInfo[]>
   * @throws {Error} if the siteName is empty.
   */
  async fetchRedirects(): Promise<RedirectInfo[]> {
    const siteName: string = this.options.siteName;

    if (!siteName) {
      throw new Error(siteNameError);
    }

    const cacheKey = `redirects-${siteName}`;
    let data = this.cache.getCacheValue(cacheKey);

    if (!data) {
      // eslint-disable-next-line no-useless-catch
      try {
        data = await this.graphQLClient.request<RedirectsQueryResult>(this.query, {
          siteName,
        });
        this.cache.setCacheValue(cacheKey, data);
      } catch (error) {
        throw error;
      }
    }

    return data?.site?.siteInfo?.redirects || [];
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
      debugger: debug.redirects,
      fetch: this.options.fetch,
    });
  }

  /**
   * Gets cache client implementation
   * Override this method if custom cache needs to be used
   * @returns CacheClient instance
   */
  protected getCacheClient(): CacheClient<RedirectsQueryResult> {
    return new MemoryCacheClient<RedirectsQueryResult>({
      cacheEnabled: this.options.cacheEnabled ?? true,
      cacheTimeout: this.options.cacheTimeout ?? 10,
    });
  }
}
