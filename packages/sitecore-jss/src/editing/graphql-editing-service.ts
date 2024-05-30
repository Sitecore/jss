import debug from '../debug';
import { PageInfo } from '../graphql';
import { GraphQLClient, GraphQLRequestClientFactory } from '../graphql-request-client';
import { DictionaryPhrases } from '../i18n';
import { LayoutServiceData } from '../layout';

/**
 * The dictionary query default page size.
 */
const PAGE_SIZE = 1000;

/**
 * GraphQL query for fetching editing data.
 */
export const query = /* GraphQL */ `
  query EditingQuery(
    $siteName: String!
    $itemId: String!
    $version: String!
    $language: String!
    $after: String
  ) {
    item(path: $itemId, language: $language, version: $version) {
      rendered
    }
    site {
      siteInfo(site: $siteName) {
        dictionary(language: $language, first: ${PAGE_SIZE}, after: $after) {
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
 * GraphQL query for fetching dictionary data.
 * This query is used when the dictionary data is paginated.
 */
export const dictionaryQuery = /* GraphQL */ `
  query EditingDictionaryQuery(
    $siteName: String!
    $language: String!
    $after: String
  ) {
    site {
      siteInfo(site: $siteName) {
        dictionary(language: $language, first: ${PAGE_SIZE}, after: $after) {
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
 * Response from the GraphQL Dictionary query.
 */
export type GraphQLDictionaryQueryResponse = {
  site: {
    siteInfo: { dictionary: { results: { key: string; value: string }[]; pageInfo: PageInfo } };
  };
};

/**
 * Response from the GraphQL Editing query.
 */
export type GraphQLEditingQueryResponse = GraphQLDictionaryQueryResponse & {
  item: { rendered: LayoutServiceData };
};

export interface GraphQLEditingServiceConfig {
  /**
   * A GraphQL Request Client Factory is a function that accepts configuration and returns an instance of a GraphQLRequestClient.
   * This factory function is used to create and configure GraphQL clients for making GraphQL API requests.
   */
  clientFactory: GraphQLRequestClientFactory;
}

/**
 * Service for fetching editing data from Sitecore using the Sitecore's GraphQL API.
 * Expected to be used in XMCloud Pages preview (editing) Metadata mode.
 */
export class GraphQLEditingService {
  private graphQLClient: GraphQLClient;

  /**
   * Fetch layout data using the Sitecore GraphQL endpoint.
   * @param {GraphQLLayoutServiceConfig} serviceConfig configuration
   */
  constructor(public serviceConfig: GraphQLEditingServiceConfig) {
    this.graphQLClient = this.getGraphQLClient();
  }

  /**
   * Fetch layout data for an item.
   * @param {string} itemPath item path to fetch layout data for.
   * @param {string} [language] the language to fetch layout data for.
   * @returns {Promise<LayoutServiceData>} layout service data
   */

  /**
   * Fetches editing data. Provides the layout data and dictionary phrases
   * @param {Object} variables - The parameters for fetching editing data.
   * @param {string} variables.siteName - The site name.
   * @param {string} variables.itemId - The item id (path) to fetch layout data for.
   * @param {string} variables.version - The version of the item .
   * @param {string} variables.language - The language to fetch layout data for.
   * @returns {Promise<LayoutServiceData>} layout service data
   */
  async fetchEditingData({
    siteName,
    itemId,
    version,
    language,
  }: {
    siteName: string;
    itemId: string;
    version: string;
    language: string;
  }) {
    debug.editing('fetching editing data for %s %s %s %s', siteName, itemId, language, version);

    const dictionary: DictionaryPhrases = {};
    let dictionaryResults: { key: string; value: string }[] = [];
    let hasNext = true;
    let after = '';

    const editingData = await this.graphQLClient.request<GraphQLEditingQueryResponse>(query, {
      siteName,
      itemId,
      version,
      language,
    });

    dictionaryResults = editingData.site.siteInfo.dictionary.results;
    hasNext = editingData.site.siteInfo.dictionary.pageInfo.hasNext;
    after = editingData.site.siteInfo.dictionary.pageInfo.endCursor;

    while (hasNext) {
      const data = await this.graphQLClient.request<GraphQLDictionaryQueryResponse>(
        dictionaryQuery,
        {
          siteName,
          language,
          after,
        }
      );

      dictionaryResults = dictionaryResults.concat(data.site.siteInfo.dictionary.results);
      hasNext = data.site.siteInfo.dictionary.pageInfo.hasNext;
      after = data.site.siteInfo.dictionary.pageInfo.endCursor;
    }

    dictionaryResults.forEach((item) => (dictionary[item.key] = item.value));

    return { layoutData: editingData.item.rendered, dictionary };
  }

  /**
   * Gets a GraphQL client that can make requests to the API.
   * @returns {GraphQLClient} implementation
   */
  protected getGraphQLClient(): GraphQLClient {
    if (!this.serviceConfig.clientFactory) {
      throw new Error('clientFactory needs to be provided when initializing GraphQL client.');
    }

    return this.serviceConfig.clientFactory({
      debugger: debug.editing,
      headers: {
        sc_editMode: 'true',
      },
    });
  }
}
