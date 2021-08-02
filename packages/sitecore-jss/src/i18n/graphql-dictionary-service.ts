import { GraphQLClient, GraphQLRequestClient } from '../graphql-request-client';
import { SitecoreTemplateId } from '../constants';
import { DictionaryPhrases, DictionaryServiceBase } from './dictionary-service';
import { CacheOptions } from '../cache-client';
import { getAppRootId, SearchServiceConfig, SearchQueryService } from '../graphql';
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

/**
 * Configuration options for @see GraphQLDictionaryService instances
 */
export interface GraphQLDictionaryServiceConfig extends SearchServiceConfig, CacheOptions {
  /**
   * The URL of the graphQL endpoint.
   */
  endpoint: string;

  /**
   * The API key to use for authentication.
   */
  apiKey: string;

  /**
   * Optional. The template ID to use when searching for dictionary entries.
   * @default '6d1cd89719364a3aa511289a94c2a7b1' (/sitecore/templates/System/Dictionary/Dictionary entry)
   */
  dictionaryEntryTemplateId?: string;

  /**
   * Optional. The template ID to use when searching for the appRootId.
   * @default '061cba1554744b918a0617903b102b82' (/sitecore/templates/Foundation/JavaScript Services/App)
   */
  jssAppTemplateId?: string;
}

/**
 * The schema of data returned in response to a dictionary query request.
 */
export type DictionaryQueryResult = {
  key: { value: string };
  phrase: { value: string };
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
   * Fetches dictionary data for internalization.
   * @param {string} language the language to fetch
   * @default query (@see query)
   * @returns dictionary phrases
   * @throws {Error} if the app root was not found for the specified site and language.
   */
  async fetchDictionaryData(language: string): Promise<DictionaryPhrases> {
    const cacheKey = this.options.siteName + language;
    const cachedValue = this.getCacheValue(cacheKey);
    if (cachedValue) {
      debug.dictionary('using cached dictionary data for %s %s', language, this.options.siteName);
      return cachedValue;
    }

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

    this.setCacheValue(cacheKey, phrases);
    return phrases;
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
      debugger: debug.dictionary,
    });
  }
}
