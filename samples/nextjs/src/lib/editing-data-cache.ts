// eslint-disable-next-line @typescript-eslint/no-var-requires
const Cache = require('sync-disk-cache');
import os from 'os';
import { EditingData } from '@sitecore-jss/sitecore-jss-nextjs';

class EditingDataCache {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private cache: any;

  constructor() {
    this.cache = new Cache('editing-data', { compression: 'gzip', location: os.tmpdir() });
  }

  set(key: string, editingData: EditingData) {
    const filePath = this.cache.set(key, JSON.stringify(editingData));
    if (!filePath || filePath.length === 0) {
      throw new Error(`Editing data cache not set for key ${key} at ${this.cache.root}`);
    }
  }

  get(key: string): EditingData | undefined {
    const entry = this.cache.get(key);
    if (!entry.isCached) {
      console.warn(`Editing data cache miss for key ${key} at ${this.cache.root}`);
      return undefined;
    }
    const data = JSON.parse(entry.value);
    // Remove immediately to preserve disk-space (TODO: async)
    this.cache.remove(key);
    return data as EditingData;
  }
}

export const editingDataCache = new EditingDataCache();
