import { AxiosDataFetcher } from './data-fetcher';
import { LayoutServiceData, PlaceholderData } from './dataModels';
import { fetchPlaceholderData, fetchRouteData, LayoutServiceConfig } from './dataApi';
import { HttpJsonFetcher } from './httpClientInterface';
import { IncomingMessage, ServerResponse } from 'http';

export type DataFetcherResolver<T> = (req?: IncomingMessage, res?: ServerResponse) => HttpJsonFetcher<T>;

export type LayoutServiceInstanceConfig = {
  apiHost: string;
  apiKey: string;
  siteName: string;
  /**
   * Enables/disables analytics tracking for the Layout Service invocation (default is true).
   * More than likely, this would be set to false for SSG/hybrid implementations, and the
   * JSS tracker would instead be used on the client-side: {@link https://jss.sitecore.com/docs/fundamentals/services/tracking}
   * @default true
   */
  tracking?: boolean;
  /**
   * Layout data fetcher resolver in order to provide custom data fetcher
   * @see DataFetcherResolver<T>
   * @see HttpJsonFetcher<T>
   * @see AxiosDataFetcher used by default
   * @param {IncomingMessage} [req] Request instance
   * @param {ServerResponse} [res] Response instance
   */
  layoutDataFetcherResolver?: DataFetcherResolver<LayoutServiceData>;
  /**
   * Placeholder data fetcher resolver in order to provide custom data fetcher
   * @see DataFetcherResolver<T>
   * @see HttpJsonFetcher<T>
   * @see AxiosDataFetcher used by default
   * @param {IncomingMessage} [req] Request instance
   * @param {ServerResponse} [res] Response instance
   */
  placeholderDataFetcherResolver?: DataFetcherResolver<PlaceholderData>;
};

interface FetchParams {
  sc_apikey: string;
  sc_site: string;
  sc_lang?: string;
  tracking: boolean;
}

interface FetchOptions {
  layoutServiceConfig: LayoutServiceConfig;
  querystringParams: FetchParams;
}

export class LayoutService {
  constructor(private serviceConfig: LayoutServiceInstanceConfig) {}

  /**
   * Provides fetch options in order to fetch route data
   * @param {string} [language] language will be applied to `sc_lang` param
   */
  private getFetchOptions = (language?: string): FetchOptions => {
    const params: FetchParams = {
      sc_apikey: this.serviceConfig.apiKey,
      sc_site: this.serviceConfig.siteName,
      sc_lang: language,
      tracking: this.serviceConfig.tracking ?? true,
    };

    return {
      layoutServiceConfig: {
        host: this.serviceConfig.apiHost,
      },
      querystringParams: { ...params },
    };
  };

  /**
   * Provides default @see AxiosDataFetcher data fetcher
   * @param {IncomingMessage} [req] Request instance
   * @param {ServerResponse} [res] Response instance
   */
  private getDefaultFetcher = (req?: IncomingMessage, res?: ServerResponse) => {
    const axiosFetcher = new AxiosDataFetcher();

    const fetcher = (url: string, data?: unknown) => {
      return axiosFetcher.fetch(url, data, req, res);
    };

    return fetcher;
  };

  /**
   * Fetch route data from LayoutService using @see dataApi.fetchRouteData
   * @param {string} itemPath
   * @param {string} [language]
   * @param {IncomingMessage} [req] Request instance
   * @param {ServerResponse} [res] Response instance
   */
  fetchLayoutData(
    itemPath: string,
    language?: string,
    req?: IncomingMessage,
    res?: ServerResponse
  ): Promise<LayoutServiceData> {
    const fetchOptions = this.getFetchOptions(language);

    const fetcher = this.serviceConfig.layoutDataFetcherResolver
      ? this.serviceConfig.layoutDataFetcherResolver(req, res)
      : this.getDefaultFetcher(req, res);

    return fetchRouteData(itemPath, { fetcher, ...fetchOptions });
  }

  /**
   * Fetch route data from LayoutService using @see dataApi.fetchPlaceholderData
   * Makes a request to Sitecore Layout Service for the specified placeholder in
   * a specific route item. Allows you to retrieve rendered data for individual placeholders instead of entire routes.
   * @param {string} itemPath
   * @param {string} [language]
   * @param {IncomingMessage} [req] Request instance
   * @param {ServerResponse} [res] Response instance
   */
  fetchPlaceholderData(
    placeholderName: string,
    itemPath: string,
    req?: IncomingMessage,
    res?: ServerResponse
  ): Promise<PlaceholderData> {
    const fetchOptions = this.getFetchOptions();

    const fetcher = this.serviceConfig.placeholderDataFetcherResolver
    ? this.serviceConfig.placeholderDataFetcherResolver(req, res)
    : this.getDefaultFetcher(req, res);

    return fetchPlaceholderData(placeholderName, itemPath, { fetcher, ...fetchOptions });
  }
}
