import { SitecoreConfig } from '../config/SitecoreConfig';

/**
 * Generates a URL for accessing Sitecore Edge Platform Content using the provided endpoint and context ID.
 * @param {SitecoreConfig} config - SitecoreConfig
 * @returns {string} The complete URL for accessing content through the Edge Platform.
 */
export const getEdgeProxyContentUrl = (config: SitecoreConfig) =>
  `${config.client.xmcloud?.sitecoreEdgeUrl}/v1/content/api/graphql/v1?sitecoreContextId=${config.client.xmcloud?.sitecoreEdgeContextId}`;

/**
 * Generates a URL for accessing Sitecore Edge Platform Forms using the provided form ID and context ID.
 * @param {SitecoreConfig} config - SitecoreConfig
 * @param {string} formId - The unique form id.
 * @returns {string} The complete URL for accessing forms through the Edge Platform.
 */
export const getEdgeProxyFormsUrl = (config: SitecoreConfig, formId: string) =>
  `${config.client.xmcloud?.sitecoreEdgeUrl}/v1/forms/publisher/${formId}?sitecoreContextId=${config.client.xmcloud?.sitecoreEdgeContextId}`;
