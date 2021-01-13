// eslint-disable-next-line @typescript-eslint/no-var-requires
const Cache = require('sync-disk-cache');
import os from 'os';
import { EditingData } from '../sharedTypes/editing-data';

/**
 * Defines an editing data cache implementation
 */
export interface EditingDataCache {
  set(key: string, editingData: EditingData): void;
  get(key: string): EditingData | undefined;
}

/**
 * A disk-based editing data cache implementation (required for hosting on Vercel via Serverless Functions)
 * @see EditingDataCache
 */
export class EditingDataDiskCache implements EditingDataCache {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private cache: any;

  constructor() {
    // Use gzip compression and store using the OS temp directory (Vercel Serverless Functions have temp directory access)
    this.cache = new Cache('editing-data', { compression: 'gzip', location: os.tmpdir() });
  }

  set(key: string, editingData: EditingData): void {
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
    // Remove immediately to preserve disk-space
    this.cache.remove(key);
    return data as EditingData;
  }
}
