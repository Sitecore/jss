import { GraphQLClient, GraphQLRequestClient } from '../graphql';
import debug from '../debug';
import { CacheClient, CacheOptions, MemoryCacheClient } from '../cache-client';

const headlessSiteGroupingTemplate = 'E46F3AF2-39FA-4866-A157-7017C4B2A40C';

const defaultQuery = /* GraphQL */ `
  {
    search(
      where: { name: "_templates", value: "${headlessSiteGroupingTemplate}", operator: CONTAINS }
    ) {
      results {
      ... on Item {
        name
        hostName: field(name: "Hostname") {
          value
        }
        language: field(name: "Language") {
          value
        }
        otherProperties: field(name: "OtherProperties") {
          value
        }
      }
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
   */
  endpoint: string;
  /**
   * The API key to use for authentication
   */
  apiKey: string;
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
  language: {
    value: string;
  };
  otherProperties: {
    value: string;
  };
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

    const response = await this.graphQLClient.request<GraphQLSiteInfoResponse>(this.query);
    const result = response?.search?.results?.reduce<SiteInfo[]>((result, current) => {
      result.push({
        // POC: Use "Other Properties" field (KVP in query string format) to define project in SXA for now
        ...Object.fromEntries(new URLSearchParams(current.otherProperties.value)),
        name: current.name,
        hostName: current.hostName.value,
        language: current.language.value,
      });
      return result;
    }, []);
    this.cache.setCacheValue(this.getCacheKey(), result);
    return result;
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
    return new GraphQLRequestClient(this.config.endpoint, {
      apiKey: this.config.apiKey,
      debugger: debug.multisite,
    });
  }

  private getCacheKey(): string {
    return 'siteinfo-service-cache';
  }
}
