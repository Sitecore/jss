import { LayoutServiceData } from '@sitecore-jss/sitecore-jss/layout';
import { DictionaryPhrases } from '@sitecore-jss/sitecore-jss/types/i18n';

/**
 * Response object produced by the AppRenderer callback function.
 */
export interface RenderResponse {
  /**
   * The rendered HTML to return to the client
   */
  html: string;
  /**
   * Set the HTTP status code. If not set, the status code returned from Layout Service is returned.
   */
  status?: number;
  /**
   * Sets a redirect URL, causing the reply to send a HTTP redirect instead of the HTML content.
   * Note: when using this you must set the status code to 301 or 302.
   */
  redirect?: string;
}

/**
 * AppRenderer is a function that renders a JSS app's markup for a given route and data.
 */
export type AppRenderer = (
  callback: (error: Error | null, result: RenderResponse | null) => void,
  path: string,
  /**
   * Data returned by Layout Service. If the route does not exist, null.
   */
  data: LayoutServiceData,
  /**
   * Additional data to pass to the view
   */
  viewBag: {
    [key: string]: unknown;
    dictionary: DictionaryPhrases;
  }
) => void;
