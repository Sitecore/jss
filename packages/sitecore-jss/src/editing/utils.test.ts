/* eslint-disable no-unused-expressions */
import { expect, spy } from 'chai';
import { isEditorActive, resetEditorChromes, ChromeRediscoveryGlobalFunctionName } from './utils';

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
  describe('isEditorActive', () => {
    it('should return false when invoked on server', () => {
      expect(isEditorActive()).to.be.false;
    });

    it('should return true when EE is active', () => {
      global.window = {
        document: {},
        location: { search: '' },
        Sitecore: { PageModes: { ChromeManager: {} } },
      };
      expect(isEditorActive()).to.be.true;
    });

    it('should return true when Horizon is active', () => {
      global.window = {
        document: {},
        location: { search: '?sc_horizon=editor' },
        Sitecore: null,
      };
      expect(isEditorActive()).to.be.true;
    });

    it('should return false when EE and Horizon are not active', () => {
      global.window = {
        document: {},
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
        document: {},
        location: { search: '' },
        Sitecore: { PageModes: { ChromeManager: { resetChromes } } },
      };
      resetEditorChromes();
      expect(resetChromes).to.have.been.called.once;
    });

    it('should reset chromes when Horizon is active', () => {
      const resetChromes = spy();
      global.window = {
        document: {},
        location: { search: '?sc_horizon=editor' },
        Sitecore: null,
      };
      global.window[ChromeRediscoveryGlobalFunctionName.name] = resetChromes;
      resetEditorChromes();
      expect(resetChromes).to.have.been.called.once;
    });

    it('should not throw when EE and Horizon are not active', () => {
      global.window = {
        document: {},
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
