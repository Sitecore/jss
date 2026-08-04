// Force a single React instance during tests. With yarn's `nmHoistingLimits: workspaces`,
// the workspace-linked @sitecore-jss/sitecore-jss-react package resolves its own copy of
// react, which breaks hooks in its components when they are rendered by this package's
// react-dom (two React instances = null hooks dispatcher).
const Module = require('module');

const dedupedModules = ['react', 'react-dom'];
const originalResolveFilename = Module._resolveFilename;

Module._resolveFilename = function (request, parent, isMain, options) {
  const packageName = request.split('/')[0];
  const resolveParent = dedupedModules.includes(packageName) ? module : parent;

  return originalResolveFilename.call(this, request, resolveParent, isMain, options);
};

require('ts-node/register/transpile-only');
require('../src/tests/request.ts');
require('../src/tests/jsdom-setup.ts');
