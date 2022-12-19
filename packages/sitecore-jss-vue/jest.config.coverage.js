const baseConfig = require('./jest.config');

const coverageConfig = {
  collectCoverage: true,
  collectCoverageFrom: ['**/*.ts'],
  coverageDirectory: './coverage',
  coveragePathIgnorePatterns: [
    '/index.ts',
    '/node_modules/',
    '/dist/',
    '/test/',
    '/types/',
    '.snap',
    'jest.config.',
    '.d.ts',
    '.test.ts',
  ],
  coverageReporters: ['cobertura', 'text'],
};

module.exports = Object.assign({}, baseConfig, coverageConfig);
