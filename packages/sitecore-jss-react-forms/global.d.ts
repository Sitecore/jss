declare module 'style-attr';

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
