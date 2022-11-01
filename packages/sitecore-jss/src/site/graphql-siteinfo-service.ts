import { GraphQLClient, GraphQLRequestClient } from '../graphql';
import debug from 'debug';
import { CacheClient, CacheOptions, MemoryCacheClient } from '../cache-client';

const siteGroupingTemplate = 'EDA823FC-BC7E-4EF6-B498-CD09EC6FDAEF';

const defaultQuery = /* GraphQL */ `
  {
    search(
      where: { name: "_template", value: "${siteGroupingTemplate}", operator: EQ }
    ) {
      results {
        ... on SiteDefinition {
          name
          hostName {
            value
          }
          virtualFolder {
            value
          }
          language: language_f19277fe1b854b0a8c265e74d766b3a3 {
            value
          }
        }
      }
    }
  }
`;

export type SiteInfo = {
  name: string;
  hostName: string;
  virtualFolder: string;
  language: string;
};

type GraphQLSiteInfoServiceOptions = {
  /**
   * Your Graphql endpoint
   */
  endpoint: string;
  /**
   * The API key to use for authentication
   */
  apiKey: string;
  /**
   * Settings for internal cache.
   * Cache is enabled by default with timout set to 10
   */
  cacheSettings?: CacheOptions;
};

type GraphQLSiteInfoResponse = {
  search: {
    results: GraphQLSiteInfoResult[];
  };
};

type GraphQLSiteInfoResult = {
  name: string;
  hostName: {
    value: string;
  };
  virtualFolder: {
    value: string;
  };
  language: {
    value: string;
  };
};

export class GraphQLSiteInfoService {
  private graphQLClient: GraphQLClient;
  private memoryCache: CacheClient<SiteInfo[]>;

  protected get query(): string {
    return defaultQuery;
  }

  /**
   * Creates an instance of graphQL service to retrieve site configuration list from Sitecore
   * @param {GraphQLSiteInfoServiceOptions} options instance
   */
  constructor(private options: GraphQLSiteInfoServiceOptions) {
    this.graphQLClient = this.getGraphQLClient();
    this.memoryCache = this.getCacheClient();
  }

  async fetchSiteInfo(): Promise<SiteInfo[]> {
    const cachedResult = this.memoryCache.getCacheValue(this.getCacheKey());
    if (cachedResult) {
      return cachedResult;
    }

    const response = await this.graphQLClient.request<GraphQLSiteInfoResponse>(this.query);
    const result = response?.search?.results?.reduce<SiteInfo[]>((result, current) => {
      result.push({
        name: current.name,
        hostName: current.hostName.value,
        virtualFolder: current.virtualFolder.value,
        language: current.language.value,
      });
      return result;
    }, []);
    this.memoryCache.setCacheValue(this.getCacheKey(), result);
    return result;
  }

  /**
   * Gets cache client implementation
   * Override this method if custom cache needs to be used
   * @returns CacheClient instance
   */
  protected getCacheClient(): CacheClient<SiteInfo[]> {
    return new MemoryCacheClient<SiteInfo[]>({
      cacheEnabled: this.options.cacheSettings?.cacheEnabled ?? true,
      cacheTimeout: this.options.cacheSettings?.cacheTimeout ?? 10,
    });
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
      debugger: debug('multi-site'), // TODO replace with global from debug
    });
  }

  private getCacheKey(): string {
    return 'sitenfo-service-cachedSiteInfo';
  }
}
