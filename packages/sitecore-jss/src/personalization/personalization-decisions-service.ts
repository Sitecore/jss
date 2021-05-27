import { AxiosDataFetcher } from './../axios-fetcher';
import { fetchData, HttpDataFetcher } from './../data-fetcher';
import { IncomingMessage, ServerResponse } from 'http';

export interface RenderingPersonalizationDecision {
  variantKey?: string;
  errorMessage?: string;
}

export interface PersonalizationDecisionData {
  renderings: {
    [renderingId: string]: RenderingPersonalizationDecision;
  };
}

export interface PersonalizationDecisionsService {
  getPersonalizationDecisions(
    routePath: string,
    language: string,
    renderingIds: string[],
    req?: IncomingMessage,
    res?: ServerResponse
  ): Promise<PersonalizationDecisionData>;
}

export type DataFetcherResolver = <T>(config: {
  /**
   * The request timeout in milliseconds
   */
  timeout?: number;
}) => HttpDataFetcher<T>;

export type RestPersonalizationDecisionsServiceConfig = {
  /**
   * Hostname of decisions service; e.g. http://my.site.core; Default: '', same host as a page
   */
  host?: string;
  /**
   * Relative path from host to decisions service. Default: /sitecore/api/layout/personalization/decision
   */
  route?: string;
  /**
   * This value overrides the default service URL.
   * Note: `host` and `route` options are ignored if `serviceUrl` is set.
   */
  serviceUrl?: string;
  /**
   * The Sitecore SSC API key your app uses
   */
  apiKey: string;
  /**
   * The JSS application name
   */
  siteName: string;
  /**
   * Query string parameters of the current page to pass with request to decision service
   */
  currentPageParamsToTrack?: string[];
  /**
   * Enables/disables analytics tracking for the Layout Service invocation (default is true).
   * More than likely, this would be set to false for SSG/hybrid implementations, and the
   * JSS tracker would instead be used on the client-side: {@link https://jss.sitecore.com/docs/fundamentals/services/tracking}
   * @default true
   */
  tracking?: boolean;
  /**
   * The request timeout in milliseconds
   */
  timeout?: number;
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

export class RestPersonalizationDecisionsService implements PersonalizationDecisionsService {
  private serviceConfig: RestPersonalizationDecisionsServiceConfig;

  constructor(serviceConfig: RestPersonalizationDecisionsServiceConfig) {
    this.serviceConfig = {
      host: '',
      route: '/sitecore/api/layout/personalization/decision',
      currentPageParamsToTrack: ['sc_camp', 'sc_trk'],
      ...serviceConfig,
    };
  }

  getPersonalizationDecisions(
    routePath: string,
    language: string,
    renderingIds: string[]
  ): Promise<PersonalizationDecisionData> {
    const fetcher = this.serviceConfig.dataFetcherResolver
      ? this.serviceConfig.dataFetcherResolver<PersonalizationDecisionData>({
          timeout: this.serviceConfig.timeout,
        })
      : this.getDefaultFetcher<PersonalizationDecisionData>();
    const queryParams = {
      ...this.getCurrentPageParamsToTrack(),
      sc_apikey: this.serviceConfig.apiKey,
      sc_site: this.serviceConfig.siteName,
      tracking: this.serviceConfig.tracking ?? true,
    };
    const requestBody = {
      routePath: routePath,
      language: language,
      renderingIds: renderingIds,
    };
    return fetchData<PersonalizationDecisionData>(
      this.serviceConfig.serviceUrl ?? `${this.serviceConfig.host}${this.serviceConfig.route}`,
      fetcher,
      queryParams,
      requestBody
    );
  }

  private getDefaultFetcher = <T>() => {
    const axiosFetcher = new AxiosDataFetcher({ timeout: this.serviceConfig.timeout });

    const fetcher = (url: string, data?: unknown) => {
      return axiosFetcher.fetch<T>(url, data);
    };

    return fetcher;
  };

  private getCurrentPageParamsToTrack = () => {
    const queryStringParams: { [key: string]: string } = {};

    window.location.search
      .substring(1)
      .split('&')
      .forEach((param) => {
        this.serviceConfig.currentPageParamsToTrack?.forEach((name) => {
          if (param.toLowerCase().startsWith(name.toLowerCase().concat('='))) {
            queryStringParams[name] = decodeURIComponent(
              param.toLowerCase().substring(name.length + 1)
            );
          }
        });
      });

    return queryStringParams;
  };
}
