// this file is imported by default prior to executing the jss manifest command
// use this to enable transpilation or any other pre-manifest configurations that are needed.

console.log('Enabling Babel transpilation for the manifest...');

require('babel-core/register')({
  presets: [
    [
      'babel-preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
  babelrc: false,
});
