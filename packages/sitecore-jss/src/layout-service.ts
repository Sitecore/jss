import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { AxiosDataFetcher } from './data-fetcher';
import { LayoutServiceData } from './dataModels';
import * as dataApi from './dataApi';
import { HttpJsonFetcher } from './httpClientInterface';
import { IncomingMessage, ServerResponse } from 'http';

interface LayoutServiceConfig {
  apiHost: string;
  apiKey: string;
  siteName: string;
  /**
   * Enables/disables analytics tracking for the Layout Service invocation (default is true).
   * More than likely, this would be set to false for SSG/hybrid implementations, and the
   * JSS tracker would instead be used on the client-side: {@link https://jss.sitecore.com/docs/fundamentals/services/tracking}
   */
  tracking?: boolean;
}

type FetchConfig = {
  /**
   * Callback which executed before request is sent. You can modify axios config.
   * Used only in default data fetcher.
   * {@link https://github.com/axios/axios#interceptors}
   * @param {AxiosRequestConfig} config axios config
   */
  onReq?: (config: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>;
  /**
   * Callback which invoked when request error happened.
   * Used only in default data fetcher.
   * {@link https://github.com/axios/axios#interceptors}
   * @param {unknown} error
   */
  onReqError?: (error: unknown) => unknown;

  /**
   * Callback which invoked when got response from layout service.
   * Used only in default data fetcher.
   * {@link https://github.com/axios/axios#interceptors}
   * @param {AxiosResponse} layoutServiceRes layout service response
   */
  onRes?: (layoutServiceRes: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>;
  /**
   * Callback which invoked when status codes fallen outside the range of 2xx.
   * Used only in default data fetcher.
   * {@link https://github.com/axios/axios#interceptors}
   * @param {unknown} error
   */
  onResError?: (error: unknown) => unknown;
  /**
   * Custom data fetcher. @see HttpJsonFetcher<T> type for implementation details/notes.
   * By default used @see AxiosDataFetcher
   * @param {string} url The URL to request; may include query string
   * @param {any} data Optional data to POST with the request.
   */
  dataFetcher?: HttpJsonFetcher<LayoutServiceData>;
  /**
   * Request object to layout service
   * Using default fetcher will assign required request headers
   */
  req?: IncomingMessage;
  /**
   * Response from layout service
   * Using default fetcher will assign required response headers
   */
  res?: ServerResponse;
};

interface FetchParams {
  sc_apikey: string;
  sc_site: string;
  sc_lang?: string;
  tracking: boolean;
}

interface FetchOptions {
  layoutServiceConfig: {
    host: string;
  };
  querystringParams: FetchParams;
}

export class LayoutService {
  constructor(private serviceConfig: LayoutServiceConfig) {}

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
   * Setup request headers
   * @param {IncomingMessage} req
   * @param {AxiosRequestConfig} reqConfig 
   */
  private setupReqHeaders(req: IncomingMessage, reqConfig: AxiosRequestConfig) {
    reqConfig.headers.common = {
      ...reqConfig.headers.common,
      ...(req.headers.cookie && { cookie: req.headers.cookie }),
      ...(req.headers.referer && { referer: req.headers.referer }),
      ...(req.headers['user-agent'] && { 'user-agent': req.headers['user-agent'] }),
      ...(req.connection.remoteAddress && { 'X-Forwarded-For': req.connection.remoteAddress }),
    };

    return reqConfig;
  }

  /**
   * Setup response headers based on response from layout service
   * @param {ServerResponse} res 
   * @param {AxiosResponse} layoutServiceRes 
   */
  private setupResHeaders(res: ServerResponse, layoutServiceRes: AxiosResponse) {
    layoutServiceRes.headers['set-cookie'] &&
      res.setHeader('set-cookie', layoutServiceRes.headers['set-cookie']);

    return layoutServiceRes;
  }

  /**
   * Provides default @see AxiosDataFetcher data fetcher
   * @param {FetchConfig} [config]
   */
  private getDefaultFetcher = (config?: FetchConfig) => {
    const axiosFetcher = new AxiosDataFetcher();

    axiosFetcher.instance.interceptors.request.use((reqConfig: AxiosRequestConfig) => {
      if (config?.req) {
        reqConfig = this.setupReqHeaders(config.req, reqConfig);
      }

      return config?.onReq ? config.onReq(reqConfig) : reqConfig;
    }, config?.onReqError);

    axiosFetcher.instance.interceptors.response.use((layoutServiceRes: AxiosResponse) => {
      if (config?.res) {
        layoutServiceRes = this.setupResHeaders(config.res, layoutServiceRes);
      }

      return config?.onRes ? config.onRes(layoutServiceRes) : layoutServiceRes;
    }, config?.onResError);

    const fetcher = (url: string, data?: unknown) => {
      return axiosFetcher.fetch(url, data);
    };

    return fetcher;
  };

  /**
   * Fetch route data from LayoutService using @see dataApi.fetchRouteData
   * @param {string} itemPath
   * @param {string} [language]
   * @param {FetchConfig} [fetchConfig]
   */
  fetchLayoutData(
    itemPath: string,
    language?: string,
    config?: FetchConfig
  ): Promise<LayoutServiceData> {
    const fetchOptions = this.getFetchOptions(language);

    const fetcher = config?.dataFetcher || this.getDefaultFetcher(config);

    return dataApi.fetchRouteData(itemPath, { fetcher, ...fetchOptions });
  }
}
