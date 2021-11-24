import fs from 'fs';
import path from 'path';
import { expect, assert } from 'chai';
import { transformFilename, getPascalCaseName, openPackageJson, sortKeys, merge } from './shared';

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
    hostName: 'https: //cm.jss.localhost',
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

describe('getPascalCaseName', () => {
  it('should reformat kebab-case to PascalCase', () => {
    const result = getPascalCaseName('my-next-sitecore-app');

    expect(result).to.match(/MyNextSitecoreApp/);
  });

  it('should reformat snake_case to PascalCase', () => {
    const result = getPascalCaseName('my_next_sitecore_app');

    expect(result).to.match(/MyNextSitecoreApp/);
  });

  it('should reformat one word lowercase app name to be capitalized', () => {
    const result = getPascalCaseName('onewordappnamenohyphen');

    expect(result).to.match(/Onewordappnamenohyphen/);
  });
});

describe('openPackageJson', () => {
  it('should return package.json data as an object', () => {
    const testData = {
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

    const result = openPackageJson(path.resolve('src', 'test-data', 'test.package.json'));

    assert.typeOf(result, 'Object');
    expect(JSON.stringify(result)).to.equal(JSON.stringify(testData));
  });
});

describe('sortKeys', () => {
  it('should sort the keys of an object alphabetically', () => {
    // TODO: use proper types
    const obj: any = {
      dependencies: {
        d: '0.0',
        b: '0.0',
        c: '0.0',
        a: '0.0',
      },
      scripts: {
        c: '',
        d: '',
        b: '',
        a: '',
      },
    };
    const expected: any = {
      dependencies: {
        a: '0.0',
        b: '0.0',
        c: '0.0',
        d: '0.0',
      },
      scripts: {
        a: '',
        b: '',
        c: '',
        d: '',
      },
    }
    let result: any = {};
    for (const key of Object.keys(obj)) {
      result[key] = sortKeys(obj[key]);
    }

    expect(JSON.stringify(result)).to.equal(JSON.stringify(expected));
  });
});

describe('merge', () => {
  const pkgData = () => ({
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
  });
  afterEach(() => {
    // reset test.package.json
    fs.writeFileSync(
      path.resolve('src', 'test-data', 'test.package.json'),
      JSON.stringify(pkgData(), null, 2)
    );
  });

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
    const currentPkg = fs.readFileSync(
      path.resolve('src', 'test-data', 'test.package.json'),
      'utf8'
    );
    const partialPkg = fs.readFileSync(
      path.resolve('src', 'test-data', 'testSource.package.json'),
      'utf8'
    );

    const result = merge(JSON.parse(currentPkg), JSON.parse(partialPkg));

    expect(result).to.equal(JSON.stringify(expected, null, 2));
  });
});
