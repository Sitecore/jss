/* eslint-disable @typescript-eslint/no-explicit-any */
import { GraphQLClient as GraphQLRequestClient } from 'graphql-request';

export class GraphQLClient {
  constructor(private endpoint: string) {}

  async request<T = any>(query: string, variables?: any): Promise<T> {
    const result = await this.requestInternal(query, variables);

    return result;
  }

  private requestInternal<T = any>(query: string, variables?: any): Promise<T> {
    const client = new GraphQLRequestClient(this.endpoint);

    return client.request(query, variables);
  }
}
