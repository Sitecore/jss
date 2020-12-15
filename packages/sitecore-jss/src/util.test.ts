/* tslint:disable:no-unused-expression */

import { expect } from 'chai';
import { isAbsoluteUrl, isExperienceEditorActive, isServer } from './util';

// must make TypeScript happy with `global` variable modification

interface CustomWindow {
  document: any;
  [key: string]: any;
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

  describe('isAbsoluteUrl', () => {
    it('should match absolute urls', () => {
      expect(isAbsoluteUrl('http://foobar.com')).to.be.true;
      expect(isAbsoluteUrl('https://foobar.com')).to.be.true;
      expect(isAbsoluteUrl('file://foobar.com')).to.be.true;
      expect(isAbsoluteUrl('mailto:someone@example.com')).to.be.true;
      expect(
        isAbsoluteUrl('data:text/plain;base64,SGVsbG8sIFdvcmxkIQ%3D%3D')
      ).to.be.true;
      expect(isAbsoluteUrl('//foobar.com')).to.be.false;
      expect(isAbsoluteUrl('/foo/bar')).to.be.false;
      expect(isAbsoluteUrl('foo/bar')).to.be.false;
      expect(isAbsoluteUrl('foo')).to.be.false;
    });
  })
});
