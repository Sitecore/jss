/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { isEditorActive, isServer, resolveUrl } from '.';

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

  describe('isEditorActive', () => {
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

  describe('resolveUrl', () => {
    const testData = [
      {
        test: 'should support querystring params',
        url: 'https://test.io',
        params: { foo: 'foo', bar: 1 },
        expected: 'https://test.io/?foo=foo&bar=1',
      },
      {
        test: 'should support empty querystring params',
        url: 'https://test.io',
        params: {},
        expected: 'https://test.io/',
      },
      {
        test: 'should support undefined querystring params',
        url: 'https://test.io',
        params: undefined,
        expected: 'https://test.io/',
      },
      {
        test: 'should support undefined querystring params',
        url: 'https://test.io',
        params: undefined,
        expected: 'https://test.io/',
      },
      {
        test: 'should support existing querystring params in url',
        url: 'https://test.io?foo=foo',
        params: { bar: 1 },
        expected: 'https://test.io/?foo=foo&bar=1',
      },
    ];

    testData.forEach(({ test, url, params, expected }) => {
      it(test, () => {
        const result = resolveUrl(url, params);
        expect(result).to.equal(expected);
      });
    });
  });
});
