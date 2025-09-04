/* eslint-disable no-unused-expressions */
import { createManifestInstance } from './manifest';
import sinon from 'sinon';
import * as pipelines from '../../pipelines/pipeline';
import {
  CreateManifestInstanceArgs,
  TemplateDefinition,
  ComponentDefinition,
  ItemDefinition,
  PlaceholderDefinition,
} from './manifest.types';
import { expect } from 'chai';
import { ExecutablePipeline } from '../../pipelines';
import * as validators from './validators';

describe('manifest', () => {
  afterEach(() => {
    sinon.restore();
  });

  const generateManifest: ExecutablePipeline = {
    name: 'generateManifest',
    args: undefined,
    processors: function() {
      return [];
    },
  };
  const args: CreateManifestInstanceArgs = {
    pipelines: {
      generateManifest: generateManifest,
      args: {
        extraArg: 'no argument from me',
      },
    },
    appName: '',
    excludeItems: false,
    excludeDictionary: false,
    language: '',
    debug: false,
    wipe: false,
    rootPlaceholders: [],
    skipPlaceholderBlacklist: false,
  };

  const pipelineResultMock = {
    pipelineResult: {
      appName: 'unit',
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
    },
  };

  describe('getManifest', () => {
    it('should launch generateManifest pipeline with args', async () => {
      const runStub = sinon.stub(pipelines, 'run').resolves(pipelineResultMock);
      const { getManifest } = createManifestInstance(args);

      const res = await getManifest();
      const genManifestArgs = runStub.getCall(0).args[0];
      expect(genManifestArgs.name).to.equal('generateManifest');

      expect(res).to.deep.equal(pipelineResultMock.pipelineResult);
    });
  });

  describe('addTemplate', () => {
    it('should add templats to manifestSourceData', async () => {
      const runStub = sinon.stub(pipelines, 'run').resolves(pipelineResultMock);
      const validatorStub = sinon.stub(validators, 'validateTemplate').returns({ valid: true });
      const templates: TemplateDefinition[] = [
        {
          name: 'this is fake',
          fields: [],
        },
        {
          name: 'also fake template',
          fields: [],
        },
        {
          name: 'still fake',
          fields: [],
        },
      ];
      const { addTemplate, getManifest } = createManifestInstance(args);
      addTemplate(...templates);
      await getManifest();
      expect(validatorStub.called).to.be.true;
      const callArgs = runStub.getCall(0).args[0].args;
      expect(callArgs.templates).to.deep.equal(templates);
    });
  });

  describe('addRouteType', () => {
    it('should add route type as template to manifestSourceData', async () => {
      const runStub = sinon.stub(pipelines, 'run').resolves(pipelineResultMock);
      const validatorStub = sinon.stub(validators, 'validateTemplate').returns({ valid: true });
      const templates: TemplateDefinition[] = [
        {
          name: 'this is fake',
          fields: [],
        },
      ];
      const { addRouteType, getManifest } = createManifestInstance(args);
      addRouteType(...templates);
      await getManifest();
      expect(validatorStub.called).to.be.true;
      const callArgs = runStub.getCall(0).args[0].args;
      expect(callArgs.templates).to.deep.equal([
        {
          ...templates[0],
          route: true,
        },
      ]);
    });
  });

  describe('addComponent', () => {
    it('should add component to manifestSourceData', async () => {
      const runStub = sinon.stub(pipelines, 'run').resolves(pipelineResultMock);
      const components: ComponentDefinition[] = [
        {
          name: 'this is fake',
          fields: [],
        },
        {
          name: 'also fake template',
          fields: [],
        },
        {
          name: 'still fake',
          fields: [],
        },
      ];
      const { addComponent, getManifest } = createManifestInstance(args);
      addComponent(...components);
      await getManifest();
      const callArgs = runStub.getCall(0).args[0].args;
      expect(callArgs.components).to.deep.equal(components);
    });
  });

  describe('addContent', () => {
    it('should add content to manifestSourceData', async () => {
      const runStub = sinon.stub(pipelines, 'run').resolves(pipelineResultMock);
      const items: ItemDefinition[] = [
        {
          name: 'this is fake',
          template: 'fake',
        },
        {
          name: 'also fake template',
          template: 'fake',
        },
        {
          name: 'still fake',
          template: 'fake',
        },
      ];
      const { addContent, getManifest } = createManifestInstance(args);
      addContent(...items);
      await getManifest();
      const callArgs = runStub.getCall(0).args[0].args;
      expect(callArgs.content).to.deep.equal(items);
    });
  });

  describe('addPlaceholder', () => {
    it('should add placeholder to manifestSourceData', async () => {
      const runStub = sinon.stub(pipelines, 'run').resolves(pipelineResultMock);
      const validatorStub = sinon.stub(validators, 'validatePlaceholder').returns({ valid: true });
      const placeholders: PlaceholderDefinition[] = [
        {
          name: 'this is fake',
        },
        {
          name: 'also fake placeholder',
        },
        {
          name: 'still fake',
        },
      ];
      const { addPlaceholder, getManifest } = createManifestInstance(args);
      addPlaceholder(...placeholders);
      await getManifest();
      expect(validatorStub.called).to.be.true;
      const callArgs = runStub.getCall(0).args[0].args;
      expect(callArgs.placeholders).to.deep.equal(placeholders);
    });
  });
});
