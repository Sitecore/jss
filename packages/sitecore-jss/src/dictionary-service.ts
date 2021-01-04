import { AxiosResponse } from 'axios';
import mcache from 'memory-cache';
import { AxiosDataFetcher } from './data-fetcher';
import { DictionaryPhrases, DictionaryServiceData } from './dataModels';
import { HttpJsonFetcher } from './httpClientInterface';

export type DictionaryServiceConfig = {
  apiHost: string;
  apiKey: string;
  jssAppName: string;
  /**
   * Custom data fetcher
   * @see HttpJsonFetcher<T>
   */
  dataFetcher?: HttpJsonFetcher<DictionaryServiceData>;
  /**
   * Enable/disable caching mechanism
   * @default false
   */
  cacheEnabled?: boolean;
  /**
   * Cache timeout (ms)
   * @default 10000
   */
  cacheTimeout?: number;
};

export class DictionaryService {
  constructor(private dictionaryServiceConfig: DictionaryServiceConfig) {}

  /**
   * Fetch dictionary data
   * @param {string} language
   */
  async fetchDictionaryData(language: string): Promise<DictionaryPhrases> {
    const {
      dataFetcher,
      cacheTimeout = 10000,
      cacheEnabled = false,
    } = this.dictionaryServiceConfig;

    const fetcher = dataFetcher || this.getDefaultFetcher();

    const dictionaryServiceUrl = this.getUrl(language);

    if (cacheEnabled) {
      const cachedBody = mcache.get(dictionaryServiceUrl);

      if (cachedBody) {
        return cachedBody;
      }
    }

    const response = await fetcher(dictionaryServiceUrl);

    if (cacheEnabled) {
      mcache.put(dictionaryServiceUrl, response.data.phrases, cacheTimeout);
    }

    return response.data.phrases;
  }

  /**
   * Generate dictionary service url
   * @param {string} language
   */
  private getUrl(language: string) {
    const { apiHost, jssAppName, apiKey } = this.dictionaryServiceConfig;

    return `${apiHost}/sitecore/api/jss/dictionary/${jssAppName}/${language}?sc_apikey=${apiKey}`;
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
