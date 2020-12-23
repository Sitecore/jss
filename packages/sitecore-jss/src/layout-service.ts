import { AxiosDataFetcher } from './data-fetcher';
import { LayoutServiceData, PlaceholderData } from './dataModels';
import { fetchPlaceholderData, fetchRouteData, LayoutServiceConfig } from './dataApi';
import { HttpJsonFetcher } from './httpClientInterface';
import { IncomingMessage, ServerResponse } from 'http';

export type DataFetcherResolver = <T>(
  req?: IncomingMessage,
  res?: ServerResponse
) => HttpJsonFetcher<T>;

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
   * Data fetcher resolver in order to provide custom data fetcher
   * @see DataFetcherResolver
   * @see HttpJsonFetcher<T>
   * @see AxiosDataFetcher used by default
   * @param {IncomingMessage} [req] Request instance
   * @param {ServerResponse} [res] Response instance
   */
  dataFetcherResolver?: DataFetcherResolver;
};

interface FetchParams {
  [param: string]: string | number | boolean;
  sc_apikey: string;
  sc_site: string;
  sc_lang: string;
  tracking: boolean;
}

interface FetchOptions {
  layoutServiceConfig: LayoutServiceConfig;
  querystringParams: FetchParams;
}

export class LayoutService {
  constructor(private serviceConfig: LayoutServiceInstanceConfig) {}

  /**
   * Fetch route data from LayoutService using @see dataApi.fetchRouteData
   * @param {string} itemPath
   * @param {string} [language]
   * @param {IncomingMessage} [req] Request instance
   * @param {ServerResponse} [res] Response instance
   * @returns {Promise<LayoutServiceData>} layout service data
   */
  fetchLayoutData(
    itemPath: string,
    language?: string,
    req?: IncomingMessage,
    res?: ServerResponse
  ): Promise<LayoutServiceData> {
    const fetchOptions = this.getFetchOptions(language);

    const fetcher = this.serviceConfig.dataFetcherResolver
      ? this.serviceConfig.dataFetcherResolver<LayoutServiceData>(req, res)
      : this.getDefaultFetcher(req, res);

    return fetchRouteData(itemPath, { fetcher, ...fetchOptions });
  }

  /**
   * Fetch route data from LayoutService using @see dataApi.fetchPlaceholderData
   * Makes a request to Sitecore Layout Service for the specified placeholder in
   * a specific route item. Allows you to retrieve rendered data for individual placeholders instead of entire routes.
   * @param {string} placeholderName
   * @param {string} itemPath
   * @param {string} [language]
   * @param {IncomingMessage} [req] Request instance
   * @param {ServerResponse} [res] Response instance
   * @returns {Promise<PlaceholderData>} placeholder data
   */
  fetchPlaceholderData(
    placeholderName: string,
    itemPath: string,
    language?: string,
    req?: IncomingMessage,
    res?: ServerResponse
  ): Promise<PlaceholderData> {
    const fetchOptions = this.getFetchOptions(language);

    const fetcher = this.serviceConfig.dataFetcherResolver
      ? this.serviceConfig.dataFetcherResolver<PlaceholderData>(req, res)
      : this.getDefaultFetcher(req, res);

    return fetchPlaceholderData(placeholderName, itemPath, { fetcher, ...fetchOptions });
  }

  /**
   * Provides fetch options in order to fetch route data
   * @param {string} [language] language will be applied to `sc_lang` param
   * @returns {FetchOptions} fetch options
   */
  private getFetchOptions = (language?: string): FetchOptions => {
    const params: FetchParams = {
      sc_apikey: this.serviceConfig.apiKey,
      sc_site: this.serviceConfig.siteName,
      sc_lang: language || '',
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
   * @returns default fetcher
   */
  private getDefaultFetcher = (req?: IncomingMessage, res?: ServerResponse) => {
    const axiosFetcher = new AxiosDataFetcher();

    const fetcher = (url: string, data?: unknown) => {
      return axiosFetcher.fetch(url, data, req, res);
    };

    return fetcher;
  };
}
