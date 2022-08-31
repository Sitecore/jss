/* eslint-disable spaced-comment */
// React 16 depends on requestAnimationFrame, need a shim for node.js
// eslint-disable-next-line spaced-comment
// https://github.com/facebook/jest/issues/4545

/// <reference types="../../global" />

const crossFetch = require('cross-fetch');

// eslint-disable-next-line no-var
declare var global: NodeJS.Global;

global.fetch = crossFetch;
global.Headers = crossFetch.Headers;
global.Request = crossFetch.Request;
global.Response = crossFetch.Response;

global.requestAnimationFrame = (callback: () => void) => {
  setTimeout(callback, 0);
};
