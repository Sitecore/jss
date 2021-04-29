import {
  HttpResponse,
  LayoutServiceContext,
  RouteData,
  isServer,
} from '@sitecore-jss/sitecore-jss';

import { TrackingServiceConfig } from './tracking-service-config';
import { PageViewData } from './dataModels';

class ResponseError extends Error {
  response: HttpResponse<unknown>;

  constructor(message: string, response: HttpResponse<unknown>) {
    super(message);

    Object.setPrototypeOf(this, ResponseError.prototype);
    this.response = response;
  }
}

export class TrackingService {
  private trackingApiOptions: TrackingServiceConfig;

  constructor(options: TrackingServiceConfig) {
    this.trackingApiOptions = {
      currentPageParamsToTrack: ['sc_camp', 'sc_trk'],
      ...options,
    };
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
    if (!this.trackingApiOptions.test && isServer()) {
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
    const combinedQueryParams = {
      ...this.trackingApiOptions.querystringParams,
      ...querystringParams,
    };

    return this.fetchData(event, combinedQueryParams);
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
    if (!this.trackingApiOptions.test && isServer()) {
      // do nothing for SSR, only track events when a browser requests it
      return Promise.resolve();
    }

    let url = this.resolveTrackingUrl();
    const qs = TrackingService.getQueryString(params);

    if (qs) {
      url = url.indexOf('?') !== -1 ? `${url}&${qs}` : `${url}?${qs}`;
    }

    return this.trackingApiOptions.fetcher(url, data).then((response) => {
      if (response.status < 200 || response.status >= 300) {
        throw new ResponseError(response.statusText, response);
      }
    });
  }

  private resolveTrackingUrl() {
    const {
      host = '',
      serviceUrl = '/sitecore/api/track',
      action = 'pageview',
    } = this.trackingApiOptions;

    return `${host}${serviceUrl}/${action}`;
  }
}
