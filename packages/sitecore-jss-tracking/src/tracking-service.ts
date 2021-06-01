import { AxiosAdapter } from 'axios';
import { ServerResponse } from 'http';

import {
  HttpDataFetcher,
  AxiosDataFetcher,
  LayoutServiceContext,
  RouteData,
  isServer,
  debug,
} from '@sitecore-jss/sitecore-jss';

import { PageViewData } from './dataModels';

let testAdapter: AxiosAdapter | null = null;

/**
 * Sets axious adapter for unit-tests
 * @param {AxiosAdapter} adapter axios adapter
 */
export function setTestAdapter(adapter: AxiosAdapter | null): void {
  testAdapter = adapter;
}

/**
 * Tracking service configuration
 */
export interface TrackingServiceConfig {
  /** Absolute or relative URL of tracking service */
  endpoint?: string;

  /** The fetcher that performs the HTTP request and returns a promise to JSON */
  fetcher?: HttpDataFetcher<void>;

  /** The Sitecore SSC API key your app uses */
  apiKey?: string;

  /** Site name to track requests for */
  siteName: string;

  /** Query string parameters of the current page to pass with tracking request */
  currentPageParamsToTrack?: string[];
}

/**
 * Tracking service
 */
export class TrackingService {
  private readonly skipCookieName = 'skip_page_tracking';

  private readonly trackingApiOptions: TrackingServiceConfig;
  private readonly fetcher: HttpDataFetcher<void>;

  constructor(options: TrackingServiceConfig) {
    this.trackingApiOptions = {
      currentPageParamsToTrack: ['sc_camp', 'sc_trk'],
      ...options,
    };

    if (this.trackingApiOptions.fetcher) {
      this.fetcher = this.trackingApiOptions.fetcher;
    } else {
      const config = {
        debugger: debug.tracking,
        ...(testAdapter && { adapter: testAdapter }),
      };

      const axiosFetcher = new AxiosDataFetcher(config);
      this.fetcher = (url: string, data?: unknown) => axiosFetcher.fetch<void>(url, data);
    }
  }

  private static getQueryString(params: { [key: string]: unknown }) {
    return Object.keys(params)
      .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k] as string)}`)
      .join('&');
  }

  /**
   * Signals to skip tracking of the next page view
   * @param {ServerResponse} res response
   * @returns {void} void
   */
  public signalSkipNextPage(res: ServerResponse): void {
    debug.tracking('sending signal to skip next page: %0', res);

    const headerName = 'set-cookie';
    const cookie = `${this.skipCookieName}=1; path=/`;

    const cookies = res.getHeader(headerName) as string[];

    if (cookies) {
      cookies.push(cookie);
    } else {
      res.setHeader(headerName, [cookie]);
    }
  }

  /**
   * Tracks current page request
   * @param {LayoutServiceContext} context Layout service context
   * @param {RouteData} route Layout service route data
   * @returns {Promise<void>} void
   */
  public trackCurrentPage(
    context?: LayoutServiceContext | null,
    route?: RouteData | null
  ): Promise<void> {
    if (this.shouldSkipPageTracking()) {
      return Promise.resolve();
    }

    debug.tracking('tracking current page: %O %O', context, route);

    const event = {
      url: window.location.pathname + window.location.search,
      itemId: route?.itemId,
      language: route?.itemLanguage,
      layoutDeviceId: route?.deviceId,
    };

    return this.trackPage(event, this.getCurrentPageParams(context?.site?.name));
  }

  /**
   * Tracks page view
   * @param {PageViewData} pageView page view
   * @param {Object} querystringParams additional query string parameters
   * @returns {Promise<void>} void
   */
  public trackPage(
    pageView: PageViewData,
    querystringParams?: { [key: string]: unknown }
  ): Promise<void> {
    if (this.shouldSkipPageTracking()) {
      return Promise.resolve();
    }

    return this.track(pageView, querystringParams);
  }

  private getCurrentPageParams(siteName?: string): { [key: string]: string } {
    const result: { [key: string]: string } = {};

    if (siteName) {
      result.sc_site = siteName;
    }

    window.location.search
      .substring(1)
      .split('&')
      .forEach((param) => {
        const lowerParam = param.toLowerCase();

        this.trackingApiOptions.currentPageParamsToTrack?.forEach((name) => {
          if (lowerParam.startsWith(name.toLowerCase() + '=')) {
            result[name] = decodeURIComponent(param.substring(name.length + 1));
            return;
          }
        });
      });

    return result;
  }

  private track(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any,
    querystringParams: { [key: string]: unknown } = {}
  ): Promise<void> {
    if (isServer()) {
      // do nothing for SSR, only track events when a browser requests it
      return Promise.resolve();
    }

    debug.tracking('tracking: %O %O', data, querystringParams);

    querystringParams = {
      ...(this.trackingApiOptions.apiKey && { sc_apikey: this.trackingApiOptions.apiKey }),
      ...(this.trackingApiOptions.siteName && { sc_site: this.trackingApiOptions.siteName }),
      ...querystringParams,
    };

    let qs = TrackingService.getQueryString(querystringParams);
    qs = qs.length > 0 ? '?' + qs : '';

    const { endpoint = '/sitecore/api/track' } = this.trackingApiOptions;

    return this.fetcher(`${endpoint}/pageview${qs}`, data).then();
  }

  private shouldSkipPageTracking() {
    if (isServer()) {
      // do nothing for SSR, only track events when a browser requests it
      return true;
    }

    const cookie = window.document.cookie;

    if (cookie.split(';').some((item) => item.trim().startsWith(`${this.skipCookieName}=`))) {
      window.document.cookie = `${this.skipCookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      return true;
    }

    return false;
  }
}
