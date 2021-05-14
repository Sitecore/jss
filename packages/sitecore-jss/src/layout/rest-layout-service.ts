import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { IncomingMessage, ServerResponse } from 'http';
import { LayoutServiceBase } from './layout-service';
import { PlaceholderData, LayoutServiceData } from './models';
import { AxiosDataFetcher, AxiosDataFetcherConfig } from '../axios-fetcher';
import { HttpDataFetcher, fetchData } from '../data-fetcher';
import debug from '../debug';

/**
 * Resolves layout service url
 * @param {LayoutServiceConfig} [options] layout service options
 * @param {string} apiType which layout service API to call ('render' or 'placeholder')
 * @returns the layout service url
 */
export function resolveLayoutServiceUrl(
  options: LayoutServiceConfig = {},
  apiType: 'render' | 'placeholder'
): string {
  const { host = '', configurationName = 'jss', serviceUrl } = options;

  if (serviceUrl) {
    return serviceUrl;
  }

  return `${host}/sitecore/api/layout/${apiType}/${configurationName}`;
}

/**
 * Makes a request to Sitecore Layout Service for the specified route item path.
 * @deprecated Will be removed in a future release. Please use LayoutService.fetchLayoutData instead,
 * @see {LayoutService} - fetchLayoutData
 * @param {string} itemPath
 * @param {LayoutServiceRequestOptions<LayoutServiceData>} options
 * @returns {Promise<LayoutServiceData>} layout data
 */
export function fetchRouteData(
  itemPath: string,
  options: LayoutServiceRequestOptions<LayoutServiceData>
): Promise<LayoutServiceData> {
  const { querystringParams, layoutServiceConfig } = options;

  const fetchUrl = resolveLayoutServiceUrl(layoutServiceConfig, 'render');

  return fetchData(fetchUrl, options.fetcher, { item: itemPath, ...querystringParams });
}

/**
 * Makes a request to Sitecore Layout Service for the specified placeholder in
 * a specific route item. Allows you to retrieve rendered data for individual placeholders instead of entire routes.
 * @deprecated Will be removed in a future release. Please use LayoutService.fetchPlaceholderData instead,
 * @see {LayoutService} - fetchPlaceholderData
 * @param {string} placeholderName
 * @param {string} itemPath
 * @param {LayoutServiceRequestOptions<PlaceholderData>} options
 * @returns {Promise<PlaceholderData>} placeholder data
 */
export function fetchPlaceholderData(
  placeholderName: string,
  itemPath: string,
  options: LayoutServiceRequestOptions<PlaceholderData>
): Promise<PlaceholderData> {
  const { querystringParams, layoutServiceConfig } = options;

  const fetchUrl = resolveLayoutServiceUrl(layoutServiceConfig, 'placeholder');

  return fetchData(fetchUrl, options.fetcher, {
    placeholderName,
    item: itemPath,
    ...querystringParams,
  });
}

export interface LayoutServiceConfig {
  /**
   * Host name of the Sitecore instance serving Layout Service requests.
   */
  host?: string;

  /**
   * Layout Service "named" configuration
   */
  configurationName?: string;

  /**
   * This value overrides the default layout service URL.
   * Note: `host` and `configurationName` options are ignored if `layoutServiceUrl` is set.
   */
  serviceUrl?: string;
}

export interface LayoutServiceRequestOptions<T> {
  /**
   * Configuration options for Layout Service requests.
   */
  layoutServiceConfig?: LayoutServiceConfig;
  /**
   * An object of key:value pairs to be stringified and used as querystring parameters.
   */
  querystringParams?: { [key: string]: string | number | boolean };

  /** The fetcher that performs the HTTP request and returns a promise to JSON */
  fetcher: HttpDataFetcher<T>;
}

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
   * Function that handles fetching API data
   */
  dataFetcherResolver?: DataFetcherResolver;

  /**
   * Layout Service "named" configuration
   */
  configurationName?: string;
};

/**
 * Data fetcher resolver in order to provide custom data fetcher
 * @param {IncomingMessage} [req] Request instance
 * @param {ServerResponse} [res] Response instance
 */
export type DataFetcherResolver = <T>(
  req?: IncomingMessage,
  res?: ServerResponse
) => HttpDataFetcher<T>;

/**
 * Fetch layout data using the Sitecore Layout Service REST API.
 * Uses Axios as the default data fetcher (@see AxiosDataFetcher).
 */
export class RestLayoutService extends LayoutServiceBase {
  constructor(private serviceConfig: RestLayoutServiceConfig) {
    super();
  }

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

    debug.layout(
      'fetching layout data for %s %s %s',
      itemPath,
      language,
      this.serviceConfig.siteName
    );
    const fetcher = this.serviceConfig.dataFetcherResolver
      ? this.serviceConfig.dataFetcherResolver<LayoutServiceData>(req, res)
      : this.getDefaultFetcher<LayoutServiceData>(req, res);

    return fetchRouteData(itemPath, { fetcher, ...fetchOptions })
      .then((data: LayoutServiceData) => {
        data.sitecore.tracked = this.serviceConfig.tracking !== false;
        return data;
      })
      .catch((error) => {
        if (error.response?.status === 404) {
          // Aligned with response of GraphQL Layout Service in case if layout is not found.
          // When 404 Rest Layout Service returns
          // {
          //   sitecore: {
          //     context: {
          //       pageEditing: false,
          //       language
          //     },
          //     route: null
          //   },
          // }
          //
          error.response.data.sitecore.tracked = this.serviceConfig.tracking !== false;
          return error.response.data;
        }

        throw error;
      });
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

    debug.layout(
      'fetching placeholder data for %s %s %s %s',
      placeholderName,
      itemPath,
      language,
      this.serviceConfig.siteName
    );
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
        configurationName: this.serviceConfig.configurationName,
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
    const config = {
      debugger: debug.layout,
    } as AxiosDataFetcherConfig;
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
      debug.layout('performing request header passing');
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
      debug.layout('performing response header passing');
      serverRes.headers['set-cookie'] &&
        res.setHeader('set-cookie', serverRes.headers['set-cookie']);
      return serverRes;
    };
  }
}
