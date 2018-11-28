const baseConfig = require('./jest.config');

const coverageConfig = {
  collectCoverage: true,
  collectCoverageFrom: ['**/*.ts'],
  coverageDirectory: './coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/test/',
    '/types/',
    '.snap',
    'jest.config.',
    '.d.ts',
    '.test.ts',
  ],
  coverageReporters: ['json-summary', 'text'],
};

module.exports = Object.assign({}, baseConfig, coverageConfig);
