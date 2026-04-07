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
      // React Compiler rules from eslint-config-next/core-web-vitals — relaxed for common JSS patterns
      'react-hooks/component-hook-factories': 'off',
      'react-hooks/config': 'off',
      'react-hooks/error-boundaries': 'off',
      'react-hooks/gating': 'off',
      'react-hooks/globals': 'off',
      'react-hooks/immutability': 'off',
      'react-hooks/incompatible-library': 'off',
      'react-hooks/preserve-manual-memoization': 'off',
      'react-hooks/purity': 'off',
      'react-hooks/refs': 'off',
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/set-state-in-render': 'off',
      'react-hooks/static-components': 'off',
      'react-hooks/unsupported-syntax': 'off',
      'react-hooks/use-memo': 'off',
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
