/**
 * Generates a URL for accessing Sitecore Edge Platform Content using the provided endpoint and context ID.
 * @param {string} endpoint - The base endpoint URL for the Edge Platform.
 * @param {string} contextId - The unique context ID.
 * @returns {string} The complete URL for accessing content through the Edge Platform.
 */
export const getEdgeProxyContentUrl = (endpoint: string, contextId: string) =>
  `${endpoint}/content/api/graphql/v1?sitecoreContextId=${contextId}`;
