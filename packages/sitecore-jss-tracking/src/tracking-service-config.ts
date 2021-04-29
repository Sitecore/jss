import { HttpDataFetcher } from '@sitecore-jss/sitecore-jss';

export interface TrackingServiceConfig {
  /** Hostname of tracking service; e.g. http://my.site.core */
  host?: string;

  /** Relative path from host to tracking service. Default: /sitecore/api/jss/track */
  serviceUrl?: string;

  /** The fetcher that performs the HTTP request and returns a promise to JSON */
  fetcher: HttpDataFetcher<void>;

  /**
   * An object of key:value pairs to be stringified and used as querystring parameters.
   */
  querystringParams?: { [key: string]: unknown };

  /** Query string parameters of the current page to pass with tracking request */
  currentPageParamsToTrack?: string[];

  /** Type of tracking request action. Default: 'event' */
  action?: string;

  /** Internal usage only. Ignores SSR check for unit tests. */
  test?: boolean;
}
