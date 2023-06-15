import { VercelKV, createClient } from '@vercel/kv';
import { EditingDataCache } from './editing-data-cache';
import { EditingData } from './editing-data';
import { debug } from '@sitecore-jss/sitecore-jss';

export class VercelEditingDataCache implements EditingDataCache {
  private redisCache: VercelKV;

  constructor(redisUrl?: string, redisToken?: string) {
    this.redisCache = createClient({
      url: redisUrl || process.env.KV_REST_API_URL || '',
      token: redisToken || process.env.KV_REST_API_TOKEN || '',
    });
  }

  set(key: string, editingData: EditingData): Promise<void> {
    debug.editing(`Putting editing data ${key} into redis storage`);
    return new Promise<void>((resolve, reject) => {
      this.redisCache
        .set(key, JSON.stringify(editingData))
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }

  get(key: string): Promise<EditingData | undefined> {
    debug.editing(`Getting editing data ${key} from redis storage`);
    return new Promise<EditingData | undefined>((resolve, reject) => {
      this.redisCache
        .get(key)
        .then((entry) => {
          console.log(`${key} - ${entry}`);
          const obj = {
            val: entry as string,
          };
          resolve(JSON.parse(JSON.stringify(obj.val)) as EditingData);
        })
        .catch((err) => reject(err));
    });
  }
}
