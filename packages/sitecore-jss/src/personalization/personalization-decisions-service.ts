import { AxiosDataFetcher } from './../axios-fetcher';
import { fetchData, HttpDataFetcher } from './../data-fetcher';
import debug from '../debug';
import { extractQueryStringParams } from '../utils/extract-querystring-params';

export interface RenderingPersonalizationDecision {
  /**
   * The unique key of the variant of personalized component layout
   */
  variantKey?: string | null;
  /**
   * The message for identification the error occurred during decision making
   */
  errorMessage?: string;
}

export interface DecisionsContext {
  /**
   * The route path
   */
  routePath: string;
  /**
   * The language
   */
  language: string;
  /**
   * The unique identifiers of the personalizable renderings to get layout for
   */
  renderingIds: string[];
  /**
   * The unique identifier of the device layout
   */
  layoutDeviceId: string;
}

export interface PersonalizationDecisionData {
  /**
   * The personalization decisions for each personalizable rendering
   */
  renderings: {
    [renderingId: string]: RenderingPersonalizationDecision;
  };
}

export type PersonalizationDecisionsServiceConfig = {
  /**
   * Absolute or relative URL of decision service. Default: /sitecore/api/layout/personalization/decision
   */
  endpoint?: string;
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
  currentPageParamsToExtract?: string[];
  /**
   * Enables/disables analytics tracking for the Layout Service invocation (default is true).
   * More than likely, this would be set to false for SSG/hybrid implementations, and the
   * JSS tracker would instead be used on the client-side: {@link https://jss.sitecore.com/docs/fundamentals/services/tracking}
   * @default true
   */
  isTrackingEnabled?: boolean;
  /**
   * The request timeout in milliseconds
   */
  timeout?: number;
  /**
   * The fetcher that performs the HTTP request and returns a promise to JSON
   */
  fetcher?: HttpDataFetcher<PersonalizationDecisionData>;
};

/**
 * Fetches personalization decisions using the Sitecore REST API.
 * Uses Axios as the default data fetcher (@see AxiosDataFetcher).
 */
export class PersonalizationDecisionsService {
  protected readonly fetcher: HttpDataFetcher<PersonalizationDecisionData>;

  constructor(protected serviceConfig: PersonalizationDecisionsServiceConfig) {
    if (this.serviceConfig.fetcher) {
      this.fetcher = this.serviceConfig.fetcher;
    } else {
      const axiosFetcher = new AxiosDataFetcher({
        timeout: this.serviceConfig.timeout,
        debugger: debug.personalizationDecisions,
      });
      this.fetcher = (url: string, data?: unknown) =>
        axiosFetcher.fetch<PersonalizationDecisionData>(url, data);
    }
  }

  /**
   * Provides a value that indicates whether tracking is enabled.
   * @returns {boolean} The value that indicates whether tracking is enabled.
   */
  isTrackingEnabled(): boolean {
    return this.serviceConfig.isTrackingEnabled ?? true;
  }

  /**
   * Gets personalization decisions.
   * @param {DecisionsContext} context The decisions context
   * @returns {Promise<PersonalizationDecisionData>} The personalization decision data
   */
  getPersonalizationDecisions(context: DecisionsContext): Promise<PersonalizationDecisionData> {
    const queryParams = {
      sc_apikey: this.serviceConfig.apiKey,
      sc_site: this.serviceConfig.siteName,
      tracking: this.isTrackingEnabled(),
    };
    if (this.serviceConfig.currentPageParamsToExtract) {
      Object.assign(
        queryParams,
        extractQueryStringParams(
          window.location.search,
          this.serviceConfig.currentPageParamsToExtract
        )
      );
    }
    const requestBody = {
      routePath: context.routePath,
      language: context.language,
      renderingIds: context.renderingIds,
      referrer: window.document.referrer,
      url: window.location.pathname + window.location.search,
      layoutDeviceId: context.layoutDeviceId,
    };

    debug.personalizationDecisions(
      'fetching personalization decisions for %o %o',
      queryParams,
      requestBody
    );

    return fetchData<PersonalizationDecisionData>(
      this.getUrl(),
      this.fetcher,
      queryParams,
      requestBody
    );
  }

  /**
   * Generate URL of decision service
   */
  protected getUrl(): string {
    return this.serviceConfig.endpoint ?? '/sitecore/api/layout/personalization/decision';
  }
}
