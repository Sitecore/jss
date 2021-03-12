import { GraphQLRequestClient } from '../graphql-request-client';
import { SitecoreTemplateId, SitecoreItemId } from '../constants';
import { DictionaryPhrases, DictionaryServiceBase, CacheOptions } from './dictionary-service';

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


export interface GraphQLDictionaryServiceConfig extends CacheOptions {
  endpoint: string;
  rootItemId?: string;
  pageSize?: number;
}

/**
 * A reply from the GraphQL Sitecore Dictionary Service
 */
type DictionaryQueryResult = {
  search: {
    pageInfo: {
      endCursor: string,
      hasNext: boolean
    },
    dictionaryPhrases: {
      key: {
        value: string
      },
      phrase: {
        value: string
      }
    }[];
  };
};

/**
 * Fetch dictionary data using the Sitecore Dictionary Service GraphQL API.
 * Uses graphql-request as the default data fetcher (@see GraphQLRequestClient).
 */
export class GraphQLDictionaryService extends DictionaryServiceBase {

  /**
   * Creates an instance of graphQL dictionary service with the provided options.
   * @param config (GraphQLDictionaryServiceConfig instance)
   */
  constructor(public options: GraphQLDictionaryServiceConfig) {
    super(options);
    this.options.rootItemId = this.options.rootItemId ?? SitecoreItemId.Content;
    this.options.pageSize = this.options.pageSize ?? 10;
  }

  /**
   * Fetches dictionary data for internalization.
   * @param {string} locale locale which application supports
   * @param {string} rootItemPath root item path
   *
   * @default Search query
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
   */
  async fetchDictionaryData(language: string): Promise<DictionaryPhrases> {
    const cacheKey = this.options.endpoint + language + this.options.rootItemId;
    const cachedValue = this.getCachedValue(cacheKey);
    if (cachedValue) {
      return cachedValue;
    };

    const dataFetcher = new GraphQLRequestClient(this.options.endpoint);
    const results: DictionaryPhrases = {};
    let hasNext = true;
    let after = "";

    while (hasNext) {
      const fetchResponse = await dataFetcher
        .request<DictionaryQueryResult>(query, {
          rootItemId: this.options.rootItemId,
          language,
          dictionaryEntryTemplateId: SitecoreTemplateId.DictionaryEntry,
          pageSize: this.options.pageSize,
          after
        });

      fetchResponse.search.dictionaryPhrases.forEach(dictionaryPhrase => {
        results[dictionaryPhrase.key.value] = dictionaryPhrase.phrase.value;
      });

      hasNext = fetchResponse.search.pageInfo.hasNext;
      after = fetchResponse.search.pageInfo.endCursor;
    }

    return this.cacheValue(cacheKey, results);
  }
}
