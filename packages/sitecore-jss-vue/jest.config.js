module.exports = {
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons'],
  },
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/setup-jest.js'],
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
    '^.+\\js$': 'babel-jest',
    // process `*.vue` files with `@vue/vue3-jest`
    '.*\\.(vue)$': '@vue/vue3-jest',
  },
  snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-html'],
};
