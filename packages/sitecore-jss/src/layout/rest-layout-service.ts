import { IncomingMessage, ServerResponse } from 'http';
import { LayoutServiceBase } from './layout-service';
import { PlaceholderData, LayoutServiceData } from './models';
import {
  NativeDataFetcher,
  NativeDataFetcherConfig,
  NativeDataFetcherFunction,
  NativeDataFetcherResponse,
} from '../native-fetcher';
import { HttpDataFetcher, fetchData } from '../data-fetcher';
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
) => HttpDataFetcher<T> | NativeDataFetcherFunction<T>;

/**
 * Fetch layout data using the Sitecore Layout Service REST API.
 * Uses NativeDataFetcher as the default data fetcher (@see NativeDataFetcher).
 * @augments LayoutServiceBase
 */
export class RestLayoutService extends LayoutServiceBase {
  constructor(private serviceConfig: RestLayoutServiceConfig) {
    super();
  }

  /**
   * Fetch layout data for an item.
   * @param {string} itemPath item path to fetch layout data for.
   * @param {string} [language] the language to fetch layout data for.
   * @param {IncomingMessage} [req] Request instance
   * @param {ServerResponse} [res] Response instance
   * @returns {Promise<LayoutServiceData>} layout service data
   * @throws {Error} the item with the specified path is not found
   */
  async fetchLayoutData(
    itemPath: string,
    language?: string,
    req?: IncomingMessage,
    res?: ServerResponse
  ): Promise<LayoutServiceData> {
    const querystringParams = this.getFetchParams(language);

    debug.layout(
      'fetching layout data for %s %s %s',
      itemPath,
      language,
      this.serviceConfig.siteName
    );
    const fetcher = this.getFetcher(req, res);
    const fetchUrl = this.resolveLayoutServiceUrl('render');

    try {
      return await fetchData<LayoutServiceData>(fetchUrl, fetcher, {
        item: itemPath,
        ...querystringParams,
      });
    } catch (error) {
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
    }
  }

  /**
   * Fetch layout data for a particular placeholder.
   * Makes a request to Sitecore Layout Service for the specified placeholder in
   * a specific route item. Allows you to retrieve rendered data for individual placeholders instead of entire routes.
   * @param {string} placeholderName the name of the placeholder to fetch layout data for.
   * @param {string} itemPath the path to the item to fetch layout data for.
   * @param {string} [language] the language to fetch data for.
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
    const querystringParams = this.getFetchParams(language);

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

    const fetchUrl = this.resolveLayoutServiceUrl('placeholder');

    return fetchData(fetchUrl, fetcher, {
      placeholderName,
      item: itemPath,
      ...querystringParams,
    });
  }

  /**
   * Provides fetch options in order to fetch data
   * @param {string} [language] language will be applied to `sc_lang` param
   * @returns {FetchOptions} fetch options
   */
  protected getFetchParams = (language?: string): FetchParams => {
    return {
      sc_apikey: this.serviceConfig.apiKey,
      sc_site: this.serviceConfig.siteName,
      sc_lang: language || '',
      tracking: this.serviceConfig.tracking ?? true,
    };
  };

  protected getFetcher = (req?: IncomingMessage, res?: ServerResponse) => {
    return this.serviceConfig.dataFetcherResolver
      ? this.serviceConfig.dataFetcherResolver<LayoutServiceData>(req, res)
      : this.getDefaultFetcher<LayoutServiceData>(req, res);
  };

  /**
   * Resolves layout service url
   * @param {string} apiType which layout service API to call ('render' or 'placeholder')
   * @returns the layout service url
   */
  protected resolveLayoutServiceUrl(apiType: 'render' | 'placeholder' | 'component'): string {
    const { apiHost = '', configurationName = 'jss' } = this.serviceConfig;

    return `${apiHost}/sitecore/api/layout/${apiType}/${configurationName}`;
  }

  /**
   * Returns a fetcher function pre-configured with headers from the incoming request.
   * Provides default @see NativeDataFetcher data fetcher
   * @param {IncomingMessage} [req] Request instance
   * @param {ServerResponse} [res] Response instance
   * @returns default fetcher
   */
  protected getDefaultFetcher = <T>(req?: IncomingMessage, res?: ServerResponse) => {
    const config: NativeDataFetcherConfig = { debugger: debug.layout };

    let headers: HeadersInit;
    if (req) {
      headers = this.setupReqHeaders(req);
    }

    const nativeFetcher = new NativeDataFetcher(config);

    return async (url: string, data?: RequestInit) => {
      const response = await nativeFetcher.fetch<T>(url, { ...data, headers });

      if (res) {
        this.setupResHeaders(res, response);
      }

      return response;
    };
  };

  /**
   * Creates an HTTP `Headers` object populated with headers from the incoming request.
   * @param {IncomingMessage} [req] - The incoming HTTP request, used to extract headers.
   * @returns {Headers} - An instance of the `Headers` object populated with the extracted headers.
   */
  protected setupReqHeaders(req?: IncomingMessage): Headers {
    const headers = new Headers();

    if (req?.headers) {
      // Copy all headers from req.headers
      Object.entries(req.headers).forEach(([key, value]) => {
        if (value) {
          headers.set(key, Array.isArray(value) ? value.join(', ') : value);
        }
      });

      // Add or override specific headers
      req.headers.cookie && headers.set('cookie', req.headers.cookie);
      req.headers.referer && headers.set('referer', req.headers.referer);
      req.headers['user-agent'] && headers.set('user-agent', req.headers['user-agent']);
      req.socket.remoteAddress && headers.set('X-Forwarded-For', req.socket.remoteAddress);
    }

    return headers;
  }

  /**
   * Setup response headers based on response from layout service
   * @param {ServerResponse} res Response instance
   * @param {NativeDataFetcherResponse<T>} serverRes
   * @returns {NativeDataFetcherResponse} response
   */
  protected setupResHeaders<T>(
    res: ServerResponse,
    serverRes: NativeDataFetcherResponse<T>
  ): NativeDataFetcherResponse<T> {
    debug.layout('performing response header passing');

    const headers = serverRes.headers;

    if (headers instanceof Headers) {
      const setCookieHeader = headers.get('set-cookie');
      if (setCookieHeader) {
        res.setHeader('set-cookie', setCookieHeader);
      }
    }

    return serverRes;
  }
}
