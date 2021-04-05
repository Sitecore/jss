import { GraphQLRequestClient } from '../graphql-request-client';
import { SitecoreTemplateId } from '../constants';
import { DictionaryPhrases, DictionaryServiceBase, CacheOptions } from './dictionary-service';

const DEFAULTS = Object.freeze({
  pageSize: 10,
});

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
      return cachedValue;
    }

    const client = new GraphQLRequestClient(this.options.endpoint, this.options.apiKey);
    if (!this.options.rootItemId) {
      this.options.rootItemId = await getSiteRoot(client, this.options.siteName, language);
    }

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

// TODO: Move to shared area and reuse for sitemap service (Anastasiya, March 2021)
const siteRootQuery = `
query getSiteRoot($jssAppTemplateId: String!, $siteName: String!, $language: String!)
{
  layout(site: $siteName, routePath: "/", language: $language) {
    homePage: item {
      rootItem: ancestors(includeTemplateIDs: [$jssAppTemplateId]) {
        id
      }
    }
  }
}
`;

/**
 * A reply from the GraphQL Sitecore Dictionary Service
 */
type SiteRootQueryResult = {
  layout: {
    homePage: {
      rootItem: {
        id: string;
      }[];
    };
  };
};

/**
 * Gets the ID of the site root item from the Sitecore item tree.
 * @param {GraphQLRequestClient} client that fetches data from a GraphQL endpoint.
 * @param {string} siteName the name of the Sitecore site.
 * @param {string} language the item language version.
 * @returns the root item ID of the Sitecore site.
 */
async function getSiteRoot(
  client: GraphQLRequestClient,
  siteName: string,
  language: string
): Promise<string> {
  const fetchResponse = await client.request<SiteRootQueryResult>(siteRootQuery, {
    jssAppTemplateId: SitecoreTemplateId.JssApp,
    siteName,
    language,
  });

  if (!fetchResponse?.layout?.homePage?.rootItem?.length) {
    throw new Error('Error fetching Sitecore site root item');
  }

  return fetchResponse.layout.homePage.rootItem[0].id;
}
