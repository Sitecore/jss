import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { IncomingMessage, ServerResponse } from 'http';
import { LayoutServiceBase } from './layout-service';
import { PlaceholderData, LayoutServiceData } from './models';
import { AxiosDataFetcher, AxiosDataFetcherConfig } from '../axios-fetcher';
import { HttpDataFetcher, fetchData } from '../data-fetcher';
import { siteNameError } from '../constants';
import debug from '../debug';

interface FetchParams {
  [param: string]: string | number | boolean;
  sc_apikey: string;
  sc_site: string;
  sc_lang: string;
  tracking: boolean;
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
 * @augments LayoutServiceBase
 *
 */
export class RestLayoutService extends LayoutServiceBase {
  constructor(private serviceConfig: RestLayoutServiceConfig) {
    super();
  }

  /**
   * Fetch layout data for an item.
   * @param {string} itemPath item path to fetch layout data for.
   * @param {string} siteName the site to fetch layout data for.
   * @param {string} [language] the language to fetch layout data for.
   * @param {IncomingMessage} [req] Request instance
   * @param {ServerResponse} [res] Response instance
   * @returns {Promise<LayoutServiceData>} layout service data
   * @throws {Error} the item with the specified path is not found
   */
  fetchLayoutData(
    itemPath: string,
    siteName: string,
    language?: string,
    req?: IncomingMessage,
    res?: ServerResponse
  ): Promise<LayoutServiceData> {
    if (!siteName) {
      throw new Error(siteNameError);
    }

    const querystringParams = this.getFetchParams(siteName, language);

    debug.layout('fetching layout data for %s %s %s', itemPath, language, siteName);
    const fetcher = this.serviceConfig.dataFetcherResolver
      ? this.serviceConfig.dataFetcherResolver<LayoutServiceData>(req, res)
      : this.getDefaultFetcher<LayoutServiceData>(req, res);

    const fetchUrl = this.resolveLayoutServiceUrl('render');

    return fetchData(fetchUrl, fetcher, {
      item: itemPath,
      ...querystringParams,
    }).catch((error) => {
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
        return error.response.data;
      }

      throw error;
    });
  }

  /**
   * Fetch layout data for a particular placeholder.
   * Makes a request to Sitecore Layout Service for the specified placeholder in
   * a specific route item. Allows you to retrieve rendered data for individual placeholders instead of entire routes.
   * @param {string} placeholderName the name of the placeholder to fetch layout data for.
   * @param {string} itemPath the path to the item to fetch layout data for.
   * @param {string} siteName the site to fetch data for.
   * @param {string} [language] the language to fetch data for.
   * @param {IncomingMessage} [req] Request instance
   * @param {ServerResponse} [res] Response instance
   * @returns {Promise<PlaceholderData>} placeholder data
   */
  fetchPlaceholderData(
    placeholderName: string,
    itemPath: string,
    siteName: string,
    language?: string,
    req?: IncomingMessage,
    res?: ServerResponse
  ): Promise<PlaceholderData> {
    if (!siteName) {
      throw new Error(siteNameError);
    }

    const querystringParams = this.getFetchParams(siteName, language);

    debug.layout(
      'fetching placeholder data for %s %s %s %s',
      placeholderName,
      itemPath,
      language,
      siteName
    );
    const fetcher = this.serviceConfig.dataFetcherResolver
      ? this.serviceConfig.dataFetcherResolver<PlaceholderData>(req, res)
      : this.getDefaultFetcher<PlaceholderData>(req, res);

    const fetchUrl = this.resolveLayoutServiceUrl('placeholder');

    return fetchData(fetchUrl, fetcher, {
      placeholderName,
      item: itemPath,
      ...querystringParams,
    });
  }

  /**
   * Provides fetch options in order to fetch data
   * @param {string} siteName the site to fetch data for.
   * @param {string} [language] language will be applied to `sc_lang` param
   * @returns {FetchOptions} fetch options
   */
  protected getFetchParams = (siteName: string, language?: string): FetchParams => {
    return {
      sc_apikey: this.serviceConfig.apiKey,
      sc_site: siteName,
      sc_lang: language || '',
      tracking: this.serviceConfig.tracking ?? true,
    };
  };

  /**
   * Resolves layout service url
   * @param {string} apiType which layout service API to call ('render' or 'placeholder')
   * @returns the layout service url
   */
  protected resolveLayoutServiceUrl(apiType: 'render' | 'placeholder'): string {
    const { apiHost = '', configurationName = 'jss' } = this.serviceConfig;

    return `${apiHost}/sitecore/api/layout/${apiType}/${configurationName}`;
  }

  /**
   * Provides default @see AxiosDataFetcher data fetcher
   * @param {IncomingMessage} [req] Request instance
   * @param {ServerResponse} [res] Response instance
   * @returns default fetcher
   */
  protected getDefaultFetcher = <T>(req?: IncomingMessage, res?: ServerResponse) => {
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
   * @param {IncomingMessage} req Request instance
   * @returns {AxiosRequestConfig} axios request config
   */
  protected setupReqHeaders(req: IncomingMessage) {
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
   * @param {ServerResponse} res Response instance
   * @returns {AxiosResponse} response
   */
  protected setupResHeaders(res: ServerResponse) {
    return (serverRes: AxiosResponse) => {
      debug.layout('performing response header passing');
      serverRes.headers['set-cookie'] &&
        res.setHeader('set-cookie', serverRes.headers['set-cookie']);
      return serverRes;
    };
  }
}
