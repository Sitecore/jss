/* eslint-disable @typescript-eslint/no-explicit-any */
// React 16 depends on requestAnimationFrame, need a shim for node.js
// https://github.com/facebook/jest/issues/4545

// eslint-disable-next-line no-var
declare var global: any;

global.requestAnimationFrame = (callback: any) => {
  setTimeout(callback, 0);
};
