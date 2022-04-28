import { DocumentNode } from 'graphql';
import { BaseQueryService, BaseQueryVariables } from './base-query-service';
// TODO: rewrite site query results
// TODO: review-rewrite comments

/**
 * Schema of data returned in response to a "site" query request
 * @template T The type of objects being requested.
 */
export type SiteQueryResult<T> = {
  site: {
    siteInfo: {
      routes: {
        /**
         * Data needed to paginate the site results
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
  };
};

/**
 * Describes the variables used by the 'search' query. Language should always be specified.
 * The other predicates are optional.
 */
export declare interface SiteQueryVariables extends BaseQueryVariables {
  /**
   * Required. The name of the site being queried.
   */
  siteName: string;

  language: string;

  includedPaths?: string[];

  excludedPaths?: string[];
}

/**
 * Provides functionality for performing GraphQL 'search' operations, including handling pagination.
 * This class is meant to be extended or used as a mixin; it's not meant to be used directly.
 * @template T The type of objects being requested.
 * @mixin
 */
export class SiteQueryService<T> extends BaseQueryService<T> {
  /**
   * Creates an instance of search query service.
   * @param {GraphQLClient} client that fetches data from a GraphQL endpoint.
   */

  /**
   * 1. Validates mandatory search query arguments
   * 2. Executes search query with pagination
   * 3. Aggregates pagination results into a single result-set.
   * @template T The type of objects being requested.
   * @param {string | DocumentNode} query the search query.
   * @param {SiteQueryVariables} args search query arguments.
   * @returns {T[]} array of result objects.
   * @throws {RangeError} if a valid root item ID is not provided.
   * @throws {RangeError} if the provided language(s) is(are) not valid.
   */
  async fetch(query: string | DocumentNode, args: SiteQueryVariables): Promise<T[]> {
    if (!args.siteName) {
      throw new RangeError('"siteName" must a be non-empty string');
    }

    let results: T[] = [];
    let hasNext = true;
    let after = '';

    while (hasNext) {
      const fetchResponse = await this.client.request<SiteQueryResult<T>>(query, {
        ...args,
        after,
      });

      results = results.concat(fetchResponse?.site?.siteInfo?.routes?.results);
      hasNext = fetchResponse.site.siteInfo.routes.pageInfo.hasNext;
      after = fetchResponse.site.siteInfo.routes.pageInfo.endCursor;
    }

    return results;
  }
}
