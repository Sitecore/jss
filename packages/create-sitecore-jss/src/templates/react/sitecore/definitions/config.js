// this file is imported by default prior to executing the jss manifest command
// use this to enable transpilation or any other pre-manifest configurations that are needed.

/* eslint-disable no-console */

console.log('Enabling Babel 7 transpilation for the manifest...');

// register Babel compiler
require('@babel/register')({
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
  // override React default Babel config
  babelrc: false,
});
