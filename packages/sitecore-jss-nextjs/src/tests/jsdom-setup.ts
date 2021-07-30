/* eslint-disable spaced-comment */
/* eslint-disable @typescript-eslint/triple-slash-reference */
// https://github.com/airbnb/enzyme/blob/master/docs/guides/jsdom.md

/// <reference types="../../global" />

declare module 'style-attr';

// eslint-disable-next-line no-var
declare var global: NodeJS.Global;

const { JSDOM } = require('jsdom');

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const jsDomWindow = jsdom.window;

/**
 * @param {unknown} src
 * @param {unknown} target
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
