/* eslint-disable no-unused-expressions */
import path from 'path';
import fs from 'fs';
import { expect } from 'chai';
import chalk from 'chalk';
import sinon, { SinonStub } from 'sinon';
import {
  getPascalCaseName,
  openJsonFile,
  writeJsonFile,
  sortKeys,
  getAllTemplates,
  getBaseTemplates,
  getAppPrefix,
  saveConfiguration,
} from './helpers';
import { JsonObjectType } from '../processes/transform';
import testPackage from '../test-data/test.package.json';
import testJson from '../test-data/test.json';
import { Initializer } from '../Initializer';
import { InitializerFactory } from '../../InitializerFactory';

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

  describe('openJsonFile', () => {
    let log: SinonStub;

    afterEach(() => log?.restore());

    it('should return package.json data using provided path', () => {
      const filePath = path.resolve('src', 'common', 'test-data', 'test.package.json');

      const result = openJsonFile(filePath);

      expect(result).to.deep.equal(testPackage);
    });

    it('should throw an error when the path to the package does not exist', () => {
      log = sinon.stub(console, 'log');

      const filePath = path.resolve('not', 'existing', 'path', 'package.json');

      const result = openJsonFile(filePath);

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

    it('should return json data using provided path', () => {
      const filePath = path.resolve('src', 'common', 'test-data', 'test.json');

      const result = openJsonFile(filePath);

      expect(result).to.deep.equal(testJson);
    });

    it('should throw an error when the path to the package does not exist', () => {
      log = sinon.stub(console, 'log');

      const filePath = path.resolve('not', 'existing', 'path', 'package.json');

      const result = openJsonFile(filePath);

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
  });

  describe('writeJsonFile', () => {
    let log: SinonStub;
    let writeFileSync: SinonStub;

    afterEach(() => {
      log?.restore();
      writeFileSync?.restore();
    });

    it('should format data', () => {
      writeFileSync = sinon.stub(fs, 'writeFileSync');

      const data = {
        foo: 'foo',
        bar: { baz: 'baz' },
      };

      const filePath = path.resolve('src', 'common', 'test-data', 'test.package.json');

      writeJsonFile(data, filePath);

      expect(writeFileSync.calledOnce).to.equal(true);
      expect(writeFileSync.getCall(0).args[1]).to.equal(JSON.stringify(data, null, 2));
    });

    it('should use provided path', () => {
      writeFileSync = sinon.stub(fs, 'writeFileSync');

      const filePath = path.resolve('src', 'common', 'test-data', 'test.package.json');

      writeJsonFile({}, filePath);

      expect(writeFileSync.calledOnce).to.equal(true);
      expect(writeFileSync.getCall(0).args[0]).to.equal(filePath);
    });

    it('should throw an error when the path to the package does not exist', () => {
      log = sinon.stub(console, 'log');

      const filePath = path.resolve('not', 'existing', 'path', 'package.json');

      writeJsonFile({}, filePath);

      expect(log.calledTwice).to.equal(true);
      expect(log.getCall(0).args[0]).to.equal(
        chalk.red(`The following error occurred while trying to write ${filePath}:`)
      );
      expect(log.getCall(1).args[0]).to.equal(
        chalk.red(`Error: ENOENT: no such file or directory, open '${filePath}'`)
      );

      log.restore();
    });
  });

  describe('saveConfiguration', () => {
    let log: SinonStub;
    let writeFileSync: SinonStub;

    afterEach(() => {
      log?.restore();
      writeFileSync?.restore();
    });

    it('should save configuration', () => {
      writeFileSync = sinon.stub(fs, 'writeFileSync');
      const pkgPath = path.resolve('src', 'common', 'test-data', 'test.package.json');
      const pkg = openJsonFile(pkgPath);
      const templates = ['nextjs', 'nextjs-styleguide'];

      saveConfiguration(templates, pkgPath);

      expect(writeFileSync.calledOnce).to.equal(true);
      expect(writeFileSync.getCall(0).args[1]).to.equal(
        JSON.stringify({ ...pkg, config: { ...pkg.config, templates } }, null, 2)
      );
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

  describe('getAllTemplates', () => {
    let readdirSync: SinonStub;

    afterEach(() => {
      readdirSync?.restore();
    });

    it('should return templates', () => {
      readdirSync = sinon.stub(fs, 'readdirSync');
      readdirSync.returns(['foo', 'bar', 'baz']);

      const templates = getAllTemplates('./mock/path');

      expect(readdirSync.calledOnce).to.equal(true);
      expect(readdirSync.getCall(0).args[0]).to.equal('./mock/path');
      expect(templates).to.deep.equal(['foo', 'bar', 'baz']);
    });
  });

  describe('getBaseTemplates', () => {
    let readdirSync: SinonStub;
    let createStub: SinonStub;

    const mockInitializer = (isBase: boolean) => {
      const mock = <Initializer>{};
      mock.init = sinon.stub();
      mock.isBase = isBase;
      return mock;
    };

    afterEach(() => {
      readdirSync?.restore();
      createStub?.restore();
    });

    it('should only return base templates', async () => {
      readdirSync = sinon.stub(fs, 'readdirSync');
      readdirSync.returns(['foo', 'bar', 'baz']);

      createStub = sinon.stub(InitializerFactory.prototype, 'create');
      createStub.withArgs('foo').returns(mockInitializer(false));
      createStub.withArgs('bar').returns(mockInitializer(true));
      createStub.withArgs('baz').returns(mockInitializer(true));

      const templates = await getBaseTemplates('./mock/path');

      expect(readdirSync.calledOnce).to.equal(true);
      expect(readdirSync.getCall(0).args[0]).to.equal('./mock/path');
      expect(templates).to.deep.equal(['bar', 'baz']);
    });

    it('should not include unkown templates', async () => {
      readdirSync = sinon.stub(fs, 'readdirSync');
      readdirSync.returns(['foo', 'bar']);

      createStub = sinon.stub(InitializerFactory.prototype, 'create');
      createStub.withArgs('foo').returns(mockInitializer(true));
      createStub.withArgs('bar').returns(undefined);

      const templates = await getBaseTemplates('./mock/path');

      expect(readdirSync.calledOnce).to.equal(true);
      expect(readdirSync.getCall(0).args[0]).to.equal('./mock/path');
      expect(templates).to.deep.equal(['foo']);
    });
  });

  describe('getAppPrefix', () => {
    it('should return value when appPrefix is true', () => {
      const result = getAppPrefix(true, 'test');

      expect(result).to.not.be.empty;
    });

    it('should return empty when appPrefix is false', () => {
      const result = getAppPrefix(false, 'test');

      expect(result).to.be.empty;
    });

    it('should return pascal name plus hyphen by default', () => {
      const result = getAppPrefix(true, 'Foo-Bar');

      expect(result).to.equal('FooBar-');
    });

    it('should return pascal name without hyphen', () => {
      const result = getAppPrefix(true, 'Foo-Bar', false);

      expect(result).to.equal('FooBar');
    });
  });
});
