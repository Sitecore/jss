/**
 * Root ESLint flat config for JSS.
 */
import { createConfig } from './eslint-configs/flat/index.mjs';

// TS-only packages (no React). Angular has its own config in the package.
const tsOnlyPackages = [
  'packages/sitecore-jss/src/**',
  'packages/sitecore-jss-forms/src/**',
  'packages/sitecore-jss-cli/src/**',
  'packages/sitecore-jss-proxy/src/**',
  'packages/sitecore-jss-dev-tools/src/**',
  'packages/sitecore-jss-rendering-host/src/**',
  'packages/sitecore-jss-vue/src/**',
];

const reactPackages = [
  'packages/sitecore-jss-react/src/**',
  'packages/sitecore-jss-react-forms/src/**',
  'packages/sitecore-jss-nextjs/src/**',
  'packages/sitecore-jss-react-native/src/**',
];

const createSitecoreJssFiles = ['packages/create-sitecore-jss/src/**'];
const createSitecoreJssIgnore = [
  'packages/create-sitecore-jss/src/templates/**',
  'packages/create-sitecore-jss/src/common/test-data/**',
];

export default [
  ...createConfig(tsOnlyPackages),
  ...createConfig(createSitecoreJssFiles, { ignore: createSitecoreJssIgnore }),
  ...createConfig(reactPackages, { react: true }),
];
