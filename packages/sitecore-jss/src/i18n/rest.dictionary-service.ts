import { AxiosDataFetcher } from '../axios-fetcher';
import { fetchData } from '../data-api';
import { HttpDataFetcher } from '../data-fetcher';
import { DictionaryPhrases, DictionaryServiceBase, CacheOptions } from './dictionary-service';

/**
 * A reply from the REST Sitecore Dictionary Service
 */
export type RestDictionaryServiceData = {
  phrases: DictionaryPhrases;
};

export type RestDictionaryServiceConfig = CacheOptions & {
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
   * @see HttpDataFetcher<T>
   */
  dataFetcher?: HttpDataFetcher<RestDictionaryServiceData>;
};

/**
 * Fetch dictionary data using the Sitecore Dictionary Service REST API.
 * Uses Axios as the default data fetcher (@see AxiosDataFetcher).
 */
export class RestDictionaryService extends DictionaryServiceBase {
  /**
   * Provides default @see AxiosDataFetcher data fetcher
   */
  get defaultFetcher(): HttpDataFetcher<RestDictionaryServiceData> {
    const dataFetcher = new AxiosDataFetcher();
    return (url: string) => dataFetcher.fetch<RestDictionaryServiceData>(url);
  }

  constructor(public options: RestDictionaryServiceConfig) {
    super(options);
  }

  /**
   * Fetch dictionary data for a language.
   * @param {string} language
   */
  async fetchDictionaryData(language: string): Promise<DictionaryPhrases> {
    const endpoint = this.getUrl(language);
    const cachedValue = this.getCachedValue(endpoint);
    if (cachedValue) {
      return cachedValue;
    }

    const fetcher = this.options.dataFetcher || this.defaultFetcher;
    const response = await fetchData<RestDictionaryServiceData>(endpoint, fetcher, {
      sc_apikey: this.options.apiKey,
    });

    return this.cacheValue(endpoint, response.phrases);
  }

  /**
   * Generate dictionary service url
   * @param {string} language
   */
  private getUrl(language: string) {
    return `${this.options.apiHost}/sitecore/api/jss/dictionary/${this.options.siteName}/${language}`;
  }
}
