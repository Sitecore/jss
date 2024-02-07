import { type GraphQLClient, GraphQLRequestClient } from './graphql';
import { type CacheClient, type CacheOptions, MemoryCacheClient } from './utils//cache-client';
import { type GraphQLRequestClientFactory } from './graphql/graphql-request-client';
import debug from './utils/debug';

const defaultQuery = /* GraphQL */ `
  query {
    site{
      siteInfoCollection{
        name
        hostName:hostname
        language
      }
    }
  }
`;

export type SiteInfo = {
  /**
   * Additional user-defined properties
   */
  [key: string]: unknown;
  /**
   * Site name
   */
  name: string;
  /**
   * Site host name. May include multiple values (separated by '|') and wildcards ('*')
   */
  hostName: string;
  /**
   * Site default language
   */
  language: string;
};

export type GraphQLSiteInfoServiceConfig = CacheOptions & {
  /**
   * Your Graphql endpoint
   * @deprecated use @param clientFactory property instead
   */
  endpoint?: string;
  /**
   * The API key to use for authentication
   * @deprecated use @param clientFactory property instead
   */
  apiKey?: string;
  /** common variable for all GraphQL queries
   * it will be used for every type of query to regulate result batch size
   * Optional. How many result items to fetch in each GraphQL call. This is needed for pagination.
   * @default 10
   */
  pageSize?: number;
  /**
   * A GraphQL Request Client Factory is a function that accepts configuration and returns an instance of a GraphQLRequestClient.
   * This factory function is used to create and configure GraphQL clients for making GraphQL API requests.
   */
  clientFactory?: GraphQLRequestClientFactory;
};

type GraphQLSiteInfoResponse = {
  site: {
    siteInfoCollection: GraphQLSiteInfoResult[];
  };
};

export type GraphQLSiteInfoResult = {
  name: string;
  hostName: string;
  language: string;
};

export class GraphQLSiteInfoService {
  private graphQLClient: GraphQLClient;
  private cache: CacheClient<SiteInfo[]>;

  protected get query(): string {
    return defaultQuery;
  }

  /**
   * Creates an instance of graphQL service to retrieve site configuration list from Sitecore
   * @param {GraphQLSiteInfoServiceConfig} config instance
   */
  constructor(private config: GraphQLSiteInfoServiceConfig) {
    this.graphQLClient = this.getGraphQLClient();
    this.cache = this.getCacheClient();
  }

  async fetchSiteInfo(): Promise<SiteInfo[]> {
    const cachedResult = this.cache.getCacheValue(this.getCacheKey());
    if (cachedResult) {
      return cachedResult;
    }
    if (process.env.SITECORE) {
      debug.multisite('Skipping site information fetch (building on XM Cloud)');
      return [];
    }

    const results: SiteInfo[] = [];
    let hasNext = true;
    let after = '';

    while (hasNext) {
      const response = await this.graphQLClient.request<GraphQLSiteInfoResponse>(this.query, {
        pageSize: this.config.pageSize,
        after,
      });
      const result = response?.site?.siteInfoCollection?.reduce<SiteInfo[]>((result, current) => {
        result.push({
          name: current.name,
          hostName: current.hostName,
          language: current.language,
        });
        return result;
      }, []);

      results.push(...result);
      hasNext = false;
    }

    this.cache.setCacheValue(this.getCacheKey(), results);
    return results;
  }

  /**
   * Gets cache client implementation
   * Override this method if custom cache needs to be used
   * @returns CacheClient instance
   */
  protected getCacheClient(): CacheClient<SiteInfo[]> {
    return new MemoryCacheClient<SiteInfo[]>({
      cacheEnabled: this.config.cacheEnabled ?? true,
      cacheTimeout: this.config.cacheTimeout ?? 10,
    });
  }

  /**
   * Gets a GraphQL client that can make requests to the API. Uses graphql-request as the default
   * library for fetching graphql data (@see GraphQLRequestClient). Override this method if you
   * want to use something else.
   * @returns {GraphQLClient} implementation
   */
  protected getGraphQLClient(): GraphQLClient {
    if (!this.config.endpoint) {
      if (!this.config.clientFactory) {
        throw new Error('You should provide either an endpoint and apiKey, or a clientFactory.');
      }

      return this.config.clientFactory({
        debugger: debug.multisite,
      });
    }

    return new GraphQLRequestClient(this.config.endpoint, {
      apiKey: this.config.apiKey,
      debugger: debug.multisite,
    });
  }

  private getCacheKey(): string {
    return 'siteinfo-service-cache';
  }
}
