/**
 * React ESLint flat config: plugin, recommended rules, and settings.
 */
import reactPlugin from 'eslint-plugin-react';

export default [
  {
    plugins: {
      react: reactPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    languageOptions: {
      globals: {
        React: 'writable',
        JSX: 'readonly',
      },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
    },
  },
];
