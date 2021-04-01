import { GraphQLClient, ClientError } from 'graphql-request';
import { DocumentNode } from 'graphql';
import { debugHttp as debug } from './debug';

export class GraphQLRequestClient {
  private client: GraphQLClient;
  private headers: Record<string, string> = {};

  /**
   * Provides ability to execute graphql query using given `endpoint`
   * @param {string} endpoint The Graphql endpoint
   * @param {string} [apiKey] The API key to use for authentication. This will be added as an 'sc_apikey' header.
   */
  constructor(private endpoint: string, apiKey?: string) {
    if (apiKey) {
      this.headers.sc_apikey = apiKey;
    }
    this.client = new GraphQLClient(endpoint, { headers: this.headers });
  }

  /**
   * Execute graphql request
   * @param {string | DocumentNode} query graphql query
   * @param {Object} variables graphql variables
   */
  async request<T>(
    query: string | DocumentNode,
    variables?: { [key: string]: unknown }
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      // Note we don't have access to raw request/response with graphql-request
      // (or nice hooks like we have with Axios), but we should log whatever we have.
      debug('request: %o', { url: this.endpoint, headers: this.headers, query, variables });
      this.client
        .request(query, variables)
        .then((data: T) => {
          debug('response: %o', data);
          resolve(data);
        })
        .catch((error: ClientError) => {
          debug('response error: %o', error.response);
          return reject(error);
        });
    });
  }
}
