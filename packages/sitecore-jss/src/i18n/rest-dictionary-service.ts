import { AxiosDataFetcher } from '../axios-fetcher';
import { HttpDataFetcher, fetchData } from '../data-fetcher';
import { DictionaryPhrases, DictionaryServiceBase } from './dictionary-service';
import { CacheOptions } from '../cache-client';
import debug from '../debug';

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
 * @augments DictionaryServiceBase
 */
export class RestDictionaryService extends DictionaryServiceBase {
  /**
   * Provides default @see AxiosDataFetcher data fetcher
   */
  get defaultFetcher(): HttpDataFetcher<RestDictionaryServiceData> {
    const dataFetcher = new AxiosDataFetcher({
      debugger: debug.dictionary,
      // CORS issue: Sitecore provides 'Access-Control-Allow-Origin' as wildcard '*', so we can't include credentials for the dictionary service
      withCredentials: false,
    });
    return (url: string) => dataFetcher.fetch<RestDictionaryServiceData>(url);
  }

  constructor(public options: RestDictionaryServiceConfig) {
    super(options);
  }

  /**
   * Fetch dictionary data for a language.
   * @param {string} language the language to be used to fetch the dictionary
   * @returns {Promise<DictionaryPhrases>} dictionary phrases
   */
  async fetchDictionaryData(language: string): Promise<DictionaryPhrases> {
    const endpoint = this.getUrl(language);
    const cachedValue = this.getCacheValue(endpoint);
    if (cachedValue) {
      debug.dictionary('using cached dictionary data for %s %s', language, this.options.siteName);
      return cachedValue;
    }

    debug.dictionary('fetching dictionary data for %s %s', language, this.options.siteName);
    const fetcher = this.options.dataFetcher || this.defaultFetcher;
    const response = await fetchData<RestDictionaryServiceData>(endpoint, fetcher, {
      sc_apikey: this.options.apiKey,
    });

    return this.setCacheValue(endpoint, response.phrases);
  }

  /**
   * Generate dictionary service url
   * @param {string} language the language to be used to fetch the dictionary
   * @returns {string} dictionary service url
   */
  protected getUrl(language: string): string {
    return `${this.options.apiHost}/sitecore/api/jss/dictionary/${this.options.siteName}/${language}`;
  }
}
