/**
 * ESLint flat config for JSS Vue apps.
 * Replaces legacy .eslintrc.js so scaffolded apps use ESLint 9 flat config.
 */
import pluginVue from 'eslint-plugin-vue';
import yamlPlugin from 'eslint-plugin-yaml';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
  {
    ignores: ['node_modules', 'dist', 'coverage', 'public/**', 'data/**'],
  },
  ...pluginVue.configs['flat/essential'],
  {
    files: ['**/*.js', '**/*.vue'],
    languageOptions: {
      sourceType: 'module',
      ecmaVersion: 2020,
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    rules: {
      'no-console': 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'vue/multi-word-component-names': 'off',
    },
  },
  {
    files: ['**/*.yml', '**/*.yaml'],
    plugins: { yaml: yamlPlugin },
    rules: yamlPlugin.configs?.recommended?.rules ?? {},
  },
  eslintConfigPrettier,
];
