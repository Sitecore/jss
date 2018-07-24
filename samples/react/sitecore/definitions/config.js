// this file is imported by default prior to executing the jss manifest command
// use this to enable transpilation or any other pre-manifest configurations that are needed.

console.log('Enabling Babel 7 transpilation for the manifest...');

require('@babel/register')({
  presets: [
    [
      '@babel/env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
  babelrc: false,
});
