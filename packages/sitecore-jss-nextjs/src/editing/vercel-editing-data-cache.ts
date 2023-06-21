import { VercelKV, createClient } from '@vercel/kv';
import { EditingDataCache } from './editing-data-cache';
import { EditingData } from './editing-data';
import { debug } from '@sitecore-jss/sitecore-jss';

/**
 * Implementation of editing cache for Vercel deployments
 * Uses Vercel KV database and client to store data
 * Set TTL for cache data in constructor (default: 60 seconds)
 */
export class VercelEditingDataCache implements EditingDataCache {
  protected redisCache: VercelKV;
  private defaultTtl = 120;

  /**
   * @param {string} redisUrl KV endpoint URL. Usually stored in process.env.KV_REST_API_URL
   * @param {string} redisToken KV endpoint tokem. Usually stored in process.env.KV_REST_API_TOKEN
   */
  constructor(redisUrl: string | undefined, redisToken: string | undefined) {
    if (!redisUrl || !redisToken) {
      throw Error(
        'API URL or token are missing, ensure you have set the KV or Upstash storage correctly.'
      );
    }
    this.redisCache = createClient({
      url: redisUrl,
      token: redisToken,
    });
  }

  set(key: string, editingData: EditingData): Promise<void> {
    debug.editing(`Putting editing data for ${key} into redis storage...`);
    return new Promise<void>((resolve, reject) => {
      this.redisCache
        .set(key, JSON.stringify(editingData), { ex: this.defaultTtl })
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }

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
