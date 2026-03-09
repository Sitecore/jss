/**
 * TypeScript ESLint flat config: parser, recommended rules, and JSS overrides.
 */
import tseslint from 'typescript-eslint';
import stylisticTs from '@stylistic/eslint-plugin-ts';

const tsRecommended = tseslint.configs.recommended;

// Parser must be in the first matching config so ESLint uses it for .ts/.tsx
const parserConfig = [
  {
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
  },
];

const typeScriptOverrides = [
  {
    plugins: {
      '@stylistic/ts': stylisticTs,
    },
    rules: {
      '@typescript-eslint/naming-convention': [
        'error',
        {
          format: ['PascalCase'],
          selector: 'typeLike',
          custom: { regex: '^I[A-Z]', match: false },
        },
      ],
      '@typescript-eslint/member-ordering': 'error',
      '@typescript-eslint/no-use-before-define': [
        'error',
        { functions: false, variables: false },
      ],
      '@typescript-eslint/typedef': 'error',
      '@stylistic/ts/type-annotation-spacing': 'error',
      '@stylistic/ts/semi': 'error',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
    languageOptions: {
      globals: {
        RequestInit: 'readonly',
      },
    },
  },
];

export default [...parserConfig, ...tsRecommended, ...typeScriptOverrides];
