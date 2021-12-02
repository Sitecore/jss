import path from 'path';
import { expect } from 'chai';
import chalk from 'chalk';
import sinon, { SinonStub } from 'sinon';
import { getPascalCaseName, openPackageJson, sortKeys, isJssApp } from './helpers';
import { JsonObjectType } from '../steps/transform';
import testPackage from '../test-data/test.package.json';
import rootPackage from '../../../package.json';

describe('helpers', () => {
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
    let log: SinonStub;

    afterEach(() => log?.restore());

    it('should return package.json data using provided path', () => {
      const filePath = path.resolve('src', 'common', 'test-data', 'test.package.json');

      const result = openPackageJson(filePath);

      expect(result).to.deep.equal(testPackage);
    });

    it('should throw an error when the path to the package does not exist', () => {
      log = sinon.stub(console, 'log');

      const filePath = path.resolve('not', 'existing', 'path', 'package.json');

      const result = openPackageJson(filePath);

      expect(result).to.equal(undefined);
      expect(log.calledTwice).to.equal(true);
      expect(log.getCall(0).args[0]).to.equal(
        chalk.red(`The following error occurred while trying to read ${filePath}:`)
      );
      expect(log.getCall(1).args[0]).to.equal(
        chalk.red(`Error: ENOENT: no such file or directory, open '${filePath}'`)
      );

      log.restore();
    });

    it('should return package.json data from the root when path is not provided', () => {
      const result = openPackageJson();

      expect(result).to.deep.equal(rootPackage);
    });
  });

  describe('sortKeys', () => {
    it('should sort the keys of an object alphabetically', () => {
      const obj: JsonObjectType = {
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
      const expected: JsonObjectType = {
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

      const result: JsonObjectType = {};

      for (const key of Object.keys(obj)) {
        result[key] = sortKeys(obj[key] as JsonObjectType);
      }

      expect(JSON.stringify(result)).to.equal(JSON.stringify(expected));
    });
  });

  describe('isJssApp', () => {
    let log: SinonStub;
    let exit: SinonStub;

    afterEach(() => {
      log?.restore();
      exit?.restore();
    });

    it('should log error when sitecoreConfigPath is not provided', () => {
      log = sinon.stub(console, 'log');
      exit = sinon.stub(process, 'exit');
      isJssApp('nextjs', {});

      expect(log.getCalls().length).to.equal(3);

      expect(log.getCall(0).args[0]).to.equal(
        chalk.red(
          `Error: Could not add ${chalk.yellow(
            'nextjs'
          )} to the current project because it is not a JSS app.`
        )
      );
      expect(log.getCall(1).args[0]).to.equal(
        chalk.magenta(
          `${chalk.yellow(
            '*'
          )} Make sure the path to your JSS app is passed in with the ${chalk.cyan(
            '--destination flag'
          )}, or is the cwd.`
        )
      );
      expect(log.getCall(2).args[0]).to.equal(
        chalk.magenta(
          `${chalk.yellow('*')} Check that the ${chalk.cyan(
            'sitecoreConfigPath'
          )} property exists in the ${chalk.cyan('package.json')}`
        )
      );

      expect(exit.getCalls().length).to.equal(1);
      expect(exit.getCall(0).args[0]).to.equal(1);
    });
  });
});
