import { GraphQLClient, GraphQLRequestClient } from '../graphql';
import debug from '../debug';

export const REDIRECT_TYPE_PREFIX = 'REDIRECT_';
export const REDIRECT_TYPE_DEFAULT = 301;

export type RedirectType = {
  pattern: string;
  target: string;
  redirectType: string;
};

export const siteNameError = 'The siteName cannot be empty';

// The default query for request redirects of site
const defaultQuery = /* GraphQL */ `
  query RedirectsQuery($siteName: String!) {
    site {
      siteInfo(site: $siteName) {
        redirects {
          pattern
          target
          redirectType
        }
      }
    }
  }
`;

export type GraphQLRedirectsServiceConfig = {
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
};

/**
 * The schema of data returned in response to redirects array request
 */
export type RedirectsQueryResult = {
  site: { siteInfo: { redirects: RedirectType[] } };
};

export class GraphQLRedirectsService {
  private graphQLClient: GraphQLClient;

  protected get query(): string {
    return defaultQuery;
  }

  /**
   * Creates an instance of graphQL redirects service with the provided options
   * @param {GraphQLRedirectsServiceConfig} options instance
   */
  constructor(private options: GraphQLRedirectsServiceConfig) {
    this.graphQLClient = this.getGraphQLClient();
  }

  /**
   * Fetch an array of redirects from API
   * @returns Promise<RedirectType[]>
   * @throws {Error} if the siteName is empty.
   */
  async fetchRedirects(): Promise<RedirectType[]> {
    const siteName: string = this.options.siteName;

    if (!siteName) {
      throw new Error(siteNameError);
    }

    const redirectsResult: Promise<RedirectsQueryResult> = this.graphQLClient.request(this.query, {
      siteName,
    });

    try {
      return redirectsResult.then((result: RedirectsQueryResult) => {
        return result?.site?.siteInfo?.redirects;
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
      debugger: debug.redirects,
    });
  }
}
