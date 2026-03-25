/**
 * ESLint flat config for JSS Next.js apps.
 * Replaces legacy .eslintrc so scaffolded apps use ESLint 9 flat config.
 */
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import eslintConfigPrettier from 'eslint-config-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const compat = new FlatCompat({ baseDirectory: __dirname });

const nextAndPrettierLegacy = compat.extends(
  'next',
  'next/core-web-vitals',
  'plugin:@typescript-eslint/recommended',
  'prettier',
  'plugin:yaml/recommended',
  'plugin:prettier/recommended'
);

export default [
  { ignores: ['.generated/**', '**/*.d.ts', '**/*.js', 'node_modules', '.next', 'out'] },
  ...nextAndPrettierLegacy,
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
  eslintConfigPrettier,
];
