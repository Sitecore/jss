import { NextRequest, NextResponse } from 'next/server';

import { GraphQLClient, GraphQLRequestClient } from '@sitecore-jss/sitecore-jss';
import debug from '@sitecore-jss/sitecore-jss';

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

/** @private */
export const siteNameError = 'The siteName cannot be empty';

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

export type RedirectType = {
  pattern: string;
  target: string;
  redirectType: string;
};

/**
 * The schema of data returned in response to robots.txt request
 */
export type RedirectsQueryResult = {
  site: { siteInfo: { redirects: RedirectType[] } };
};

export class RedirectService {
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
   * redirect async method - to find coincidence in url.pathname and redirects of site
   * @param req 
   * @returns Promise<NextResponse>
   */
  public redirect = async (req: NextRequest): Promise<NextResponse> => {
    const url = req.nextUrl.clone();
    let existsRedirect: RedirectType | undefined;
    let redirectType: number | undefined;

    // Find the redirect from graphql
    const redirects = await this.fetchRedirects();
    if(redirects?.length) {
      existsRedirect = redirects.find((redirect: RedirectType) => redirect.pattern === url.pathname);
    }

    if (existsRedirect) {
      url.pathname = existsRedirect.target;
      redirectType = Number(existsRedirect.redirectType.substring("REDIRECT_".length)); // http code of redirect type

      return NextResponse.redirect(url, redirectType);
    }

    return NextResponse.next();
  };

  /**
   * Fetch a data of robots.txt from API
   * @returns text of robots.txt
   * @throws {Error} if the siteName is empty.
   */
  private async fetchRedirects(): Promise<RedirectType[]> {
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
