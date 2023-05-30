import { expect } from 'chai';
import sinon from 'sinon';
import * as utils from '../utils';
import * as types from '../types';
import { getProjectList } from './component-factory-utils';

describe('component-factory-utils', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('getProjectList', () => {
    it('should get projects through getItems', () => {
      const path = 'test/projects';
      const projects: types.Project[] = [
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
