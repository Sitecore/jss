import { GraphQLClient, ClientError } from 'graphql-request';
import { DocumentNode } from 'graphql';
import debuggers, { Debugger } from './debug';

export type GraphQLRequestClientConfig = {
  /**
   * The API key to use for authentication. This will be added as an 'sc_apikey' header.
   */
  apiKey?: string;
  /**
   * Override debugger for logging. Uses 'sitecore-jss:http' by default.
   */
  debugger?: Debugger;
};

export class GraphQLRequestClient {
  private client: GraphQLClient;
  private headers: Record<string, string> = {};
  private debug: Debugger;

  /**
   * Provides ability to execute graphql query using given `endpoint`
   * @param {string} endpoint The Graphql endpoint
   * @param {GraphQLRequestClientConfig} [clientConfig] GraphQL request client configuration.
   */
  constructor(private endpoint: string, clientConfig: GraphQLRequestClientConfig = {}) {
    if (clientConfig.apiKey) {
      this.headers.sc_apikey = clientConfig.apiKey;
    }
    this.client = new GraphQLClient(endpoint, { headers: this.headers });
    this.debug = clientConfig.debugger || debuggers.http;
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
      this.debug('request: %o', {
        url: this.endpoint,
        headers: this.headers,
        query,
        variables,
      });

      this.client
        .request(query, variables)
        .then((data: T) => {
          this.debug('response: %o', data);
          resolve(data);
        })
        .catch((error: ClientError) => {
          this.debug('response error: %o', error.response);
          return reject(error);
        });
    });
  }
}
