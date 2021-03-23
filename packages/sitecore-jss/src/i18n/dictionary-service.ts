import mcache from 'memory-cache';

const defaults = Object.freeze({
  cacheTimeout: 60,
  cacheEnabled: true,
});

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

    if (this.options.cacheEnabled === undefined) {
      this.options.cacheEnabled = defaults.cacheEnabled;
    }
  }

  protected getCachedValue(key: string): DictionaryPhrases | null {
    return this.options.cacheEnabled ? (mcache.get(key) as DictionaryPhrases) : null;
  }

  protected cacheValue(key: string, value: DictionaryPhrases): DictionaryPhrases {
    return this.options.cacheEnabled ? mcache.put(key, value, this.options.cacheTimeout) : value;
  }

  /**
   * Fetch dictionary data for a language.
   * @param {string} language
   */
  abstract fetchDictionaryData(language: string): Promise<DictionaryPhrases>;
}
