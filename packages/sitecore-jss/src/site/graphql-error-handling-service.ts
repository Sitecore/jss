import { GraphQLClient, GraphQLRequestClient } from '../graphql';
import { siteNameError } from '../constants';
import debug from '../debug';

// The default query for request error handling
const defaultQuery = /* GraphQL */ `
  query ErrorHandlingQuery($siteName: String!, $language: String!) {
    site {
      siteInfo(site: $siteName) {
        errorHandling(language: $language) {
          notFoundPagePath
          serverErrorPagePath
        }
      }
    }
  }
`;

export type GraphQLErrorHandlingServiceConfig = {
  /**
   * Your Graphql endpoint
   */
  endpoint: string;
  /**
   * The API key to use for authentication
   */
  apiKey: string;
  /**
   * The JSS application name
   */
  siteName: string;
  /**
   * The language
   */
  language: string;
};

export type ErrorHandlingType = { notFoundPagePath: string; serverErrorPagePath: string };

/**
 * The schema of data returned in response to error pages link request
 */
export type ErrorHandlingQueryResult = { site: { siteInfo: { errorHandling: ErrorHandlingType } } };

/**
 * Service that fetch the error handling data using Sitecore's GraphQL API.
 */
export class GraphQLErrorHandlingService {
  private graphQLClient: GraphQLClient;

  protected get query(): string {
    return defaultQuery;
  }

  /**
   * Creates an instance of graphQL error handling service with the provided options
   * @param {GraphQLErrorHandlingServiceConfig} options instance
   */
  constructor(public options: GraphQLErrorHandlingServiceConfig) {
    this.graphQLClient = this.getGraphQLClient();
  }

  /**
   * Fetch list of error handling for the site
   * @returns {errorHandlingType} list of url's error pages
   * @throws {Error} if the siteName is empty.
   */
  async fetchErrorHandling(): Promise<ErrorHandlingType> {
    const siteName: string = this.options.siteName;
    const language: string = this.options.language;

    if (!siteName) {
      throw new Error(siteNameError);
    }

    const errorHandlingResult: Promise<ErrorHandlingQueryResult> = this.graphQLClient.request(
      this.query,
      {
        siteName,
        language,
      }
    );
    try {
      return errorHandlingResult.then(
        (result: ErrorHandlingQueryResult) => result.site.siteInfo.errorHandling
      );
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
      debugger: debug.errohandling,
    });
  }
}
