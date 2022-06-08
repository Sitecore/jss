import { GraphQLClient, GraphQLRequestClient } from '../graphql';
import { siteNameError } from '../constants';
import debug from '../debug';

// The default query for request error handling
const defaultQuery = /* GraphQL */ `
  query ErrorHandlingPagesQuery($siteName: String!, $language: String!) {
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

export type GraphQLErrorHandlingPagesServiceConfig = {
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

export type ErrorHandlingPagesType = { notFoundPagePath: string; serverErrorPagePath: string };

/**
 * The schema of data returned in response to error pages link request
 */
type ErrorHandlingPagesQueryResult = {
  site:{ siteInfo: { errorHandling: ErrorHandlingPagesType } }
};

/**
 * Service that fetch the error handling data using Sitecore's GraphQL API.
 */
export class GraphQLErrorHandlingPagesService {
  private graphQLClient: GraphQLClient;

  protected get query(): string {
    return defaultQuery;
  }

  /**
   * Creates an instance of graphQL error handling service with the provided options
   * @param {GraphQLErrorHandlingPagesServiceConfig} options instance
   */
  constructor(public options: GraphQLErrorHandlingPagesServiceConfig) {
    this.graphQLClient = this.getGraphQLClient();
  }

  /**
   * Fetch list of error handling for the site
   * @returns {ErrorHandlingPagesType} list of url's error pages
   * @throws {Error} if the siteName is empty.
   */
  async fetchErrorHandling(): Promise<ErrorHandlingPagesType | null> {
    const siteName: string = this.options.siteName;
    const language: string = this.options.language;

    if (!siteName) {
      throw new Error(siteNameError);
    }

    return (<Promise<ErrorHandlingPagesQueryResult>>this.graphQLClient.request(this.query, {
      siteName,
      language,
    }))
      .then((result: ErrorHandlingPagesQueryResult) =>
        result.site.siteInfo ? result.site.siteInfo.errorHandling : null
      )
      .catch((e) => Promise.reject(e));
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
      debugger: debug.errorpages,
    });
  }
}
