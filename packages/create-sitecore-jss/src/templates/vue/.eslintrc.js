module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/vue3-essential', 
    '@vue/prettier',
    "plugin:yaml/recommended",
    "next/core-web-vitals"],
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
  "overrides" : [
    {
      "files": ["**/*.y?(a)ml"],
      "parser": "yaml-eslint-parser",
      "extends": ["plugin:yaml/legacy"]
    }
  ]
};
