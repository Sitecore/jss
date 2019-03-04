const packageConfig = require('./package.json');

module.exports = {
  moduleFileExtensions: ['js', 'json', 'vue'],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.jsx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  snapshotSerializers: ['jest-serializer-vue'],
  testMatch: ['**/*.spec.js'],
  testURL: 'http://localhost/',
  verbose: true,
  collectCoverage: true,
  coverageThreshold: packageConfig.config.coverageThreshold,
  coverageReporters: ['lcov', 'cobertura', 'text', 'html'],
  reporters: ['default', ['jest-junit', { output: 'coverage/junit.xml' }]],
  collectCoverageFrom: [
    'src/components/**/*.js',
    'src/components/**/*.vue',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
};
