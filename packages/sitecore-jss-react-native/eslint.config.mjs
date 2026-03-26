import { createConfig } from '../../eslint-configs/flat/index.mjs';
export default [
  ...createConfig(['./src/**', 'src/**'], { react: true }),
  // Relax rules that are noisy in this package (pre-existing)
  {
    files: ['./src/**', 'src/**'],
    rules: {
      'react/prop-types': 'off',
      'react/no-unescaped-entities': 'off',
    },
  },
];
