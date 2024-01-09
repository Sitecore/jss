import { GraphQLClient, GraphQLRequestClient } from '../graphql';
import { siteNameError } from '../constants';
import debug from '../debug';
import { GraphQLRequestClientFactory } from '../graphql-request-client';

// The default query for request robots.txt
const defaultQuery = /* GraphQL */ `
  query RobotsQuery($siteName: String!) {
    site {
      siteInfo(site: $siteName) {
        robots
      }
    }
  }
`;

export type GraphQLRobotsServiceConfig = {
  /**
   * Your Graphql endpoint
   * @deprecated use @param clientFactory property instead
   */
  endpoint?: string;
  /**
   * The API key to use for authentication
   * @deprecated use @param clientFactory property instead
   */
  apiKey?: string;
  /**
   * The JSS application name
   */
  siteName: string;
  /**
   * A GraphQL Request Client Factory is a function that accepts configuration and returns an instance of a GraphQLRequestClient.
   * This factory function is used to create and configure GraphQL clients for making GraphQL API requests.
   */
  clientFactory?: GraphQLRequestClientFactory;
};

/**
 * The schema of data returned in response to robots.txt request
 */
export type RobotsQueryResult = { site: { siteInfo: { robots: string } } };

/**
 * Service that fetch the robots.txt data using Sitecore's GraphQL API.
 */
export class GraphQLRobotsService {
  private graphQLClient: GraphQLClient;

  protected get query(): string {
    return defaultQuery;
  }

  /**
   * Creates an instance of graphQL robots.txt service with the provided options
   * @param {GraphQLRobotsServiceConfig} options instance
   */
  constructor(public options: GraphQLRobotsServiceConfig) {
    this.graphQLClient = this.getGraphQLClient();
  }

  /**
   * Fetch a data of robots.txt from API
   * @returns text of robots.txt
   * @throws {Error} if the siteName is empty.
   */
  async fetchRobots(): Promise<string> {
    const siteName: string = this.options.siteName;

    if (!siteName) {
      throw new Error(siteNameError);
    }

    const robotsResult: Promise<RobotsQueryResult> = this.graphQLClient.request(this.query, {
      siteName,
    });
    try {
      return robotsResult.then((result: RobotsQueryResult) => {
        return result?.site?.siteInfo?.robots;
      });
    } catch (e) {
      return Promise.reject(e);
    }
  }

  /**
   * Gets a GraphQL client that can make requests to the API. Uses graphql-request as the default
   * library for fetching graphql data (@see GraphQLRequestClient). Override this method if you
   * want to use something else.
   * @returns {GraphQLClient} implementation
   */
  protected getGraphQLClient(): GraphQLClient {
    if (!this.options.endpoint) {
      if (!this.options.clientFactory) {
        throw new Error('You should provide either an endpoint and apiKey, or a clientFactory.');
      }

      return this.options.clientFactory({
        debugger: debug.robots,
      });
    }

    return new GraphQLRequestClient(this.options.endpoint, {
      apiKey: this.options.apiKey,
      debugger: debug.robots,
    });
  }
}
