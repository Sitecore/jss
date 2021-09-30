import { Cache, CacheClass } from 'memory-cache';

/**
 * An interface for cache clients.
 * @template T The type of data being cached.
 */
export interface CacheClient<T> {
  /**
   * Adds a value to the cache for the specified cache key.
   * @param {string} key The cache key.
   * @param {T} value The value to cache.
   * @returns The value added to the cache.
   */
  setCacheValue(key: string, value: T): T;

  /**
   * Retrieves a value from the cache.
   * @param {string} key The cache key.
   * @returns The cache value as {T}, or null if the specified key was not found in the cache.
   */
  getCacheValue(key: string): T | null;
}

/**
 * Default cache configuration
 */
const DEFAULTS = Object.freeze({
  cacheTimeout: 60,
  cacheEnabled: true,
});

/**
 * Minimum configuration options for classes that implement @see CacheClient
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
 * A cache client that uses the 'memory-cache' library (https://github.com/ptarjan/node-cache).
 * This class is meant to be extended or used as a mixin; it's not meant to be used directly.
 * @template T The type of data being cached.
 * @mixin
 */
export class MemoryCacheClient<T> implements CacheClient<T> {
  private cache: CacheClass<string, T>;

  /**
   * Initializes a new instance of @see MemoryCacheClient using the provided @see CacheOptions
   * @param {CacheOptions} options Configuration options
   */
  constructor(public options: CacheOptions) {
    this.cache = new Cache();

    this.options.cacheTimeout = (this.options.cacheTimeout ?? DEFAULTS.cacheTimeout) * 1000;

    if (this.options.cacheEnabled === undefined) {
      this.options.cacheEnabled = DEFAULTS.cacheEnabled;
    }
  }

  /**
   * Retrieves a value from the cache.
   * @template T The type of data being cached.
   * @param {string} key The cache key.
   * @returns The cache value as {T}, or null if the specified key is not found in the cache.
   */
  getCacheValue(key: string): T | null {
    return this.options.cacheEnabled ? this.cache.get(key) : null;
  }

  /**
   * Adds a value to the cache for the specified cache key.
   * @template T The type of data being cached.
   * @param {string} key The cache key.
   * @param {T} value The value to cache.
   * @returns The value added to the cache.
   */
  setCacheValue(key: string, value: T): T {
    return this.options.cacheEnabled
      ? this.cache.put(key, value, this.options.cacheTimeout)
      : value;
  }
}
