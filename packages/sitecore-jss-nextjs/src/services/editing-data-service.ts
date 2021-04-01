import { AxiosDataFetcher } from '@sitecore-jss/sitecore-jss';
import { EditingData, EditingPreviewData } from '../sharedTypes/editing-data';
import { getJssEditingSecret } from '../utils';

export const QUERY_PARAM_EDITING_SECRET = 'secret';

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
   * @param {string} serverUrl The server url to use for subsequent data API requests
   * @returns {Promise} The {@link EditingPreviewData} containing the generated key and serverUrl to use for retrieval
   */
  async setEditingData(data: EditingData, serverUrl: string): Promise<EditingPreviewData> {
    const key = this.generateKey(data);
    const url = this.getUrl(serverUrl, key);

    return this.dataFetcher.put(url, data).then(() => {
      return {
        key,
        serverUrl,
      };
    });
  }

  /**
   * Retrieves Experience Editor payload data by key
   * @param {EditingPreviewData} previewData Editing preview data containing the key and serverUrl to use for retrieval
   * @returns {Promise} The {@link EditingData}
   */
  async getEditingData(previewData: EditingPreviewData): Promise<EditingData | undefined> {
    const url = this.getUrl(previewData.serverUrl, previewData.key);

    return this.dataFetcher.get<EditingData>(url).then((response: { data: EditingData }) => {
      return response.data;
    });
  }

  protected generateKey(data: EditingData): string {
    // Need more than just the item GUID since requests are made "live" during editing in EE.
    // The suffix code will produce a random 10 character alpha-numeric (a-z 0-9) sequence, which is URI-safe.
    // Example generated key: 52961eea-bafd-5287-a532-a72e36bd8a36-qkb4e3fv5x
    const suffix = Math.random()
      .toString(36)
      .substring(2, 12);
    return `${data.layoutData.sitecore.route?.itemId}-${suffix}`;
  }

  protected getUrl(serverUrl: string, key: string): string {
    // Example URL format:
    //  http://localhost:3000/api/editing/data/52961eea-bafd-5287-a532-a72e36bd8a36-qkb4e3fv5x?secret=1234secret
    const apiRoute = this.apiRoute?.replace('[key]', key);
    const url = new URL(apiRoute, serverUrl);
    url.searchParams.append(QUERY_PARAM_EDITING_SECRET, getJssEditingSecret());
    return url.toString();
  }
}

/** EditingDataService singleton (with default values) */
export const editingDataService = new EditingDataService();
