import {
  GraphQLClient,
  GraphQLRequestClientConfig,
  GraphQLRequestClientFactory,
} from '../graphql-request-client';
import { SitecoreTemplateId } from '../constants';
import { DictionaryPhrases, DictionaryServiceBase } from './dictionary-service';
import { CacheOptions } from '../cache-client';
import { getAppRootId, SearchQueryService, PageInfo, SearchQueryVariables } from '../graphql';
import debug from '../debug';

/** @private */
export const queryError =
  'Valid value for rootItemId not provided and failed to auto-resolve app root item.';

const query = /* GraphQL */ `
  query DictionarySearch(
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
        phrase: field(name: "Phrase") {
          value
        }
      }
    }
  }
`;

const siteQuery = /* GraphQL */ `
  query DictionarySiteQuery(
    $siteName: String!
    $language: String!
    $pageSize: Int = 500
    $after: String
  ) {
    site {
      siteInfo(site: $siteName) {
        dictionary(language: $language, first: $pageSize, after: $after) {
          pageInfo {
            endCursor
            hasNext
          }
          results {
            key
            value
          }
        }
      }
    }
  }
`;

/**
 * Configuration options for @see GraphQLDictionaryService instances
 */
export interface GraphQLDictionaryServiceConfig
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
   * Optional. The template ID to use when searching for dictionary entries.
   * @default '6d1cd89719364a3aa511289a94c2a7b1' (/sitecore/templates/System/Dictionary/Dictionary entry)
   */
  dictionaryEntryTemplateId?: string;

  /**
   * Optional. The template ID of a JSS App to use when searching for the appRootId.
   * @default '061cba1554744b918a0617903b102b82' (/sitecore/templates/Foundation/JavaScript Services/App)
   */
  jssAppTemplateId?: string;

  /**
   * Optional. Use site query for dictionary fetch instead of search query (XM Cloud only)
   */
  useSiteQuery?: boolean;
}

/**
 * The schema of data returned in response to a dictionary query request.
 */
export type DictionaryQueryResult = {
  key: { value: string };
  phrase: { value: string };
};

export type DictionarySiteQueryResponse = {
  site: {
    siteInfo: {
      dictionary: {
        results: { key: string; value: string }[];
        pageInfo: PageInfo;
      };
    };
  };
};

/**
 * Service that fetch dictionary data using Sitecore's GraphQL API.
 * @augments DictionaryServiceBase
 * @mixes SearchQueryService<DictionaryQueryResult>
 */
export class GraphQLDictionaryService extends DictionaryServiceBase {
  private graphQLClient: GraphQLClient;
  private searchService: SearchQueryService<DictionaryQueryResult>;

  /**
   * Creates an instance of graphQL dictionary service with the provided options
   * @param {GraphQLDictionaryService} options instance
   */
  constructor(public options: GraphQLDictionaryServiceConfig) {
    super(options);
    this.graphQLClient = this.getGraphQLClient();
    this.searchService = new SearchQueryService<DictionaryQueryResult>(this.graphQLClient);
  }

  /**
   * Fetches dictionary data for internalization. Uses search query by default
   * @param {string} language the language to fetch
   * @returns {Promise<DictionaryPhrases>} dictionary phrases
   * @throws {Error} if the app root was not found for the specified site and language.
   */
  async fetchDictionaryData(language: string): Promise<DictionaryPhrases> {
    const cacheKey = this.options.siteName + language;
    const cachedValue = this.getCacheValue(cacheKey);
    if (cachedValue) {
      debug.dictionary('using cached dictionary data for %s %s', language, this.options.siteName);
      return cachedValue;
    }

    const phrases = this.options.useSiteQuery
      ? await this.fetchWithSiteQuery(language)
      : await this.fetchWithSearchQuery(language);

    this.setCacheValue(cacheKey, phrases);
    return phrases;
  }

  /**
   * Fetches dictionary data with search query
   * This is the default behavior for non-XMCloud deployments
   * @param {string} language the language to fetch
   * @default query (@see query)
   * @returns {Promise<DictionaryPhrases>} dictionary phrases
   * @throws {Error} if the app root was not found for the specified site and language.
   */
  async fetchWithSearchQuery(language: string): Promise<DictionaryPhrases> {
    debug.dictionary('fetching site root for %s %s', language, this.options.siteName);

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

    debug.dictionary('fetching dictionary data for %s %s', language, this.options.siteName);
    const phrases: DictionaryPhrases = {};
    await this.searchService
      .fetch(query, {
        rootItemId,
        language,
        templates: this.options.dictionaryEntryTemplateId || SitecoreTemplateId.DictionaryEntry,
        pageSize: this.options.pageSize,
      })
      .then((results) => {
        results.forEach((item) => (phrases[item.key.value] = item.phrase.value));
      });

    return phrases;
  }

  /**
   * Fetches dictionary data with site query
   * This is the default behavior for XMCloud deployments
   * @param {string} language the language to fetch
   * @default siteQuery (@see siteQuery)
   * @returns {Promise<DictionaryPhrases>} dictionary phrases
   */
  async fetchWithSiteQuery(language: string): Promise<DictionaryPhrases> {
    const phrases: DictionaryPhrases = {};
    debug.dictionary('fetching dictionary data for %s %s', language, this.options.siteName);
    let results: { key: string; value: string }[] = [];
    let hasNext = true;
    let after = '';

    while (hasNext) {
      const fetchResponse = await this.graphQLClient.request<DictionarySiteQueryResponse>(
        siteQuery,
        {
          siteName: this.options.siteName,
          language,
          pageSize: this.options.pageSize,
          after,
        }
      );

      results = results.concat(fetchResponse?.site.siteInfo.dictionary.results);
      hasNext = fetchResponse.site.siteInfo.dictionary.pageInfo.hasNext;
      after = fetchResponse.site.siteInfo.dictionary.pageInfo.endCursor;
    }
    results.forEach((item) => (phrases[item.key] = item.value));

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
      debugger: debug.dictionary,
      retries: this.options.retries,
      retryStrategy: this.options.retryStrategy,
    });
  }
}
