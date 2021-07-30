declare module 'style-attr';

declare module 'sync-disk-cache' {
  export default import('sync-disk-cache').default;

  export interface CacheInstance {
    root: string;
    set(key: string, editingData: string): string;
    get(key: string): { value: string; isCached?: boolean };
    remove(key: string): void;
  }
}

declare namespace NodeJS {
  export interface Global {
    [key: string]: unknown;
    requestAnimationFrame: (callback: () => void) => void;
    window: Window;
    document: Document;
    navigator: Navigator;
    HTMLElement: HTMLElement;
  }
}
