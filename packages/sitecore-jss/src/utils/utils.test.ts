/* eslint-disable no-unused-expressions */
import { expect, spy } from 'chai';
import { isServer, resolveUrl } from '.';
import { enforceCors, getAllowedOriginsFromEnv, isAbsoluteUrl, isTimeoutError } from './utils';
import { IncomingMessage, OutgoingMessage } from 'http';

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

  describe('enforceCors', () => {
    const mockOrigin = 'https://maybeallowed.com';
    const mockRequest = (origin?: string) => {
      return {
        headers: {
          origin: origin || mockOrigin,
        },
      } as IncomingMessage;
    };

    const mockResponse = (presetCors?: string) => {
      const res = {} as OutgoingMessage;
      res.setHeader = spy(() => {
        return res;
      });
      res.getHeader = spy((headerName: string) => {
        if (headerName === 'Access-Control-Allow-Origin') {
          return presetCors;
        } else {
          return undefined;
        }
      });

      return res;
    };

    it('should return true if origin is found in allowedOrigins from JSS_ALLOWED_ORIGINS env variable', () => {
      const req = mockRequest();
      const res = mockResponse();
      process.env.JSS_ALLOWED_ORIGINS = mockOrigin;
      expect(enforceCors(req, res)).to.be.equal(true);
      delete process.env.JSS_ALLOWED_ORIGINS;
    });

    it('should return true when theres no origin header', () => {
      const req = {
        headers: {
          origin: undefined,
        },
      } as IncomingMessage;
      const res = mockResponse();

      expect(enforceCors(req, res)).to.be.equal(true);
    });

    it('should return true if origin is found in allowedOrigins passed as argument', () => {
      const req = mockRequest('http://allowed.com');
      const res = mockResponse();

      expect(enforceCors(req, res, ['http://allowed.com'])).to.be.equal(true);
    });

    it('should return false if origin matches neither allowedOrigins from JSS_ALLOWED_ORIGINS env variable nor argument', () => {
      const req = mockRequest('https://notallowed.com');
      const res = mockResponse();
      process.env.JSS_ALLOWED_ORIGINS = 'https://strictallowed.com, https://alsoallowed.com';
      expect(enforceCors(req, res, ['https://paramallowed.com'])).to.be.equal(false);
      delete process.env.JSS_ALLOWED_ORIGINS;
    });

    it('should return true when origin matches a wildcard value from allowedOrigins', () => {
      const req = mockRequest('https://allowed.dev.com');
      const res = mockResponse();
      expect(enforceCors(req, res, ['https://allowed.*.com'])).to.be.equal(true);
    });

    it('should set Access-Control-Allow-Origin and Access-Control-Allow-Methods headers for matching origin', () => {
      const req = mockRequest();
      const res = mockResponse();
      const allowedMethods = 'GET, POST, OPTIONS, DELETE, PUT, PATCH';
      enforceCors(req, res, [mockOrigin]);
      expect(res.setHeader).to.have.been.called.with('Access-Control-Allow-Origin', mockOrigin);
      expect(res.setHeader).to.have.been.called.with(
        'Access-Control-Allow-Methods',
        allowedMethods
      );
    });

    it('should consider existing CORS header when present', () => {
      const req = mockRequest('https://preallowed.com');
      const res = mockResponse('https://preallowed.com');
      expect(enforceCors(req, res)).to.be.equal(true);
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
});
