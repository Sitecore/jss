import mcache from 'memory-cache';

const DEFAULTS = Object.freeze({
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
 * Cache options (used by @see DictionaryService)
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
    this.options.cacheTimeout = this.options.cacheTimeout ?? DEFAULTS.cacheTimeout;

    if (this.options.cacheEnabled === undefined) {
      this.options.cacheEnabled = DEFAULTS.cacheEnabled;
    }
  }

  protected getCacheValue(key: string): DictionaryPhrases | null {
    return this.options.cacheEnabled ? (mcache.get(key) as DictionaryPhrases) : null;
  }

  protected setCacheValue(key: string, value: DictionaryPhrases): DictionaryPhrases {
    return this.options.cacheEnabled ? mcache.put(key, value, this.options.cacheTimeout) : value;
  }

  /**
   * Fetch dictionary data for a language.
   * @param {string} language
   */
  abstract fetchDictionaryData(language: string): Promise<DictionaryPhrases>;
}
