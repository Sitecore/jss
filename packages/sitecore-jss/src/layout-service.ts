import { AxiosDataFetcher, AxiosDataFetcherConfig } from './data-fetcher';
import { LayoutServiceData, PlaceholderData } from './dataModels';
import { fetchPlaceholderData, fetchRouteData, LayoutServiceConfig } from './dataApi';
import { HttpJsonFetcher } from './httpClientInterface';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { IncomingMessage, ServerResponse } from 'http';

export interface LayoutService {
  /**
   * Fetch layout data for an item.
   * @param {string} itemPath
   * @param {string} [language]
   * @param {IncomingMessage} [req] Request instance
   * @param {ServerResponse} [res] Response instance
   * @returns {Promise<LayoutServiceData>} layout data
   */
  fetchLayoutData(
    itemPath: string,
    language?: string,
    req?: IncomingMessage,
    res?: ServerResponse
  ): Promise<LayoutServiceData>;
}

export type DataFetcherResolver = <T>(
  req?: IncomingMessage,
  res?: ServerResponse
) => HttpJsonFetcher<T>;

export type RestLayoutServiceConfig = {
  /**
   * Your Sitecore instance hostname that is the backend for JSS
   */
  apiHost: string;
  /**
   * The Sitecore SSC API key your app uses
   */
  apiKey: string;
  /**
   * The JSS application name
   */
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

/**
 * Fetch layout data using the Sitecore Layout Service REST API.
 * Uses Axios as the default data fetcher (@see AxiosDataFetcher).
 */
export class RestLayoutService implements LayoutService {
  constructor(private serviceConfig: RestLayoutServiceConfig) {}

  /**
   * Fetch layout data for an item.
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
      : this.getDefaultFetcher<LayoutServiceData>(req, res);

    return fetchRouteData(itemPath, { fetcher, ...fetchOptions });
  }

  /**
   * Fetch layout data for a particular placeholder.
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
      : this.getDefaultFetcher<PlaceholderData>(req, res);

    return fetchPlaceholderData(placeholderName, itemPath, { fetcher, ...fetchOptions });
  }

  /**
   * Provides fetch options in order to fetch data
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
  private getDefaultFetcher = <T>(req?: IncomingMessage, res?: ServerResponse) => {
    const config = {} as AxiosDataFetcherConfig;
    if (req && res) {
      config.onReq = this.setupReqHeaders(req);
      config.onRes = this.setupResHeaders(res);
    }
    const axiosFetcher = new AxiosDataFetcher(config);

    const fetcher = (url: string, data?: unknown) => {
      return axiosFetcher.fetch<T>(url, data);
    };

    return fetcher;
  };

  /**
   * Setup request headers
   * @param {IncomingMessage} req
   * @returns {AxiosRequestConfig} axios request config
   */
  private setupReqHeaders(req: IncomingMessage) {
    return (reqConfig: AxiosRequestConfig) => {
      reqConfig.headers.common = {
        ...reqConfig.headers.common,
        ...(req.headers.cookie && { cookie: req.headers.cookie }),
        ...(req.headers.referer && { referer: req.headers.referer }),
        ...(req.headers['user-agent'] && { 'user-agent': req.headers['user-agent'] }),
        ...(req.connection.remoteAddress && { 'X-Forwarded-For': req.connection.remoteAddress }),
      };
      return reqConfig;
    };
  }

  /**
   * Setup response headers based on response from layout service
   * @param {ServerResponse} res
   * @returns {AxiosResponse} response
   */
  private setupResHeaders(res: ServerResponse) {
    return (serverRes: AxiosResponse) => {
      serverRes.headers['set-cookie'] &&
        res.setHeader('set-cookie', serverRes.headers['set-cookie']);
      return serverRes;
    };
  }
}
