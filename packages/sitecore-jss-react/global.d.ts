declare module 'style-attr' {
  export const parse: (
    style: string,
    config: { preserveNumbers: boolean }
  ) => { [key: string]: unknown };
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
