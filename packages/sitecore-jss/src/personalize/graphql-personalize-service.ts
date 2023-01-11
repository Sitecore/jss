import { GraphQLClient, GraphQLRequestClient } from '../graphql-request-client';
import debug from '../debug';
import { isTimeoutError } from '../utils';
import { CdpHelper } from './utils';
import { CacheClient, CacheOptions, MemoryCacheClient } from '../cache-client';

export type GraphQLPersonalizeServiceConfig = CacheOptions & {
  /**
   * Your Graphql endpoint
   */
  endpoint: string;
  /**
   * The API key to use for authentication
   */
  apiKey: string;
  /**
   * Timeout (ms) for the Personalize request. Default is 250.
   */
  timeout?: number;
  /**
   * Override fetch method. Uses 'GraphQLRequestClient' default otherwise.
   */
  fetch?: typeof fetch;
};

/**
 * Object model of personlize info
 */
export type PersonalizeInfo = {
  /**
   * The (CDP-friendly) content id
   */
  contentId: string;
  /**
   * The configured variant ids
   */
  variantIds: string[];
};

type PersonalizeQueryResult = {
  layout: { item: { id: string; version: string; personalization: { variantIds: string[] } } };
};

export class GraphQLPersonalizeService {
  private graphQLClient: GraphQLClient;
  private cache: CacheClient<PersonalizeQueryResult>;
  protected get query(): string {
    return /* GraphQL */ `
      query($siteName: String!, $language: String!, $itemPath: String!) {
        layout(site: $siteName, routePath: $itemPath, language: $language) {
          item {
            id
            version
            personalization {
              variantIds
            }
          }
        }
      }
    `;
  }
  /**
   * Fetch personalize data using the Sitecore GraphQL endpoint.
   * @param {GraphQLPersonalizeServiceConfig} config
   */
  constructor(protected config: GraphQLPersonalizeServiceConfig) {
    this.config.timeout = config.timeout || 250;
    this.graphQLClient = this.getGraphQLClient();
    this.cache = this.getCacheClient();
  }

  /**
   * Get personalize information for a route
   * @param {string} itemPath page route
   * @param {string} language language
   * @param {string} siteName site name
   * @returns {Promise<PersonalizeInfo | undefined>} the personalize information or undefined (if itemPath / language not found)
   */
  async getPersonalizeInfo(
    itemPath: string,
    language: string,
    siteName: string
  ): Promise<PersonalizeInfo | undefined> {
    debug.personalize('fetching personalize info for %s %s %s', siteName, itemPath, language);

    const cacheKey = this.getCacheKey(itemPath, language, siteName);
    let data = this.cache.getCacheValue(cacheKey);

    if (!data) {
      try {
        data = await this.graphQLClient.request<PersonalizeQueryResult>(this.query, {
          siteName,
          itemPath,
          language,
        });
        this.cache.setCacheValue(cacheKey, data);
      } catch (error) {
        if (isTimeoutError(error)) {
          return undefined;
        }

        throw error;
      }
    }
    return data?.layout?.item
      ? {
          // CDP expects content id format `embedded_<id>_<lang>` (lowercase)
          contentId: CdpHelper.getContentId(data.layout.item.id, language),
          variantIds: data.layout.item.personalization.variantIds,
        }
      : undefined;
  }

  /**
   * Gets cache client implementation
   * Override this method if custom cache needs to be used
   * @returns CacheClient instance
   */
  protected getCacheClient(): CacheClient<PersonalizeQueryResult> {
    return new MemoryCacheClient<PersonalizeQueryResult>({
      cacheEnabled: this.config.cacheEnabled ?? true,
      cacheTimeout: this.config.cacheTimeout ?? 10,
    });
  }

  protected getCacheKey(itemPath: string, language: string, siteName: string) {
    return `${siteName}-${itemPath}-${language}`;
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
      debugger: debug.personalize,
      fetch: this.config.fetch,
      timeout: this.config.timeout,
    });
  }
}
