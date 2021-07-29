// React 16 depends on requestAnimationFrame, need a shim for node.js
// https://github.com/facebook/jest/issues/4545

import { Global } from './jsdom-setup';

declare let global: Global;

global.requestAnimationFrame = (callback) => {
  setTimeout(callback, 0);
};
