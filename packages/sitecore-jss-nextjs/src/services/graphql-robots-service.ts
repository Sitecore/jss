import {
  GraphQLClient,
  GraphQLRequestClient,
  SearchServiceConfig,
} from '@sitecore-jss/sitecore-jss/graphql';
import { debug } from '@sitecore-jss/sitecore-jss';

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

/**
 * The schema of data returned in response to robots.txt request
 */
export type RobotsQueryResult = { site: { siteInfo: { robots: string } } };

/**
 * Configuration options for @see GraphQLRobotsService instances
 */
export interface GraphQLRobotsServiceConfig extends SearchServiceConfig {
  /**
   * Your Graphql endpoint
   */
  endpoint: string;

  /**
   * The API key to use for authentication.
   */
  apiKey: string;
}

/**
 * Service that fetch the robots.txt data using Sitecore's GraphQL API.
 * @mixes Promise<String>
 */
export class GraphQLRobotsService {
  private graphQLClient: GraphQLClient;
  private robotsResult: Promise<RobotsQueryResult>;

  protected get query(): string {
    return defaultQuery;
  }

  /**
   * Creates an instance of graphQL robots.txt service with the provided options
   * @param {GraphQLRobotsServiceConfig} options instance
   */
  constructor(public options: GraphQLRobotsServiceConfig) {
    const siteName = this.options.siteName;
    this.graphQLClient = this.getGraphQLClient();
    this.robotsResult = this.graphQLClient.request(this.query, {
      siteName,
    });
  }

  /**
   * Fetch a data of robots.txt from API
   * @returns text of robots.txt
   */
  async fetchRobots(): Promise<string> {
    try {
      return this.robotsResult.then((result: RobotsQueryResult) => {
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
    return new GraphQLRequestClient(this.options.endpoint, {
      apiKey: this.options.apiKey,
      debugger: debug.sitemap,
    });
  }
}
