// React 16 depends on requestAnimationFrame, need a shim for node.js
// https://github.com/facebook/jest/issues/4545

import { Global } from './jsdom-setup';

// eslint-disable-next-line no-var
declare var global: Global;

global.requestAnimationFrame = (callback) => {
  setTimeout(callback, 0);
};
