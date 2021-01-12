import { AxiosResponse } from 'axios';
import NodeCache from 'node-cache';
import { AxiosDataFetcher } from './data-fetcher';
import { fetchData } from './dataApi';
import { DictionaryPhrases, DictionaryServiceData } from './dataModels';
import { HttpJsonFetcher } from './httpClientInterface';

export type DictionaryServiceConfig = {
  /**
   * Your Sitecore instance hostname that is the backend for JSS
   */
  apiHost: string;
  /**
   * The Sitecore SSC API key your app uses
   */
  apiKey: string;
  /**
   * The JSS application name
   */
  siteName: string;
  /**
   * Custom data fetcher
   * @see HttpJsonFetcher<T>
   */
  dataFetcher?: HttpJsonFetcher<DictionaryServiceData>;
  /**
   * Enable/disable caching mechanism
   * @default true
   */
  cacheEnabled?: boolean;
  /**
   * Cache timeout (sec)
   * @default 60
   */
  cacheTimeout?: number;
};

export class DictionaryService {
  dictionaryCache: NodeCache;
  STD_TTL = 60;

  constructor(private dictionaryServiceConfig: DictionaryServiceConfig) {
    this.dictionaryCache = new NodeCache({
      stdTTL: dictionaryServiceConfig.cacheTimeout || this.STD_TTL,
    });
  }

  /**
   * Fetch dictionary data
   * @param {string} language
   */
  async fetchDictionaryData(language: string): Promise<DictionaryPhrases> {
    const {
      dataFetcher,
      apiKey,
      cacheTimeout = this.STD_TTL,
      cacheEnabled = true,
    } = this.dictionaryServiceConfig;

    const fetcher = dataFetcher || this.getDefaultFetcher();

    const dictionaryServiceUrl = this.getUrl(language);

    if (cacheEnabled) {
      const cachedBody = this.dictionaryCache.get<DictionaryPhrases>(dictionaryServiceUrl);

      if (cachedBody) {
        return cachedBody;
      }
    }

    const response = await fetchData<DictionaryServiceData>(dictionaryServiceUrl, fetcher, {
      sc_apikey: apiKey,
    });

    if (cacheEnabled) {
      this.dictionaryCache.set(dictionaryServiceUrl, response.phrases, cacheTimeout);
    }

    return response.phrases;
  }

  /**
   * Generate dictionary service url
   * @param {string} language
   */
  private getUrl(language: string) {
    const { apiHost, siteName } = this.dictionaryServiceConfig;

    return `${apiHost}/sitecore/api/jss/dictionary/${siteName}/${language}`;
  }

  /**
   * Provides default @see AxiosDataFetcher data fetcher
   * @returns default fetcher
   */
  private getDefaultFetcher = () => {
    const axiosFetcher = new AxiosDataFetcher();

    const fetcher = (url: string): Promise<AxiosResponse<DictionaryServiceData>> =>
      axiosFetcher.fetch(url);

    return fetcher;
  };
}
