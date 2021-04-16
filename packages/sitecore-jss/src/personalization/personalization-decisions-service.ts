import { AxiosDataFetcher } from './../axios-fetcher';
import { HttpDataFetcher, HttpResponse } from './../data-fetcher';
import { IncomingMessage, ServerResponse } from 'http';

export interface RenderingPersonalizationDecision {
  variantKey? : string;
  errorMessage? : string;
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

export type DataFetcherResolver = <T>() => HttpDataFetcher<T>;

export type RestPersonalizationDecisionsServiceConfig = {
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

/**
 * note: encodeURIComponent is available via browser (window) or natively in node.js
 * if you use another js engine for server-side rendering you may not have native encodeURIComponent
 * and would then need to install a package for that functionality
 * @param {Object} params
 */
 function getQueryString(params: { [key: string]: unknown }) {
  return Object.keys(params)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k] as string)}`)
    .join('&');
}

class ResponseError extends Error {
  response: HttpResponse<unknown>;

  constructor(message: string, response: HttpResponse<unknown>) {
    super(message);

    Object.setPrototypeOf(this, ResponseError.prototype);
    this.response = response;
  }
}

 function checkStatus<T>(response: HttpResponse<T>) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new ResponseError(response.statusText, response);
  throw error;
}

function fetchData<T>(
  url: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any,
  fetcher: HttpDataFetcher<T>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: { [key: string]: any } = {}
) {
  const qs = getQueryString(params);
  const fetchUrl = url.indexOf('?') !== -1 ? `${url}&${qs}` : `${url}?${qs}`;

  return fetcher(fetchUrl, data)
    .then(checkStatus)
    .then((response) => {
      // axios auto-parses JSON responses, don't need to JSON.parse
      return response.data as T;
    });
}

export class RestPersonalizationDecisionsService implements PersonalizationDecisionsService {
  constructor(private serviceConfig: RestPersonalizationDecisionsServiceConfig) {}

   getPersonalizationDecisions(
    routePath: string,
    language: string,
    renderingIds: string[]
  ): Promise<PersonalizationDecisionData> {

    const fetcher = this.serviceConfig.dataFetcherResolver
      ? this.serviceConfig.dataFetcherResolver<PersonalizationDecisionData>()
      : this.getDefaultFetcher<PersonalizationDecisionData>();

    return fetchData<PersonalizationDecisionData>(this.serviceConfig.apiHost + 'sitecore/api/layout/personalization/decision', {
      routePath: routePath,
      language: language,
      renderingIds: renderingIds
    }, fetcher, {
      sc_apikey: this.serviceConfig.apiKey,
      sc_site: this.serviceConfig.siteName,
      tracking: this.serviceConfig.tracking ?? true,
    });
  }

  private getDefaultFetcher = <T>() => {
    const axiosFetcher = new AxiosDataFetcher();

    const fetcher = (url: string, data?: unknown) => {
      return axiosFetcher.fetch<T>(url, data);
    };

    return fetcher;
  };
}
