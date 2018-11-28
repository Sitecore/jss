// currently, to use Jest alongside our Babel 7 dependencies, need to:
// * add as devDependency in package.json: "babel-core": "7.0.0-bridge.0",
// * tell npm how to resolve, in package.json:
// "resolutions": {
//   "babel-core": "7.0.0-bridge.0"
// },
// * doesn't seem necessary, but for posterity: rename .babelrc to babel.config.js

module.exports = {
  // react-native preset is a transitive dependency of jest, we don't need an explicit devDependency
  preset: 'react-native',
  testMatch: ['**/src/**/*.test.tsx', '**/src/**/*.test.ts'],
  // Jest needs to process/load .js files that it needs for testing.
  // Therefore, the `moduleFileExtensions` must contain 'js', even
  // though we're using typescript.
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    // Don't use babel-jest here, related issue:
    // https://github.com/facebook/react-native/issues/19859#issuecomment-407748189
    '^.+\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
  },
};
