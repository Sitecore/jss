import { GraphQLClient, GraphQLRequestClient } from '../graphql-request-client';
import { getAppRootId, SearchServiceConfig, SearchQueryService } from '../graphql';
import debug from '../debug';

/** @private */
export const queryError =
  'Valid value for rootItemId not provided and failed to auto-resolve app root item.';

/** @private */
export const languageError = 'The list of languages cannot be empty';

// Even though _hasLayout should always be "true" in this query, using a variable is necessary for compatibility with Edge
const defaultQuery = /* GraphQL */ `
  query SitemapQuery(
    $rootItemId: String!
    $language: String!
    $pageSize: Int = 10
    $hasLayout: String = "true"
    $after: String
  ) {
    search(
      where: {
        AND: [
          { name: "_path", value: $rootItemId, operator: CONTAINS }
          { name: "_language", value: $language }
          { name: "_hasLayout", value: $hasLayout }
        ]
      }
      first: $pageSize
      after: $after
    ) {
      total
      pageInfo {
        endCursor
        hasNext
      }
      results {
        url {
          path
        }
        ... on _Sitemap {
          changeFrequency {
            enum: targetItem {
              ...enum
            }
          }
          priority {
            enum: targetItem {
              ...enum
            }
          }
        }
      }
    }
  }
  fragment enum on Enum {
    id
    name
    displayName
    value {
      value
    }
  }
`;

type Enum = {
  id: string;
  name: string;
  displayName: string;
  value: { value: string };
};

type SitemapQueryResult = {
  url: { path: string };
  changeFrequency: { enum: Enum };
  priority: { enum: Enum };
};

/**
 * Object model of a Sitemap item.
 */
export type SitemapItem = {
  path: string;
  lastModified: Date;
  changeFrequency?: string;
  priority?: number;
};

/**
 * Configuration options for @see GraphQLSitemapXmlService instances
 */
export interface GraphQLSitemapXmlServiceConfig extends SearchServiceConfig {
  /**
   * Your Graphql endpoint
   */
  endpoint: string;

  /**
   * The API key to use for authentication.
   */
  apiKey: string;

  /**
   * Optional. The template ID of a JSS App to use when searching for the appRootId.
   * @default '061cba1554744b918a0617903b102b82' (/sitecore/templates/Foundation/JavaScript Services/App)
   */
  jssAppTemplateId?: string;
}

/**
 * Service that fetches the list of site pages using Sitecore's GraphQL API.
 * @mixes SearchQueryService<SitemapQueryResult>
 */
export class GraphQLSitemapXmlService {
  private graphQLClient: GraphQLClient;
  private searchService: SearchQueryService<SitemapQueryResult>;

  /**
   * Gets the default query used for fetching the list of site pages
   */
  protected get query(): string {
    return defaultQuery;
  }

  /**
   * Creates an instance of graphQL sitemap service with the provided options
   * @param {GraphQLSitemapXmlServiceConfig} options instance
   */
  constructor(public options: GraphQLSitemapXmlServiceConfig) {
    this.graphQLClient = this.getGraphQLClient();
    this.searchService = new SearchQueryService<SitemapQueryResult>(this.graphQLClient);
  }

  /**
   * Fetch a flat list of all pages that are descendants of the specified root item and have a
   * version in the specified language(s).
   * @param {string[]} languages Fetch pages that have versions in this language(s).
   * @returns list of pages
   * @throws {RangeError} if the list of languages is empty.
   * @throws {Error} if the app root was not found for the specified site and language.
   */
  async fetchSitemap(languages: string[]): Promise<SitemapItem[]> {
    if (!languages.length) {
      throw new RangeError(languageError);
    }

    // If the caller does not specify a root item ID, then we try to figure it out
    const rootItemId =
      this.options.rootItemId ||
      (await getAppRootId(
        this.graphQLClient,
        this.options.siteName,
        languages[0],
        this.options.jssAppTemplateId
      ));

    if (!rootItemId) {
      throw new Error(queryError);
    }

    // Fetch items using all locales
    const items = await Promise.all(
      languages.map(async (language) => {
        debug.sitemap('fetching sitemap data for %s', language);

        const results = await this.searchService.fetch(this.query, {
          rootItemId,
          language,
          pageSize: this.options.pageSize,
        });

        return results
          .filter((item) => {
            // Exclude if "Priority" is empty OR if "Change frequency" is DoNotInclude
            if (!item.priority?.enum?.value?.value) {
              debug.sitemap('skipping %s, Priority is empty', item.url.path);
              return false;
            }
            // TODO: use const/enum for DoNotInclude
            if (item.changeFrequency?.enum?.value?.value === 'DoNotInclude') {
              debug.sitemap('skipping %s, Change frequency is DoNotInclude', item.url.path);
              return false;
            }
            return true;
          })
          .map(
            (item) =>
              // TODO: refactor with helper function
              ({
                path: item.url.path,
                lastModified: new Date(),
                changeFrequency: item.changeFrequency?.enum?.value?.value?.toLowerCase(),
                priority: Number(item.priority?.enum?.value?.value),
              } as SitemapItem)
          );
      })
    );

    // merge promise results into single result
    return ([] as SitemapItem[]).concat(...items);
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

  /**
   * Gets a service that can perform GraphQL "search" queries to fetch @see SitemapQueryResult
   * @returns {SearchQueryService<SitemapQueryResult>} the search query service
   */
  protected getSearchService(): SearchQueryService<SitemapQueryResult> {
    return new SearchQueryService<SitemapQueryResult>(this.graphQLClient);
  }
}
