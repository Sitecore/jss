/**
 * ESLint flat config for JSS React (CRA) apps.
 * Replaces legacy .eslintrc so scaffolded apps use ESLint 9 flat config.
 */
import js from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import importPlugin from 'eslint-plugin-import';
import yamlPlugin from 'eslint-plugin-yaml';
import prettierPlugin from 'eslint-plugin-prettier';
import babelParser from '@babel/eslint-parser';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
  { ignores: ['node_modules', 'build', 'coverage', 'data/**'] },
  js.configs.recommended,
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        ecmaFeatures: { jsx: true },
        ecmaVersion: 2022,
        babelOptions: { presets: ['@babel/preset-react'] },
      },
      globals: {
        window: 'readonly',
        document: 'readonly',
        process: 'readonly',
      },
    },
    plugins: {
      react: reactPlugin,
      import: importPlugin,
      prettier: prettierPlugin,
    },
    settings: {
      'import/ignore': ['node_modules', '.png$', '.jpg$'],
      react: { version: 'detect' },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      'import/no-unresolved': 'off',
      'import/no-duplicates': 'off',
      'import/no-named-as-default': 'off',
      'import/no-extraneous-dependencies': [
        'error',
        { devDependencies: true, optionalDependencies: true },
      ],
      'linebreak-style': 'off',
      'react/jsx-filename-extension': 0,
      'jsx-quotes': ['error', 'prefer-double'],
      'import/prefer-default-export': 'off',
      'react/forbid-prop-types': 'off',
      'react/prop-types': 0,
      'react/no-danger': 'off',
      'react/require-default-props': 'off',
      'react/no-array-index-key': 'off',
      'no-use-before-define': 0,
      'global-require': 0,
      'no-param-reassign': 0,
      'no-useless-escape': 'off',
      'spaced-comment': 'error',
      curly: ['error', 'multi-line'],
      'eol-last': ['error', 'always'],
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
      'brace-style': 'error',
      quotes: ['error', 'single'],
      'default-case': 'error',
      eqeqeq: 'error',
      'prettier/prettier': 'error',
      'no-unused-vars': [
        'error',
        { varsIgnorePattern: '^_', argsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
      ],
    },
  },
  {
    files: ['**/*.yml', '**/*.yaml'],
    plugins: { yaml: yamlPlugin },
    rules: yamlPlugin.configs?.recommended?.rules ?? {},
  },
  // Node.js scripts, server, sitecore, and CRA Node-style src files (CommonJS, require, process, etc.)
  {
    files: [
      'scripts/**/*.js',
      'server/**/*.js',
      'sitecore/**/*.js',
      'src/setupProxy.js',
      'src/util.js',
    ],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      'no-console': 'off',
    },
  },
  eslintConfigPrettier,
];
