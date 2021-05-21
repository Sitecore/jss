import { CacheClient, CacheOptions, MemoryCacheClient } from '../cache-client';

/**
 * Object model for Sitecore dictionary phrases
 */
export interface DictionaryPhrases {
  [k: string]: string;
}

/**
 * Service that fetches dictionary data using Sitecore's GraphQL API.
 */
export interface DictionaryService {
  /**
   * Fetch dictionary data for a language.
   * @param {string} language
   */
  fetchDictionaryData(language: string): Promise<DictionaryPhrases>;
}

/**
 * Base implementation of @see DictionaryService that handles caching dictionary values
 */
export abstract class DictionaryServiceBase
  implements DictionaryService, CacheClient<DictionaryPhrases> {
  private cache: CacheClient<DictionaryPhrases>;

  /**
   * Initializes a new instance of @see DictionaryService using the provided @see CacheOptions
   * @param {CacheOptions} options Configuration options
   */
  constructor(public options: CacheOptions) {
    this.cache = this.getCacheClient();
  }

  /**
   * Caches a @see DictionaryPhrases value for the specified cache key.
   * @param {string} key The cache key.
   * @param {DictionaryPhrases} value The value to cache.
   * @returns The value added to the cache.
   * @mixes CacheClient<DictionaryPhrases>
   */
  setCacheValue(key: string, value: DictionaryPhrases): DictionaryPhrases {
    return this.cache.setCacheValue(key, value);
  }

  /**
   * Retrieves a @see DictionaryPhrases value from the cache.
   * @param {string} key The cache key.
   * @returns The @see DictionaryPhrases value, or null if the specified key is not found in the cache.
   */
  getCacheValue(key: string): DictionaryPhrases | null {
    return this.cache.getCacheValue(key);
  }

  /**
   * Gets a cache client that can cache data. Uses memory-cache as the default
   * library for caching (@see MemoryCacheClient). Override this method if you
   * want to use something else.
   * @returns {CacheClient} implementation
   */
  protected getCacheClient(): CacheClient<DictionaryPhrases> {
    return new MemoryCacheClient<DictionaryPhrases>(this.options);
  }

  /**
   * Fetch dictionary data for a language.
   * @param {string} language
   */
  abstract fetchDictionaryData(language: string): Promise<DictionaryPhrases>;
}
