import { AxiosDataFetcher } from './data-fetcher';
import { LayoutServiceData } from './dataModels';
import * as dataApi from './dataApi';
import { HttpJsonFetcher } from './httpClientInterface';
import { IncomingMessage, ServerResponse } from 'http';

export type LayoutServiceConfig = {
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
   * Custom data fetcher. @see HttpJsonFetcher<T> type for implementation details/notes.
   * By default used @see AxiosDataFetcher
   * @param {string} url The URL to request; may include query string
   * @param {any} [data] Data to POST with the request.
	 * @param {IncomingMessage} [req] Request instance
	 * @param {ServerResponse} [res] Response instance
   */
  dataFetcher?: HttpJsonFetcher<LayoutServiceData>;
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

    const fetcher = this.serviceConfig.dataFetcher || this.getDefaultFetcher(req, res);

    return dataApi.fetchRouteData(itemPath, { fetcher, ...fetchOptions });
  }
}
