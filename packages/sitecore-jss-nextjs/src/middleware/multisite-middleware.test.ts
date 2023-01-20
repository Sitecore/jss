/* eslint-disable no-unused-expressions */
/* eslint-disable dot-notation */
import chai, { use } from 'chai';
import chaiString from 'chai-string';
import sinonChai from 'sinon-chai';
import sinon, { spy } from 'sinon';
import nextjs, { NextRequest, NextResponse } from 'next/server';
import { debug } from '@sitecore-jss/sitecore-jss';

import { MultisiteMiddleware } from './multisite-middleware';
import { SiteInfo } from '@sitecore-jss/sitecore-jss/site';

use(sinonChai);
const expect = chai.use(chaiString).expect;

describe('MultisiteMiddleware', () => {
  const debugSpy = spy(debug, 'multisite');
  const validateDebugLog = (message, ...params) =>
    expect(debugSpy.args.find((log) => log[0] === message)).to.deep.equal([message, ...params]);

  const siteName = 'foo';

  const createRequest = (props: any = {}) => {
    const req = {
      ...props,
      nextUrl: {
        pathname: '/styleguide',
        clone() {
          return Object.assign({}, req.nextUrl);
        },
        searchParams: {
          get(key) {
            return req.nextUrl.searchParams[key];
          },
          ...props.searchParams,
        },
        ...props.nextUrl,
      },
      headers: {
        get(key: string) {
          const headers = { host: 'foo.net', ...props.headerValues };
          return headers[key];
        },
        ...props.headers,
      },
      cookies: {
        get(cookieName: string) {
          const cookies = { ...props.cookieValues };
          return cookies[cookieName];
        },
        ...props?.cookies,
        ...props.cookieValues,
      },
    } as NextRequest;

    return req;
  };

  const createResponse = (props: any = {}) => {
    const res = {
      cookies: {
        set(key, value) {
          res.cookies[key] = value;
        },
      },
      headers: {},
      ...props,
    } as NextResponse;

    Object.defineProperties(res.headers, {
      set: {
        value: (key, value) => {
          res.headers[key] = value;
        },
        enumerable: false,
      },
      forEach: {
        value: (cb) => {
          Object.keys(res.headers).forEach((key) => cb(res.headers[key], key, res.headers));
        },
        enumerable: false,
      },
    });

    return res;
  };

  const createMiddleware = (props = {}) => {
    const middleware = new MultisiteMiddleware({
      getSite(hostName) {
        return { name: siteName, hostName } as SiteInfo;
      },
      ...props,
    });

    const getSite = spy(middleware['config'], 'getSite');

    return { middleware, getSite };
  };

  beforeEach(() => {
    debugSpy.resetHistory();
  });

  describe('request skipped', () => {
    describe('excluded route', () => {
      const res = createResponse();

      const test = async (pathname: string, middleware) => {
        const req = createRequest({
          nextUrl: {
            pathname,
          },
        });

        const finalRes = await middleware.getHandler()(req, res);

        validateDebugLog('multisite middleware start: %o', {
          pathname,
          hostname: 'foo.net',
        });

        validateDebugLog('skipped (route excluded)');

        expect(finalRes).to.deep.equal(res);

        debugSpy.resetHistory();
      };

      it('default', async () => {
        const { middleware } = createMiddleware();

        await test('/src/image.png', middleware);
        await test('/api/layout/render', middleware);
        await test('/sitecore/render', middleware);
        await test('/_next/webpack', middleware);
      });

      it('should apply both default and custom rules when custom excludeRoute function provided', async () => {
        const excludeRoute = (pathname: string) => pathname === '/crazypath/luna';

        const { middleware } = createMiddleware({ excludeRoute });

        await test('/src/image.png', middleware);
        await test('/api/layout/render', middleware);
        await test('/sitecore/render', middleware);
        await test('/_next/webpack', middleware);
        await test('/crazypath/luna', middleware);
      });
    });
  });

  describe('request passed', () => {
    it('fallback hostname is used', async () => {
      const req = createRequest({ headerValues: { host: undefined } });

      const res = createResponse();

      const nextRewriteStub = sinon.stub(nextjs.NextResponse, 'rewrite').returns(res);

      const { middleware, getSite } = createMiddleware({ defaultHostname: 'bar.net' });

      const finalRes = await middleware.getHandler()(req, res);

      validateDebugLog('multisite middleware start: %o', {
        pathname: '/styleguide',
        hostname: 'bar.net',
      });

      validateDebugLog('host header is missing, default bar.net is used');

      validateDebugLog('multisite middleware end: %o', {
        rewritePath: '/_site_foo/styleguide',
        siteName: 'foo',
        headers: {
          'x-sc-rewrite': '/_site_foo/styleguide',
        },
        cookies: {
          ...res.cookies,
          sc_site: 'foo',
        },
      });

      expect(getSite).to.be.calledWith('bar.net');

      expect(finalRes).to.deep.equal(res);

      expect(nextRewriteStub).calledWith({
        ...req.nextUrl,
        pathname: '/_site_foo/styleguide',
      });

      nextRewriteStub.restore();
    });

    it('fallback default hostName is used', async () => {
      const req = createRequest({ headerValues: { host: undefined } });

      const res = createResponse();

      const nextRewriteStub = sinon.stub(nextjs.NextResponse, 'rewrite').returns(res);

      const { middleware, getSite } = createMiddleware();

      const finalRes = await middleware.getHandler()(req, res);

      validateDebugLog('multisite middleware start: %o', {
        pathname: '/styleguide',
        hostname: 'localhost',
      });

      validateDebugLog('host header is missing, default localhost is used');

      validateDebugLog('multisite middleware end: %o', {
        rewritePath: '/_site_foo/styleguide',
        siteName: 'foo',
        headers: {
          'x-sc-rewrite': '/_site_foo/styleguide',
        },
        cookies: {
          ...res.cookies,
          sc_site: 'foo',
        },
      });

      expect(getSite).to.be.calledWith('localhost');

      expect(finalRes).to.deep.equal(res);

      expect(nextRewriteStub).calledWith({
        ...req.nextUrl,
        pathname: '/_site_foo/styleguide',
      });

      nextRewriteStub.restore();
    });

    it('host header is used', async () => {
      const req = createRequest();

      const res = createResponse();

      const nextRewriteStub = sinon.stub(nextjs.NextResponse, 'rewrite').returns(res);

      const { middleware, getSite } = createMiddleware();

      const finalRes = await middleware.getHandler()(req, res);

      validateDebugLog('multisite middleware start: %o', {
        pathname: '/styleguide',
        hostname: 'foo.net',
      });

      validateDebugLog('multisite middleware end: %o', {
        rewritePath: '/_site_foo/styleguide',
        siteName: 'foo',
        headers: {
          'x-sc-rewrite': '/_site_foo/styleguide',
        },
        cookies: {
          ...res.cookies,
          sc_site: 'foo',
        },
      });

      expect(getSite).to.be.calledWith('foo.net');

      expect(finalRes).to.deep.equal(res);

      expect(nextRewriteStub).calledWith({
        ...req.nextUrl,
        pathname: '/_site_foo/styleguide',
      });

      nextRewriteStub.restore();
    });

    it('custom response object is not provided', async () => {
      const req = createRequest();

      const res = createResponse();

      const nextRewriteStub = sinon.stub(nextjs.NextResponse, 'rewrite').returns(res);

      const { middleware, getSite } = createMiddleware({});

      const finalRes = await middleware.getHandler()(req);

      validateDebugLog('multisite middleware start: %o', {
        pathname: '/styleguide',
        hostname: 'foo.net',
      });

      validateDebugLog('multisite middleware end: %o', {
        rewritePath: '/_site_foo/styleguide',
        siteName: 'foo',
        headers: {
          'x-sc-rewrite': '/_site_foo/styleguide',
        },
        cookies: {
          ...res.cookies,
          sc_site: 'foo',
        },
      });

      expect(getSite).to.be.calledWith('foo.net');

      expect(finalRes).to.deep.equal(res);

      expect(nextRewriteStub).calledWith({
        ...req.nextUrl,
        pathname: '/_site_foo/styleguide',
      });

      nextRewriteStub.restore();
    });

    it('sc_site querystring parameter is provided', async () => {
      const req = createRequest({ searchParams: { sc_site: 'qsFoo' } });

      const res = createResponse();

      const nextRewriteStub = sinon.stub(nextjs.NextResponse, 'rewrite').returns(res);

      const { middleware, getSite } = createMiddleware();

      const finalRes = await middleware.getHandler()(req, res);

      validateDebugLog('multisite middleware start: %o', {
        pathname: '/styleguide',
        hostname: 'foo.net',
      });

      validateDebugLog('multisite middleware end: %o', {
        rewritePath: '/_site_qsFoo/styleguide',
        siteName: 'qsFoo',
        headers: {
          'x-sc-rewrite': '/_site_qsFoo/styleguide',
        },
        cookies: {
          ...res.cookies,
          sc_site: 'qsFoo',
        },
      });

      expect(getSite.notCalled).equal(true);

      expect(finalRes).to.deep.equal(res);

      expect(nextRewriteStub).calledWith({
        ...req.nextUrl,
        pathname: '/_site_qsFoo/styleguide',
      });

      nextRewriteStub.restore();
    });

  });

  describe('error handling', () => {
    const req = createRequest();
    const res = createResponse();

    let errorSpy;

    before(() => {
      errorSpy = spy(console, 'log');
    });

    beforeEach(() => {
      errorSpy.resetHistory();
    });

    after(() => {
      errorSpy.restore();
    });

    it('should handle error', async () => {
      const error = new Error('Custom error');

      const { middleware } = createMiddleware({
        getSite() {
          throw error;
        },
      });

      const finalRes = await middleware.getHandler()(req, res);

      expect(errorSpy.getCall(0).calledWith('Multisite middleware failed:')).to.be.true;
      expect(errorSpy.getCall(1).calledWith(error)).to.be.true;

      expect(finalRes).to.deep.equal(res);
    });
  });
});
