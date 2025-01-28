/* eslint-disable no-unused-expressions */
import { expect, spy } from 'chai';
import {
  isEditorActive,
  resetEditorChromes,
  ChromeRediscoveryGlobalFunctionName,
  PAGES_EDITING_MARKER,
} from './utils';

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
