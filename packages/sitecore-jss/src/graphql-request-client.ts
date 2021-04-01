import { GraphQLClient } from 'graphql-request';
import chalk from 'chalk';
import { DocumentNode } from 'graphql';

export class GraphQLRequestClient {
  /**
   * Provides ability to execute graphql query using given `endpoint`
   * @param {string} endpoint The Graphql endpoint
   * @param {string} [apiKey] The API key to use for authentication. This will be added as an 'sc_apikey' header.
   */
  constructor(private endpoint: string, private apiKey?: string) {}

  /**
   * Execute graphql request
   * @param {string | DocumentNode} query graphql query
   * @param {Object} variables graphql variables
   */
  async request<T>(
    query: string | DocumentNode,
    variables?: { [key: string]: unknown }
  ): Promise<T> {
    const client = new GraphQLClient(
      this.endpoint,
      this.apiKey ? { headers: { sc_apikey: this.apiKey } } : undefined
    );
    const onError = (error: unknown) => {
      console.error(
        chalk.red(`
          Error occurred while attempting to fetch graphQL data.
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
