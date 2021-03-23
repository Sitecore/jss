import { GraphQLRequestClient } from '../graphql-request-client';
import { SitecoreTemplateId } from '../constants';
import { DictionaryPhrases, DictionaryServiceBase, CacheOptions } from './dictionary-service';

// TODO: use graphql import instead of string (Anastasiya, March 2021)
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
   * @default The GUID of the root item of the specified app.
   */
  rootItemId?: string;

  /**
   * How many dictionary items to fetch in each GraphQL call. This is needed for pagination.
   * @default 10
   */
  pageSize?: number;

  /**
   * The name of the current JSS app.
   */
  appName: string;
}

/**
 * A reply from the GraphQL Sitecore Dictionary Service
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
 * Fetch dictionary data using the Sitecore Dictionary Service GraphQL API.
 * Uses graphql-request as the default data fetcher (@see GraphQLRequestClient).
 */
export class GraphQLDictionaryService extends DictionaryServiceBase {
  /**
   * Creates an instance of graphQL dictionary service with the provided options
   * @param {GraphQLDictionaryService} options instance
   */
  constructor(public options: GraphQLDictionaryServiceConfig) {
    super(options);
    this.options.pageSize = this.options.pageSize ?? 10;
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
    const cacheKey = this.options.appName + language;
    const cachedValue = this.getCacheValue(cacheKey);
    if (cachedValue) {
      return cachedValue;
    }

    const dataFetcher = new GraphQLRequestClient(this.options.endpoint);
    if (!this.options.rootItemId) {
      this.options.rootItemId = await getAppRoot(dataFetcher, this.options.appName, language);
    }

    const results = await this.getDictionaryPhrases(dataFetcher, language);
    return this.setCacheValue(cacheKey, results);
  }

  /**
   * Gets dictionary phrases
   * @param {GraphQLRequestClient} dataFetcher
   * @param {string} language
   * @returns dictionary phrases
   */
  async getDictionaryPhrases(
    dataFetcher: GraphQLRequestClient,
    language: string
  ): Promise<DictionaryPhrases> {
    const results: DictionaryPhrases = {};
    let hasNext = true;
    let after = '';

    while (hasNext) {
      const fetchResponse = await dataFetcher.request<DictionaryQueryResult>(query, {
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

// TODO: Move to shared area and reuse for sitemap service (Anastasiya, March 2021)
const appRootQuery = `
query GetAppRoot($jssAppTemplateId: String, $appName: String!, $language: String)
{
  layout(site: $appName, routePath: "/", language: $language) {
    homePage: item {
      appRoot: ancestors(includeTemplateIDs: [$jssAppTemplateId]) {
        id
      }
    }
  }
}
`;

/**
 * A reply from the GraphQL Sitecore Dictionary Service
 */
type AppRootQueryResult = {
  layout: {
    homePage: {
      appRoot: {
        id: string;
      }[];
    };
  };
};

/**
 * Gets ID of the JSS app root for the provided GraphQL endpoint.
 * @param {GraphQLRequestClient} dataFetcher the GraphQL data fetcher.
 * @param {string} appName the name of the JSS app.
 * @param {string} language the item language version.
 * @returns the ID of the JSS app root item
 */
async function getAppRoot(
  dataFetcher: GraphQLRequestClient,
  appName: string,
  language: string
): Promise<string> {
  const fetchResponse = await dataFetcher.request<AppRootQueryResult>(appRootQuery, {
    jssAppTemplateId: SitecoreTemplateId.JssApp,
    appName,
    language,
  });

  if (!fetchResponse?.layout?.homePage?.appRoot?.length) {
    throw new Error('Error fetching JSS app root item');
  }

  return fetchResponse.layout.homePage.appRoot[0].id;
}
