import { GraphQLClient as Client, ClientError } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { DocumentNode } from 'graphql';
import debuggers, { Debugger } from './debug';
import AbortController from "abort-controller";

/**
 * An interface for GraphQL clients for Sitecore APIs
 */
export interface GraphQLClient {
  /**
   * Execute graphql request
   * @param {string | DocumentNode} query graphql query
   * @param {Object} variables graphql variables
   */
  request<T>(query: string | DocumentNode, variables?: { [key: string]: unknown }): Promise<T>;
}

/**
 * Minimum configuration options for classes that implement @see GraphQLClient
 */
export type GraphQLRequestClientConfig = {
  /**
   * The API key to use for authentication. This will be added as an 'sc_apikey' header.
   */
  apiKey?: string;
  /**
   * Override debugger for logging. Uses 'sitecore-jss:http' by default.
   */
  debugger?: Debugger;
  /**
   * The request timeout in milliseconds.
   */
  timeout?: number;
};

/**
 * A GraphQL client for Sitecore APIs that uses the 'graphql-request' library.
 * https://github.com/prisma-labs/graphql-request
 */
export class GraphQLRequestClient implements GraphQLClient {
  private headers: Record<string, string> = {};
  private debug: Debugger;
  private timeout?: number;

  /**
   * Provides ability to execute graphql query using given `endpoint`
   * @param {string} endpoint The Graphql endpoint
   * @param {GraphQLRequestClientConfig} [clientConfig] GraphQL request client configuration.
   */
  constructor(private endpoint: string, clientConfig: GraphQLRequestClientConfig = {}) {
    if (clientConfig.apiKey) {
      this.headers.sc_apikey = clientConfig.apiKey;
    }
    this.timeout = clientConfig.timeout;
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
    const options: RequestInit = {
      headers: this.headers
    };

    if (this.timeout) {
      const abortController = new AbortController();
      options.signal = abortController.signal;
      setTimeout(() => abortController.abort(), this.timeout);
    }

    const client = new Client(this.endpoint, options);

    return new Promise((resolve, reject) => {
      // Note we don't have access to raw request/response with graphql-request
      // (or nice hooks like we have with Axios), but we should log whatever we have.
      this.debug('request: %o', {
        url: this.endpoint,
        headers: this.headers,
        query,
        variables,
      });

      client
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
