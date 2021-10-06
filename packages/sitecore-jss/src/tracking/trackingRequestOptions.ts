import querystring from 'querystring';
import { HttpDataFetcher } from './../index';

export interface TrackingRequestOptions {
  /** Hostname of tracking service; e.g. http://my.site.core */
  host: string;

  /** Relative path from host to tracking service. Default: /sitecore/api/jss/track */
  serviceUrl?: string;

  /** The fetcher that performs the HTTP request and returns a promise to JSON */
  fetcher: HttpDataFetcher<void>;

  /**
   * An object of key:value pairs to be stringified and used as querystring parameters.
   */
  querystringParams?: querystring.ParsedUrlQueryInput;

  /** Type of tracking request action. Default: 'event' */
  action?: string;

  /** Internal usage only. Ignores SSR check for unit tests. */
  test?: boolean;
}
