import { URLSearchParams } from 'url';
import { GraphQLClient, GraphQLRequestClient } from '../graphql';
import debug from '../debug';
import { CacheClient, CacheOptions, MemoryCacheClient } from '../cache-client';

const siteQuery = /* GraphQL */ `
  {
    site {
      siteInfoCollection {
        name
        hostname
        language
        attributes {
          key
          value
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
};

type GraphQLSiteInfoResponse = {
  site: {
    siteInfoCollection: GraphQLSiteInfoResult[];
  };
};

type GraphQLSiteInfoResult = {
  name: string;
  hostName: string;
  language: string;
  attributes?: {key: string, value: string}[];
};


export class GraphQLSiteInfoService {
  private graphQLClient: GraphQLClient;
  private cache: CacheClient<SiteInfo[]>;

  protected get query(): string {
    return siteQuery;
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
    const result = response?.site?.siteInfoCollection?.reduce<SiteInfo[]>((result, current) => {
      const parsedAttributes = this.tryParseAttributes(current.attributes);
      result.push({
        pointOfSale:
          parsedAttributes.POS
            ? Object.fromEntries(new URLSearchParams(parsedAttributes.POS))
            : undefined,
        name: current.name,
        hostName: current.hostName,
        language: current.language,
      });
      return result;
    }, []);
    this.cache.setCacheValue(this.getCacheKey(), result);
    return result;
  }

  protected tryParseAttributes(attributes?: {key: string, value: string}[]) {
    let result: Record<string, string> = {};
    attributes && attributes.forEach(pair => {
      result[pair.key] = pair.value;
    });
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
