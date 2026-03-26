/**
 * Base ESLint flat config: recommended, jsdoc, prettier, globals, and shared rules.
 * Used by the root and package configs.
 */
import js from '@eslint/js';
import jsdoc from 'eslint-plugin-jsdoc';
import prettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
  js.configs.recommended,
  jsdoc.configs['flat/recommended'],
  {
    plugins: {
      prettier,
    },
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        RequestInit: 'readonly',
        RequestInfo: 'readonly',
        HeadersInit: 'readonly',
        NodeJS: 'readonly',
        NodeListOf: 'readonly',
        EventListener: 'readonly',
        BufferEncoding: 'readonly',
      },
      ecmaVersion: 2020,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      'jsdoc/newline-after-description': 'off',
      'jsdoc/require-property-description': 'off',
      'jsdoc/require-param-description': 'off',
      'jsdoc/require-returns': 'off',
      'jsdoc/no-undefined-types': 'off',
      'jsdoc/require-returns-type': 'off',
      'prettier/prettier': 'error',
      'no-use-before-define': 'off',
      'no-useless-escape': 'off',
      'spaced-comment': 'error',
      curly: ['error', 'multi-line'],
      'eol-last': ['error', 'always'],
      'linebreak-style': ['error', 'windows'],
      'guard-for-in': 'error',
      'no-unused-labels': 'error',
      'no-caller': 'error',
      'no-bitwise': 'error',
      'no-multiple-empty-lines': 'error',
      'no-new-wrappers': 'error',
      'no-eval': 'error',
      'dot-notation': 'error',
      'no-trailing-spaces': 'error',
      'no-unused-expressions': [
        'error',
        { allowShortCircuit: true, allowTernary: true },
      ],
      'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'brace-style': 'error',
      quotes: ['error', 'single'],
      radix: 'error',
      'default-case': 'error',
      eqeqeq: 'error',
      'jsx-quotes': ['error', 'prefer-double'],
    },
  },
  // Prettier must be last to override conflicting rules
  eslintConfigPrettier,
];
