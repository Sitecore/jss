// eslint-disable-next-line spaced-comment
/// <reference types="../../global" />
import Cache, { CacheInstance } from 'sync-disk-cache';
import os from 'os';
import { EditingData } from './editing-data';

/**
 * Defines an editing data cache implementation
 */
export interface EditingDataCache {
  set(key: string, editingData: EditingData): Promise<void>;
  get(key: string): Promise<EditingData | undefined>;
}

/**
 * A disk-based editing data cache implementation (required for hosting on Vercel via Serverless Functions)
 * @see EditingDataCache
 */
export class EditingDataDiskCache implements EditingDataCache {
  private cache: CacheInstance;

  /**
   * @param {string} [tmpDir] Temp directory to use. Default is the OS temp directory (os.tmpdir()).
   */
  constructor(tmpDir: string = os.tmpdir()) {
    // Use gzip compression and store using the OS temp directory (Vercel Serverless Functions have temp directory access)
    this.cache = new Cache('editing-data', { compression: 'gzip', location: tmpDir });
  }

  set(key: string, editingData: EditingData): Promise<void> {
    const filePath = this.cache.set(key, JSON.stringify(editingData));
    return new Promise((resolve, reject) => {
      if (!filePath || filePath.length === 0) {
        reject(new Error(`Editing data cache not set for key ${key} at ${this.cache.root}`));
      }

      resolve();
    });
  }

  get(key: string): Promise<EditingData | undefined> {
    const entry = this.cache.get(key);
    return new Promise<EditingData | undefined>((resolve) => {
      if (!entry.isCached) {
        console.warn(`Editing data cache miss for key ${key} at ${this.cache.root}`);
        resolve(undefined);
      }
      // Remove to preserve disk-space (as a macrotask so as not to block current execution)
      setTimeout(() => this.cache.remove(key));
      resolve(JSON.parse(entry.value) as EditingData);
    });
  }
}

/** EditingDataDiskCache singleton */
export const editingDataDiskCache = new EditingDataDiskCache();
