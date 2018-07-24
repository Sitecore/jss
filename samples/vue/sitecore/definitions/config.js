// this file is imported by default prior to executing the jss manifest command
// use this to enable transpilation or any other pre-manifest configurations that are needed.

console.log('Enabling Babel 7 transpilation for the manifest...');

// these environment variables are necessary for Vue to allow us
// to process transpiled ES6 that Node can run
process.env.VUE_CLI_BABEL_TRANSPILE_MODULES = true;
process.env.VUE_CLI_BABEL_TARGET_NODE = true;

// register Babel compiler
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
  // override Vue default Babel config
  babelrc: false,
});
