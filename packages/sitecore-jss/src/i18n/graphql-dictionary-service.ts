import { GraphQLRequestClient } from '../graphql-request-client';
import { SitecoreTemplateId } from '../constants';
import { DictionaryPhrases, DictionaryServiceBase, CacheOptions } from './dictionary-service';
import { getAppRoot } from '../utils/app-root-resolver';
import debug from '../debug';

const DEFAULTS = Object.freeze({
  pageSize: 10,
});

const query = `
query DictionarySearch(
    $rootItemId: String!,
    $language: String!,
    $dictionaryEntryTemplateId: String!,
    $pageSize: Int = 10,
    $after: String
  ) {
  search(
    where: {
      AND:[
        { name: "_path",      value: $rootItemId },
        { name: "_templates", value: $dictionaryEntryTemplateId },
        { name: "_language",  value: $language }
      ]
    }
    first: $pageSize
    after: $after
    orderBy: { name: "Title", direction: ASC }
  ) {
    total
    pageInfo {
      endCursor
      hasNext
    }
    dictionaryPhrases: results {
      key: field(name: "key") {
        value
      },
      phrase: field(name: "phrase") {
        value
      }
    }
  }
}
`;

/**
 * Configuration options for @see GraphQLDictionaryService instances
 */
export interface GraphQLDictionaryServiceConfig extends CacheOptions {
  /**
   * The URL of the graphQL endpoint.
   */
  endpoint: string;

  /**
   * The GUID of the Sitecore item to use as the root for the dictionary service search.
   * @default The GUID of the root item of the specified Sitecore site.
   */
  rootItemId?: string;

  /**
   * How many dictionary items to fetch in each GraphQL call. This is needed for pagination.
   * @default 10
   */
  pageSize?: number;

  /**
   * The name of the current Sitecore site.
   */
  siteName: string;

  /**
   * The API key to use for authentication.
   */
  apiKey: string;
}

/**
 * A reply from the GraphQL endpoint for the 'DictionarySearch' query
 */
type DictionaryQueryResult = {
  search: {
    pageInfo: {
      endCursor: string;
      hasNext: boolean;
    };
    dictionaryPhrases: {
      key: {
        value: string;
      };
      phrase: {
        value: string;
      };
    }[];
  };
};

/**
 * Fetch dictionary data using  Sitecore's GraphQL API.
 * Note: Uses graphql-request as the default library for fetching graphql data (@see GraphQLRequestClient).
 */
export class GraphQLDictionaryService extends DictionaryServiceBase {
  /**
   * Creates an instance of graphQL dictionary service with the provided options
   * @param {GraphQLDictionaryService} options instance
   */
  constructor(public options: GraphQLDictionaryServiceConfig) {
    super(options);
    this.options.pageSize = this.options.pageSize ?? DEFAULTS.pageSize;
  }

  /**
   * Fetches dictionary data for internalization.
   * @param {string} language the language to fetch
   * @default Search query
   * query DictionarySearch(
   * $rootItemId: String!,
   * $language: String!,
   * $dictionaryEntryTemplateId: String!,
   * $pageSize: Int = 10,
   * $after: String
   * ) {
   * search(
   * where: {
   * AND:[
   * { name: "_path",      value: $rootItemId },
   * { name: "_templates", value: $dictionaryEntryTemplateId },
   * { name: "_language",  value: $language }
   * ]
   * }
   * first: $pageSize
   * after: $after
   * orderBy: { name: "Title", direction: ASC }
   * ) {
   * total
   * pageInfo {
   * endCursor
   * hasNext
   * }
   * dictionaryPhrases: results {
   * key: field(name: "key") {
   * value
   * },
   * phrase: field(name: "phrase") {
   * value
   * }
   * }
   * }
   * }
   */
  async fetchDictionaryData(language: string): Promise<DictionaryPhrases> {
    const cacheKey = this.options.siteName + language;
    const cachedValue = this.getCacheValue(cacheKey);
    if (cachedValue) {
      debug.dictionary('using cached dictionary data for %s %s', language, this.options.siteName);
      return cachedValue;
    }

    const client = new GraphQLRequestClient(this.options.endpoint, {
      apiKey: this.options.apiKey,
      debugger: debug.dictionary,
    });
    if (!this.options.rootItemId) {
      debug.dictionary('fetching site root for %s %s', language, this.options.siteName);
      this.options.rootItemId = await getAppRoot(client, this.options.siteName, language);
    }

    debug.dictionary('fetching dictionary data for %s %s', language, this.options.siteName);
    const results = await this.getDictionaryPhrases(client, language);
    this.setCacheValue(cacheKey, results);
    return results;
  }

  /**
   * Gets dictionary phrases
   * @param {GraphQLRequestClient} client that fetches data from a GraphQL endpoint.
   * @param {string} language
   * @returns dictionary phrases
   */
  async getDictionaryPhrases(
    client: GraphQLRequestClient,
    language: string
  ): Promise<DictionaryPhrases> {
    const results: DictionaryPhrases = {};
    let hasNext = true;
    let after = '';

    while (hasNext) {
      const fetchResponse = await client.request<DictionaryQueryResult>(query, {
        // `search` query only works with lowercase GUIDs
        rootItemId: this.options.rootItemId?.toLowerCase(),
        language,
        dictionaryEntryTemplateId: SitecoreTemplateId.DictionaryEntry,
        pageSize: this.options.pageSize,
        after,
      });

      fetchResponse.search.dictionaryPhrases.forEach((dictionaryPhrase) => {
        results[dictionaryPhrase.key.value] = dictionaryPhrase.phrase.value;
      });

      hasNext = fetchResponse.search.pageInfo.hasNext;
      after = fetchResponse.search.pageInfo.endCursor;
    }

    return results;
  }
}
