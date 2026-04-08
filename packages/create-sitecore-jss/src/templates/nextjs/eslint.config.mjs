/**
 * ESLint flat config for JSS Next.js apps.
 * Loads eslint-config-next's published flat bundle (no FlatCompat) to avoid circular
 * plugin graphs when ESLint 9 validates legacy eslintrc through @eslint/eslintrc.
 */
import { createRequire } from 'module';
import eslintConfigPrettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

const require = createRequire(import.meta.url);
const coreWebVitals = require('eslint-config-next/core-web-vitals');

export default [
  {
    ignores: ['.generated/**', '**/*.d.ts', '**/*.js', 'node_modules', '.next', 'out'],
  },
  ...coreWebVitals,
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@next/next/no-img-element': 'off',
      'jsx-a11y/alt-text': ['warn', { elements: ['img'] }],
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { caughtErrorsIgnorePattern: '.' },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      'jsx-quotes': ['error', 'prefer-double'],
    },
  },
  {
    plugins: { prettier: prettierPlugin },
    rules: {
      'prettier/prettier': 'warn',
    },
  },
  eslintConfigPrettier,
];
