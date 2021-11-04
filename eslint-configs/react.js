module.exports = {
  extends: ['plugin:react/recommended'],
  plugins: ['react'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  globals: {
    React: 'writable',
    JSX: 'true',
  },
};
