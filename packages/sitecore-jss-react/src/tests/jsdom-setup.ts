// https://github.com/airbnb/enzyme/blob/master/docs/guides/jsdom.md

declare module 'style-attr';
declare var global: any;

const { JSDOM } = require('jsdom');

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const jsDomWindow = jsdom.window;

function copyProps(src: any, target: any) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .reduce((result, prop) => ({
      ...result,
      [prop]: Object.getOwnPropertyDescriptor(src, prop),
    }),     {});

  Object.defineProperties(target, props);
}

global.window = jsDomWindow;
global.document = jsDomWindow.document;
global.navigator = {
  userAgent: 'node.js',
};

global.HTMLElement = jsDomWindow.HTMLElement; // makes chai "happy" https://github.com/chaijs/chai/issues/1029
copyProps(jsDomWindow, global);
