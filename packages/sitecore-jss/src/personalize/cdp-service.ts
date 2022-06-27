import debug from '../debug';
import { HttpDataFetcher, ResponseError } from '../data-fetcher';
import { AxiosDataFetcher } from '../axios-fetcher';
import { AxiosError } from 'axios';

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
   * Custom data fetcher resolver. Uses @see AxiosDataFetcher by default.
   */
  dataFetcherResolver?: DataFetcherResolver;
  /**
   * Timeout (ms) for CDP request. Default is 250.
   */
  timeout?: number;
};

/**
 * Data fetcher resolver in order to provide custom data fetcher
 */
export type DataFetcherResolver = <T>({ timeout }: { timeout: number }) => HttpDataFetcher<T>;

/**
 * Object model of Experience Context data
 */
export type ExperienceParams = {
  geo: {
    city: string | null;
    country: string | null;
    latitude: string | null;
    longitude: string | null;
    region: string | null;
  };
  referrer: string;
  ua: string | null;
  utm: {
    [key: string]: string | null;
    utm_campaign: string | null;
    utm_source: string | null;
    utm_medium: string | null;
    utm_content: string | null;
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
   * @param {ExperienceParams} params the experience params for the user
   * @param {string} browserId the browser id.
   * @returns {ExecuteExperienceResult} the execute experience result
   */
  async executeExperience(
    contentId: string,
    params: ExperienceParams,
    browserId: string
  ): Promise<string | undefined> {
    const endpoint = this.getExecuteExperienceUrl();

    debug.personalize('executing experience for %s %s %o', contentId, browserId, params);

    const fetcher = this.getFetcher<ExecuteExperienceResult>();

    try {
      const response = await fetcher(endpoint, {
        clientKey: this.config.clientKey,
        pointOfSale: this.config.pointOfSale,
        browserId,
        friendlyId: contentId,
        channel: 'WEB',
        params,
      });
      response.data.variantId === '' && (response.data.variantId = undefined);
      return response.data.variantId || undefined;
    } catch (error) {
      if (this.isTimeoutError(error)) {
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

    debug.personalize('generating browser id for %s', this.config.clientKey);

    const fetcher = this.getFetcher<GenerateBrowserIdResult>();

    try {
      const response = await fetcher(endpoint);

      return response.data.ref;
    } catch (error) {
      if (this.isTimeoutError(error)) {
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
   * Returns provided data fetcher otherwise default one
   * @returns {HttpDataFetcher} data fetcher
   */
  protected getFetcher<Response>() {
    return this.config.dataFetcherResolver
      ? this.config.dataFetcherResolver<Response>({ timeout: this.timeout })
      : this.getDefaultFetcher<Response>();
  }

  /**
   * Get formatted URL for executeExperience call
   * @returns {string} formatted URL
   */
  protected getExecuteExperienceUrl() {
    return `${this.config.endpoint}/v2/callFlows`;
  }

  /**
   * Provides default @see AxiosDataFetcher data fetcher
   * @returns default fetcher
   */
  protected getDefaultFetcher = <T>() => {
    const fetcher = new AxiosDataFetcher({
      debugger: debug.personalize,
      timeout: this.timeout,
    });
    return (url: string, data?: unknown) => fetcher.fetch<T>(url, data);
  };

  /**
   * Indicates whether the error is a timeout error
   * @param {unknown} error error
   * @returns {boolean} is timeout error
   */
  private isTimeoutError(error: unknown) {
    return (
      (error as AxiosError).code === '408' ||
      (error as AxiosError).code === 'ECONNABORTED' ||
      (error as AxiosError).code === 'ETIMEDOUT' ||
      (error as ResponseError).response?.status === 408 ||
      (error as Error).name === 'AbortError'
    );
  }
}
