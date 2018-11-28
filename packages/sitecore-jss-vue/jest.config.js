module.exports = {
  testMatch: ['**/*.test.ts'],
  moduleFileExtensions: [
    'js',
    'ts',
    'json',
    // tell Jest to handle `*.vue` files
    'vue',
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    // process `*.vue` files with `vue-jest`
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest',
  },
  snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-html'],
};
