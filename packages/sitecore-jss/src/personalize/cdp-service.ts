import debug from '../debug';
import { DataFetcher } from '../data-fetcher';
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
   * Custom data fetcher. Uses AxiosDataFetcher by default.
   * @see DataFetcher
   * @see AxiosDataFetcher
   */
  dataFetcher?: DataFetcher;
};

export class CdpService {
  private dataFetcher: DataFetcher;

  /**
   * @param {CdpServiceConfig} [config] CDP service config
   */
  constructor(protected config: CdpServiceConfig) {
    this.dataFetcher = config?.dataFetcher ?? new AxiosDataFetcher({ debugger: debug.personalize });
  }

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

    const response = await this.dataFetcher.fetch<SegmentData>(endpoint, {
      clientKey: this.config.clientKey,
      browserId,
      params,
    });
    return response.data;
  }

  protected getSegmentsUrl(contentId: string) {
    return `${this.config.endpoint}/v2/callFlows/getSegments/${contentId}`;
  }
}
