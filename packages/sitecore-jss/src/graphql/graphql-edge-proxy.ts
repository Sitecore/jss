import { SITECORE_EDGE_URL_DEFAULT } from '../constants';

/**
 * Generates a URL for accessing Sitecore Edge Platform Content using the provided endpoint and context ID.
 * @param {string} sitecoreEdgeContextId - The unique context id.
 * @param {string} [sitecoreEdgeUrl] - The base endpoint URL for the Edge Platform. Default is https://edge-platform.sitecorecloud.io
 * @returns {string} The complete URL for accessing content through the Edge Platform.
 */
export const getEdgeProxyContentUrl = (
  sitecoreEdgeContextId: string,
  sitecoreEdgeUrl = SITECORE_EDGE_URL_DEFAULT
) => `${sitecoreEdgeUrl}/v1/content/api/graphql/v1?sitecoreContextId=${sitecoreEdgeContextId}`;
