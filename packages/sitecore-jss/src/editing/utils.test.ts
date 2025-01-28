/* eslint-disable no-unused-expressions */
import { expect, spy } from 'chai';
import sinon from 'sinon';
import {
  isEditorActive,
  resetEditorChromes,
  ChromeRediscoveryGlobalFunctionName,
  PAGES_EDITING_MARKER,
  updateComponentHandler,
} from './utils';
import testComponent from '../test-data/component-editing-data';

// must make TypeScript happy with `global` variable modification
interface CustomWindow {
  [key: string]: unknown;
  document: unknown;
}

interface Global {
  window: CustomWindow | undefined;
}

declare const global: Global;

describe('utils', () => {
  const pagesEditingDocument = {
    getElementById: (id: unknown) => (id === PAGES_EDITING_MARKER ? 'present' : null),
  };

  const nonPagesEditingDocument = {
    getElementById: (id: unknown) => (id === PAGES_EDITING_MARKER ? null : 'present'),
  };

  describe('isEditorActive', () => {
    it('should return false when invoked on server', () => {
      expect(isEditorActive()).to.be.false;
    });

    it('should return true when EE is active', () => {
      global.window = {
        document: nonPagesEditingDocument,
        location: { search: '' },
        Sitecore: { PageModes: { ChromeManager: {} } },
      };
      expect(isEditorActive()).to.be.true;
    });

    it('should return true when XMC Pages edit mode is active', () => {
      global.window = {
        document: pagesEditingDocument,
        location: { search: '' },
        Sitecore: null,
      };
      expect(isEditorActive()).to.be.true;
    });

    it('should return false when XMC Pages preview mode is active', () => {
      global.window = {
        document: nonPagesEditingDocument,
        location: { search: '?sc_horizon=preview' },
        Sitecore: null,
      };
      expect(isEditorActive()).to.be.false;
    });

    it('should return false when EE and XMC Pages are not active', () => {
      global.window = {
        document: nonPagesEditingDocument,
        location: { search: '' },
        Sitecore: null,
      };
      expect(isEditorActive()).to.be.false;
    });

    after(() => {
      global.window = undefined;
    });
  });

  describe('resetEditorChromes', () => {
    it('should not throw when invoked on server', () => {
      expect(resetEditorChromes()).to.not.throw;
    });

    it('should reset chromes when EE is active', () => {
      const resetChromes = spy();
      global.window = {
        document: nonPagesEditingDocument,
        location: { search: '' },
        Sitecore: { PageModes: { ChromeManager: { resetChromes } } },
      };
      resetEditorChromes();
      expect(resetChromes).to.have.been.called.once;
    });

    it('should reset chromes when XMC Pages edit mode is active', () => {
      const resetChromes = spy();
      global.window = {
        document: pagesEditingDocument,
        location: { search: '' },
        Sitecore: null,
      };
      global.window[ChromeRediscoveryGlobalFunctionName.name] = resetChromes;
      resetEditorChromes();
      expect(resetChromes).to.have.been.called.once;
    });

    it('should not throw when EE and XMC Pages are not active', () => {
      global.window = {
        document: nonPagesEditingDocument,
        location: { search: '' },
        Sitecore: null,
      };
      expect(resetEditorChromes()).to.not.throw;
    });

    after(() => {
      global.window = undefined;
    });
  });
});

describe('component library utils', () => {
  const debugSpy = sinon.spy(console, 'debug');
  describe('updateComponentHandler', () => {
    it('should abort when origin is empty', () => {
      const message = new MessageEvent('message');
      updateComponentHandler(message, testComponent);
      expect(debugSpy.called).to.be.false;
    });

    xit('should abort when origin is not allowed', () => {
      // TODO implement when security hardening in place
      expect(true).to.be.true;
    });

    it('should abort when message is not component:update', () => {
      const message = new MessageEvent('message', {
        origin: 'http://localhost',
        data: { name: 'component:degrade' },
      });
      updateComponentHandler(message, testComponent);
      expect(debugSpy.called).to.be.false;
    });

    it('should abort when uid is empty', () => {
      const message = new MessageEvent('message', {
        origin: 'http://localhost',
        data: { name: 'component:update' },
      });
      updateComponentHandler(message, testComponent);
      expect(debugSpy.callCount).to.be.equal(1);
      expect(
        debugSpy.calledWith(
          'Received component:update event without uid, aborting event handler...'
        )
      ).to.be.true;
    });

    it('should append params and fields for component', () => {
      const changedComponent = JSON.parse(JSON.stringify(testComponent));
      const message = new MessageEvent('message', {
        origin: 'http://localhost',
        data: {
          name: 'component:update',
          details: {
            uid: 'test-content',
            fields: {
              extra: 'I am extra',
            },
            params: {
              newparam: 12,
            },
          },
        },
      });
      const expectedFields = { ...changedComponent.fields, extra: 'I am extra' };
      const expectedParams = { ...changedComponent.params, newparam: 12 };
      updateComponentHandler(message, changedComponent);
      expect(changedComponent.fields).to.deep.equal(expectedFields);
      expect(changedComponent.params).to.deep.equal(expectedParams);
    });

    it('should replace params and fields for component', () => {
      const changedComponent = JSON.parse(JSON.stringify(testComponent));
      const message = new MessageEvent('message', {
        origin: 'http://localhost',
        data: {
          name: 'component:update',
          details: {
            uid: 'test-content',
            fields: {
              content: {
                value: 'new content',
              },
            },
            params: {
              nine: 'ten',
            },
          },
        },
      });
      const expectedFields = {
        ...changedComponent.fields,
        content: {
          value: 'new content',
        },
      };
      const expectedParams = { nine: 'ten' };
      updateComponentHandler(message, changedComponent);
      expect(changedComponent.fields).to.deep.equal(expectedFields);
      expect(changedComponent.params).to.deep.equal(expectedParams);
    });

    it('should not update fields or params when update fields and params are undefined', () => {
      const changedComponent = JSON.parse(JSON.stringify(testComponent));
      changedComponent.fields = undefined;
      changedComponent.params = undefined;
      const message = new MessageEvent('message', {
        origin: 'http://localhost',
        data: {
          name: 'component:update',
          details: {
            uid: 'test-content',
          },
        },
      });
      updateComponentHandler(message, changedComponent);
      expect(changedComponent.fields).to.be.undefined;
      expect(changedComponent.params).to.be.undefined;
    });

    it('should debug log when component not found', () => {
      const message = new MessageEvent('message', {
        origin: 'http://localhost',
        data: {
          name: 'component:update',
          details: {
            uid: 'no-content',
          },
        },
      });
      updateComponentHandler(message, testComponent);
      expect(debugSpy.callCount).to.be.equal(1);
      const callArgs = debugSpy.getCall(0).args;
      expect(callArgs).to.deep.equal(['Rendering with uid %s not found', 'no-content']);
    });

    it('should call callback when component found and updated', () => {
      const changedComponent = JSON.parse(JSON.stringify(testComponent));
      const callbackStub = sinon.stub();
      const message = new MessageEvent('message', {
        origin: 'http://localhost',
        data: {
          name: 'component:update',
          details: {
            uid: 'test-content',
          },
        },
      });
      updateComponentHandler(message, changedComponent, callbackStub);
      expect(callbackStub.called).to.be.true;
    });
  });

  afterEach(() => {
    debugSpy.resetHistory();
  });
});
