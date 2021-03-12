import mcache from 'memory-cache';

const defaults = {
  cacheTimeout: 60
};

/**
 * Phrases from the Sitecore Dictionary Service
 */
export interface DictionaryPhrases {
  [k: string]: string;
}

/**
 * Cache options for dictionary data services
 */
export interface CacheOptions {
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
}

/**
 * Dictionary data fetching service
 */
export interface DictionaryService {
  /**
   * Fetch dictionary data for a language.
   * @param {string} language
   */
  fetchDictionaryData(language: string): Promise<DictionaryPhrases>;
}

export abstract class DictionaryServiceBase implements DictionaryService {
  constructor(public options: CacheOptions) {
    this.options.cacheTimeout = this.options.cacheTimeout ?? defaults.cacheTimeout;
    this.options.cacheEnabled = this.options.cacheEnabled === true;
  }

  /**
   * Fetch dictionary data for a language.
   * @param {string} language
   */
  abstract fetchDictionaryData(language: string): Promise<DictionaryPhrases>;

  protected getCachedValue(key: string): DictionaryPhrases | null {
    return this.options.cacheEnabled
      ? mcache.get(key) as DictionaryPhrases
      : null;
  }

  protected cacheValue(key: string, value: DictionaryPhrases): DictionaryPhrases {
    return this.options.cacheEnabled
      ? mcache.put(key, value, this.options.cacheTimeout)
      : value;
  }
}
