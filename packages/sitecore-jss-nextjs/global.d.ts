/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'style-attr';

declare namespace NodeJS {
  export interface Global {
    requestAnimationFrame: any;
    window: any;
    document: any;
    navigator: any;
    HTMLElement: any;
  }
}
