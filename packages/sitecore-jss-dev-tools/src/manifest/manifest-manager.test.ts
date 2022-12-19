/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import sinon from 'sinon';
import chokidar from 'chokidar';
import { ManifestInstance } from '.';
import * as generator from './generator/generate';
import { ManifestManager } from './manifest-manager';

describe('ManifestManager', () => {
  const mockManifest: ManifestInstance = {
    appName: 'unit-test',
    templates: [],
    items: {
      routes: [],
      nonRoutes: [],
    },
    placeholders: [],
    dictionary: [],
    language: '',
    wipeExisting: false,
    rootPlaceholders: [],
  };
  const manifestInit = {
    rootPath: 'C:/test',
    sourceFiles: [
      './sitecore/definitions/**/*.sitecore.js',
      './sitecore/definitions/**/*.sitecore.ts',
    ],
    watchOnlySourceFiles: [],
    requireArg: null,
    outputPath: './sitecore/manifest/sitecore-import.json',
    pipelinePatchFiles: ['./sitecore/pipelines/**/*.patch.js'],
    appName: 'JssTestService',
  };

  afterEach(() => {
    sinon.restore();
  });

  describe('setManifestUpdatedCallback', () => {
    it('should add callback', async () => {
      const mockWatcher = new chokidar.FSWatcher();
      const genStub = sinon.stub(generator, 'generateToVariable').resolves(mockManifest);
      const watchStub = sinon.stub(chokidar, 'watch').returns(mockWatcher);
      const callbackSpy = sinon.spy();
      const mockEvent = 'a-drill';
      const mockChangedPath = 'C:/changed';

      const testedManager = new ManifestManager(manifestInit);
      testedManager.setManifestUpdatedCallback((manifest) => {
        callbackSpy(manifest);
      });
      expect(watchStub.called).to.be.true;
      mockWatcher.emit('all', mockEvent, mockChangedPath);

      // watcher.emit('all', mockEvent, mockChangedPath);
      expect(genStub.called).to.be.true;
      const eventHandled = new Promise((resolve) => {
        setTimeout(() => {
          expect(callbackSpy.called).to.be.true;
          resolve(null);
        }),
          100;
      });
      await eventHandled;

      testedManager.watcher?.close();
    });
  });

  describe('getManifest', () => {
    it('should write to file system on initial maifest', () => {
      const genStub = sinon.stub(generator, 'generateToFile').resolves(mockManifest);
      const testedManager = new ManifestManager(manifestInit);
      testedManager.getManifest('en');
      expect(genStub.called).to.be.true;
    });

    it('should write to memory on consequent maifest', () => {
      const genFileStub = sinon.stub(generator, 'generateToFile').resolves(mockManifest);
      const genMemStub = sinon.stub(generator, 'generateToVariable').resolves(mockManifest);
      const testedManager = new ManifestManager(manifestInit);
      testedManager.initialManifest = false;
      testedManager.getManifest('en');

      expect(genFileStub.called).to.be.false;
      expect(genMemStub.called).to.be.true;
    });
  });
});
