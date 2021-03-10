import mcache from 'memory-cache';
import { AxiosDataFetcher } from './data-fetcher';
import { fetchData } from './data-api';
import { DictionaryPhrases, DictionaryServiceData } from './data-models';
import { HttpJsonFetcher } from './http-request-client';

export interface DictionaryService {
  /**
   * Fetch dictionary data for a language.
   * @param {string} language
   */
  fetchDictionaryData(language: string): Promise<DictionaryPhrases>;
}

export type DictionaryServiceConfig = {
  /**
   * Gets the endpoint URL for the dictionary service for the specified language.
   * @param language - The language of the current app context.
   * @returns the endpoint URL for the dictionary service
   */
  getUrl(language: string): string;
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

/**
 * Fetch dictionary data using the Sitecore Dictionary Service REST API.
 * Uses Axios as the default data fetcher (@see AxiosDataFetcher).
 */
export class RestDictionaryService implements DictionaryService {
  STD_TTL = 60;

  constructor(private dictionaryServiceConfig: DictionaryServiceConfig) { }

  /**
   * Fetch dictionary data for a language.
   * @param {string} language
   */
  async fetchDictionaryData(language: string): Promise<DictionaryPhrases> {
    const {
      getUrl,
      dataFetcher,
      cacheTimeout = this.STD_TTL,
      cacheEnabled = true,
    } = this.dictionaryServiceConfig;

    const fetcher = dataFetcher || this.getDefaultFetcher();

    const dictionaryServiceUrl = getUrl(language);

    if (cacheEnabled) {
      const cachedBody = mcache.get(dictionaryServiceUrl) as DictionaryPhrases;

      if (cachedBody) {
        return cachedBody;
      }
    }

    const response = await fetchData<DictionaryServiceData>(dictionaryServiceUrl, fetcher);

    if (cacheEnabled) {
      mcache.put(dictionaryServiceUrl, response.phrases, cacheTimeout);
    }

    return response.phrases;
  }

  /**
   * Provides default @see AxiosDataFetcher data fetcher
   * @returns default fetcher
   */
  private getDefaultFetcher = () => {
    const axiosFetcher = new AxiosDataFetcher();

    const fetcher = (url: string) => axiosFetcher.fetch<DictionaryServiceData>(url);

    return fetcher;
  };
}
