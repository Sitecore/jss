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
  external: boolean;
};

// The default query for request redirects of site
const defaultQuery = /* GraphQL */ `
  query RedirectsQuery($siteName: String!, $routePath: String!, $language: String!) {
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
    layout(site: $siteName, routePath: $routePath, language: $language) {
      item {
        template {
          name
        }
        field(name: "RedirectUrl") {
          jsonValue
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
   * Override fetch method. Uses 'GraphQLRequestClient' default otherwise.
   */
  fetch?: typeof fetch;
};

/**
 * The schema of data returned in response to redirects array request
 */
export type RedirectsQueryResult = {
  site: { siteInfo: { redirects: RedirectInfo[] } | null };
  layout: {
    item: {
      template: { name: string };
      field: {
        jsonValue: { value: { href: string; querystring: string; linktype: string } };
      } | null;
    };
  };
};

/**
 *  The GraphQLRedirectsService class is used to query the JSS redirects using Graphql endpoint
 */
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
   * @param {string} routePath path to the requested page
   * @param {string} language request language
   * @returns Promise<RedirectInfo[]>
   * @throws {Error} if the siteName is empty.
   */
  async fetchRedirects(routePath: string, language: string): Promise<RedirectInfo[]> {
    const siteName: string = this.options.siteName;

    if (!siteName) {
      throw new Error(siteNameError);
    }

    const redirectsResult: Promise<RedirectsQueryResult> = this.graphQLClient.request(this.query, {
      siteName,
      routePath,
      language,
    });

    return redirectsResult
      .then((result: RedirectsQueryResult) => {
        const redirects = result?.site?.siteInfo?.redirects || [];
        if (result?.layout?.item?.template?.name === 'Redirect') {
          let href: string | undefined = result?.layout?.item?.field?.jsonValue?.value?.href;
          if (href) {
            const queryString = result?.layout?.item?.field?.jsonValue?.value?.querystring;
            if (queryString) {
              href = `${href}?${queryString.replace(/[?]/g, '')}`;
            }
            const itemRedirect: RedirectInfo = {
              pattern: routePath,
              target: href,
              redirectType: REDIRECT_TYPE_302,
              isQueryStringPreserved: false,
              external:
                result?.layout?.item?.field?.jsonValue?.value?.linktype === 'external'
                  ? true
                  : false,
            };
            redirects.push(itemRedirect);
          }
        }
        return redirects;
      })
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
      debugger: debug.redirects,
      fetch: this.options.fetch,
    });
  }
}
