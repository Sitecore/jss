import { GraphQLClient } from 'graphql-request';
import chalk from 'chalk';

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
    const client = new GraphQLClient(this.endpoint);
    const onError = (error: unknown) => {
      console.error(
        chalk.red(`
          Error occurred while fetching attempting to fetch graphQL data.
          Endpoint: ${this.endpoint}
          Query: ${query}
          Variables: ${JSON.stringify(variables, null, 2)}
          Error: ${JSON.stringify(error, null, 2)}
        `)
      );
      throw error;
    };

    // todo: we should also print the query if we are in debug mode (Anastasiya, March 2021)
    return await client.request(query, variables).catch(onError);
  }
}
