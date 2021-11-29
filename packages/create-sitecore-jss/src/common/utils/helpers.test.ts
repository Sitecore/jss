import path from 'path';
import sinon from 'sinon';
import { expect, assert } from 'chai';
import { getPascalCaseName, openPackageJson, sortKeys } from './helpers';

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
  const obj = {
    method: openPackageJson(),
  };

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
  it('should return package.json data as an object', () => {
    // TODO: rewrite with strings, not reading from file system??
    const result = openPackageJson(path.resolve('src', 'common', 'test-data', 'test.package.json'));
    assert.typeOf(result, 'Object');
    expect(JSON.stringify(result, null, 2)).to.equal(JSON.stringify(testData, null, 2));
  });

  // it should throw an error if there is no package.json at the path provided
  // eslint-disable-next-line quotes
  xit("should throw an error when the path to the package doesn't exist", () => {
    // TODO: stub openPackageJson and force error, check error message.
    const stubFunc = sinon.stub(obj, 'method').throws();
    expect(stubFunc);
  });
  // it should find the package.json if not provided on the path
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
    };

    const result: any = {};
    for (const key of Object.keys(obj)) {
      result[key] = sortKeys(obj[key]);
    }

    expect(JSON.stringify(result)).to.equal(JSON.stringify(expected));
  });
});
