module.exports = {
  extends: ['plugin:@typescript-eslint/recommended'],
  rules: {
    '@typescript-eslint/naming-convention': [
      'error',
      {
        format: ['PascalCase'],
        selector: 'typeLike',
        custom: {
          regex: '^I[A-Z]',
          match: false,
        },
      },
    ],
    '@typescript-eslint/member-ordering': 'error',
    '@typescript-eslint/no-use-before-define': ['error', { functions: false, variables: false }],
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
  globals: {
    RequestInit: 'true',
  },
};
