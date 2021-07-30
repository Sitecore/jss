/* eslint-disable spaced-comment */
// React 16 depends on requestAnimationFrame, need a shim for node.js
// https://github.com/facebook/jest/issues/4545

/// <reference types="../../global" />

declare let global: NodeJS.Global;

global.requestAnimationFrame = (callback) => {
  setTimeout(callback, 0);
};
