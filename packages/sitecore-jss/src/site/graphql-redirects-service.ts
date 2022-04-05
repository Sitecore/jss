import { GraphQLClient, GraphQLRequestClient } from '../graphql';
import { siteNameError } from '../constants';
import debug from '../debug';

export const REDIRECT_TYPE_301 = 'REDIRECT_301';
export const REDIRECT_TYPE_302 = 'REDIRECT_302';
export const REDIRECT_TYPE_SERVER_TRANSFER = 'SERVER_TRANSFER';

export type RedirectInfo = {
  pattern: string;
  target: string;
  redirectType: string;
  isQueryStringPreserved: boolean;
};

// The default query for request redirects of site
const defaultQuery = /* GraphQL */ `
  query RedirectsQuery($siteName: String!) {
    site {
      siteInfo(site: $siteName) {
        redirects {
          pattern
          target
          redirectType
          isQueryStringPreserved
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
  /**
   * Override the fetch options for graphql-request library. It's temporary solutions.
   *  We're waiting when this bug was fixed https://github.com/lquixada/cross-fetch/issues/78
   */
  fetch?: typeof fetch;
};

/**
 * The schema of data returned in response to redirects array request
 */
export type RedirectsQueryResult = {
  site: { siteInfo: { redirects: RedirectInfo[] } };
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
   * @returns Promise<RedirectInfo[]>
   * @throws {Error} if the siteName is empty.
   */
  async fetchRedirects(): Promise<RedirectInfo[]> {
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
      fetch: this.options.fetch,
    });
  }
}
