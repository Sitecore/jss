import {
  GraphQLClient,
  GraphQLRequestClientConfig,
  GraphQLRequestClientFactory,
} from '../graphql-request-client';
import { SitecoreTemplateId } from '../constants';
import { ContentTokenPhrases, ContentTokenServiceBase } from './content-token-service';
import { CacheOptions } from '../cache-client';
import { getAppRootId, SearchQueryResult, SearchQueryVariables } from '../graphql';
import debug from '../debug';

/** @private */
export const queryError =
  'Valid value for rootItemId not provided and failed to auto-resolve app root item.';

const query = /* GraphQL */ `
  query ContentTokenSearch(
    $rootItemId: String!
    $language: String!
    $templates: String!
    $pageSize: Int = 10
    $after: String
  ) {
    search(
      where: {
        AND: [
          { name: "_path", value: $rootItemId, operator: CONTAINS }
          { name: "_language", value: $language }
          { name: "_templates", value: $templates, operator: CONTAINS }
        ]
      }
      first: $pageSize
      after: $after
    ) {
      total
      pageInfo {
        endCursor
        hasNext
      }
      results {
        key: field(name: "Key") {
          value
        }
        value: field(name: "Value") {
          value
        }
      }
    }
  }
`;

/**
 * Configuration options for @see GraphQLContentTokenService instances
 */
export interface GraphQLContentTokenServiceConfig
  extends Omit<SearchQueryVariables, 'language'>,
    CacheOptions,
    Pick<GraphQLRequestClientConfig, 'retries' | 'retryStrategy'> {
  /**
   * The name of the current Sitecore site. This is used to to determine the search query root
   * in cases where one is not specified by the caller.
   */
  siteName: string;

  /**
   * A GraphQL Request Client Factory is a function that accepts configuration and returns an instance of a GraphQLRequestClient.
   * This factory function is used to create and configure GraphQL clients for making GraphQL API requests.
   */
  clientFactory: GraphQLRequestClientFactory;

  /**
   * Optional. The template ID to use when searching for content token entries.
   * @default '7d659ee9d4874d408a9210c6d68844c8' (/sitecore/templates/Feature/Experience Accelerator/Content Tokens/Content Token)
   */
  contentTokenTemplateId?: string;

  /**
   * Optional. The template ID of a JSS App to use when searching for the appRootId.
   * @default '061cba1554744b918a0617903b102b82' (/sitecore/templates/Foundation/JavaScript Services/App)
   */
  jssAppTemplateId?: string;
}

/**
 * The schema of data returned in response to a content token query request.
 */
export type ContentTokenQueryResult = {
  key: { value: string };
  value: { value: string };
};

/**
 * Service that fetch content token data using Sitecore's GraphQL API.
 * @augments ContentTokenServiceBase
 */
export class GraphQLContentTokenService extends ContentTokenServiceBase {
  private graphQLClient: GraphQLClient;

  /**
   * Creates an instance of graphQL content token service with the provided options
   * @param {GraphQLContentTokenService} options instance
   */
  constructor(public options: GraphQLContentTokenServiceConfig) {
    super(options);
    this.graphQLClient = this.getGraphQLClient();
  }

  /**
   * Fetches content token data for internalization. Uses search query by default
   * @param {string} language the language to fetch
   * @returns {Promise<ContentTokenPhrases>} content token phrases
   * @throws {Error} if the app root was not found for the specified site and language.
   */
  async fetchContentTokens(language: string): Promise<ContentTokenPhrases> {
    const cacheKey = this.options.siteName + language;
    const cachedValue = this.getCacheValue(cacheKey);
    if (cachedValue) {
      debug.contenttokens('using cached content token data for %s %s', language, this.options.siteName);
      return cachedValue;
    }

    const phrases = await this.fetchWithSearchQuery(language);

    this.setCacheValue(cacheKey, phrases);
    return phrases;
  }

  /**
   * Fetches content token data with search query
   * This is the default behavior for non-XMCloud deployments
   * @param {string} language the language to fetch
   * @default query (@see query)
   * @returns {Promise<ContentTokenPhrases>} content token phrases
   * @throws {Error} if the app root was not found for the specified site and language.
   */
  async fetchWithSearchQuery(language: string): Promise<ContentTokenPhrases> {
    debug.contenttokens('fetching site root for %s %s', language, this.options.siteName);

    // If the caller does not specify a root item ID, then we try to figure it out
    const rootItemId =
      this.options.rootItemId ||
      (await getAppRootId(
        this.graphQLClient,
        this.options.siteName,
        language,
        this.options.jssAppTemplateId
      ));

    if (!rootItemId) {
      throw new Error(queryError);
    }

    debug.contenttokens('fetching content token data for %s %s', language, this.options.siteName);
    const phrases: ContentTokenPhrases = {};
    let results: ContentTokenQueryResult[] = [];
    let hasNext = true;
    let after = '';

    while (hasNext) {
      const fetchResponse =
    await this.graphQLClient.request<SearchQueryResult<ContentTokenQueryResult>>(query, {
      rootItemId,
      language,
      templates: this.options.contentTokenTemplateId || SitecoreTemplateId.ContentToken,
      pageSize: this.options.pageSize,
      after
    });

    results = results.concat(fetchResponse?.search?.results);
      hasNext = fetchResponse.search.pageInfo.hasNext;
      after = fetchResponse.search.pageInfo.endCursor;
    }

    results.forEach((item) => (phrases[item.key.value] = item.value.value));

    return phrases;
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
      debugger: debug.contenttokens,
      retries: this.options.retries,
      retryStrategy: this.options.retryStrategy,
    });
  }
}