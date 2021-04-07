import { AxiosDataFetcher, AxiosDataFetcherConfig } from './axios-fetcher';
import { LayoutServiceData, PlaceholderData } from './data-models';
import { fetchPlaceholderData, fetchRouteData, LayoutServiceConfig } from './data-api';
import { GraphQLRequestClient } from './graphql-request-client';
import { HttpDataFetcher } from './data-fetcher';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { IncomingMessage, ServerResponse } from 'http';
import debug from './debug';

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
) => HttpDataFetcher<T>;

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
   * @see HttpDataFetcher<T>
   * @see AxiosDataFetcher used by default
   * @param {IncomingMessage} [req] Request instance
   * @param {ServerResponse} [res] Response instance
   */
  dataFetcherResolver?: DataFetcherResolver;
};

export type GraphQLLayoutServiceConfig = {
  /**
   * Your Graphql endpoint
   */
  endpoint: string;
  /**
   * The JSS application name
   */
  siteName: string;
  /**
   * The API key to use for authentication
   */
  apiKey: string;
  /**
   * Override default layout query
   * @param {string} siteName
   * @param {string} itemPath
   * @param {string} [locale]
   * @returns {string} custom layout query
   *
   * @default
   * Layout query
   * layout(site:"${siteName}", routePath:"${itemPath}", language:"${language}")
   */
  formatLayoutQuery?: (siteName: string, itemPath: string, locale?: string) => string;
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

    debug.layout(
      'fetching layout data for %s %s %s',
      itemPath,
      language,
      this.serviceConfig.siteName
    );
    const fetcher = this.serviceConfig.dataFetcherResolver
      ? this.serviceConfig.dataFetcherResolver<LayoutServiceData>(req, res)
      : this.getDefaultFetcher<LayoutServiceData>(req, res);

    return fetchRouteData(itemPath, { fetcher, ...fetchOptions }).catch((error) => {
      if (error.response?.status === 404) {
        // Aligned with response of GraphQL Layout Service in case if layout is not found.
        // When 404 Rest Layout Service returns
        // {
        //   sitecore: {
        //     context: {
        //			   pageEditing: false,
        //				 language
        //		 },
        //		 route: null
        //	 },
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

export class GraphQLLayoutService implements LayoutService {
  /**
   * Fetch layout data using the Sitecore GraphQL endpoint.
   * @param {GraphQLLayoutServiceConfig} serviceConfig
   */
  constructor(private serviceConfig: GraphQLLayoutServiceConfig) {}

  /**
   * Fetch layout data for an item.
   * @param {string} itemPath
   * @param {string} [language]
   * @returns {Promise<LayoutServiceData>} layout service data
   */
  async fetchLayoutData(itemPath: string, language?: string): Promise<LayoutServiceData> {
    const query = this.getLayoutQuery(itemPath, language);

    debug.layout(
      'fetching layout data for %s %s %s',
      itemPath,
      language,
      this.serviceConfig.siteName
    );
    const data = await this.createClient().request<{
      layout: { item: { rendered: LayoutServiceData } };
    }>(query);

    // If `rendered` is empty -> not found
    return (
      data?.layout?.item.rendered || {
        sitecore: { context: { pageEditing: false, language }, route: null },
      }
    );
  }

  /**
   * Returns new graphql client instance
   */
  private createClient(): GraphQLRequestClient {
    const { endpoint, apiKey } = this.serviceConfig;

    return new GraphQLRequestClient(endpoint, { apiKey, debugger: debug.layout });
  }

  /**
   * Returns GraphQL Layout query
   * @param {string} itemPath page route
   * @param {string} [language] language
   */
  private getLayoutQuery(itemPath: string, language?: string) {
    const languageVariable = language ? `, language:"${language}"` : '';

    const layoutQuery = this.serviceConfig.formatLayoutQuery
      ? this.serviceConfig.formatLayoutQuery(this.serviceConfig.siteName, itemPath, language)
      : `layout(site:"${this.serviceConfig.siteName}", routePath:"${itemPath}"${languageVariable})`;

    return `query {
      ${layoutQuery}{
        item {
          rendered
        }
      }
    }`;
  }
}
