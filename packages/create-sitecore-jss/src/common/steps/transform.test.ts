import { expect } from 'chai';
import { transformFilename, merge } from './transform';
import { currentPkg, partialPkg } from '../test-data/pkg';

let answers;

const getAnswers = () => {
  answers = {
    yes: true,
    initialized: false,
    silent: true,
    appPrefix: true,
    appName: 'test',
    destination: '.\\test-data\\test',
    fetchWith: 'GraphQL',
    prerender: 'SSG',
    hostName: 'https://cm.jss.localhost',
  };
  return answers;
};

describe('transformFilename', () => {
  it('should replace placeholder filename with appropriate key', () => {
    const fileName = '{{appName}}.config';

    const transformedFileName = transformFilename(fileName, getAnswers());

    expect(transformedFileName).to.equal('test.config');
  });
});

describe('merge', () => {
  it('should merge the contents of a partial package.json with the target package.json', () => {
    const expected = {
      name: 'test',
      version: '1.0.0',
      description: 'Test package.json',
      scripts: {
        start:
          'cross-env-shell JSS_MODE=disconnected "npm-run-all --serial bootstrap --parallel next:dev start:disconnected-proxy start:watch-components"',
        test: 'tests are good',
      },
      files: ['dist'],
      dependencies: {
        bootstrap: '^4.3.1',
        chalk: '^4.1.2',
        nprogress: '~0.2.0',
      },
      devDependencies: {
        '@sitecore-jss/sitecore-jss-dev-tools': '^20.0.0-canary',
        '@types/node': '^16.11.7',
        typescript: '~4.3.5',
      },
    };

    const result = merge(currentPkg, partialPkg);

    expect(result).to.equal(JSON.stringify(expected, null, 2));
  });
});

// describe('diffFiles', () => {
//   // stub prompt, test each answer
//   it('should show the diff between a rendered template file and a target file', () => {
//     // make file content strings
//     const sourceFileContent = fs.readFileSync(path.resolve('./test-data', 'Navigation.tsx'));
//   });
// });
