import { GraphQLClient } from '@sitecore-jss/sitecore-jss';

export type GraphQLSitemapServiceConfig = {
  endpoint: string;
};

type StaticPath = {
  params: {
    path: string[];
  };
  locale: string;
};

export class GraphQLSitemapService {
  constructor(private config: GraphQLSitemapServiceConfig) {}

  createClient(): GraphQLClient {
    const { endpoint } = this.config;

    return new GraphQLClient(endpoint);
  }

  async getRootItemId(rootItem: string): Promise<string | undefined> {
    const query = `
      item(path:"${rootItem}") {
        id
      }
    `;

    const data = await this.createClient()
      .request<{ item: { id: string } }>(query)
      .catch((error) => {
        console.error('Error occured during fetching sitemap:', error.response);

        return null;
      });

    return data?.item.id;
  }

  /**
   * Graphql query in order to fetch sitemap
   * @param {string} rootItem
   * @param {locale} locale
   */
  getSitemapQuery(rootItem: string, locale: string): string {
    return `{
			search(
				rootItem: "${rootItem}",
				language: "${locale}",
				latestVersion: true,
				fieldsEqual: [
					{name: "_templatename", value: "App Route"}
				]
			){
				results{
					totalCount
					pageInfo {
						hasNextPage
						hasPreviousPage
					}
					items{
						name
						path
					}
				}
			}
		}`;
  }

  /**
   * Fetch sitemap which could be used for generation of static pages
   * @param {string[]} locales locales which application supports
   * @param {string} rootItem root item path
   */
  async fetchSitemap(locales: string[], rootItem: string): Promise<StaticPath[]> {
    const rootItemId = await this.getRootItemId(rootItem);

    console.log('ROOT ITEM ID:', rootItemId);

    const getStaticPaths = async (locale: string): Promise<StaticPath[]> => {
      const query = this.getSitemapQuery(rootItem, locale);

      type SearchResult = {
        search: {
          results: {
            items: { path: string }[];
          };
        };
      };

      const data = await this.createClient()
        .request<SearchResult>(query)
        .catch((error) => {
          console.error('Error occured during fetching sitemap:', error.response);

          return null;
        });

      const items = data?.search.results.items ? data.search.results.items : [];

      const staticPaths = items.reduce((list: StaticPath[], item: { path: string }) => {
        // replace rootItem prefix by '', and replace first /
        const path = item.path
          .replace(rootItem, '')
          .replace(/^\//, '')
          .split('/');

        return list.concat({
          params: {
            path,
          },
          locale,
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
