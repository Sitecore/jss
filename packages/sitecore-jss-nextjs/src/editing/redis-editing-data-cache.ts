import { Redis } from '@upstash/redis';
import { EditingDataCache } from './editing-data-cache';
import { EditingData } from './editing-data';
import { debug } from '@sitecore-jss/sitecore-jss';

/**
 * Options for {@link RedisEditingDataCache}
 */
export interface RedisEditingDataCacheOptions {
  /**
   * Redis REST API endpoint URL. On Vercel, Redis Marketplace integrations (e.g. Upstash) inject this
   * as process.env.KV_REST_API_URL - use process.env.UPSTASH_REDIS_REST_URL only if connecting to an
   * Upstash database directly, outside of a Vercel integration.
   */
  redisUrl: string;
  /**
   * Redis REST API endpoint token. On Vercel, Redis Marketplace integrations (e.g. Upstash) inject this
   * as process.env.KV_REST_API_TOKEN - use process.env.UPSTASH_REDIS_REST_TOKEN only if connecting to an
   * Upstash database directly, outside of a Vercel integration.
   */
  redisToken: string;
  /**
   * TTL (in seconds) applied to cache entries on `set`
   * @default 120
   */
  defaultTtl?: number;
}

/**
 * Implementation of editing cache backed by a Redis-compatible REST API (e.g. Upstash Redis,
 * available as a Vercel Marketplace integration, or any self-hosted Upstash-compatible endpoint).
 * Set TTL for cache data in constructor (default: 120 seconds)
 */
export class RedisEditingDataCache implements EditingDataCache {
  protected redisCache: Redis;
  private defaultTtl: number;

  /**
   * @param {RedisEditingDataCacheOptions} options Redis connection and cache options
   */
  constructor(options: RedisEditingDataCacheOptions) {
    if (!options.redisUrl || !options.redisToken) {
      throw Error(
        'API URL or token are missing, ensure you have set the Redis storage integration correctly.'
      );
    }
    this.defaultTtl = options.defaultTtl ?? 120;
    this.redisCache = new Redis({
      url: options.redisUrl,
      token: options.redisToken,
      // Each cache operation is awaited individually rather than batched, so auto-pipelining
      // (which wraps the client in a Proxy to batch same-tick commands) provides no benefit here.
      enableAutoPipelining: false,
    });
  }

  /**
   * Stores editing data in Redis storage, keyed by `key`, with a TTL of {@link RedisEditingDataCacheOptions.defaultTtl}
   * @param {string} key Cache key
   * @param {EditingData} editingData Editing data to store
   * @returns A {@link Promise} that resolves once the data has been stored
   */
  set(key: string, editingData: EditingData): Promise<void> {
    debug.editing(`Putting editing data for ${key} into redis storage...`);
    return new Promise<void>((resolve, reject) => {
      this.redisCache
        .set(key, JSON.stringify(editingData), { ex: this.defaultTtl })
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }

  /**
   * Retrieves editing data for `key` from Redis storage. The entry is expired (invalidated)
   * immediately after being read, since it is only ever meant to be retrieved once.
   * @param {string} key Cache key
   * @returns The {@link EditingData} for `key`, or `undefined` on a cache miss
   */
  get(key: string): Promise<EditingData | undefined> {
    debug.editing(`Getting editing data for ${key} from redis storage...`);
    return new Promise<EditingData | undefined>((resolve, reject) => {
      this.redisCache
        .get(key)
        .then((entry) => {
          const result = (entry || undefined) as EditingData;
          this.redisCache.expire(key, 0).then(() => resolve(result));
        })
        .catch((err) => reject(err));
    });
  }
}
