import { CacheClient, CacheOptions, MemoryCacheClient } from '../cache-client';

/**
 * Object model for Sitecore dictionary phrases
 */
export interface ContentTokenPhrases {
  [k: string]: string;
}

/**
 * Service that fetches dictionary data using Sitecore's GraphQL API.
 */
export interface ContentTokenService {
  /**
   * Fetch dictionary data for a language.
   * @param {string} language the language to be used to fetch the dictionary
   */
  fetchContentTokens(language: string): Promise<ContentTokenPhrases>;
}

/**
 * Base implementation of @see ContentTokenService that handles caching dictionary values
 */
export abstract class ContentTokenServiceBase
  implements ContentTokenService, CacheClient<ContentTokenPhrases> {
  private cache: CacheClient<ContentTokenPhrases>;

  /**
   * Initializes a new instance of @see ContentTokenService using the provided @see CacheOptions
   * @param {CacheOptions} options Configuration options
   */
  constructor(public options: CacheOptions) {
    this.cache = this.getCacheClient();
  }

  /**
   * Caches a @see ContentTokenPhrases value for the specified cache key.
   * @param {string} key The cache key.
   * @param {ContentTokenPhrases} value The value to cache.
   * @returns The value added to the cache.
   * @mixes CacheClient<ContentTokenPhrases>
   */
  setCacheValue(key: string, value: ContentTokenPhrases): ContentTokenPhrases {
    return this.cache.setCacheValue(key, value);
  }

  /**
   * Retrieves a @see ContentTokenPhrases value from the cache.
   * @param {string} key The cache key.
   * @returns The @see ContentTokenPhrases value, or null if the specified key is not found in the cache.
   */
  getCacheValue(key: string): ContentTokenPhrases | null {
    return this.cache.getCacheValue(key);
  }

  /**
   * Gets a cache client that can cache data. Uses memory-cache as the default
   * library for caching (@see MemoryCacheClient). Override this method if you
   * want to use something else.
   * @returns {CacheClient} implementation
   */
  protected getCacheClient(): CacheClient<ContentTokenPhrases> {
    return new MemoryCacheClient<ContentTokenPhrases>(this.options);
  }

  /**
   * Fetch dictionary data for a language.
   * @param {string} language the language to be used to fetch the dictionary
   * @returns {Promise<ContentTokenPhrases>}
   */
  abstract fetchContentTokens(language: string): Promise<ContentTokenPhrases>;
}
