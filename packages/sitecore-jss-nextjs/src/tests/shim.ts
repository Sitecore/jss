// React 16 depends on requestAnimationFrame, need a shim for node.js
// https://github.com/facebook/jest/issues/4545

declare var global: any;

global.requestAnimationFrame = (callback: any) => {
  setTimeout(callback, 0);
};
