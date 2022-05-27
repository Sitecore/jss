import debug from '../debug';
import { HttpDataFetcher } from '../data-fetcher';
import { AxiosDataFetcher } from '../axios-fetcher';

/**
 * Object model of CDP segment data
 */
export type SegmentData = {
  /**
   * The identified segments
   */
  segments: string[];
  /**
   * The browser id
   */
  browserId?: string;
};

export type CdpServiceConfig = {
  /**
   * Your CDP API endpoint
   */
  endpoint: string;
  /**
   * The client key to use for authentication
   */
  clientKey: string;
  /**
   * Custom data fetcher resolver. Uses @see AxiosDataFetcher by default.
   */
  dataFetcherResolver?: DataFetcherResolver;
};

/**
 * Data fetcher resolver in order to provide custom data fetcher
 */
export type DataFetcherResolver = <T>() => HttpDataFetcher<T>;

export class CdpService {
  /**
   * @param {CdpServiceConfig} [config] CDP service config
   */
  constructor(protected config: CdpServiceConfig) {}

  /**
   * Returns a list of segments to determine which variant of a page to render.
   * @param {string} contentId the friendly content id
   * @param {string} [browserId] the browser id. If omitted, a browserId will be created and returned in the response.
   * @returns {SegmentData} the segment data
   */
  async getSegments(contentId: string, browserId = ''): Promise<SegmentData> {
    const endpoint = this.getSegmentsUrl(contentId);
    // TODO: params (TBD)
    const params = {};

    debug.personalize('fetching segment data for %s %s %o', contentId, browserId, params);

    const fetcher = this.config.dataFetcherResolver
      ? this.config.dataFetcherResolver<SegmentData>()
      : this.getDefaultFetcher<SegmentData>();
    const response = await fetcher(endpoint, {
      clientKey: this.config.clientKey,
      browserId,
      params,
    });
    return response.data;
  }

  /**
   * Get formatted URL for getSegments call
   * @param {string} contentId friendly content id
   * @returns {string} formatted URL
   */
  protected getSegmentsUrl(contentId: string) {
    return `${this.config.endpoint}/v2/callFlows/getSegments/${contentId}`;
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
