import { URLSearchParams } from 'url';
import { GraphQLClient, GraphQLRequestClient, PageInfo } from '../graphql';
import debug from '../debug';
import { CacheClient, CacheOptions, MemoryCacheClient } from '../cache-client';

const headlessSiteGroupingTemplate = 'E46F3AF2-39FA-4866-A157-7017C4B2A40C';
const sitecoreContentRootItem = '0DE95AE4-41AB-4D01-9EB0-67441B7C2450';

const defaultQuery = /* GraphQL */ `
  query($pageSize: Int = 10, $after: String) {
    search(
      where: {
        AND: [
          { name: "_templates", value: "${headlessSiteGroupingTemplate}", operator: CONTAINS }
          { name: "_path", value: "${sitecoreContentRootItem}", operator: CONTAINS }
        ]
      }
      first: $pageSize
      after: $after
    ) {
      pageInfo {
        endCursor
        hasNext
      }
      results {
        ... on Item {
          name: field(name: "SiteName") {
            value
          }
          hostName: field(name: "Hostname") {
            value
          }
          language: field(name: "Language") {
            value
          }
          pointOfSale: field(name: "POS") {
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
  /**
   * Site point of sale
   */
  pointOfSale?: Record<string, string>;
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
  /** common variable for all GraphQL queries
   * it will be used for every type of query to regulate result batch size
   * Optional. How many result items to fetch in each GraphQL call. This is needed for pagination.
   * @default 10
   */
  pageSize?: number;
};

type GraphQLSiteInfoResponse = {
  search: {
    pageInfo: PageInfo;
    results: GraphQLSiteInfoResult[];
  };
};

export type GraphQLSiteInfoResult = {
  name: {
    value: string;
  };
  hostName: {
    value: string;
  };
  language: {
    value: string;
  };
  pointOfSale?: {
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

    const results: SiteInfo[] = [];
    let hasNext = true;
    let after = '';

    while (hasNext) {
      const response = await this.graphQLClient.request<GraphQLSiteInfoResponse>(this.query, {
        pageSize: this.config.pageSize,
        after,
      });
      const result = response?.search?.results?.reduce<SiteInfo[]>((result, current) => {
        result.push({
          pointOfSale: current.pointOfSale?.value
            ? Object.fromEntries(new URLSearchParams(current.pointOfSale.value))
            : undefined,
          name: current.name.value,
          hostName: current.hostName.value,
          language: current.language.value,
        });
        return result;
      }, []);

      results.push(...result);
      hasNext = response.search.pageInfo.hasNext;
      after = response.search.pageInfo.endCursor;
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
    return new GraphQLRequestClient(this.config.endpoint, {
      apiKey: this.config.apiKey,
      debugger: debug.multisite,
    });
  }

  private getCacheKey(): string {
    return 'siteinfo-service-cache';
  }
}
