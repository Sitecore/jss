import { GraphQLRequestClient } from '../graphql-request-client';
import { SitecoreTemplateId, SitecoreItemId } from '../constants';
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

export interface GraphQLDictionaryServiceConfig extends CacheOptions {
  endpoint: string;
  rootItemId?: string;
  pageSize?: number;
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
   * Creates an instance of graphQL dictionary service with the provided options.
   * @param options {GraphQLDictionaryService} instance
   */
  constructor(public options: GraphQLDictionaryServiceConfig) {
    super(options);
    this.options.rootItemId = this.options.rootItemId ?? SitecoreItemId.Content;
    this.options.pageSize = this.options.pageSize ?? 10;
  }

  /**
   * Fetches dictionary data for internalization.
   * @param language {string} the language to fetch
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
    const cachedValue = this.getCachedValue(cacheKey);
    if (cachedValue) {
      return cachedValue;
    }

    const dataFetcher = new GraphQLRequestClient(this.options.endpoint);
    if (!this.options.rootItemId) {
      this.options.rootItemId = await getAppRoot(dataFetcher, this.options.appName, language);
    }

    const results = await this.getDictionaryPhrases(dataFetcher, language);
    return this.cacheValue(cacheKey, results);
  }

  /**
   * Gets dictionary phrases
   * @param dataFetcher (GraphQLRequestClient)
   * @param language (string)
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
 * @param dataFetcher {GraphQLRequestClient} the GraphQL data fetcher.
 * @param appName {string} the name of the JSS app.
 * @param language {string} the item language version.
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
