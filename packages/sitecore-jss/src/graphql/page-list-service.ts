import { SearchQueryService, SearchQueryVariables } from './search-service';
import { GraphQLClient } from '../graphql-request-client';

// Even though _hasLayout should always be "true" in this query, using a variable is necessary for compatibility with Edge
const pageListQuery = /* GraphQL */ `
  query PageListQuery(
    $rootItemId: String!
    $language: String!
    $pageSize: Int = 10
    $hasLayout: String = "true"
    $after: String
  ) {
    search(
      where: {
        AND: [
          { name: "_path", value: $rootItemId }
          { name: "_language", value: $language }
          { name: "_hasLayout", value: $hasLayout }
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
        url {
          path
        }
      }
    }
  }
`;

/**
 * The schema of data returned in response to a page list query request
 */
export type PageListQueryResult = { url: { path: string } };

/**
 * Service that fetches page list data using Sitecore's GraphQL API.
 * @augments SearchQueryService<PageListQueryResult>
 */
export class PageListService extends SearchQueryService<PageListQueryResult> {
  constructor(client: GraphQLClient) {
    super(client);
  }

  /**
   * Fetch a flat list of pages that descend from the specified root item and have a version in the
   * specified language.
   * @param {SearchQueryVariables} args search query variables.
   * @returns list of pages as an array of {@see PageListQueryResult} objects.
   */
  async fetchPageList(args: SearchQueryVariables) {
    return super.fetch(pageListQuery, args);
  }
}
