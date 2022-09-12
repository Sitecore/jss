import debug from '../debug';
import { HttpDataFetcher } from '../data-fetcher';
import { AxiosDataFetcher } from '../axios-fetcher';
import { isTimeoutError } from '../utils';

export const DEFAULT_CHANNEL = 'WEB';

/**
 * Object model of CDP execute experience result
 */
export type ExecuteExperienceResult = {
  /**
   * The identified variant
   */
  variantId?: string;
};

export type GenerateBrowserIdResult = {
  /**
   * The browser id
   */
  ref: string;
};

export type CdpServiceConfig = {
  /**
   * Your Sitecore CDP API endpoint
   */
  endpoint: string;
  /**
   * The client key to use for authentication
   */
  clientKey: string;
  /**
   * Your Sitecore CDP point of sale
   */
  pointOfSale: string;
  /**
   * The Sitecore CDP channel to use for events. Uses 'WEB' by default.
   */
  channel?: string;
  /**
   * Custom data fetcher resolver. Uses @see AxiosDataFetcher by default.
   */
  dataFetcherResolver?: DataFetcherResolver;
  /**
   * Timeout (ms) for CDP request. Default is 250.
   */
  timeout?: number;
};

export type DataFetcherConfig = {
  timeout: number;
  headers?: Record<string, string>;
};

/**
 * Data fetcher resolver in order to provide custom data fetcher
 */
export type DataFetcherResolver = <T>(config: DataFetcherConfig) => HttpDataFetcher<T>;

/**
 * Object model of Experience Context data
 */
export type ExperienceParams = {
  referrer: string;
  utm: {
    [key: string]: string | null;
    campaign: string | null;
    source: string | null;
    medium: string | null;
    content: string | null;
  };
};

export class CdpService {
  /**
   * @param {CdpServiceConfig} [config] CDP service config
   */
  private timeout: number;
  constructor(protected config: CdpServiceConfig) {
    this.timeout = config.timeout || 250;
  }

  /**
   * Executes targeted experience for a page and params to determine the variant to render.
   * @param {string} contentId the friendly content id of the page
   * @param {string} browserId the browser id
   * @param {string} userAgent the user agent
   * @param {ExperienceParams} params the experience params for the user
   * @returns {ExecuteExperienceResult} the execute experience result
   */
  async executeExperience(
    contentId: string,
    browserId: string,
    userAgent: string,
    params: ExperienceParams
  ): Promise<string | undefined> {
    const endpoint = this.getExecuteExperienceUrl();

    debug.personalize(
      'executing experience for %s %s %s %o',
      contentId,
      browserId,
      userAgent,
      params
    );

    const headers = { 'User-Agent': userAgent };
    const fetcher = this.getFetcher<ExecuteExperienceResult>(headers);

    try {
      const response = await fetcher(endpoint, {
        clientKey: this.config.clientKey,
        pointOfSale: this.config.pointOfSale,
        channel: this.config.channel ?? DEFAULT_CHANNEL,
        browserId,
        friendlyId: contentId,
        params,
      });
      response.data.variantId === '' && (response.data.variantId = undefined);
      return response.data.variantId || undefined;
    } catch (error) {
      if (isTimeoutError(error)) {
        return;
      }

      throw error;
    }
  }

  /**
   * Generates a new browser id
   * @returns {string} browser id
   */
  async generateBrowserId(): Promise<string | undefined> {
    const endpoint = this.getGenerateBrowserIdUrl();

    debug.personalize('generating browser id');

    const fetcher = this.getFetcher<GenerateBrowserIdResult>();

    try {
      const response = await fetcher(endpoint);

      return response.data.ref;
    } catch (error) {
      if (isTimeoutError(error)) {
        return;
      }

      throw error;
    }
  }

  /**
   * Get formatted URL for generateBrowserId call
   * @returns {string} formatted URL
   */
  protected getGenerateBrowserIdUrl() {
    return `${this.config.endpoint}/v1.2/browser/create.json?client_key=${this.config.clientKey}&message={}`;
  }

  /**
   * Get formatted URL for executeExperience call
   * @returns {string} formatted URL
   */
  protected getExecuteExperienceUrl() {
    return `${this.config.endpoint}/v2/callFlows`;
  }

  /**
   * Returns provided data fetcher otherwise default one
   * @param {Record<string, string>} [headers] Optional headers
   * @returns {HttpDataFetcher} data fetcher
   */
  protected getFetcher<Response>(headers?: Record<string, string>) {
    return this.config.dataFetcherResolver
      ? this.config.dataFetcherResolver<Response>({ timeout: this.timeout, headers })
      : this.getDefaultFetcher<Response>({ timeout: this.timeout, headers });
  }

  /**
   * Provides default @see AxiosDataFetcher data fetcher
   * @param {DataFetcherConfig} config
   * @returns default fetcher
   */
  protected getDefaultFetcher = <T>(config: DataFetcherConfig) => {
    const fetcher = new AxiosDataFetcher({
      debugger: debug.personalize,
      ...config,
    });
    return (url: string, data?: unknown) => fetcher.fetch<T>(url, data);
  };
}
