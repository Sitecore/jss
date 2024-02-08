import { GraphQLClient as Client, ClientError } from 'graphql-request';
import parse from 'url-parse';
import { DocumentNode } from 'graphql';
import debuggers, { Debugger } from './debug';
import TimeoutPromise from './utils/timeout-promise';

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
   * Override fetch method. Uses 'graphql-request' library default otherwise ('cross-fetch').
   */
  fetch?: typeof fetch;
  /**
   * GraphQLClient request timeout
   */
  timeout?: number;
  /**
   * Number of retries for client. Will be used if endpoint responds with 429 (rate limit reached) error
   */
  retryConfig?: Record<number, { retries: number; minimumTimeout: number }>;
};

/**
 * A GraphQL Client Factory is a function that accepts configuration and returns an instance of a GraphQLRequestClient.
 * This factory function is used to create and configure GraphQL clients for making GraphQL API requests.
 * @param config - The configuration object that specifies how the GraphQL client should be set up.
 * @returns An instance of a GraphQL Request Client ready to send GraphQL requests.
 */
export type GraphQLRequestClientFactory = (
  config: Omit<GraphQLRequestClientConfig, 'apiKey'>
) => GraphQLRequestClient;

/**
 * Configuration type for @type GraphQLRequestClientFactory
 */
export type GraphQLRequestClientFactoryConfig = { endpoint: string; apiKey?: string };

/**
 * A GraphQL client for Sitecore APIs that uses the 'graphql-request' library.
 * https://github.com/prisma-labs/graphql-request
 */
export class GraphQLRequestClient implements GraphQLClient {
  private client: Client;
  private headers: Record<string, string> = {};
  private debug: Debugger;
  private abortTimeout?: TimeoutPromise;
  private timeout?: number;
  private retryConfig: Record<number, { retries: number; minimumTimeout: number }>;

  /**
   * Provides ability to execute graphql query using given `endpoint`
   * @param {string} endpoint The Graphql endpoint
   * @param {GraphQLRequestClientConfig} [clientConfig] GraphQL request client configuration.
   */
  constructor(private endpoint: string, clientConfig: GraphQLRequestClientConfig = {}) {
    if (clientConfig.apiKey) {
      this.headers.sc_apikey = clientConfig.apiKey;
    }

    if (!endpoint || !parse(endpoint).hostname) {
      throw new Error(
        `Invalid GraphQL endpoint '${endpoint}'. Verify that 'layoutServiceHost' property in 'scjssconfig.json' file or appropriate environment variable is set`
      );
    }

    this.timeout = clientConfig.timeout;
    this.retryConfig = clientConfig.retryConfig || {};
    this.client = new Client(endpoint, {
      headers: this.headers,
      fetch: clientConfig.fetch,
    });
    this.debug = clientConfig.debugger || debuggers.http;
  }

  /**
   * Factory method for creating a GraphQLRequestClientFactory.
   * @param {Object} config - client configuration options.
   * @param {string} config.endpoint - endpoint
   * @param {string} [config.apiKey] - apikey
   */
  static createClientFactory({
    endpoint,
    apiKey,
  }: GraphQLRequestClientFactoryConfig): GraphQLRequestClientFactory {
    return (config: Omit<GraphQLRequestClientConfig, 'apiKey'> = {}) =>
      new GraphQLRequestClient(endpoint, { ...config, apiKey });
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
    const statusCodes = Object.keys(this.retryConfig).map(Number);

    const retryer = async (): Promise<T> => {
      const startTimestamp = Date.now();
      const fetchWithOptionalTimeout = [this.client.request(query, variables)];
      if (this.timeout) {
        this.abortTimeout = new TimeoutPromise(this.timeout);
        fetchWithOptionalTimeout.push(this.abortTimeout.start);
      }

      return Promise.race(fetchWithOptionalTimeout).then(
        (data: T) => {
          this.abortTimeout?.clear();
          this.debug('response in %dms: %o', Date.now() - startTimestamp, data);
          return Promise.resolve(data);
        },
        async (error: ClientError) => {
          this.abortTimeout?.clear();
          const status = error.response?.status;
          if (statusCodes.includes(status) && this.retryConfig[status].retries > 0) {
            const config = this.retryConfig[status];
            // factor by which the timeout increases with each retry.
            const factor = 2;
            const delaySeconds =
              error.response.headers.get('Retry-After') ||
              config.minimumTimeout * Math.pow(factor, config.retries);
            this.debug(
              'Error: %d. Retrying in %ds. Retries left: %d',
              status,
              delaySeconds,
              config.retries
            );
            config.retries--;
            await new Promise((resolve) => setTimeout(resolve, delaySeconds));
            return retryer();
          } else {
            return Promise.reject(error);
          }
        }
      );
    };

    return retryer();
  }
}
