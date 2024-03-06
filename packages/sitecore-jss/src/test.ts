import { defaultRetryOptions } from '@jxp-core/core/features/graphql/default-config';
import { GraphQLBatchRequestClient } from '@jxp-core/core/features/graphql/graphql-batch-client';
import { RetryOptions } from '@jxp-core/core/features/graphql/with-edge-retry';
import { GraphQLRequestClientConfig } from '@sitecore-jss/sitecore-jss';
import asyncRetry from 'async-retry';
import { ClientError } from 'graphql-request';
import { StatusCodes } from 'http-status-codes';

import { GRAPHQL_RETRY_ERROR_CODES } from 'constants/graphql';

type RetryError = Partial<ClientError> &
  Partial<Response> & {
    code?: string;
    statusCode?: number;
  };

class GraphQLRetryRequestClient extends GraphQLBatchRequestClient {
  protected retryErrors = GRAPHQL_RETRY_ERROR_CODES;

  protected asyncRetryOptions: Required<
    Pick<asyncRetry.Options, 'retries' | 'minTimeout' | 'maxTimeout' | 'maxRetryTime'>
  >;

  constructor(
    endpoint: string,
    clientConfig?: GraphQLRequestClientConfig,
    retryOptions?: RetryOptions
  ) {
    super(endpoint, clientConfig);

    this.asyncRetryOptions = {
      retries: retryOptions?.retries ?? defaultRetryOptions.retries,
      minTimeout: (retryOptions?.retryDelaySecs ?? defaultRetryOptions.retryDelaySecs) * 1000,
      maxTimeout: (retryOptions?.retryDelaySecs ?? defaultRetryOptions.retryDelaySecs) * 1000,
      maxRetryTime: 60000,
    };
  }

  async request<T>(...args: Parameters<GraphQLBatchRequestClient['request']>): Promise<T> {
    return this.retryRequest<T>(() => super.request(...args));
  }

  async batchRequest<T>(
    ...args: Parameters<GraphQLBatchRequestClient['batchRequest']>
  ): Promise<T> {
    return this.retryRequest<T>(() => super.batchRequest(...args));
  }

  protected async retryRequest<T>(request: () => Promise<T>): Promise<T> {
    let attempt = 0;
    while (attempt < this.asyncRetryOptions.retries) {
      try {
        const res = await request();
        return res;
      } catch (err) {
        const { retry, error } = this.hasToRetry(err as RetryError);

        if (!retry) {
          // Don't retry and throw error
          throw error as Error;
        }

        attempt++;
        console.warn(`WARNING: Retrying graphql request (attempt ${attempt}) |`, error.message);
        await new Promise((resolve) => setTimeout(resolve, this.asyncRetryOptions.minTimeout));
      }
    }

    throw new Error(`Exhausted all retry attempts (${this.asyncRetryOptions.retries}).`);
  }

  private hasToRetry(error?: RetryError): { retry: boolean; error: Error } {
    if (!error) return { retry: false, error: new Error('Error is undefined') };

    const retry =
      [error.response?.status, error.statusCode, error.status].includes(
        StatusCodes.TOO_MANY_REQUESTS
      ) ||
      this.retryErrors.includes(error.code as string) ||
      this.retryErrors.some((e) => error.message?.includes(e));

    return {
      retry,
      error: error instanceof Error ? error : new Error(String(error)),
    };
  }
}

export default GraphQLRetryRequestClient;
