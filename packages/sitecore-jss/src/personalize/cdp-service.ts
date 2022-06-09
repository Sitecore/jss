import debug from '../debug';
import { HttpDataFetcher } from '../data-fetcher';
import { AxiosDataFetcher } from '../axios-fetcher';

/**
 * Object model of CDP variant data
 */
export type VariantData = {
  /**
   * The identified variant
   */
  variantId?: string;
  /**
   * The browser id
   */
  browserId?: string;
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
};

/**
 * Data fetcher resolver in order to provide custom data fetcher
 */
export type DataFetcherResolver = <T>() => HttpDataFetcher<T>;

/**
 * Object model of Experience Context data
 */
export type ExperienceContext = {
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
  constructor(protected config: CdpServiceConfig) {}

  /**
   * Executes targeted experience for a page and context to determine the variant to render.
   * @param {string} contentId the friendly content id of the page
   * @param {ExperienceContext} context the experience context for the user
   * @param {string} [browserId] the browser id. If omitted, a browserId will be created and returned in the response.
   * @returns {VariantData} the variant data
   */
  async executeExperience(
    contentId: string,
    context: ExperienceContext,
    browserId = ''
  ): Promise<VariantData> {
    const endpoint = this.getExecuteExperienceUrl(contentId);

    debug.personalize('executing experience for %s %s %o', contentId, browserId, context);

    const fetcher = this.config.dataFetcherResolver
      ? this.config.dataFetcherResolver<VariantData>()
      : this.getDefaultFetcher<VariantData>();
    const response = await fetcher(endpoint, {
      clientKey: this.config.clientKey,
      pointOfSale: this.config.pointOfSale,
      browserId,
      context,
    });
    return {
      variantId: response.data.variantId || undefined, // coerce empty strings to undefined
      browserId: response.data.browserId || undefined,
    };
  }

  /**
   * Get formatted URL for executeExperience call
   * @param {string} contentId friendly content id
   * @returns {string} formatted URL
   */
  protected getExecuteExperienceUrl(contentId: string) {
    return `${this.config.endpoint}/v2/callFlows/getAudience/${contentId}`;
  }

  /**
   * Provides default @see AxiosDataFetcher data fetcher
   * @returns default fetcher
   */
  protected getDefaultFetcher = <T>() => {
    const fetcher = new AxiosDataFetcher({
      debugger: debug.personalize,
    });
    return (url: string, data?: unknown) => fetcher.fetch<T>(url, data);
  };
}
