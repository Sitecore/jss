const baseConfig = require('./jest.config');

const coverageConfig = {
  collectCoverage: true,
  collectCoverageFrom: ['**/*.{ts,tsx}'],
  coverageDirectory: './coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/test-data/',
    '/types/',
    '.snap',
    '.test.js',
    'jest.config.',
  ],
  coverageReporters: ['cobertura', 'text'],
};

module.exports = Object.assign({}, baseConfig, coverageConfig);
