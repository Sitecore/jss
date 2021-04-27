import { LayoutServiceBase, models } from './layout-service';
import { GraphQLRequestClient } from '../graphql-request-client';
import debug from '../debug';

export type GraphQLLayoutServiceConfig = {
  /**
   * Your Graphql endpoint
   */
  endpoint: string;
  /**
   * The JSS application name
   */
  siteName: string;
  /**
   * The API key to use for authentication
   */
  apiKey: string;
  /**
   * Override default layout query
   * @param {string} siteName
   * @param {string} itemPath
   * @param {string} [locale]
   * @returns {string} custom layout query
   *
   * @default
   * Layout query
   * layout(site:"${siteName}", routePath:"${itemPath}", language:"${language}")
   */
  formatLayoutQuery?: (siteName: string, itemPath: string, locale?: string) => string;
};

export class GraphQLLayoutService extends LayoutServiceBase {
  /**
   * Fetch layout data using the Sitecore GraphQL endpoint.
   * @param {GraphQLLayoutServiceConfig} serviceConfig
   */
  constructor(private serviceConfig: GraphQLLayoutServiceConfig) {
    super();
  }

  /**
   * Fetch layout data for an item.
   * @param {string} itemPath
   * @param {string} [language]
   * @returns {Promise<LayoutServiceData>} layout service data
   */
  async fetchLayoutData(itemPath: string, language?: string): Promise<models.LayoutServiceData> {
    const query = this.getLayoutQuery(itemPath, language);

    debug.layout(
      'fetching layout data for %s %s %s',
      itemPath,
      language,
      this.serviceConfig.siteName
    );
    const data = await this.createClient().request<{
      layout: { item: { rendered: models.LayoutServiceData } };
    }>(query);

    // If `rendered` is empty -> not found
    return (
      data?.layout?.item.rendered || {
        sitecore: { context: { pageEditing: false, language }, route: null },
      }
    );
  }

  /**
   * Returns new graphql client instance
   */
  private createClient(): GraphQLRequestClient {
    const { endpoint, apiKey } = this.serviceConfig;

    return new GraphQLRequestClient(endpoint, { apiKey, debugger: debug.layout });
  }

  /**
   * Returns GraphQL Layout query
   * @param {string} itemPath page route
   * @param {string} [language] language
   */
  private getLayoutQuery(itemPath: string, language?: string) {
    const languageVariable = language ? `, language:"${language}"` : '';

    const layoutQuery = this.serviceConfig.formatLayoutQuery
      ? this.serviceConfig.formatLayoutQuery(this.serviceConfig.siteName, itemPath, language)
      : `layout(site:"${this.serviceConfig.siteName}", routePath:"${itemPath}"${languageVariable})`;

    return `query {
      ${layoutQuery}{
        item {
          rendered
        }
      }
    }`;
  }
}
