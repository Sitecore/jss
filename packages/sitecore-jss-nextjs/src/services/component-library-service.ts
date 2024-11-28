import {
  LayoutServiceData,
  RestLayoutServiceConfig,
  RestLayoutService,
  EditMode,
} from '@sitecore-jss/sitecore-jss/layout';
import { IncomingMessage, ServerResponse } from 'http';
import { debug, fetchData } from '@sitecore-jss/sitecore-jss';

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

// REST
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
    const fetcher = this.config.dataFetcherResolver
      ? this.config.dataFetcherResolver<LayoutServiceData>(req, res)
      : this.getDefaultFetcher<LayoutServiceData>(req, res);

    const fetchUrl = this.resolveLayoutServiceUrl('component');

    return fetchData(fetchUrl, fetcher, querystringParams).catch((error) => {
      if (error.response?.status === 404) {
        // Aligned with response of GraphQL Layout Service in case if layout is not found.
        // When 404 Rest Layout Service returns
        // {
        //   sitecore: {
        //     context: {
        //       pageEditing: false,
        //       language
        //     },
        //     route: null
        //   },
        // }
        //
        return error.response.data;
      }

      throw error;
    });
  }

  protected getComponentFetchParams(params: ComponentLibraryRequestParams) {
    // exclude undefined params
    return JSON.parse(
      JSON.stringify({
        sc_apikey: this.config.apiKey,
        item: params.itemId,
        uid: params.componentUid,
        dataSourceId: params.dataSourceId,
        renderingItemId: params.renderingId,
        version: params.version,
        sc_site: params.siteName,
        sc_lang: params.language || '',
        sc_mode: params.editMode,
        sc_variant: params.variant,
        tracking: this.config.tracking ?? true,
      })
    );
  }
}
