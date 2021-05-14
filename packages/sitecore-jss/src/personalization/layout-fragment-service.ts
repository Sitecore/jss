import { ComponentRendering } from '../layout/models';
import { GraphQLRequestClient } from './../graphql-request-client';
import debug from './../debug';

export interface LayoutFragmentData {
  fragment: ComponentRendering;
}

export interface LayoutFragmentService {
  fetchLayoutFragmentData(
    routePath: string,
    language: string,
    renderingId: string,
    ruleId: string
  ): Promise<LayoutFragmentData>;
}

export type GraphQLLayoutFragmentServiceConfig = {
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
   * The request timeout
   */
   timeout?: number;
  /**
   * Override default layout query
   * @param {string} siteName
   * @param {string} routePath
   * @param {string} [locale]
   * @returns {string} custom layout query
   */
   formatLayoutFragmentQuery?: (siteName: string, routePath: string, language: string, renderingId: string, ruleId: string) => string;
};

export class GraphQLLayoutFragmentService implements LayoutFragmentService {
  /**
   * Fetch layout fragment data using the Sitecore GraphQL endpoint.
   * @param {GraphQLLayoutFragmentServiceConfig} serviceConfig
   */
  constructor(private serviceConfig: GraphQLLayoutFragmentServiceConfig) {}

  /**
   * Fetch layout fragment data.
   * @param {string} routePath
   * @param {string} [language]
   * @param {string} [renderingId]
   * @param {string} [ruleId]
   * @returns {Promise<LayoutFragmentData>} layout service data
   */
  async fetchLayoutFragmentData(
    routePath: string,
    language: string,
    renderingId: string,
    ruleId: string
  ): Promise<LayoutFragmentData> {
    const query = this.getLayoutFragmentQuery(routePath, language, renderingId, ruleId);

    const data = await this.createClient().request<{
      layoutFragment: LayoutFragmentData;
    }>(query);

    return (
      data?.layoutFragment || null
    );
  }

  private createClient(): GraphQLRequestClient {
    const { endpoint, apiKey, timeout } = this.serviceConfig;

    return new GraphQLRequestClient(endpoint, { apiKey, debugger: debug.layout, timeout });
  }

  private getLayoutFragmentQuery(routePath: string, language: string, renderingId: string, ruleId: string) {

    const layoutQuery = this.serviceConfig.formatLayoutFragmentQuery
      ? this.serviceConfig.formatLayoutFragmentQuery(this.serviceConfig.siteName, routePath, language, renderingId, ruleId)
      : `layoutFragment(site:"${this.serviceConfig.siteName}", routePath:"${routePath}", language:"${language}", renderingId:"${renderingId}", ruleId:"${ruleId}")`;

    return `query {
      ${layoutQuery}{
        fragment
      }
    }`;
  }
}
