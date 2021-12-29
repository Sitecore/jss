// this file is imported by default prior to executing the jss manifest command
// use this to enable transpilation or any other pre-manifest configurations that are needed.
console.log('Enabling TypeScript transpilation for the manifest...');
// eslint-disable-next-line
require('ts-node').register({ project: 'tsconfig.scripts.json' });
