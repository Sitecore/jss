import { GraphQLClient } from 'graphql-request';

export class GraphQLRequestClient {
  /**
   * Provides ability to execute graphql query using given `endpoint`
   * @param {string} endpoint Your Graphql endpoint
   */
  constructor(private endpoint: string) {}

  /**
   * Execute graphql request
   * @param {string} query graphql query
   * @param {Object} variables graphql variables
   */
  async request<T>(query: string, variables?: { [key: string]: unknown }): Promise<T> {
    const result = await this.requestInternal<T>(query, variables);

    return result;
  }

  /**
   * Create new graphql request client and execute request
   * @param {string} query graphql query
   * @param {Object} variables graphql variables
   */
  private requestInternal<T = unknown>(
    query: string,
    variables?: { [key: string]: unknown }
  ): Promise<T> {
    const client = new GraphQLClient(this.endpoint);

    return client.request(query, variables);
  }
}
