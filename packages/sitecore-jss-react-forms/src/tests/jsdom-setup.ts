/* eslint-disable @typescript-eslint/triple-slash-reference */
/* eslint-disable spaced-comment */
// https://github.com/airbnb/enzyme/blob/master/docs/guides/jsdom.md

/// <reference path="../../global.d.ts" />

declare module 'style-attr';

export interface Global {
  [key: string]: unknown;
  requestAnimationFrame: (callback: () => void) => void;
  window: Window;
  document: Document;
  navigator: Navigator;
  HTMLElement: HTMLElement;
}

declare let global: Global;

const { JSDOM } = require('jsdom');

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const jsDomWindow = jsdom.window;

/**
 * @param {unknown} src
 * @param {object} target
 */
function copyProps(src: unknown, target: { [key: string]: unknown }) {
  const props = Object.getOwnPropertyNames(src)
    .filter((prop) => typeof target[prop] === 'undefined')
    .reduce(
      (result, prop) => ({
        ...result,
        [prop]: Object.getOwnPropertyDescriptor(src, prop),
      }),
      {}
    );

  Object.defineProperties(target, props);
}

global.window = jsDomWindow;
global.document = jsDomWindow.document;
global.navigator = {
  userAgent: 'node.js',
} as Navigator;

global.HTMLElement = jsDomWindow.HTMLElement; // makes chai "happy" https://github.com/chaijs/chai/issues/1029
copyProps(jsDomWindow, global);
