import { DocumentNode } from 'graphql';
import { BaseQueryService, BaseQueryVariables } from './base-query-service';
/**
 * Schema of data returned in response to a "search" query request
 * @template T The type of objects being requested.
 */
export type SearchQueryResult<T> = {
  search: {
    /**
     * Data needed to paginate the search results
     */
    pageInfo: {
      /**
       * string token that can be used to fetch the next page of results
       */
      endCursor: string;
      /**
       * a value that indicates whether more pages of results are available
       */
      hasNext: boolean;
    };
    /*
     * the type of data querying about items matching the search criteria
     */
    results: T[];
  };
};

/**
 * Describes the variables used by the 'search' query. Language should always be specified.
 * The other predicates are optional.
 */
export interface SearchQueryVariables extends BaseQueryVariables {
  /**
   * Required. The language versions to search for. Fetch pages that have versions in this language.
   */
  language: string;

  /**
   * Optional. The ID of the search root item. Fetch items that have this item as an ancestor.
   */
  rootItemId?: string;

  /**
   * Optional. Sitecore template ID(s). Fetch items that inherit from this template(s).
   */
  templates?: string;
}

/**
 * Configuration options for service classes that extend @see SearchQueryService.
 * This extends @see SearchQueryVariables because properties that can be passed to the search query
 * as predicates should be configurable. 'language' is excluded because, normally, all properties
 * except 'language' are consistent across languages so they are passed to constructors, and
 * 'language' can vary so it is passed to methods.
 */
export interface SearchServiceConfig extends Omit<SearchQueryVariables, 'language'> {
  /**
   * The name of the current Sitecore site. This is used to to determine the search query root
   * in cases where one is not specified by the caller.
   */
  siteName: string;
}

/**
 * Provides functionality for performing GraphQL 'search' operations, including handling pagination.
 * This class is meant to be extended or used as a mixin; it's not meant to be used directly.
 * @template T The type of objects being requested.
 * @mixin
 */
export class SearchQueryService<T> extends BaseQueryService<T> {
  /**
   * 1. Validates mandatory search query arguments
   * 2. Executes search query with pagination
   * 3. Aggregates pagination results into a single result-set.
   * @template T The type of objects being requested.
   * @param {string | DocumentNode} query the search query.
   * @param {SearchQueryVariables} args search query arguments.
   * @returns {T[]} array of result objects.
   * @throws {RangeError} if a valid root item ID is not provided.
   * @throws {RangeError} if the provided language(s) is(are) not valid.
   */
  async fetch(query: string | DocumentNode, args: SearchQueryVariables): Promise<T[]> {
    if (!args.rootItemId) {
      throw new RangeError('"rootItemId" and "language" must be non-empty strings');
    }

    if (!args.language) {
      throw new RangeError('"rootItemId" and "language" must be non-empty strings');
    }

    let results: T[] = [];
    let hasNext = true;
    let after = '';

    while (hasNext) {
      const fetchResponse = await this.client.request<SearchQueryResult<T>>(query, {
        ...args,
        after,
      });

      results = results.concat(fetchResponse?.search?.results);
      hasNext = fetchResponse.search.pageInfo.hasNext;
      after = fetchResponse.search.pageInfo.endCursor;
    }

    return results;
  }
}
