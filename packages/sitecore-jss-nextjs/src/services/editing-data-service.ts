import { AxiosDataFetcher } from '@sitecore-jss/sitecore-jss';
import { EditingData, EditingPreviewData } from '../sharedTypes/editing-data';
import { getPublicUrl, getSitecoreSecurityToken } from '../utils';

export const QUERY_PARAM_SECURITY_TOKEN = 'token';

export interface EditingDataServiceConfig {
  /**
   * The Next.js API route to invoke.
   * This should be a URL path and include the '[key]' placeholder, which will be replaced with the actual data key.
   * This endpoint should run the `EditingDataMiddleware`.
   * @default '/api/editing/data/[key]'
   * @see EditingDataMiddleware
   */
  apiRoute?: string;
  /**
   * The `AxiosDataFetcher` instance to use for API requests.
   * @default new AxiosDataFetcher()
   * @see AxiosDataFetcher
   */
  dataFetcher?: AxiosDataFetcher;
}

/**
 * Service responsible for maintaining Sitecore Experience Editor data between requests
 */
export class EditingDataService {
  private apiRoute: string;
  private dataFetcher: AxiosDataFetcher;

  /**
   * @param {EditingDataServiceConfig} [config] Editing data service config
   */
  constructor(config?: EditingDataServiceConfig) {
    this.apiRoute = config?.apiRoute ?? '/api/editing/data/[key]';
    if (!this.apiRoute.includes('[key]')) {
      throw new Error(`The specified apiRoute '${this.apiRoute}' is missing '[key]'.`);
    }
    this.dataFetcher = config?.dataFetcher ?? new AxiosDataFetcher();
  }

  /**
   * Stores Experience Editor payload data for later retrieval by key
   * @param {EditingData} data Editing data
   * @returns {Promise} The {@link EditingPreviewData} containing the generated key
   */
  async setEditingData(data: EditingData): Promise<EditingPreviewData> {
    const key = this.generateKey(data);
    const url = this.getUrl(key);

    return this.dataFetcher.put(url, data).then(() => {
      return { key };
    });
  }

  /**
   * Retrieves Experience Editor payload data by key
   * @param {EditingPreviewData} previewData Editing preview data containing the key
   * @returns {Promise} The {@link EditingData}
   */
  async getEditingData(previewData: EditingPreviewData): Promise<EditingData | undefined> {
    const url = this.getUrl(previewData.key);

    return this.dataFetcher.get<EditingData>(url).then((response) => {
      return response.data;
    });
  }

  protected generateKey(data: EditingData): string {
    // Need more than just the item GUID since requests are made "live" during editing in EE.
    // eslint-disable-next-line prettier/prettier
    const suffix = Math.random().toString(36).substring(2, 15);
    return `${data.layoutData.sitecore.route.itemId}-${suffix}`;
  }

  protected getUrl(key: string): string {
    // Example URL format:
    //  http://localhost:3000/api/editing/data/1234key?token=1234token
    const publicUrl = getPublicUrl();
    const apiRoute = this.apiRoute?.replace('[key]', key);
    const url = new URL(apiRoute, publicUrl);
    url.searchParams.append(QUERY_PARAM_SECURITY_TOKEN, getSitecoreSecurityToken());
    return url.toString();
  }
}

/** EditingDataService singleton (with default values) */
export const editingDataService = new EditingDataService();
