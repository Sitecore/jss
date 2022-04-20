import debug, { Debugger } from '../debug';

export type SegmentData = {
  segments: string[];
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
   * Override fetch method. Uses native fetch by default.
   */
  fetch?: typeof fetch;
};

export class CdpService {
  constructor(protected config: CdpServiceConfig) {}

  /**
   * Returns a list of segments to determine which variant of a page to render.
   * @param {string} contentId the friendly content id
   * @param {string} [browserId] the browser id. If omitted, a browserId will be created and returned in the response.
   * @returns {SegmentData} the segment data
   */
  async getSegments(contentId: string, browserId = ''): Promise<SegmentData> {
    const endpoint = this.getSegmentsUrl(contentId);
    const payload = { clientKey: this.config.clientKey, browserId };

    debug.personalize('fetching segment data for %s %s', contentId, browserId);

    const request = new Request(endpoint, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const response = await this.doFetch(request, {
      fetch: this.config.fetch,
      debugger: debug.personalize,
    });
    const data = await response.json();

    return {
      segments: data?.segments || [],
      browserId: data?.browserId,
    };
  }

  // TODO: move this out to shared fetch wrapper??
  //  the main goal here is to provide consistent debug logging and error handling
  //  as we do in AxiosDataFetcher and GraphQLRequestClient
  protected async doFetch(
    request: Request,
    options?: { fetch?: typeof fetch; debugger?: Debugger }
  ): Promise<Response> {
    const fetchImpl = options?.fetch || fetch;
    const debugImpl = options?.debugger || debug.http;

    debugImpl('request: %o', request);
    const response = await fetchImpl(request).catch((error) => {
      debugImpl('request error: %o', error);
      throw error;
    });
    debugImpl('response: %o', response);
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status} ${response.statusText}`);
    }
    return response;
  }

  protected getSegmentsUrl(contentId: string) {
    return `${this.config.endpoint}/callFlows/getSegments/${contentId}`;
  }
}
