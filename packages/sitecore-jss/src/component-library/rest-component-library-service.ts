import { RestLayoutServiceConfig, RestLayoutService } from '../layout/rest-layout-service';
import { LayoutServiceData, EditMode } from '../layout/models';
import { IncomingMessage, ServerResponse } from 'http';
import { debug, fetchData } from '..';

/**
 * Params for requesting component data from service in Component Library mode
 */
export interface ComponentLibraryRequestParams {
  /**
   * Item id to be used as context for rendering the component
   */
  itemId: string;
  /**
   * Component identifier. Can be either taken from item's layout details or
   * an arbitrary one (component renderingId and datasource would be used for identification then)
   */
  componentUid: string;
  /**
   * language to render component in
   */
  language?: string;
  /**
   * optional component datasource
   */
  dataSourceId?: string;
  /**
   * ID of the component definition rendering item in Sitecore
   */
  renderingId?: string;
  /**
   * version of the context item (latest by default)
   */
  version?: string;
  /**
   * edit mode (edit, preview) to be rendered component in. Component is rendered in normal mode by default
   */
  editMode?: EditMode;
  /**
   * site name to be used as context for rendering the component
   */
  siteName?: string;
  /**
   * variant to be rendered for component if set (works with rendering existing component)
   */
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
      })
    );
  }
}
