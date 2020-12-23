/* eslint-disable @typescript-eslint/no-empty-function */
import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import { configLoader } from './configLoader';

describe('configLoader', () => {
  describe('when "fileGlobs" argument is not defined or empty', () => {
    it('should throw an error', async () => {
      try {
        await configLoader(undefined as any);
      } catch (e) {
        expect(e).to.not.equal(undefined);
      }
    });
  });

  it('should call "config" method on imported modules', () => {
    const spy1 = sinon.spy();
    const spy2 = sinon.spy();

    const fakeImportModules = () => {
      const mockModules = [
        { import: () => Promise.resolve({ config: spy1 }) },
        { import: () => Promise.resolve({ config: spy2 }) },
      ];
      return mockModules;
    };

    const fakeCreatePipelinesRegistry = () => ({
      getPipelines: () => {},
    });

    return configLoader({
      fileGlobs: ['***'],
      importModulesImplementation: fakeImportModules,
      createPipelinesRegistryImplementation: fakeCreatePipelinesRegistry,
    }).then(() => {
      expect(spy1.callCount).to.equal(1, 'spy1 call count not equal');
      expect(spy2.callCount).to.equal(1, 'spy2 call count not equal');
    });
  });

  it('should return pipelines loaded from modules', () => {
    const mockPipelines = {
      pipeline0: { name: 'pipeline0' },
      pipeline1: { name: 'pipeline1' },
    };

    const fakeCreatePipelinesRegistry = () => ({
      getPipelines: () => mockPipelines,
    });

    const fakeImportModules = () => {
      const mockModules = [
        { import: () => Promise.resolve({ config: () => {} }) },
        { import: () => Promise.resolve({ config: () => {} }) },
      ];
      return mockModules;
    };

    return configLoader({
      fileGlobs: ['***'],
      importModulesImplementation: fakeImportModules,
      createPipelinesRegistryImplementation: fakeCreatePipelinesRegistry,
    }).then((pipelines) => {
      expect(pipelines).to.eql(mockPipelines);
    });
  });

  describe('when config module doesn\'t export "config" method', () => {
    it('should throw an error', () => {
      const fakeImportModules = () => {
        const mockModules = [{ import: () => Promise.resolve({ file: '/path/to/module' }) }];
        return mockModules;
      };

      const fakeCreatePipelinesRegistry = () => ({
        getPipelines: () => {},
      });

      return configLoader({
        fileGlobs: ['***'],
        importModulesImplementation: fakeImportModules,
        createPipelinesRegistryImplementation: fakeCreatePipelinesRegistry,
      }).catch((error) => {
        expect(error.message.indexOf('/path/to/module')).to.equal(-1);
      });
    });
  });
});
