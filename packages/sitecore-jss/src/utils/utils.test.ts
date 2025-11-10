/* eslint-disable no-unused-expressions */
import { expect, spy } from 'chai';
import { isEditorActive, resetEditorChromes, isServer, resolveUrl } from '.';
import { ChromeRediscoveryGlobalFunctionName } from './editing';
import {
  isAbsoluteUrl,
  isTimeoutError,
  isRegexOrUrl,
  areURLSearchParamsEqual,
  escapeNonSpecialQuestionMarks,
  mergeURLSearchParams,
  getAllowedOriginsFromEnv,
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

    it('should throw an error when url is empty', () => {
      expect(() => resolveUrl('')).to.throw('url must be a non-empty string');
    });
  });

  describe('isAbsoluteUrl', () => {
    it('should match absolute urls', () => {
      expect(isAbsoluteUrl('http://foobar.com')).to.be.true;
      expect(isAbsoluteUrl('https://foobar.com')).to.be.true;
      expect(isAbsoluteUrl('file://foobar.com')).to.be.true;
      expect(isAbsoluteUrl('mailto:someone@example.com')).to.be.true;
      expect(isAbsoluteUrl('data:text/plain;base64,SGVsbG8sIFdvcmxkIQ%3D%3D')).to.be.true;
      expect(isAbsoluteUrl('//foobar.com')).to.be.false;
      expect(isAbsoluteUrl('/foo/bar')).to.be.false;
      expect(isAbsoluteUrl('foo/bar')).to.be.false;
      expect(isAbsoluteUrl('foo')).to.be.false;
    });
  });

  describe('isTimeoutError', () => {
    it('should return true when error is timeout error', () => {
      expect(isTimeoutError({ code: '408' })).to.be.true;
      expect(isTimeoutError({ code: 'ECONNABORTED' })).to.be.true;
      expect(isTimeoutError({ code: 'ETIMEDOUT' })).to.be.true;
      expect(isTimeoutError({ response: { status: 408 } })).to.be.true;
      expect(isTimeoutError({ name: 'AbortError' })).to.be.true;
    });
  });

  describe('getAllowedOriginsFromEnv', () => {
    it('should return an empty array when JSS_ALLOWED_ORIGINS is not set', () => {
      delete process.env.JSS_ALLOWED_ORIGINS;
      expect(getAllowedOriginsFromEnv()).to.be.empty;
    });

    it('should return an array of allowed origins from JSS_ALLOWED_ORIGINS', () => {
      process.env.JSS_ALLOWED_ORIGINS = 'https://allowed.com, https://alsoallowed.com';
      expect(getAllowedOriginsFromEnv()).to.deep.equal([
        'https://allowed.com',
        'https://alsoallowed.com',
      ]);
      delete process.env.JSS_ALLOWED_ORIGINS;
    });
  });

  describe('isRegexOrUrl', () => {
    it('should return "url" for valid URL-like strings', () => {
      expect(isRegexOrUrl('/path/to/resource?param=value')).to.equal('url');
      expect(isRegexOrUrl('/another/path')).to.equal('url');
    });

    it('should return "regex" for non-URL strings', () => {
      expect(isRegexOrUrl('/path/.*')).to.equal('regex');
      expect(isRegexOrUrl('^/path/(\\d+)$')).to.equal('regex');
    });
  });

  describe('areURLSearchParamsEqual', () => {
    it('should return true for equal URLSearchParams objects', () => {
      const params1 = new URLSearchParams('a=1&b=2&c=3');
      const params2 = new URLSearchParams('c=3&b=2&a=1');
      expect(areURLSearchParamsEqual(params1, params2)).to.be.true;
    });

    it('should return false for different URLSearchParams objects', () => {
      const params1 = new URLSearchParams('a=1&b=2');
      const params2 = new URLSearchParams('a=1&b=3');
      expect(areURLSearchParamsEqual(params1, params2)).to.be.false;
    });

    it('should return false if one of the URLSearchParams objects is empty', () => {
      const params1 = new URLSearchParams('a=1&b=2');
      const params2 = new URLSearchParams();
      expect(areURLSearchParamsEqual(params1, params2)).to.be.false;
    });
  });

  describe('mergeURLSearchParams', () => {
    it('should merge two URLSearchParams objects with unique keys', () => {
      const params1 = new URLSearchParams('a=1&b=2');
      const params2 = new URLSearchParams('c=3&d=4');

      expect(mergeURLSearchParams(params1, params2)).to.equal('a=1&b=2&c=3&d=4');
    });

    it('should override keys from the first object with keys from the second', () => {
      const params1 = new URLSearchParams('a=1&b=2');
      const params2 = new URLSearchParams('b=3&c=4');

      expect(mergeURLSearchParams(params1, params2)).to.equal('a=1&b=3&c=4');
    });

    it('should return only the second object if the first is empty', () => {
      const params1 = new URLSearchParams();
      const params2 = new URLSearchParams('a=1&b=2');

      expect(mergeURLSearchParams(params1, params2)).to.equal('a=1&b=2');
    });

    it('should return only the first object if the second is empty', () => {
      const params1 = new URLSearchParams('a=1&b=2');
      const params2 = new URLSearchParams();

      expect(mergeURLSearchParams(params1, params2)).to.equal('a=1&b=2');
    });

    it('should return an empty string if both objects are empty', () => {
      const params1 = new URLSearchParams();
      const params2 = new URLSearchParams();

      expect(mergeURLSearchParams(params1, params2)).to.equal('');
    });
  });

  describe('escapeNonSpecialQuestionMarks', () => {
    it('should escape question marks in non-regex strings', () => {
      const input = 'abc?def?ghi';
      const expected = 'abc\\?def\\?ghi';
      expect(escapeNonSpecialQuestionMarks(input)).to.equal(expected);
    });

    it('should not escape question marks in regex patterns that start with ^', () => {
      const input = '^/abc(?!def)?ghi';
      const expected = '^/abc(?!def)?ghi';
      expect(escapeNonSpecialQuestionMarks(input)).to.equal(expected);
    });

    it('should not escape question marks in regex patterns that end with $', () => {
      const input = '/abc(?!def)?ghi$';
      const expected = '/abc(?!def)?ghi$';
      expect(escapeNonSpecialQuestionMarks(input)).to.equal(expected);
    });

    it('should handle strings without question marks', () => {
      const input = 'abcdefghi';
      const expected = 'abcdefghi';
      expect(escapeNonSpecialQuestionMarks(input)).to.equal(expected);
    });

    it('should handle empty strings', () => {
      const input = '';
      const expected = '';
      expect(escapeNonSpecialQuestionMarks(input)).to.equal(expected);
    });

    it('should escape question marks even if they are already escaped', () => {
      const input = 'abc\\?def?ghi';
      const expected = 'abc\\\\?def\\?ghi';
      expect(escapeNonSpecialQuestionMarks(input)).to.equal(expected);
    });

    it('should handle consecutive unescaped question marks', () => {
      const input = 'abc??def';
      const expected = 'abc\\?\\?def';
      expect(escapeNonSpecialQuestionMarks(input)).to.equal(expected);
    });
  });
});
