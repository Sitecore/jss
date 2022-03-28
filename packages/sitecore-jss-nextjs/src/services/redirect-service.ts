import { GraphQLClient, GraphQLRequestClient } from '@sitecore-jss/sitecore-jss';
import { debug } from '@sitecore-jss/sitecore-jss';

export const PREFIX_REDIRECT_TYPE = 'REDIRECT_';

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

export type GraphQLRobotsServiceConfig = {
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
 * The schema of data returned in response to robots.txt request
 */
export type RedirectsQueryResult = {
  site: { siteInfo: { redirects: RedirectType[] } };
};

export class GraphQLRedirectService {
  private graphQLClient: GraphQLClient;

  protected get query(): string {
    return defaultQuery;
  }

  /**
   * Creates an instance of graphQL robots.txt service with the provided options
   * @param {GraphQLRobotsServiceConfig} options instance
   */
  constructor(private options: GraphQLRobotsServiceConfig) {
    this.graphQLClient = this.getGraphQLClient();
  }

  /**
   * Fetch a data of robots.txt from API
   * @returns text of robots.txt
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
      debugger: debug.sitemap,
    });
  }
}
