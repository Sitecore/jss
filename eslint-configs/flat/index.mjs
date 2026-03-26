/**
 * Shared flat config factory for JSS monorepo.
 * Use from root eslint.config.mjs or from package eslint.config.mjs.
 *
 * @param {string[]} files - Glob patterns for files to lint
 * @param {{ react?: boolean, ignore?: string[] }} [options]
 * @returns {import('eslint').Linter.FlatConfig[]}
 */
import globals from 'globals';
import baseConfig from './base.mjs';
import typeScriptConfig from './typescript.mjs';
import reactConfig from './react.mjs';

/**
 * Add `files` to each config object in an array (shallow copy).
 * @param {string[]} files
 * @returns {import('eslint').Linter.FlatConfig[]}
 */
function withFiles(configs, files) {
  return configs.map((c) => (c.files !== undefined ? c : { ...c, files }));
}

export function createConfig(files, options = {}) {
  const { react = false, ignore = [] } = options;
  const defaultIgnores = [
    'node_modules',
    'dist',
    '**/*.d.ts',
    '.next',
    'out',
    'build',
    'coverage',
    'lib',
    'packages/*/node_modules',
    'packages/*/lib',
    'packages/*/dist',
    ...ignore,
  ];

  return [
    { ignores: defaultIgnores },
    // TypeScript config first so parser is set for .ts/.tsx before base rules run
    ...withFiles(typeScriptConfig, files),
    ...withFiles(baseConfig, files),
    ...(react ? withFiles(reactConfig, files) : []),
    // Test globals (Mocha + Jest) and relaxed rules for test files (after base so it overrides)
    {
      files: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx'],
      languageOptions: { globals: { ...globals.mocha, ...globals.jest } },
      rules: {
        'no-unused-expressions': 'off',
        'no-unused-vars': 'off',
      },
    },
  ];
}

export default createConfig;
