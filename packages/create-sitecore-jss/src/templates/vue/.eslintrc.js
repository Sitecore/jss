module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/vue3-essential', '@vue/prettier', 'plugin:yaml/recommended'],
  plugins: ['yaml'],
  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/multi-word-component-names': 'off',
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    ecmaVersion: 8,
    requireConfigFile: false,
  },
};
