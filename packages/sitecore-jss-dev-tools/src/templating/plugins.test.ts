/* eslint-disable quotes */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import sinon from 'sinon';
import fs from 'fs';
import path from 'path';
import * as utils from './utils';
import { ModuleType, PluginFile, getPluginList, generatePlugins } from './plugins';

describe('plugins', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('getPluginList', () => {
    it('should return list of components', () => {
      const items = [
        {
          name: 'fooPlugin',
          path: 'src/builder/plugins/foo',
        },
        {
          name: 'barPlugin',
          path: 'src/builder/plugins/bar',
        },
      ];

      const logStub = sinon.stub(console, 'debug');
      const getItemsStub = sinon.stub(utils, 'getItems').returns(items);

      expect(getPluginList('src/builder/plugins', 'builder')).to.deep.equal(items);
      expect(getItemsStub.called).to.be.true;

      const getItemsStubArgs = getItemsStub.getCall(0).args[0];

      expect(getItemsStubArgs.resolveItem('src/builder/plugins', 'foo')).to.deep.equal({
        path: 'src/builder/plugins/foo',
        name: 'fooPlugin',
      });

      getItemsStubArgs.cb!('foo');

      expect(logStub.calledOnceWith('Registering builder plugin foo')).to.be.true;
    });
  });

  describe('generatePlugins', () => {
    it('should generate file using CJS format', () => {
      const items: PluginFile[] = [
        {
          name: 'fooPlugin',
          path: 'scripts/component-builder/plugins/foo',
        },
        {
          name: 'barPlugin',
          path: 'scripts/component-builder/plugins/bar',
        },
      ];

      const getItemsStub = sinon.stub(utils, 'getItems').returns(items);
      const logStub = sinon.stub(console, 'log');
      const writeFileStub = sinon.stub(fs, 'writeFileSync');
      sinon.stub(path, 'resolve').callsFake((path) => path);

      const expectedFileContent = [
        "exports.fooPlugin = require('scripts/component-builder/plugins/foo');\r\n",
        "exports.barPlugin = require('scripts/component-builder/plugins/bar');\r\n",
      ].join('');

      generatePlugins({
        distPath: 'scripts/temp/component-builder-plugins.js',
        rootPath: 'scripts/component-builder/plugins',
        moduleType: ModuleType.CJS,
      });

      expect(
        logStub.calledOnceWith(
          'Writing component-builder plugins to scripts/temp/component-builder-plugins.js'
        )
      ).to.be.true;
      expect(getItemsStub.calledOnce).to.be.true;
      expect(
        writeFileStub.calledOnceWith(
          'scripts/temp/component-builder-plugins.js',
          expectedFileContent
        )
      ).to.be.true;
    });

    it('should generate file using CJS format when no plugins are provided', () => {
      const items: PluginFile[] = [];

      const getItemsStub = sinon.stub(utils, 'getItems').returns(items);
      const logStub = sinon.stub(console, 'log');
      const writeFileStub = sinon.stub(fs, 'writeFileSync');
      sinon.stub(path, 'resolve').callsFake((path) => path);

      const expectedFileContent = 'module.exports = {};\r\n';

      generatePlugins({
        distPath: 'scripts/temp/component-builder-plugins.js',
        rootPath: 'scripts/component-builder/plugins',
        moduleType: ModuleType.CJS,
      });

      expect(
        logStub.calledOnceWith(
          'Writing component-builder plugins to scripts/temp/component-builder-plugins.js'
        )
      ).to.be.true;
      expect(getItemsStub.calledOnce).to.be.true;
      expect(
        writeFileStub.calledOnceWith(
          'scripts/temp/component-builder-plugins.js',
          expectedFileContent
        )
      ).to.be.true;
    });

    it('should generate file using ESM format', () => {
      const items: PluginFile[] = [
        {
          name: 'fooPlugin',
          path: 'scripts/component-builder/plugins/foo',
        },
        {
          name: 'barPlugin',
          path: 'scripts/component-builder/plugins/bar',
        },
      ];

      const getItemsStub = sinon.stub(utils, 'getItems').returns(items);
      const logStub = sinon.stub(console, 'log');
      const writeFileStub = sinon.stub(fs, 'writeFileSync');
      sinon.stub(path, 'resolve').callsFake((path) => path);

      const expectedFileContent = [
        "export { fooPlugin } from 'scripts/component-builder/plugins/foo';\r\n",
        "export { barPlugin } from 'scripts/component-builder/plugins/bar';\r\n",
      ].join('');

      generatePlugins({
        distPath: 'scripts/temp/component-builder-plugins.js',
        rootPath: 'scripts/component-builder/plugins',
        moduleType: ModuleType.ESM,
      });

      expect(
        logStub.calledOnceWith(
          'Writing component-builder plugins to scripts/temp/component-builder-plugins.js'
        )
      ).to.be.true;
      expect(getItemsStub.calledOnce).to.be.true;
      expect(
        writeFileStub.calledOnceWith(
          'scripts/temp/component-builder-plugins.js',
          expectedFileContent
        )
      ).to.be.true;
    });

    it('should generate file using ESM format when no plugins are provided', () => {
      const items: PluginFile[] = [];

      const getItemsStub = sinon.stub(utils, 'getItems').returns(items);
      const logStub = sinon.stub(console, 'log');
      const writeFileStub = sinon.stub(fs, 'writeFileSync');
      sinon.stub(path, 'resolve').callsFake((path) => path);

      const expectedFileContent = 'export {};\r\n';

      generatePlugins({
        distPath: 'scripts/temp/component-builder-plugins.js',
        rootPath: 'scripts/component-builder/plugins',
        moduleType: ModuleType.ESM,
      });

      expect(
        logStub.calledOnceWith(
          'Writing component-builder plugins to scripts/temp/component-builder-plugins.js'
        )
      ).to.be.true;
      expect(getItemsStub.calledOnce).to.be.true;
      expect(
        writeFileStub.calledOnceWith(
          'scripts/temp/component-builder-plugins.js',
          expectedFileContent
        )
      ).to.be.true;
    });
  });
});
