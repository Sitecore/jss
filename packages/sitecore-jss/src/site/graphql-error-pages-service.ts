import { GraphQLClient, GraphQLRequestClient } from '../graphql';
import { siteNameError } from '../constants';
import debug from '../debug';

// The default query for request error handling
const defaultQuery = /* GraphQL */ `
  query ErrorPagesQuery($siteName: String!, $language: String!) {
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

export type GraphQLErrorPagesServiceConfig = {
  /**
   * Your Graphql endpoint
   */
  endpoint: string;
  /**
   * The API key to use for authentication
   */
  apiKey: string;
  /**
   * The language
   */
  language: string;
};

/**
 * Object model of Error Pages result
 */
export type ErrorPages = { notFoundPagePath: string; serverErrorPagePath: string };

/**
 * The schema of data returned in response to error pages link request
 */
type ErrorPagesQueryResult = {
  site: { siteInfo: { errorHandling: ErrorPages } };
};

/**
 * Service that fetch the error pages data using Sitecore's GraphQL API.
 */
export class GraphQLErrorPagesService {
  private graphQLClient: GraphQLClient;

  protected get query(): string {
    return defaultQuery;
  }

  /**
   * Creates an instance of graphQL error pages service with the provided options
   * @param {GraphQLErrorPagesServiceConfig} options instance
   */
  constructor(public options: GraphQLErrorPagesServiceConfig) {
    this.graphQLClient = this.getGraphQLClient();
  }

  /**
   * Fetch list of error pages for the site
   * @param {string} siteName the site
   * @returns {ErrorPages} list of url's error pages
   * @throws {Error} if the siteName is empty.
   */
  async fetchErrorPages(siteName: string): Promise<ErrorPages | null> {
    const language: string = this.options.language;

    if (!siteName) {
      throw new Error(siteNameError);
    }

    return (<Promise<ErrorPagesQueryResult>>this.graphQLClient.request(this.query, {
      siteName,
      language,
    }))
      .then((result: ErrorPagesQueryResult) =>
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
