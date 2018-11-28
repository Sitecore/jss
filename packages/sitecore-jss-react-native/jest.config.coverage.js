const baseConfig = require('./jest.config');

const coverageConfig = {
  collectCoverage: true,
  collectCoverageFrom: ['**/*.{ts,tsx}'],
  coverageDirectory: './coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/testData/',
    '/types/',
    '.snap',
    '.test.js',
    'jest.config.',
  ],
  coverageReporters: ['json-summary', 'text'],
};

module.exports = Object.assign({}, baseConfig, coverageConfig);
