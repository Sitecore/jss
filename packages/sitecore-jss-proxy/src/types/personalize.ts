import { GraphQLPersonalizeServiceConfig } from '@sitecore-jss/sitecore-jss/personalize';
import { IncomingMessage, OutgoingMessage } from 'http';

export type CdpServiceConfig = {
  /**
   * Your Sitecore Edge Platform endpoint
   * Default is https://edge-platform.sitecorecloud.io
   */
  sitecoreEdgeUrl?: string;
  /**
   * Your unified Sitecore Edge Context Id
   */
  sitecoreEdgeContextId: string;
  /**
   * The Sitecore CDP channel to use for events. Uses 'WEB' by default.
   */
  channel?: string;
  /**
   * Currency for CDP request. Uses 'USA' as default.
   */
  currency?: string;
  /**
   * Timeout (ms) for CDP request. Default is 400.
   */
  timeout?: number;
};

export type PersonalizeConfig = {
  /**
   * function, determines if personalization should be turned off, based on cookie, header, or other considerations
   * @param {IncomingMessage} [req] request object
   * @param {OutgoingMessage} [res] response object
   */
  disabled?: (req?: IncomingMessage, res?: OutgoingMessage) => boolean;
  /**
   * Function used to determine if route should be excluded.
   * @param {string} pathname The pathname
   * @returns {boolean} Whether to exclude the route
   */
  excludeRoute?: (pathname: string) => boolean;
  /**
   * Fallback hostname in case `host` header is not present
   * @default localhost
   */
  defaultHostname?: string;
  /**
   * Fallback language in case language can't be read from layout data
   * @default 'en'
   */
  defaultLanguage?: string;
  /**
   * Site name for current site
   */
  sitecoreSiteName: string;
  /**
   * Configuration for your Sitecore Experience Edge endpoint
   */
  edgeConfig: Omit<GraphQLPersonalizeServiceConfig, 'fetch'>;
  /**
   * Configuration for your Sitecore CDP endpoint
   */
  cdpConfig: CdpServiceConfig;
  /**
   * Optional Sitecore Personalize scope identifier allowing you to isolate your personalization data between XM Cloud environments
   */
  scope?: string;
};

/**
 * Object model of Experience Context data
 */
export type ExperienceParams = {
  referrer: string;
  utm: {
    [key: string]: string | undefined;
    campaign: string | undefined;
    source: string | undefined;
    medium: string | undefined;
    content: string | undefined;
  };
};

/**
 * Object model of personalize execution data
 */
export type PersonalizeExecution = {
  friendlyId: string;
  variantIds: string[];
};
