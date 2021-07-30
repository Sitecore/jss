/* eslint-disable spaced-comment */
// React 16 depends on requestAnimationFrame, need a shim for node.js
// eslint-disable-next-line spaced-comment
// https://github.com/facebook/jest/issues/4545

/// <reference types="../../global" />

// eslint-disable-next-line no-var
declare var global: NodeJS.Global;

global.requestAnimationFrame = (callback: () => void) => {
  setTimeout(callback, 0);
};
