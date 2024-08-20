import { QUERY_PARAM_EDITING_SECRET } from './constants';
import { AxiosDataFetcher, debug } from '@sitecore-jss/sitecore-jss';
import { EditingData } from './editing-data';
import { EditingDataCache, editingDataDiskCache } from './editing-data-cache';
import { getJssEditingSecret } from '../utils/utils';
import { PreviewData } from 'next';

/**
 * Data for Next.js Preview (Editing) mode
 * Used in Chromes Edit Mode only
 */
export interface EditingPreviewData {
  key: string;
  serverUrl?: string;
  params?: { [key: string]: string };
}

/**
 * Defines an editing data service implementation
 */
export interface EditingDataService {
  /**
   * Stores Sitecore editor payload data for later retrieval
   * @param {EditingData} data Editing data
   * @param {string} serverUrl The server url e.g. which can be used for further API requests
   * @returns The {@link EditingPreviewData} containing the information to use for retrieval
   */
  setEditingData(
    data: EditingData,
    serverUrl: string,
    params?: { [key: string]: string }
  ): Promise<EditingPreviewData>;
  /**
   * Retrieves Sitecore editor payload data
   * @param {PreviewData} previewData Editing preview data containing the information to use for retrieval
   * @returns The {@link EditingData}
   */
  getEditingData(previewData: PreviewData): Promise<EditingData | undefined>;
}

/**
 * Unique key generator.
 * Need more than just the item GUID since requests are made "live" during editing in EE.
 * The suffix code will produce a random 10 character alpha-numeric (a-z 0-9) sequence, which is URI-safe.
 * Example generated key: 52961eea-bafd-5287-a532-a72e36bd8a36-qkb4e3fv5x
 * @param {EditingData} data The editing data
 * @returns {string} The unique key
 */
export const generateKey = (data: EditingData): string => {
  const suffix = Math.random()
    .toString(36)
    .substring(2, 12);
  return `${data.layoutData.sitecore.route?.itemId}-${suffix}`;
};

export interface BasicEditingDataServiceConfig {
  /**
   * An instance of the `EditingDataCache` implementation to use.
   * By default, this is `editingDataDiskCache` (an `EditingDataDiskCache` singleton).
   * @default editingDataDiskCache
   * @see EditingDataCache
   * @see EditingDataDiskCache
   */
  editingDataCache?: EditingDataCache;
}

/**
 * Service responsible for maintaining Sitecore editor data between requests
 * on self-hosted deployment architectures.
 * Utilizes a cache for storage and retrieval of editing data.
 */
export class BasicEditingDataService implements EditingDataService {
  protected generateKey = generateKey;
  private editingDataCache: EditingDataCache;

  /**
   * @param {BasicEditingDataServiceConfig} [config] Editing data service config
   */
  constructor(config?: BasicEditingDataServiceConfig) {
    this.editingDataCache = config?.editingDataCache ?? editingDataDiskCache;
  }

  /**
   * Stores Sitecore editor payload data for later retrieval by key
   * @param {EditingData} data Editing data
   * @returns {Promise} The {@link EditingPreviewData} containing the generated key to use for retrieval
   */
  async setEditingData(data: EditingData): Promise<EditingPreviewData> {
    const key = this.generateKey(data);

    const previewData = {
      key,
    } as EditingPreviewData;

    debug.editing('storing editing data for %o: %o', previewData, data);
    await this.editingDataCache.set(key, data);
    return { key };
  }

  /**
   * Retrieves Sitecore editor payload data by key
   * @param {PreviewData} previewData Editing preview data containing the key to use for retrieval
   * @returns {Promise} The {@link EditingData}
   */
  async getEditingData(previewData: PreviewData): Promise<EditingData | undefined> {
    const editingPreviewData = previewData as EditingPreviewData;

    debug.editing('retrieving editing data for %o', previewData);
    return await this.editingDataCache.get(editingPreviewData.key);
  }
}

export interface ServerlessEditingDataServiceConfig {
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
 * Service responsible for maintaining Sitecore editor data between requests
 * on serverless deployment architectures (e.g. Vercel).
 * Utilizes another Next.js API route ('/api/editing/data/[key]') for storage and retrieval of editing data.
 */
export class ServerlessEditingDataService implements EditingDataService {
  protected generateKey = generateKey;
  private apiRoute: string;
  private dataFetcher: AxiosDataFetcher;

  /**
   * @param {ServerlessEditingDataServiceConfig} [config] Editing data service config
   */
  constructor(config?: ServerlessEditingDataServiceConfig) {
    this.apiRoute = config?.apiRoute ?? '/api/editing/data/[key]';
    if (!this.apiRoute.includes('[key]')) {
      throw new Error(`The specified apiRoute '${this.apiRoute}' is missing '[key]'.`);
    }
    this.dataFetcher = config?.dataFetcher ?? new AxiosDataFetcher({ debugger: debug.editing });
  }

  /**
   * Stores Sitecore editor payload data for later retrieval by key
   * @param {EditingData} data Editing data
   * @param {string} serverUrl The server url to use for subsequent data API requests
   * @returns {Promise} The {@link EditingPreviewData} containing the generated key and serverUrl to use for retrieval
   */
  async setEditingData(
    data: EditingData,
    serverUrl: string,
    params?: { [key: string]: string }
  ): Promise<EditingPreviewData> {
    const key = this.generateKey(data);
    const url = this.getUrl(serverUrl, key, params);

    const previewData = {
      key,
      serverUrl,
      params,
    } as EditingPreviewData;

    debug.editing('storing editing data for %o: %o', previewData, data);
    return this.dataFetcher.put(url, data).then(() => {
      return previewData;
    });
  }

  /**
   * Retrieves Sitecore editor payload data by key
   * @param {PreviewData} previewData Editing preview data containing the key and serverUrl to use for retrieval
   * @returns {Promise} The {@link EditingData}
   */
  async getEditingData(previewData: PreviewData): Promise<EditingData | undefined> {
    const editingPreviewData = previewData as EditingPreviewData;
    if (!editingPreviewData?.serverUrl) {
      return undefined;
    }
    const url = this.getUrl(
      editingPreviewData.serverUrl,
      editingPreviewData.key,
      editingPreviewData.params
    );

    debug.editing('retrieving editing data for %o', previewData);
    return this.dataFetcher.get<EditingData>(url).then((response: { data: EditingData }) => {
      return response.data;
    });
  }

  protected getUrl(serverUrl: string, key: string, params?: { [key: string]: string }): string {
    // Example URL format:
    //  http://localhost:3000/api/editing/data/52961eea-bafd-5287-a532-a72e36bd8a36-qkb4e3fv5x?secret=1234secret
    const apiRoute = this.apiRoute?.replace('[key]', key);
    const url = new URL(apiRoute, serverUrl);
    url.searchParams.append(QUERY_PARAM_EDITING_SECRET, getJssEditingSecret());
    if (params) {
      for (const key in params) {
        if ({}.hasOwnProperty.call(params, key)) {
          url.searchParams.append(key, params[key]);
        }
      }
    }
    return url.toString();
  }
}

/**
 * The `EditingDataService` default instance.
 * This will be `ServerlessEditingDataService` on Vercel, `BasicEditingDataService` otherwise.
 *
 * For information about the VERCEL environment variable, see
 * https://vercel.com/docs/environment-variables#system-environment-variables
 */
export const editingDataService = process.env.VERCEL
  ? new ServerlessEditingDataService()
  : new BasicEditingDataService();
