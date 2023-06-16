import { VercelKV, createClient } from '@vercel/kv';
import { EditingDataCache } from './editing-data-cache';
import { EditingData } from './editing-data';
import { debug } from '@sitecore-jss/sitecore-jss';

export class VercelEditingDataCache implements EditingDataCache {
  protected redisCache: VercelKV;
  private ttl;

  constructor(redisUrl: string | undefined, redisToken: string | undefined, entryTtlSeconds: number = 60) {
    if (!redisUrl || !redisToken) {
      throw Error(
        'API URL or token are missing, ensure you have set the KV or Upstash storage correctly.'
      );
    };
    this.ttl = entryTtlSeconds;
    this.redisCache = createClient({
      url: redisUrl,
      token: redisToken,
    });
  }
  
  set(key: string, editingData: EditingData): Promise<void> {
    debug.editing(`Putting editing data for ${key} into redis storage...`);
    return new Promise<void>((resolve, reject) => {
      this.redisCache
        .set(key, JSON.stringify(editingData))
        .then(() => {
          this.redisCache.expire(key, this.ttl).then(() => {
            resolve();
          });
        })
        .catch((err) => reject(err));
    });
  }

  get(key: string): Promise<EditingData | undefined> {
    debug.editing(`Getting editing data for ${key} from redis storage...`);
    return new Promise<EditingData | undefined>((resolve, reject) => {
      this.redisCache
        .get(key)
        .then((entry) => {
          const obj = {
            val: entry as string,
          };
          resolve(JSON.parse(JSON.stringify(obj.val)) as EditingData);
        })
        .catch((err) => reject(err));
    });
  }
}
