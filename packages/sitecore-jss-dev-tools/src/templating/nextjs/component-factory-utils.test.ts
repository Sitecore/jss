import { expect } from 'chai';
import sinon from 'sinon';
import * as utils from '../utils';
import { getComponentList, getProjectList } from './component-factory-utils';

describe('component-factory-utils', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('getComponentList', () => {
    it('should get components through getItems', () => {
      const path = 'test/components';
      const components: utils.ComponentFile[] = [
        {
          path: 'test',
          moduleName: 'manhat',
          componentName: 'topSecret',
        },
      ];
      const getItemsStub = sinon.stub(utils, 'getItems');
      getItemsStub
        .withArgs({ path: path, cb: sinon.match.any, resolveItem: sinon.match.any })
        .returns(components);

      const result = getComponentList(path);

      expect(getItemsStub.getCall(0).args[0].path).to.equal(path);
      expect(result).to.deep.equal(components);
    });
  });

  describe('getProjectList', () => {
    it('should get projects through getItems', () => {
      const path = 'test/projects';
      const projects: utils.Project[] = [
        {
          projectName: 'manhattan',
          componentsPath: 'US/Tennessee/OakRidge',
        },
      ];
      const getItemsStub = sinon.stub(utils, 'getItems');
      getItemsStub
        .withArgs({
          path: path,
          cb: sinon.match.any,
          resolveItem: sinon.match.any,
          recursive: sinon.match.any,
        })
        .returns(projects);

      const result = getProjectList(path);

      expect(getItemsStub.getCall(0).args[0].path).to.equal(path);
      expect(result).to.deep.equal(projects);
    });
  });
});
