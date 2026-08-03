require('ts-node/register/transpile-only');
require('../src/tests/request.ts');
require('../src/tests/jsdom-setup.ts');

// With nmHoistingLimits: workspaces, each package has its own React copy. Force a single
// React for tests so hooks inside @sitecore-jss/sitecore-jss-react share the same dispatcher
// as this package's react-dom renderer.
const Module = require('module');
const reactExports = require('react');
const reactDomExports = require('react-dom');
const originalRequire = Module.prototype.require;

Module.prototype.require = function (id) {
  if (id === 'react') {
    return reactExports;
  }
  if (id === 'react-dom') {
    return reactDomExports;
  }
  return originalRequire.apply(this, arguments);
};
