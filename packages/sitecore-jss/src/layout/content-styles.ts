import { SITECORE_EDGE_URL_DEFAULT } from '../constants';
import { HTMLLink } from '../models';

/**
 * Loads the content styles from the Sitecore Edge Platform
 * @param {string} [sitecoreEdgeUrl] Sitecore Edge Platform URL. Default is https://edge-platform.sitecorecloud.io
 * @returns {HTMLLink} content styles link
 */
export const getContentStylesheetLink = (sitecoreEdgeUrl = SITECORE_EDGE_URL_DEFAULT): HTMLLink => {
  return { href: `${sitecoreEdgeUrl}/pages/styles/content-styles.min.css`, rel: 'stylesheet' };
};
