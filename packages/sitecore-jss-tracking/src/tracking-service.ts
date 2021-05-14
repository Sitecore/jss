import { AxiosAdapter } from 'axios';

import {
  HttpResponse,
  HttpDataFetcher,
  AxiosDataFetcher,
  LayoutServiceContext,
  RouteData,
  isServer,
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

class ResponseError extends Error {
  response: HttpResponse<unknown>;

  constructor(message: string, response: HttpResponse<unknown>) {
    super(message);

    Object.setPrototypeOf(this, ResponseError.prototype);
    this.response = response;
  }
}

export interface TrackingServiceConfig {
  /** Hostname of tracking service; e.g. http://my.site.core */
  host?: string;

  /** Relative path from host to tracking service. Default: /sitecore/api/jss/track */
  serviceUrl?: string;

  /** The fetcher that performs the HTTP request and returns a promise to JSON */
  fetcher?: HttpDataFetcher<void>;

  /** The Sitecore SSC API key your app uses */
  apiKey?: string;

  /** Default site name to track requests for */
  siteName?: string;

  /** Query string parameters of the current page to pass with tracking request */
  currentPageParamsToTrack?: string[];
}

export class TrackingService {
  private trackingApiOptions: TrackingServiceConfig;
  private fetcher: HttpDataFetcher<void>;

  constructor(options: TrackingServiceConfig) {
    this.trackingApiOptions = {
      currentPageParamsToTrack: ['sc_camp', 'sc_trk'],
      ...options,
    };

    if (this.trackingApiOptions.fetcher) {
      this.fetcher = this.trackingApiOptions.fetcher;
    } else {
      const config = testAdapter ? { adapter: testAdapter } : {};
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
   * Tracks current page request
   * @param {LayoutServiceContext} context Layout service context
   * @param {RouteData} route Layout service route data
   * @returns {Promise<void>} void
   */
  public trackCurrentPage(context: LayoutServiceContext, route: RouteData): Promise<void> {
    if (!testAdapter && isServer()) {
      // do nothing for SSR, only track events when a browser requests it
      return Promise.resolve();
    }

    const event = {
      url: window.location.pathname + window.location.search,
      itemId: route?.itemId,
      language: route?.itemLanguage,
      layoutDeviceId: route?.deviceId,
    };

    return this.trackPage(event, this.getCurrentPageParams(context.site?.name));
  }

  public trackPage(
    event: PageViewData,
    querystringParams?: { [key: string]: unknown }
  ): Promise<void> {
    return this.fetchData(event, querystringParams);
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

  /**
   * Note: axios needs to use `withCredentials: true` in order for Sitecore cookies to be included in CORS requests
   * which is necessary for analytics and such
   * @param {any} data
   * @param {Object} params
   */
  private fetchData(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    params: { [key: string]: any } = {}
  ): Promise<void> {
    if (!testAdapter && isServer()) {
      // do nothing for SSR, only track events when a browser requests it
      return Promise.resolve();
    }

    params = {
      ...(this.trackingApiOptions.apiKey && { sc_apikey: this.trackingApiOptions.apiKey }),
      ...(this.trackingApiOptions.siteName && { sc_site: this.trackingApiOptions.siteName }),
      ...params,
    };

    let url = this.resolveTrackingUrl();

    const qs = TrackingService.getQueryString(params);
    if (qs) {
      const separator = url.indexOf('?') !== -1 ? '&' : '?';
      url = url + separator + qs;
    }

    return this.fetcher(url, data).then((response) => {
      if (response.status < 200 || response.status >= 300) {
        throw new ResponseError(response.statusText, response);
      }
    });
  }

  private resolveTrackingUrl() {
    const { host = '', serviceUrl = '/sitecore/api/track' } = this.trackingApiOptions;

    return `${host}${serviceUrl}/pageview`;
  }
}
