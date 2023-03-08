/* eslint-disable dot-notation */
import chai, { use } from 'chai';
import sinonChai from 'sinon-chai';
import chaiString from 'chai-string';
import { MiddlewareBase } from './middleware';
import { NextRequest } from 'next/server';

use(sinonChai);
const expect = chai.use(chaiString).expect;

describe('MiddlewareBase', () => {
  class SampleMiddleware extends MiddlewareBase {}

  const createReq = (props: any = {}) => {
    return {
      cookies: {
        get(cookieName: string) {
          const cookies = { ...props?.cookieValues };
          return { value: cookies[cookieName] };
        },
      },
      headers: {
        get(key: string) {
          const headers = {
            ...props?.headerValues,
          };
          return headers[key];
        },
      },
      nextUrl: {
        ...props?.nextUrl,
      },
    } as NextRequest;
  };

  describe('defaultHostname', () => {
    it('should set default hostname', () => {
      const middleware = new SampleMiddleware();

      expect(middleware['defaultHostname']).to.equal('localhost');
    });

    it('should set custom hostname', () => {
      const middleware = new SampleMiddleware({
        defaultHostname: 'foo',
      });

      expect(middleware['defaultHostname']).to.equal('foo');
    });
  });

  describe('isPreview', () => {
    it('should return true prerender bypass cookie is provided', () => {
      const middleware = new SampleMiddleware();
      const req = createReq({
        cookieValues: {
          __prerender_bypass: true,
        },
      });

      expect(middleware['isPreview'](req)).to.equal(true);
    });

    it('should return true when preview data cookie is provided', () => {
      const middleware = new SampleMiddleware();
      const req = createReq({
        cookieValues: {
          __next_preview_data: true,
        },
      });

      expect(middleware['isPreview'](req)).to.equal(true);
    });

    it('should return false when required cookie is not provided', () => {
      const middleware = new SampleMiddleware();
      const req = createReq();

      expect(middleware['isPreview'](req)).to.equal(false);
    });
  });

  describe('excludeRoute', () => {
    it('default', () => {
      const middleware = new SampleMiddleware();

      expect(middleware['excludeRoute']('/src/image.png')).to.equal(true);
      expect(middleware['excludeRoute']('/api/layout/render')).to.equal(true);
      expect(middleware['excludeRoute']('/sitecore/render')).to.equal(true);
      expect(middleware['excludeRoute']('/_next/webpack')).to.equal(true);
    });

    it('custom function', () => {
      const middleware = new SampleMiddleware({
        excludeRoute(path: string) {
          return path === 'foo';
        },
      });

      expect(middleware['excludeRoute']('bar')).to.equal(false);
      expect(middleware['excludeRoute']('foo')).to.equal(true);
    });
  });

  it('extractDebugHeaders', () => {
    const middleware = new SampleMiddleware();

    const headers = new Headers({});
    headers.set('foo', 'net');
    headers.set('bar', 'one');

    expect(middleware['extractDebugHeaders'](headers)).to.deep.equal({
      foo: 'net',
      bar: 'one',
    });
  });

  describe('getHostHeader', () => {
    it('should return default hostname when header is not present', () => {
      const middleware = new SampleMiddleware();
      const req = createReq({
        headerValues: {
          foo: 'one',
        },
      });

      expect(middleware['getHostHeader'](req)).to.equal(undefined);
    });

    it('should return host header', () => {
      const middleware = new SampleMiddleware();
      const req = createReq({
        headerValues: {
          foo: 'one',
          host: 'bar.net:9999',
        },
      });

      expect(middleware['getHostHeader'](req)).to.equal('bar.net');
    });
  });

  describe('getLanguage', () => {
    it('should return defined language', () => {
      const middleware = new SampleMiddleware();
      const req = createReq({
        nextUrl: {
          locale: 'be',
          defaultLocale: 'fr',
        },
      });

      expect(middleware['getLanguage'](req)).to.equal('be');
    });

    it('should return defined default language', () => {
      const middleware = new SampleMiddleware();
      const req = createReq({
        nextUrl: {
          defaultLocale: 'fr',
        },
      });

      expect(middleware['getLanguage'](req)).to.equal('fr');
    });

    it('should return fallback language', () => {
      const middleware = new SampleMiddleware();
      const req = createReq();

      expect(middleware['getLanguage'](req)).to.equal('en');
    });
  });
});
