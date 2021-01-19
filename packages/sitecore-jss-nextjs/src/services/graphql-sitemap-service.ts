import { GraphQLRequestClient } from '@sitecore-jss/sitecore-jss';

export type GraphQLSitemapServiceConfig = {
  endpoint: string;
};

type StaticPath = {
  params: {
    path: string[];
  };
};

type SearchResult = {
  search: {
    results: { url: { path: string } }[];
  };
};

export class GraphQLSitemapService {
  constructor(private config: GraphQLSitemapServiceConfig) {}

  /**
   * Returns new graphql client instance
   */
  createClient(): GraphQLRequestClient {
    const { endpoint } = this.config;

    return new GraphQLRequestClient(endpoint);
  }

  /**
   * Returns query to request root item id
   * @param {string} rootItemPath root item path
   */
  getRootItemIdQuery(rootItemPath: string): string {
    return `query {
      item(path:"${rootItemPath}") {
        id
      }
    }`;
  }

  /**
   * Request root item id using path
   * @param {string} rootItemPath root item path
   */
  async getRootItemId(rootItemPath: string): Promise<string | undefined> {
    const query = this.getRootItemIdQuery(rootItemPath);

    const data = await this.createClient()
      .request<{ item: { id: string } }>(query)
      .catch((error) => {
        console.error('Error occured during fetching root item id:', error.response);

        return null;
      });

    return data?.item.id;
  }

  /**
   * Graphql query in order to fetch sitemap
   * @param {string} rootItemId
   * @param {locale} locale
   */
  getSitemapQuery(rootItemId: string, locale: string): string {
    return `query {
      search(
        filter: {
          AND:[
            {
              name:"_path",
              value:"${rootItemId.toLowerCase()}"
            },
            {
              name:"_language",
              value:"${locale}"
            },
            {
              name:"haslayout",
              value :"true"
            }
          ]
        }
      ){
        results {
          url {
            path
          }
        }
      }
    }`;
  }

  /**
   * Fetch sitemap which could be used for generation of static pages
   * @param {string[]} locales locales which application supports
   * @param {string} rootItemPath root item path
   * @param {string} defaultLocale
   */
  async fetchSitemap(
    locales: string[],
    rootItemPath: string,
    defaultLocale: string
  ): Promise<StaticPath[]> {
    if (!locales.length) {
      return [];
    }

    const rootItemId = await this.getRootItemId(rootItemPath);

    if (!rootItemId) {
      console.error('Сan not fetch sitemap: root item id is not provided');
      return [];
    }

    const getStaticPaths = async (locale: string): Promise<StaticPath[]> => {
      const query = this.getSitemapQuery(rootItemId, locale);

      const data = await this.createClient()
        .request<SearchResult>(query)
        .catch((error) => {
          console.error('Error occured during fetching sitemap:', error.response);

          return null;
        });

      const items = data?.search.results ? data.search.results : [];

      const staticPaths = items.reduce((list: StaticPath[], item: { url: { path: string } }) => {
        // replace first and last /
        // sitemap should not contain url with defaultLocale, it should be replaced by ''
        // transform to array of paths
        const path = item.url.path
          .replace(`/${defaultLocale}/`, '')
          .replace(/^\/|\/$/g, '')
          .split('/');

        return list.concat({
          params: {
            path,
          },
        });
      }, []);

      return staticPaths;
    };

    // Fetch paths using all locales
    const paths = await Promise.all(locales.map(getStaticPaths));

    // merge promises result
    return ([] as StaticPath[]).concat(...paths);
  }
}
