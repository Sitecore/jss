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

export type RetryError = Partial<ClientError> &
  Partial<Response> & {
    code?: string;
  };

/**
 * Defines the strategy for retrying GraphQL requests based on errors and attempts.
 */
export interface RetryStrategy {
  /**
   * Determines whether a request should be retried based on the given error and attempt count.
   * @param error - The error received from the GraphQL request.
   * @param attempt - The current attempt number.
   * @param retries - The number of retries configured.
   * @returns A boolean indicating whether to retry the request.
   */
  shouldRetry(error: RetryError, attempt: number, retries: number): boolean;
  /**
   * Calculates the delay (in milliseconds) before the next retry based on the given error and attempt count.
   * @param error - The error received from the GraphQL request.
   * @param attempt - The current attempt number.
   * @returns The delay in milliseconds before the next retry.
   */
  getDelay(error: RetryError, attempt: number): number;
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
   * GraphQLClient request timeout (in milliseconds).
   */
  timeout?: number;
  /**
   * Number of retries for client. Will use the specified `retryStrategy`.
   */
  retries?: number;
  /**
   * Retry strategy for the client. Uses `DefaultRetryStrategy` by default with exponential
   * back-off factor of 2 for codes 429, 502, 503, 504, 520, 521, 522, 523, 524.
   */
  retryStrategy?: RetryStrategy;
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
export type GraphQLRequestClientFactoryConfig = {
  endpoint: string;
  apiKey?: string;
};

/**
 * Represents a default retry strategy for handling retry attempts in case of specific HTTP status codes.
 * This class implements the RetryStrategy interface and provides methods to determine whether a request
 * should be retried and calculates the delay before the next retry attempt.
 */
export class DefaultRetryStrategy implements RetryStrategy {
  private statusCodes: number[];
  private errorCodes: string[];
  private factor: number;

  /**
   * @param {Object} options Configurable options for retry mechanism.
   * @param {number[]} options.statusCodes HTTP status codes to trigger retries on
   * @param {string[]} options.errorCodes Node error codes to trigger retries
   * @param {number} options.factor Factor by which the delay increases with each retry attempt
   */
  constructor(options: { statusCodes?: number[]; errorCodes?: string[]; factor?: number } = {}) {
    this.statusCodes = options.statusCodes || [429];
    this.errorCodes = options.errorCodes || ['ECONNRESET', 'ETIMEDOUT', 'EPROTO'];
    this.factor = options.factor || 2;
  }

  shouldRetry(error: RetryError, attempt: number, retries: number): boolean {
    const isHttpError =
      error.response?.status !== undefined && this.statusCodes.includes(error.response.status);
    const isErrorCode = error.code !== undefined && this.errorCodes.includes(error.code);
    return retries > 0 && attempt <= retries && (isHttpError || isErrorCode);
  }

  getDelay(error: RetryError, attempt: number): number {
    const rawHeaders = error.response?.headers;
    const retryAfterHeader = rawHeaders?.get('Retry-After');

    if (
      retryAfterHeader !== null &&
      retryAfterHeader !== undefined &&
      retryAfterHeader.trim() !== ''
    ) {
      const delaySeconds = Number.parseInt(retryAfterHeader, 10);
      return delaySeconds * 1000;
    } else {
      return Math.pow(this.factor, attempt - 1) * 1000;
    }
  }
}

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
  private retries: number;
  private retryStrategy: RetryStrategy;

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
    this.retries = clientConfig.retries ?? 3;
    this.retryStrategy =
      clientConfig.retryStrategy ||
      new DefaultRetryStrategy({ statusCodes: [429, 502, 503, 504, 520, 521, 522, 523, 524] });
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
    let attempt = 1;

    const retryer = async (): Promise<T> => {
      // Note we don't have access to raw request/response with graphql-request
      // (or nice hooks like we have with Axios), but we should log whatever we have.
      this.debug('request: %o', {
        url: this.endpoint,
        headers: this.headers,
        query,
        variables,
      });
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
        async (error: RetryError) => {
          this.abortTimeout?.clear();
          this.debug('response error: %o', error.response || error.message || error);
          const status = error.response?.status || error.code;
          const shouldRetry = this.retryStrategy.shouldRetry(error, attempt, this.retries);

          if (shouldRetry) {
            const delayMs = this.retryStrategy.getDelay(error, attempt);
            this.debug('Error: %s. Retrying in %dms (attempt %d).', status, delayMs, attempt);

            attempt++;
            return new Promise((resolve) => setTimeout(resolve, delayMs)).then(retryer);
          } else {
            return Promise.reject(error);
          }
        }
      );
    };

    return retryer();
  }
}
