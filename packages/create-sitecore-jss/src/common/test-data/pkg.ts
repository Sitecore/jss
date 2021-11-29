export const currentPkg = {
  name: 'test',
  version: '1.0.0',
  description: 'Test package.json',
  scripts: {
    test: 'tests are good',
  },
  files: ['dist'],
  dependencies: {
    chalk: '^4.1.2',
  },
  devDependencies: {
    '@types/node': '^16.11.7',
    typescript: '~4.3.5',
  },
};

export const partialPkg = {
  dependencies: {
    bootstrap: '^4.3.1',
    nprogress: '~0.2.0',
  },
  devDependencies: {
    '@sitecore-jss/sitecore-jss-dev-tools': '^20.0.0-canary',
  },
  scripts: {
    start:
      'cross-env-shell JSS_MODE=disconnected "npm-run-all --serial bootstrap --parallel next:dev start:disconnected-proxy start:watch-components"',
  },
};