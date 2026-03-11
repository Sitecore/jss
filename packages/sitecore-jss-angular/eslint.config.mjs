/**
 * ESLint flat config for @sitecore-jss/sitecore-jss-angular.
 * Replaces legacy .eslintrc so the package uses ESLint 9 flat config.
 * @see https://github.com/angular-eslint/angular-eslint/blob/main/docs/CONFIGURING_FLAT_CONFIG.md
 */
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import angular from 'angular-eslint';

export default tseslint.config(
  {
    ignores: ['node_modules', 'dist', '**/*.d.ts'],
  },
  // Spec files: lint as TypeScript only (no inline template processor) to avoid template parse errors.
  {
    files: ['**/*.spec.ts'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...angular.configs.tsRecommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json', './tsconfig.spec.json'],
        createDefaultProgram: true,
      },
    },
    rules: {
      '@angular-eslint/no-host-metadata-property': 'off',
      '@angular-eslint/component-selector': 'off',
      '@angular-eslint/directive-selector': 'off',
      '@typescript-eslint/dot-notation': 'off',
      '@typescript-eslint/explicit-member-accessibility': ['off', { accessibility: 'explicit' }],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          format: ['PascalCase'],
          selector: 'typeLike',
          custom: { regex: '^I[A-Z]', match: false },
        },
      ],
      '@typescript-eslint/member-ordering': 'error',
      '@typescript-eslint/no-use-before-define': ['error', { functions: false, variables: false }],
      '@typescript-eslint/typedef': 'error',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      'brace-style': ['error', '1tbs'],
      'id-blacklist': 'off',
      'id-match': 'off',
      'no-underscore-dangle': 'off',
      'no-useless-escape': 'off',
    },
  },
  {
    files: ['**/*.ts'],
    ignores: ['**/*.spec.ts'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json', './tsconfig.spec.json'],
        createDefaultProgram: true,
      },
    },
    rules: {
      '@angular-eslint/no-host-metadata-property': 'off',
      // Library uses sc-*, test-*, and various attribute selectors; avoid enforcing app prefix.
      '@angular-eslint/component-selector': 'off',
      '@angular-eslint/directive-selector': 'off',
      '@typescript-eslint/dot-notation': 'off',
      '@typescript-eslint/explicit-member-accessibility': ['off', { accessibility: 'explicit' }],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          format: ['PascalCase'],
          selector: 'typeLike',
          custom: { regex: '^I[A-Z]', match: false },
        },
      ],
      '@typescript-eslint/member-ordering': 'error',
      '@typescript-eslint/no-use-before-define': ['error', { functions: false, variables: false }],
      '@typescript-eslint/typedef': 'error',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      'brace-style': ['error', '1tbs'],
      'id-blacklist': 'off',
      'id-match': 'off',
      'no-underscore-dangle': 'off',
    },
  },
  {
    files: ['**/*.html'],
    extends: [...angular.configs.templateRecommended],
    rules: {},
  }
);
