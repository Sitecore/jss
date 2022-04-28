import { DocumentNode } from 'graphql';
import { GraphQLClient } from '../graphql-request-client';

/**
 * This file contains base types for GraphQL services within sitecore-jss
 */

export interface BaseQueryVariables {
  /** common variable for all GraphQL queries
   * it will be used for every type of query to regulate result batch size
   * Optional. How many result items to fetch in each GraphQL call. This is needed for pagination.
   * @default 10
   */
  pageSize?: number;
}

export abstract class BaseQueryService<T> {
  /**
   * Creates an instance of search query service.
   * @param {GraphQLClient} client that fetches data from a GraphQL endpoint.
   */
  constructor(protected client: GraphQLClient) {}

  /**
   * 1. Validates mandatory search query arguments
   * 2. Executes search query with pagination
   * 3. Aggregates pagination results into a single result-set.
   * @template T The type of objects being requested.
   * @param {string | DocumentNode} query the graph query.
   * @param {BaseQueryVariables} args graph query arguments - should have derived types for different types of GraphQL queries.
   * */
  abstract fetch(query: string | DocumentNode, args: BaseQueryVariables): Promise<T[]>;
}
