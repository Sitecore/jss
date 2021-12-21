export const currentPkg = {
  name: 'test',
  version: '1.0.0',
  description: 'Test package.json',
  scripts: {
    test: 'tests are good',
  },
  config: {
    rootPlaceholders: ['jss-main']
  },
  files: ['dist'],
  dependencies: {
    chalk: '^4.1.2',
  },
  devDependencies: {
    '@types/node': '^16.11.7',
    typescript: '~4.3.5',
  },
  foo: {
    bar: [4, 5, 6],
    x: {
      y: {
        bar: [1, 2, 3],
        x: '10',
        y: 5,
        z: ['1', '2', '3']
      }
    }
  }
};

export const partialPkg = {
  version: '2.0.0',
  description: 'Updated package.json',
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
  config: {
    rootPlaceholders: ['jss-main', 'jss-test']
  },
  foo: {
    bar: [1, 2, 3, 4],
    x: {
      y: {
        bar: [7, 8, 9],
        x: '20',
        y: 15,
        z: ['9', '10', '11']
      }
    }
  }
};