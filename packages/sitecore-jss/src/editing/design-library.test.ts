/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import sinon from 'sinon';
import {
  updateComponentHandler,
  getDesignLibraryStatusEvent,
  DesignLibraryStatus,
  getDesignLibraryScriptLink,
  isDesignLibraryMode,
} from './design-library';
import testComponent from '../test-data/component-editing-data';
import { SITECORE_EDGE_URL_DEFAULT } from '../constants';
import { DesignLibraryMode } from './models';

describe('Design library utils', () => {
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

  describe('getDesignLibraryStatusEvent', () => {
    it('should return a valid status event', () => {
      const statusEvent = getDesignLibraryStatusEvent(DesignLibraryStatus.READY, 'uid-1');
      expect(statusEvent).to.deep.equal({
        name: 'component:status',
        message: {
          status: DesignLibraryStatus.READY,
          uid: 'uid-1',
        },
      });
    });
  });

  describe('getDesignLibraryScriptLink', () => {
    it('should return the default design library script link when no URL is provided', () => {
      const scriptLink = getDesignLibraryScriptLink();
      expect(scriptLink).to.equal(
        `${SITECORE_EDGE_URL_DEFAULT}/v1/files/designlibrary/lib/rh-lib-script.js`
      );
    });

    it('should return the correct script link when a custom URL is provided', () => {
      const customUrl = 'https://custom-designlibrary.com';
      const scriptLink = getDesignLibraryScriptLink(customUrl);
      expect(scriptLink).to.equal(`${customUrl}/v1/files/designlibrary/lib/rh-lib-script.js`);
    });
  });

  describe('isDesignLibraryMode', () => {
    it('should return true for DesignLibraryMode.Normal', () => {
      expect(isDesignLibraryMode(DesignLibraryMode.Normal)).to.be.true;
    });

    it('should return true for DesignLibraryMode.Metadata', () => {
      expect(isDesignLibraryMode(DesignLibraryMode.Metadata)).to.be.true;
    });

    it('should return false for other values', () => {
      expect(isDesignLibraryMode('invalid')).to.be.false;
    });
  });

  afterEach(() => {
    debugSpy.resetHistory();
  });
});
