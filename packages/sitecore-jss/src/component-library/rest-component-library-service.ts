import { RestLayoutServiceConfig, RestLayoutService } from '../layout/rest-layout-service';
import { LayoutServiceData, EditMode } from '../layout/models';
import { IncomingMessage, ServerResponse } from 'http';
import { debug, fetchData } from '..';

export interface ComponentLibraryRequestParams {
  itemId: string;
  componentUid: string;
  language?: string;
  dataSourceId?: string;
  renderingId?: string;
  version?: string;
  editMode?: EditMode;
  siteName?: string;
  variant?: string;
}

/**
 * REST service that enables Component Library functioality
 * Makes a request to /sitecore/api/layout/component in 'library' mode in Pages.
 * Returns layoutData for one single rendered component
 */
export class RestComponentLibraryService extends RestLayoutService {
  constructor(private config: RestLayoutServiceConfig) {
    super(config);
  }

  fetchComponentData(
    params: ComponentLibraryRequestParams,
    req?: IncomingMessage,
    res?: ServerResponse
  ): Promise<LayoutServiceData> {
    params.siteName = params.siteName || this.config.siteName;
    const querystringParams = this.getComponentFetchParams(params);
    debug.layout(
      'fetching component with uid %s for %s %s %s',
      params.componentUid,
      params.itemId,
      params.language,
      params.siteName
    );
    const fetcher = this.getFetcher(req, res);

    const fetchUrl = this.resolveLayoutServiceUrl('component');

    return fetchData(fetchUrl, fetcher, querystringParams).catch((error) => {
      if (error.response?.status === 404) {
        return error.response.data;
      }

      throw error;
    });
  }

  protected getComponentFetchParams(params: ComponentLibraryRequestParams) {
    // exclude undefined params with this one simple trick
    return JSON.parse(
      JSON.stringify({
        sc_apikey: this.config.apiKey,
        item: params.itemId,
        uid: params.componentUid,
        dataSourceId: params.dataSourceId,
        renderingItemId: params.renderingId,
        version: params.version,
        sc_site: params.siteName,
        sc_lang: params.language || 'en',
        sc_mode: params.editMode,
        sc_variant: params.variant,
        tracking: this.config.tracking ?? true,
      })
    );
  }
}
