/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { isExperienceEditorActive, isServer } from '.';

// must make TypeScript happy with `global` variable modification

interface CustomWindow {
  [key: string]: unknown;
  document: unknown;
}

interface Global {
  window: CustomWindow | undefined;
}

declare const global: Global;

describe('index', () => {
  describe('isServer', () => {
    it('should return true when invoked on server', () => {
      expect(isServer()).to.be.true;
    });

    it('should return false when not invoked on server', () => {
      global.window = { document: {} };

      expect(isServer()).to.be.false;
    });

    after(() => {
      global.window = undefined;
    });
  });

  describe('isExperienceEditorActive', () => {
    it('should return true when EE is active', () => {
      global.window = {
        document: {},
        Sitecore: { PageModes: { ChromeManager: {} } },
      };
      expect(isExperienceEditorActive()).to.be.true;
    });

    it('should return false when EE is not active', () => {
      global.window = { document: {}, Sitecore: null };
      expect(isExperienceEditorActive()).to.be.false;
    });

    after(() => {
      global.window = undefined;
    });
  });
});
