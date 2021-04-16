import { ComponentRendering } from '../layout/models';
import { GraphQLRequestClient } from './../graphql-request-client';
import debug from './../debug';

export interface LayoutFragmentData {
  /**
   * Rendering that represents layout fragment
   * @type {ComponentRendering}
   */
  fragment: ComponentRendering;
}

export interface LayoutFragmentService {
  /**
   * The fetcher of the layout fragment data
   */
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
   * The request timeout in milliseconds
   */
  timeout?: number;
  /**
   * Override default layout query
   * @param {string} siteName
   * @param {string} routePath
   * @param {string} language
   * @param {string} renderingId
   * @param {string} variantKey
   * @returns {string} custom layout query
   */
  formatLayoutFragmentQuery?: (
    siteName: string,
    routePath: string,
    language: string,
    renderingId: string,
    variantKey: string
  ) => string;
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
   * @param {string} [variantKey] Uniquely identifies layout fragment among other variants of the same rendering
   * @returns {Promise<LayoutFragmentData>} layout fragment data
   */
  async fetchLayoutFragmentData(
    routePath: string,
    language: string,
    renderingId: string,
    variantKey: string
  ): Promise<LayoutFragmentData> {
    const query = this.getLayoutFragmentQuery(routePath, language, renderingId, variantKey);

    debug.layoutFragment(
      'fetching layout fragment data for %s %s %s %s %s',
      routePath,
      language,
      renderingId,
      variantKey,
      this.serviceConfig.siteName
    );

    const data = await this.createClient().request<{
      layoutFragment: LayoutFragmentData;
    }>(query);

    return data?.layoutFragment || null;
  }

  private createClient(): GraphQLRequestClient {
    const { endpoint, apiKey, timeout } = this.serviceConfig;

    return new GraphQLRequestClient(endpoint, { apiKey, debugger: debug.layoutFragment, timeout });
  }

  private getLayoutFragmentQuery(
    routePath: string,
    language: string,
    renderingId: string,
    variantKey: string
  ) {
    const layoutQuery = this.serviceConfig.formatLayoutFragmentQuery
      ? this.serviceConfig.formatLayoutFragmentQuery(
          this.serviceConfig.siteName,
          routePath,
          language,
          renderingId,
          variantKey
        )
      : `layoutFragment(site:"${this.serviceConfig.siteName}", routePath:"${routePath}", language:"${language}", renderingId:"${renderingId}", variantKey:"${variantKey}")`;

    return `query {
      ${layoutQuery}{
        fragment
      }
    }`;
  }
}
