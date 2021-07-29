module.exports = {
  extends: ['plugin:@typescript-eslint/recommended', '../.eslintrc'],
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
    '@typescript-eslint/type-annotation-spacing': 'error',
    '@typescript-eslint/semi': 'error',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
  globals: {
    RequestInit: 'true',
  },
};
