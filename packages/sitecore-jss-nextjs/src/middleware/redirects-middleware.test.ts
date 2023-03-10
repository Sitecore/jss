/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable dot-notation */
import chai, { use } from 'chai';
import chaiString from 'chai-string';
import sinonChai from 'sinon-chai';
import sinon, { spy } from 'sinon';
import { NextRequest, NextResponse } from 'next/server';
import { debug } from '@sitecore-jss/sitecore-jss';
import { REDIRECT_TYPE_SERVER_TRANSFER, SiteResolver } from '@sitecore-jss/sitecore-jss/site';
import { RedirectsMiddleware } from './redirects-middleware';

use(sinonChai);
const expect = chai.use(chaiString).expect;

describe('RedirectsMiddleware', () => {
  const debugSpy = spy(debug, 'redirects');
  const validateDebugLog = (message, ...params) =>
    expect(debugSpy.args.find((log) => log[0] === message)).to.deep.equal([message, ...params]);

  const referrer = 'http://localhost:3000';
  const hostname = 'foo.net';
  const siteName = 'nextjs-app';

  const createRequest = (props: any = {}) => {
    const req = {
      ...props,
      nextUrl: {
        pathname: '/styleguide',
        locale: 'en',
        clone() {
          return Object.assign({}, req.nextUrl);
        },
        ...props?.nextUrl,
      },
      cookies: {
        get(key: string) {
          return { value: req.cookies[key] };
        },
        ...props.cookies,
      },
      headers: {
        host: hostname,
        get(key: string) {
          return req.headers[key];
        },
        ...props.headerValues,
      },
      referrer,
    } as NextRequest;

    return req;
  };

  const createResponse = ({ setCookies, ...rest }: any = {}) => {
    return {
      cookies: {
        set: setCookies || (() => {}),
      },
      ...rest,
    };
  };

  const createMiddleware = (
    props: {
      [key: string]: unknown;
      pattern?: string;
      target?: string;
      redirectType?: string;
      isQueryStringPreserved?: boolean;
      locale?: string;
      fetchRedirectsStub?: sinon.SinonStub;
      defaultHostname?: string;
      siteResolver?: SiteResolver;
    } = {}
  ) => {
    class MockSiteResolver extends SiteResolver {
      getByName = sinon.stub().callsFake((siteName: string) => ({
        name: siteName,
        language: props.language || '',
        hostName: hostname,
      }));

      getByHost = sinon.stub().callsFake((hostName: string) => ({
        name: siteName,
        language: props.language || '',
        hostName,
      }));
    }

    const siteResolver = props.siteResolver || new MockSiteResolver([]);

    const middleware = new RedirectsMiddleware({
      siteResolver,
      ...props,
      apiKey: 'edge-api-key',
      endpoint: 'http://edge-endpoint/api/graph/edge',
      locales: ['en', 'ua'],
    });

    const fetchRedirects = (middleware['redirectsService']['fetchRedirects'] =
      props.fetchRedirectsStub ||
      sinon.stub().returns(
        Promise.resolve(
          Object.keys(props).length
            ? [
                {
                  ...props,
                },
              ]
            : []
        )
      ));

    return { middleware, fetchRedirects, siteResolver };
  };

  // Stub for NextResponse generation, see https://github.com/vercel/next.js/issues/42374
  (Headers.prototype as any).getAll = () => [];

  beforeEach(() => {
    debugSpy.resetHistory();
  });

  describe('redirects middleware - getHandler', () => {
    describe('preview', () => {
      it('prerender bypass cookie is present', async () => {
        const { middleware } = createMiddleware();
        const res = NextResponse.next();

        const req = createRequest({
          cookies: {
            __prerender_bypass: true,
          },
        });

        const finalRes = await middleware.getHandler()(req, res);

        validateDebugLog('redirects middleware start: %o', {
          pathname: '/styleguide',
        });

        validateDebugLog('skipped (%s)', 'preview');

        expect(finalRes).to.deep.equal(res);
      });

      it('preview data cookie is present', async () => {
        const { middleware } = createMiddleware();
        const res = NextResponse.next();

        const req = createRequest({
          cookies: {
            __next_preview_data: true,
          },
        });

        const finalRes = await middleware.getHandler()(req, res);

        validateDebugLog('redirects middleware start: %o', {
          pathname: '/styleguide',
        });

        validateDebugLog('skipped (%s)', 'preview');

        expect(finalRes).to.deep.equal(res);
      });
    });

    describe('exclude route', () => {
      const res = NextResponse.next();

      const test = async (pathname: string, middleware) => {
        const req = createRequest({
          nextUrl: {
            pathname,
          },
        });

        const finalRes = await middleware.getHandler()(req, res);

        validateDebugLog('redirects middleware start: %o', {
          pathname,
        });

        validateDebugLog('skipped (%s)', 'route excluded');

        debugSpy.resetHistory();

        expect(finalRes).to.deep.equal(res);
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

        const { middleware } = createMiddleware({
          excludeRoute,
        });

        await test('/src/image.png', middleware);
        await test('/api/layout/render', middleware);
        await test('/sitecore/render', middleware);
        await test('/_next/webpack', middleware);
        await test('/crazypath/luna', middleware);
      });
    });

    it('should return next response if disabled is true', async () => {
      const res = createResponse({
        url: 'http://localhost:3000',
      });
      const nextStub = sinon
        .stub(NextResponse, 'next')
        .callsFake(() => (res as unknown) as NextResponse);

      const props = {
        disabled: (req) => req?.nextUrl.pathname === '/styleguide' && req.nextUrl.locale === 'en',
      };
      const req = createRequest();
      const { middleware } = createMiddleware(props);
      const finalRes = await middleware.getHandler()(req);

      validateDebugLog('redirects middleware start: %o', {
        pathname: '/styleguide',
      });

      validateDebugLog('skipped (redirects middleware is disabled)');

      expect(finalRes).to.deep.equal(res);

      nextStub.restore();
    });

    it('should return next response when redirects does not exist', async () => {
      const res = createResponse({
        url: 'http://localhost:3000/found',
      });
      const nextStub = sinon.stub(NextResponse, 'next').returns((res as unknown) as NextResponse);
      const req = createRequest();
      const { middleware, fetchRedirects, siteResolver } = createMiddleware();
      const finalRes = await middleware.getHandler()(req);

      validateDebugLog('redirects middleware start: %o', {
        pathname: '/styleguide',
      });

      validateDebugLog('skipped (redirect does not exist)');

      expect(siteResolver.getByHost).to.be.calledWith(hostname);
      // eslint-disable-next-line no-unused-expressions
      expect(fetchRedirects.called).to.be.true;
      expect(finalRes).to.deep.equal(res);

      nextStub.restore();
    });

    describe('should return appropriate redirect type when redirects exists', () => {
      it('should return 301 redirect', async () => {
        const setCookies = () => {};
        const res = createResponse({
          url: 'http://localhost:3000/found',
          status: 301,
          setCookies,
        });
        const nextRedirectStub = sinon.stub(NextResponse, 'redirect').callsFake((url, status) => {
          return ({
            url,
            status,
            cookies: { set: setCookies },
          } as unknown) as NextResponse;
        });
        const req = createRequest({
          nextUrl: {
            pathname: '/not-found',
            locale: 'en',
            clone() {
              return Object.assign({}, req.nextUrl);
            },
          },
        });

        const { middleware, fetchRedirects, siteResolver } = createMiddleware({
          pattern: 'not-found',
          target: 'http://localhost:3000/found',
          redirectType: 'REDIRECT_301',
          isQueryStringPreserved: true,
          locale: 'en',
        });

        const finalRes = await middleware.getHandler()(req);

        validateDebugLog('redirects middleware start: %o', {
          pathname: '/not-found',
        });

        validateDebugLog('redirects middleware end: %o', {
          redirectUrl: 'http://localhost:3000/found',
          siteName,
        });

        expect(siteResolver.getByHost).to.be.calledWith(hostname);
        // eslint-disable-next-line no-unused-expressions
        expect(fetchRedirects.called).to.be.true;
        expect(finalRes).to.deep.equal(res);
        expect(finalRes.status).to.equal(res.status);

        nextRedirectStub.restore();
      });

      it('should override locale with locale parsed from target', async () => {
        const setCookies = () => {};
        const res = createResponse({
          url: 'http://localhost:3000/ua/found',
          status: 301,
          setCookies,
        });
        const nextRewriteStub = sinon.stub(NextResponse, 'rewrite').callsFake((url) => {
          return ({
            url,
            status: 301,
            cookies: { set: setCookies },
          } as unknown) as NextResponse;
        });
        const req = createRequest({
          nextUrl: {
            pathname: '/not-found',
            locale: 'en',
            clone() {
              return Object.assign({}, req.nextUrl);
            },
          },
        });

        const { middleware, fetchRedirects, siteResolver } = createMiddleware({
          pattern: 'not-found',
          target: 'http://localhost:3000/ua/found',
          redirectType: REDIRECT_TYPE_SERVER_TRANSFER,
          isQueryStringPreserved: true,
          locale: 'en',
        });

        const finalRes = await middleware.getHandler()(req);

        validateDebugLog('redirects middleware start: %o', {
          pathname: '/not-found',
        });

        validateDebugLog('redirects middleware end: %o', {
          redirectUrl: 'http://localhost:3000/ua/found',
          siteName,
        });

        expect(siteResolver.getByHost).to.be.calledWith(hostname);
        // eslint-disable-next-line no-unused-expressions
        expect(fetchRedirects.called).to.be.true;
        expect(finalRes).to.deep.equal(res);
        expect(finalRes.status).to.equal(res.status);

        nextRewriteStub.restore();
      });

      it('should preserve query string on relative path redirect, when isQueryStringPreserved is true', async () => {
        const setCookies = () => {};
        const res = createResponse({
          url: 'http://localhost:3000/found?abc=def',
          status: 301,
          setCookies,
        });
        const nextRewriteStub = sinon.stub(NextResponse, 'rewrite').callsFake((url) => {
          return ({
            url,
            status: 301,
            cookies: { set: setCookies },
          } as unknown) as NextResponse;
        });
        const req = createRequest({
          nextUrl: {
            pathname: '/not-found',
            search: 'abc=def',
            href: 'http://localhost:3000/found?abc=def',
            clone() {
              return Object.assign({}, req.nextUrl);
            },
          },
        });

        const { middleware, fetchRedirects, siteResolver } = createMiddleware({
          pattern: 'not-found',
          target: '/found',
          redirectType: REDIRECT_TYPE_SERVER_TRANSFER,
          isQueryStringPreserved: true,
        });

        const finalRes = await middleware.getHandler()(req);

        validateDebugLog('redirects middleware start: %o', {
          pathname: '/not-found',
        });

        validateDebugLog('redirects middleware end: %o', {
          redirectUrl: 'http://localhost:3000/found?abc=def',
          siteName,
        });

        expect(siteResolver.getByHost).to.be.calledWith(hostname);
        // eslint-disable-next-line no-unused-expressions
        expect(fetchRedirects.called).to.be.true;
        expect(finalRes).to.deep.equal(res);
        expect(finalRes.status).to.equal(res.status);

        nextRewriteStub.restore();
      });

      it('should return 302 redirect', async () => {
        const setCookies = () => {};
        const res = createResponse({
          url: 'http://localhost:3000/found',
          status: 302,
          setCookies,
        });
        const nextRedirectStub = sinon.stub(NextResponse, 'redirect').callsFake((url, status) => {
          return ({
            url,
            status,
            cookies: { set: setCookies },
          } as unknown) as NextResponse;
        });

        const req = createRequest({
          nextUrl: {
            pathname: '/not-found',
            locale: 'en',
            clone() {
              return Object.assign({}, req.nextUrl);
            },
          },
        });

        const { middleware, fetchRedirects, siteResolver } = createMiddleware({
          pattern: 'not-found',
          target: 'http://localhost:3000/found',
          redirectType: 'REDIRECT_302',
          isQueryStringPreserved: true,
          locale: 'en',
        });

        const finalRes = await middleware.getHandler()(req);

        validateDebugLog('redirects middleware start: %o', {
          pathname: '/not-found',
        });

        validateDebugLog('redirects middleware end: %o', {
          redirectUrl: 'http://localhost:3000/found',
          siteName,
        });

        expect(siteResolver.getByHost).to.be.calledWith(hostname);
        // eslint-disable-next-line no-unused-expressions
        expect(fetchRedirects.called).to.be.true;
        expect(finalRes).to.deep.equal(res);
        expect(finalRes.status).to.equal(res.status);

        nextRedirectStub.restore();
      });

      it('should return default response if no redirect type defined', async () => {
        const setCookies = () => {};
        const res = createResponse({
          url: 'http://localhost:3000/found',
          status: 301,
          setCookies,
        });
        const nextStub = sinon.stub(NextResponse, 'next').callsFake(() => {
          return res;
        });
        const req = createRequest({
          nextUrl: {
            pathname: '/not-found',
            locale: 'en',
            clone() {
              return Object.assign({}, req.nextUrl);
            },
          },
        });

        const { middleware, fetchRedirects, siteResolver } = createMiddleware({
          pattern: 'not-found',
          target: 'http://localhost:3000/found',
          redirectType: 'default',
          isQueryStringPreserved: true,
          locale: 'en',
        });

        const finalRes = await middleware.getHandler()(req);

        validateDebugLog('redirects middleware start: %o', {
          pathname: '/not-found',
        });

        validateDebugLog('redirects middleware end: %o', {
          redirectUrl: 'http://localhost:3000/found',
          siteName,
        });

        expect(siteResolver.getByHost).to.be.calledWith(hostname);
        // eslint-disable-next-line no-unused-expressions
        expect(fetchRedirects.called).to.be.true;
        expect(finalRes).to.deep.equal(res);

        nextStub.restore();
      });

      it('should rewrite path when redirect type is server transfer', async () => {
        const setCookies = () => {};
        const res = createResponse({
          url: 'http://localhost:3000/found',
          setCookies,
        });
        const nextRewriteStub = sinon.stub(NextResponse, 'rewrite').callsFake((url) => {
          return ({
            url,
            cookies: { set: setCookies },
          } as unknown) as NextResponse;
        });
        const req = createRequest({
          nextUrl: {
            pathname: '/not-found',
            locale: 'en',
            clone() {
              return Object.assign({}, req.nextUrl);
            },
          },
        });

        const { middleware, fetchRedirects, siteResolver } = createMiddleware({
          pattern: 'not-found',
          target: 'http://localhost:3000/found',
          redirectType: REDIRECT_TYPE_SERVER_TRANSFER,
          isQueryStringPreserved: true,
          locale: 'en',
        });

        const finalRes = await middleware.getHandler()(req);

        validateDebugLog('redirects middleware start: %o', {
          pathname: '/not-found',
        });

        validateDebugLog('redirects middleware end: %o', {
          redirectUrl: 'http://localhost:3000/found',
          siteName,
        });

        expect(siteResolver.getByHost).to.be.calledWith(hostname);
        // eslint-disable-next-line no-unused-expressions
        expect(fetchRedirects.called).to.be.true;
        expect(finalRes).to.deep.equal(res);

        nextRewriteStub.restore();
      });

      it('should use sc_site cookie', async () => {
        const siteName = 'foo';
        const res = NextResponse.redirect('http://localhost:3000/found', 301);
        res.cookies.set('sc_site', siteName);
        const req = createRequest({
          nextUrl: {
            pathname: '/not-found',
            locale: 'en',
            clone() {
              return Object.assign({}, req.nextUrl);
            },
          },
        });

        const { middleware, fetchRedirects, siteResolver } = createMiddleware({
          pattern: 'not-found',
          target: 'http://localhost:3000/found',
          redirectType: 'REDIRECT_301',
          isQueryStringPreserved: true,
          locale: 'en',
        });

        const finalRes = await middleware.getHandler()(req, res);

        validateDebugLog('redirects middleware start: %o', {
          pathname: '/not-found',
        });

        validateDebugLog('redirects middleware end: %o', {
          redirectUrl: 'http://localhost:3000/found',
          siteName,
        });

        expect(siteResolver.getByHost).not.called.to.equal(true);
        expect(siteResolver.getByName).to.be.calledWith(siteName);
        expect(fetchRedirects).to.be.calledWith(siteName);
        expect(finalRes).to.deep.equal(res);
        expect(finalRes.status).to.equal(res.status);
      });

      it('should preserve site name from response data when provided, if no redirect type defined', async () => {
        const res = NextResponse.next();
        const site = 'learn2grow';
        res.cookies.set('sc_site', site);
        const req = createRequest({
          nextUrl: {
            pathname: '/not-found',
            locale: 'en',
            clone() {
              return Object.assign({}, req.nextUrl);
            },
          },
        });

        const { middleware, fetchRedirects, siteResolver } = createMiddleware({
          pattern: 'not-found',
          target: 'http://localhost:3000/found',
          redirectType: 'default',
          isQueryStringPreserved: true,
          locale: 'en',
        });

        const finalRes = await middleware.getHandler()(req, res);

        validateDebugLog('redirects middleware start: %o', {
          pathname: '/not-found',
        });

        validateDebugLog('redirects middleware end: %o', {
          redirectUrl: 'http://localhost:3000/found',
          siteName: site,
        });

        expect(siteResolver.getByHost).to.not.be.called;
        expect(siteResolver.getByName).to.be.calledWith(site);
        expect(fetchRedirects.called).to.be.true;
        expect(finalRes.cookies.get('sc_site')?.value).to.equal(site);
      });

      it('should preserve site name from response data when provided, if handler is disabled', async () => {
        const res = NextResponse.next();
        const site = 'learn2grow';
        res.cookies.set('sc_site', site);
        const req = createRequest({
          nextUrl: {
            pathname: '/not-found',
            locale: 'en',
            clone() {
              return Object.assign({}, req.nextUrl);
            },
          },
        });

        const { middleware, fetchRedirects, siteResolver } = createMiddleware({
          pattern: 'not-found',
          target: 'http://localhost:3000/found',
          redirectType: 'default',
          isQueryStringPreserved: true,
          locale: 'en',
          disabled: () => true,
        });

        const finalRes = await middleware.getHandler()(req, res);

        validateDebugLog('redirects middleware start: %o', {
          pathname: '/not-found',
        });

        validateDebugLog('skipped (redirects middleware is disabled)');

        expect(siteResolver.getByHost).to.not.be.called;
        expect(siteResolver.getByName).to.not.be.called;
        expect(fetchRedirects.called).to.be.false;
        expect(finalRes.cookies.get('sc_site')?.value).to.equal(site);
      });

      it('default fallback hostname is used', async () => {
        const setCookies = () => {};
        const res = createResponse({
          url: 'http://localhost:3000/found',
          status: 301,
          setCookies,
        });
        const nextRedirectStub = sinon.stub(NextResponse, 'redirect').callsFake((url, status) => {
          return ({
            url,
            status,
            cookies: { set: setCookies },
          } as unknown) as NextResponse;
        });

        const req = createRequest({
          headerValues: {
            host: undefined,
          },
          nextUrl: {
            pathname: '/not-found',
            locale: 'en',
            clone() {
              return Object.assign({}, req.nextUrl);
            },
          },
        });

        const { middleware, fetchRedirects, siteResolver } = createMiddleware({
          pattern: 'not-found',
          target: 'http://localhost:3000/found',
          redirectType: 'REDIRECT_301',
          isQueryStringPreserved: true,
          locale: 'en',
        });

        const finalRes = await middleware.getHandler()(req);

        validateDebugLog('redirects middleware start: %o', {
          pathname: '/not-found',
        });

        validateDebugLog('host header is missing, default localhost is used');

        validateDebugLog('redirects middleware end: %o', {
          redirectUrl: 'http://localhost:3000/found',
          siteName,
        });

        expect(siteResolver.getByHost).to.be.calledWith('localhost');
        expect(fetchRedirects).to.be.calledWith(siteName);
        expect(finalRes).to.deep.equal(res);
        expect(finalRes.status).to.equal(res.status);

        nextRedirectStub.restore();
      });

      it('custom fallback hostname is used', async () => {
        const setCookies = () => {};
        const res = createResponse({
          url: 'http://localhost:3000/found',
          status: 301,
          setCookies,
        });
        const nextRedirectStub = sinon.stub(NextResponse, 'redirect').callsFake((url, status) => {
          return ({
            url,
            status,
            cookies: { set: setCookies },
          } as unknown) as NextResponse;
        });

        const req = createRequest({
          headerValues: {
            host: undefined,
          },
          nextUrl: {
            pathname: '/not-found',
            locale: 'en',
            clone() {
              return Object.assign({}, req.nextUrl);
            },
          },
        });

        const { middleware, fetchRedirects, siteResolver } = createMiddleware({
          pattern: 'not-found',
          target: 'http://localhost:3000/found',
          redirectType: 'REDIRECT_301',
          isQueryStringPreserved: true,
          locale: 'en',
          defaultHostname: 'foobar',
        });

        const finalRes = await middleware.getHandler()(req);

        validateDebugLog('redirects middleware start: %o', {
          pathname: '/not-found',
        });

        validateDebugLog('host header is missing, default foobar is used');

        validateDebugLog('redirects middleware end: %o', {
          redirectUrl: 'http://localhost:3000/found',
          siteName,
        });

        expect(siteResolver.getByHost).to.be.calledWith('foobar');
        expect(fetchRedirects).to.be.calledWith(siteName);
        expect(finalRes).to.deep.equal(res);
        expect(finalRes.status).to.equal(res.status);

        nextRedirectStub.restore();
      });
    });
  });
});
