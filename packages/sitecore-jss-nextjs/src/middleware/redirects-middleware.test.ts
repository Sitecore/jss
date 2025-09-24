/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable dot-notation */
import { debug, GraphQLRequestClient } from '@sitecore-jss/sitecore-jss';
import {
  REDIRECT_TYPE_301,
  REDIRECT_TYPE_302,
  REDIRECT_TYPE_SERVER_TRANSFER,
  SiteResolver,
} from '@sitecore-jss/sitecore-jss/site';
import chai, { use } from 'chai';
import chaiString from 'chai-string';
import { NextRequest, NextResponse } from 'next/server';
import sinon, { spy } from 'sinon';
import sinonChai from 'sinon-chai';
import { RedirectsMiddleware } from './redirects-middleware';
import { REWRITE_HEADER_NAME } from './middleware';

use(sinonChai);
const expect = chai.use(chaiString).expect;

describe('RedirectsMiddleware', () => {
  let nextRedirectStub, nextRewriteStub;

  const debugSpy = spy(debug, 'redirects');
  const validateDebugLog = (message, ...params) =>
    expect(debugSpy.args.find((log) => log[0] === message)).to.deep.equal([message, ...params]);

  function validateEndMessageDebugLog(actualOrMsg: any, expected: any) {
    const actual =
      typeof actualOrMsg === 'string'
        ? debugSpy.args.find((args) => args[0] === actualOrMsg)?.[2]
        : actualOrMsg;

    if (!actual || typeof actual !== 'object') {
      throw new Error(
        `Invalid 'actual' payload passed to validateEndMessageDebugLog: ${JSON.stringify(actual)}`
      );
    }

    const normalizeHeaders = (headers: Headers | Record<string, string> | string = {}) => {
      const result: Record<string, string> = {};
      if (headers instanceof Headers) {
        headers.forEach((value, key) => {
          result[key.toLowerCase()] = value;
        });
      } else if (headers && typeof headers === 'object') {
        Object.entries(headers).forEach(([k, v]) => {
          result[k.toLowerCase()] = String(v);
        });
      } else if (typeof headers === 'string') {
        // Sometimes shows up as "[object Headers]" in logs; treat as empty.
      }
      // Ignore internal rewrite marker so rewrite cases don't fail when expected {}.
      if (typeof REWRITE_HEADER_NAME === 'string') {
        delete result[REWRITE_HEADER_NAME.toLowerCase()];
      }
      return result;
    };

    const normalizeUrl = (url: any) => (typeof url === 'string' ? url : url?.href ?? '');

    expect({
      ...actual,
      url: normalizeUrl(actual.url),
      headers: normalizeHeaders(actual.headers),
    }).to.deep.equal({
      ...expected,
      url: normalizeUrl(expected.url),
      headers: normalizeHeaders(expected.headers),
    });
  }

  const referrer = 'http://localhost:3000';
  const hostname = 'foo.net';
  const siteName = 'nextjs-app';
  const sitesFromConfigFile = [
    { name: 'basicSite', hostName: 'localhost', language: 'en' },
    { name: 'nextjs-app', hostName: '*', language: 'da' },
  ];
  const setCookies = () => {};
  const getCookies = () => {};

  const createRequest = (props: any = {}) => {
    const req = {
      ...props,
      nextUrl: {
        pathname: '/styleguide',
        href: 'http://localhost:3000/styleguide',
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
    const res = {
      cookies: {
        set: setCookies || (() => {}),
        get: getCookies || (() => {}),
      },
      headers: {},
      ...rest,
    };

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

  const createMiddleware = (
    props: {
      [key: string]: unknown;
      redirectMaps?: {
        pattern: string;
        target: string;
        redirectType?: string;
        isQueryStringPreserved?: boolean;
      }[];
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
      sites = sitesFromConfigFile;
      getByName = sinon.stub().callsFake((siteName: string) => ({
        name: siteName,
        language: props.language || '',
        hostName: hostname,
      }));

      getByHost = sinon.stub().callsFake((hostName: string) => ({
        name: siteName,
        language: props.language || 'da',
        hostName,
      }));
    }

    const siteResolver = props.siteResolver || new MockSiteResolver([]);

    const clientFactory = GraphQLRequestClient.createClientFactory({
      apiKey: 'edge-api-key',
      endpoint: 'http://edge-endpoint/api/graph/edge',
    });

    const middleware = new RedirectsMiddleware({
      siteResolver,
      ...props,
      clientFactory,
      locales: ['en', 'ua', 'pl-PL'],
    });

    const redirectMaps = props.redirectMaps || [];
    if (props.pattern && props.target) {
      redirectMaps.push({
        pattern: props.pattern,
        target: props.target,
        redirectType: props.redirectType,
        isQueryStringPreserved: props.isQueryStringPreserved,
      });
    }

    const fetchRedirects = (middleware['redirectsService']['fetchRedirects'] =
      props.fetchRedirectsStub ||
      sinon.stub().returns(Promise.resolve(Object.keys(props).length ? redirectMaps : [])));

    return { middleware, fetchRedirects, siteResolver };
  };

  const setupRedirectStub = (status = 307) => {
    nextRedirectStub = sinon.stub(NextResponse, 'redirect').callsFake((url, init) => {
      const statusCode = typeof init === 'number' ? init : init?.status || status;
      const headers = typeof init === 'object' ? init?.headers : {};
      return ({
        url,
        status: statusCode,
        cookies: { set: setCookies, get: getCookies },
        headers: new Headers(headers),
      } as unknown) as NextResponse;
    });
  };

  const setupRewriteStub = (status = 200, res) => {
    nextRewriteStub = sinon.stub(NextResponse, 'rewrite').callsFake((url) => {
      const headers =
        res?.headers instanceof Headers ? res.headers : new Headers(res?.headers || {});
      headers.set(REWRITE_HEADER_NAME, typeof url === 'string' ? url : url?.href ?? String(url));

      return ({
        url,
        status,
        cookies: { set: setCookies, get: getCookies },
        headers,
      } as unknown) as NextResponse;
    });
  };

  const runTestWithRedirect = async (middlewareOptions, req, res, _hostname = hostname) => {
    const { middleware, fetchRedirects, siteResolver } = createMiddleware(middlewareOptions);
    const finalRes = await middleware.getHandler()(req, res);

    validateDebugLog('redirects middleware start: %o', {
      hostname: _hostname,
      language: middlewareOptions.locale || 'en',
      pathname: req.nextUrl.pathname,
    });

    return { finalRes, fetchRedirects, siteResolver };
  };

  const createTestRequestResponse = ({ response, request, status = 301 }) => {
    const res =
      status !== 404
        ? createResponse({
            status: status,
            setCookies,
            headers: new Headers({}),
            ...response,
          })
        : NextResponse.next();
    const req = createRequest(request);
    return { res, req };
  };

  (Headers.prototype as any).getAll = () => [];

  beforeEach(() => {
    debugSpy.resetHistory();
  });

  afterEach(() => {
    nextRedirectStub?.restore();
    nextRewriteStub?.restore();
  });

  // Helper to normalize url values when we need to compare objects vs strings
  const normalizeUrlValue = (u: any) => (typeof u === 'string' ? u : u?.href ?? '');

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
          hostname: 'foo.net',
          language: 'en',
          pathname: '/styleguide',
        });

        validateDebugLog('skipped (%s)', 'preview');

        validateEndMessageDebugLog('redirects middleware end in %dms: %o', {
          headers: {
            'x-middleware-next': '1',
          },
          redirected: false,
          status: 200,
          url: '',
        });

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
          hostname: 'foo.net',
          language: 'en',
          pathname: '/styleguide',
        });

        validateDebugLog('skipped (%s)', 'preview');

        validateEndMessageDebugLog('redirects middleware end in %dms: %o', {
          headers: {
            'x-middleware-next': '1',
          },
          redirected: false,
          status: 200,
          url: '',
        });

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
          hostname: 'foo.net',
          language: 'en',
          pathname,
        });

        validateDebugLog('skipped (%s)', 'route excluded');

        validateEndMessageDebugLog('redirects middleware end in %dms: %o', {
          headers: {
            'x-middleware-next': '1',
          },
          redirected: false,
          status: 200,
          url: '',
        });

        debugSpy.resetHistory();

        expect(finalRes).to.deep.equal(res);
      };
      it('default', async () => {
        const { middleware } = createMiddleware();

        await test('/api/layout/render', middleware);
        await test('/sitecore/render', middleware);
        await test('/_next/webpack', middleware);
      });

      it('should apply both default and custom rules when custom excludeRoute function provided', async () => {
        const excludeRoute = (pathname: string) => pathname === '/crazypath/luna';

        const { middleware } = createMiddleware({
          excludeRoute,
        });

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
        hostname: 'foo.net',
        language: 'en',
        pathname: '/styleguide',
      });

      validateDebugLog('skipped (redirects middleware is disabled)');

      validateEndMessageDebugLog('redirects middleware end in %dms: %o', {
        headers: {},
        redirected: undefined,
        status: undefined,
        url: 'http://localhost:3000',
      });

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
        hostname: 'foo.net',
        language: 'en',
        pathname: '/styleguide',
      });

      validateDebugLog('skipped (redirect does not exist)');

      validateEndMessageDebugLog('redirects middleware end in %dms: %o', {
        headers: {},
        redirected: undefined,
        status: undefined,
        url: 'http://localhost:3000/found',
      });

      expect(siteResolver.getByHost).to.be.calledWith(hostname);
      // eslint-disable-next-line no-unused-expressions
      expect(fetchRedirects.called).to.be.true;
      expect(finalRes).to.deep.equal(res);

      nextStub.restore();
    });

    describe('should return appropriate redirect type when redirects exists', () => {
      it('should return 301 redirect', async () => {
        const cloneUrl = () => Object.assign({}, req.nextUrl);
        const url = {
          href: 'http://localhost:3000/found',
          pathname: '/found',
          origin: 'http://localhost:3000',
          locale: 'en',
          search: '',
          clone: cloneUrl,
        };
        const { res, req } = createTestRequestResponse({
          response: {
            url,
          },
          request: {
            nextUrl: {
              pathname: '/not-found',
              origin: 'http://localhost:3000',
              locale: 'en',
              href: 'http://localhost:3000/not-found',
              clone: cloneUrl,
            },
          },
        });
        setupRedirectStub(301);

        const { finalRes, fetchRedirects, siteResolver } = await runTestWithRedirect(
          {
            pattern: 'not-found',
            target: '/found',
            redirectType: REDIRECT_TYPE_301,
            isQueryStringPreserved: false,
            locale: 'en',
          },
          req,
          res
        );

        validateEndMessageDebugLog('redirects middleware end in %dms: %o', {
          headers: {},
          redirected: undefined,
          status: 301,
          url,
        });

        expect(siteResolver.getByHost).to.be.calledWith(hostname);
        // eslint-disable-next-line no-unused-expressions
        expect(fetchRedirects.called).to.be.true;
        expect(finalRes).to.deep.equal(res);
        expect(finalRes.status).to.equal(res.status);
      });

      it('should override locale with locale parsed from target', async () => {
        const cloneUrl = () => Object.assign({}, req.nextUrl);
        const url = {
          pathname: 'http://localhost:3000/found',
          href: 'http://localhost:3000/not-found',
          origin: 'http://localhost:3000',
          locale: 'ua',
          clone: cloneUrl,
        };
        const { res, req } = createTestRequestResponse({
          response: {
            url,
          },
          request: {
            nextUrl: {
              pathname: '/not-found',
              href: 'http://localhost:3000/not-found',
              origin: 'http://localhost:3000',
              locale: 'en',
              clone: cloneUrl,
            },
          },
          status: 200,
        });
        setupRewriteStub(200, res);

        const { finalRes, fetchRedirects, siteResolver } = await runTestWithRedirect(
          {
            pattern: 'not-found',
            target: '/ua/found',
            redirectType: REDIRECT_TYPE_SERVER_TRANSFER,
            isQueryStringPreserved: true,
            locale: 'en',
          },
          req,
          res
        );

        validateEndMessageDebugLog('redirects middleware end in %dms: %o', {
          headers: {},
          redirected: undefined,
          status: 200,
          url,
        });

        expect(siteResolver.getByHost).to.be.calledWith(hostname);
        // eslint-disable-next-line no-unused-expressions
        expect(fetchRedirects.called).to.be.true;
        expect(finalRes).to.deep.equal(res);
        expect(finalRes.status).to.equal(res.status);
      });

      it('should preserve query string on relative path redirect, when isQueryStringPreserved is true', async () => {
        const cloneUrl = () => Object.assign({}, req.nextUrl);
        const url = {
          origin: 'http://localhost:3000',
          pathname: 'http://localhost:3000/found?abc=def',
          href: 'http://localhost:3000/not-found?abc=def',
          search: '?abc=def',
          locale: 'en',
          clone: cloneUrl,
        };
        const { res, req } = createTestRequestResponse({
          response: { url },
          request: {
            nextUrl: {
              pathname: '/not-found',
              href: 'http://localhost:3000/not-found?abc=def',
              origin: 'http://localhost:3000',
              locale: 'en',
              search: '?abc=def',
              clone: cloneUrl,
            },
          },
          status: 200,
        });

        setupRewriteStub(200, res);

        const { finalRes, fetchRedirects, siteResolver } = await runTestWithRedirect(
          {
            pattern: 'not-found?abc=def',
            target: '/found',
            redirectType: REDIRECT_TYPE_SERVER_TRANSFER,
            isQueryStringPreserved: true,
          },
          req,
          res
        );

        validateEndMessageDebugLog('redirects middleware end in %dms: %o', {
          headers: {},
          redirected: undefined,
          status: 200,
          url,
        });

        expect(siteResolver.getByHost).to.be.calledWith(hostname);
        // eslint-disable-next-line no-unused-expressions
        expect(fetchRedirects.called).to.be.true;
        expect(finalRes).to.deep.equal(res);
        expect(finalRes.status).to.equal(res.status);
      });

      it('should redirect, when pattern uses with query string', async () => {
        const cloneUrl = () => Object.assign({}, req.nextUrl);
        const url = {
          href: 'http://localhost:3000/found?abc=def',
          pathname: '/found',
          origin: 'http://localhost:3000',
          locale: 'en',
          search: '?abc=def',
          clone: cloneUrl,
        };
        const { res, req } = createTestRequestResponse({
          response: { url },
          request: {
            nextUrl: {
              pathname: '/not-found',
              search: '?abc=def',
              href: 'http://localhost:3000/not-found?abc=def',
              locale: 'en',
              origin: 'http://localhost:3000',
              clone: cloneUrl,
            },
          },
        });
        setupRedirectStub(301);

        const { finalRes, fetchRedirects, siteResolver } = await runTestWithRedirect(
          {
            pattern: 'not-found\\?abc=def',
            target: '/found',
            redirectType: REDIRECT_TYPE_301,
            isQueryStringPreserved: true,
            locale: 'en',
          },
          req,
          res
        );

        validateEndMessageDebugLog('redirects middleware end in %dms: %o', {
          headers: {},
          redirected: undefined,
          status: 301,
          url,
        });

        expect(siteResolver.getByHost).to.be.calledWith(hostname);
        // eslint-disable-next-line no-unused-expressions
        expect(fetchRedirects.called).to.be.true;
        expect(finalRes).to.deep.equal(res);
        expect(finalRes.status).to.equal(res.status);
      });

      it('should not redirect, when pattern uses with query string', async () => {
        const { res, req } = createTestRequestResponse({
          response: { url: {} },
          request: {
            nextUrl: {
              pathname: '/not-found',
              href: 'http://localhost:3000/not-found',
              locale: 'en',
              clone() {
                return Object.assign({}, req.nextUrl);
              },
            },
          },
          status: 404,
        });

        const { finalRes } = await runTestWithRedirect(
          {
            pattern: 'not-found\\?abc=def',
            target: 'http://localhost:3000/found',
            redirectType: REDIRECT_TYPE_301,
            isQueryStringPreserved: true,
            locale: 'en',
          },
          req,
          res
        );

        validateEndMessageDebugLog('redirects middleware end in %dms: %o', {
          headers: {
            'x-middleware-next': '1',
          },
          redirected: false,
          status: 200,
          url: '',
        });

        expect(finalRes).to.deep.equal(res);
      });

      it('should redirect, when target uses query string', async () => {
        const cloneUrl = () => Object.assign({}, req.nextUrl);
        const url = {
          href: 'http://localhost:3000/found?abc=def',
          pathname: '/found',
          origin: 'http://localhost:3000',
          locale: 'en',
          search: '?abc=def',
          clone: cloneUrl,
        };
        setupRedirectStub(301);
        const { res, req } = createTestRequestResponse({
          response: { url },
          request: {
            nextUrl: {
              pathname: '/not-found',
              search: '?abc=def',
              href: 'http://localhost:3000/not-found?abc=def',
              locale: 'en',
              origin: 'http://localhost:3000',
              clone: cloneUrl,
            },
          },
          status: 301,
        });

        const { finalRes, fetchRedirects, siteResolver } = await runTestWithRedirect(
          {
            pattern: 'not-found',
            target: '/found?abc=def',
            redirectType: REDIRECT_TYPE_301,
            isQueryStringPreserved: false,
            locale: 'en',
          },
          req,
          res
        );

        validateEndMessageDebugLog('redirects middleware end in %dms: %o', {
          headers: {},
          redirected: undefined,
          status: 301,
          url,
        });

        expect(siteResolver.getByHost).to.be.calledWith(hostname);
        // eslint-disable-next-line no-unused-expressions
        expect(fetchRedirects.called).to.be.true;
        expect(finalRes).to.deep.equal(res);
        expect(finalRes.status).to.equal(res.status);
      });

      it('should redirect without QS, when url has query string, pattern doesnt and query string not preserved', async () => {
        const cloneUrl = () => Object.assign({}, req.nextUrl);
        const url = {
          href: 'http://localhost:3000/found',
          pathname: '/found',
          origin: 'http://localhost:3000',
          locale: 'en',
          search: '',
          clone: cloneUrl,
        };
        setupRedirectStub(301);
        const { res, req } = createTestRequestResponse({
          response: { url },
          request: {
            nextUrl: {
              pathname: '/not-found',
              search: '?abc=def',
              href: 'http://localhost:3000/not-found?abc=def',
              locale: 'en',
              origin: 'http://localhost:3000',
              clone: cloneUrl,
            },
          },
          status: 301,
        });

        const { finalRes, fetchRedirects, siteResolver } = await runTestWithRedirect(
          {
            pattern: 'not-found',
            target: '/found',
            redirectType: REDIRECT_TYPE_301,
            isQueryStringPreserved: false,
            locale: 'en',
          },
          req,
          res
        );

        validateEndMessageDebugLog('redirects middleware end in %dms: %o', {
          headers: {},
          redirected: undefined,
          status: 301,
          url,
        });

        expect(siteResolver.getByHost).to.be.calledWith(hostname);
        // eslint-disable-next-line no-unused-expressions
        expect(fetchRedirects.called).to.be.true;
        expect(finalRes).to.deep.equal(res);
        expect(finalRes.status).to.equal(res.status);
      });

      it('should prefer pattern with locale when pattern is url', async () => {
        const cloneUrl = () => Object.assign({}, req.nextUrl);
        const url = {
          href: 'http://localhost:3000/found',
          pathname: '/found',
          origin: 'http://localhost:3000',
          locale: 'pl-PL',
          search: '',
          clone: cloneUrl,
        };
        setupRedirectStub(301);
        const { res, req } = createTestRequestResponse({
          response: { url },
          request: {
            nextUrl: {
              pathname: '/not-found',
              href: 'http://localhost:3000/pl-PL/not-found',
              locale: 'pl-PL',
              origin: 'http://localhost:3000',
              clone: cloneUrl,
            },
          },
          status: 301,
        });

        const { finalRes, fetchRedirects } = await runTestWithRedirect(
          {
            redirectMaps: [
              {
                // note: lowercase locale in pattern should still match
                pattern: '/pl-pl/not-found',
                target: '/found',
                redirectType: REDIRECT_TYPE_301,
                isQueryStringPreserved: false,
              },
              {
                pattern: '/not-found',
                target: '/still-not-found',
                redirectType: REDIRECT_TYPE_301,
                isQueryStringPreserved: false,
              },
            ],
            locale: 'pl-PL',
          },
          req,
          res
        );
        // eslint-disable-next-line no-unused-expressions
        expect(fetchRedirects.called).to.be.true;
        expect(finalRes).to.deep.equal(res);
        expect(finalRes.status).to.equal(res.status);
      });

      it('should prefer pattern with locale when pattern is regex', async () => {
        const cloneUrl = () => Object.assign({}, req.nextUrl);
        const url = {
          href: 'http://localhost:3000/found/for-real',
          pathname: '/found/for-real',
          origin: 'http://localhost:3000',
          locale: 'pl-PL',
          search: '',
          clone: cloneUrl,
        };
        setupRedirectStub(301);
        const { res, req } = createTestRequestResponse({
          response: { url },
          request: {
            nextUrl: {
              pathname: '/not-found/for-real',
              search: '',
              href: 'http://localhost:3000/not-found',
              locale: 'pl-PL',
              origin: 'http://localhost:3000',
              clone: cloneUrl,
            },
          },
          status: 301,
        });

        const { finalRes, fetchRedirects } = await runTestWithRedirect(
          {
            redirectMaps: [
              {
                pattern: '/pl-PL/not-found/(.*)',
                target: '/found/$1',
                redirectType: REDIRECT_TYPE_301,
              },
              {
                pattern: 'not-found/(.*)',
                target: '/still-not-found/$1',
                redirectType: REDIRECT_TYPE_301,
              },
            ],
            locale: 'pl-PL',
          },
          req,
          res
        );
        // eslint-disable-next-line no-unused-expressions
        expect(fetchRedirects.called).to.be.true;
        expect(finalRes).to.deep.equal(res);
        expect(finalRes.status).to.equal(res.status);
      });

      it('should redirect uses token in target', async () => {
        const cloneUrl = () => Object.assign({}, req.nextUrl);
        const url = {
          href: 'http://localhost:3000/test1',
          pathname: '/test1',
          origin: 'http://localhost:3000',
          locale: 'en',
          search: '',
          clone: cloneUrl,
        };
        setupRedirectStub(301);

        const { res, req } = createTestRequestResponse({
          response: { url },
          request: {
            nextUrl: {
              pathname: '/found1',
              search: '',
              href: 'http://localhost:3000/found1',
              locale: 'en',
              origin: 'http://localhost:3000',
              clone: cloneUrl,
            },
          },
          status: 301,
        });

        const { finalRes, fetchRedirects, siteResolver } = await runTestWithRedirect(
          {
            pattern: '/found(\\d+)/',
            target: 'test$1',
            redirectType: REDIRECT_TYPE_301,
            isQueryStringPreserved: false,
            locale: 'en',
          },
          req,
          res
        );

        validateEndMessageDebugLog('redirects middleware end in %dms: %o', {
          headers: {},
          redirected: undefined,
          status: 301,
          url,
        });

        expect(siteResolver.getByHost).to.be.calledWith(hostname);
        // eslint-disable-next-line no-unused-expressions
        expect(fetchRedirects.called).to.be.true;
        expect(finalRes).to.deep.equal(res);
        expect(finalRes.status).to.equal(res.status);
      });

      it('should return 302 redirect', async () => {
        const cloneUrl = () => Object.assign({}, req.nextUrl);
        const url = {
          href: 'http://localhost:3000/found',
          pathname: '/found',
          origin: 'http://localhost:3000',
          locale: 'en',
          search: '',
          clone: cloneUrl,
        };
        const { res, req } = createTestRequestResponse({
          response: { url },
          request: {
            nextUrl: {
              pathname: '/not-found',
              href: 'http://localhost:3000/not-found',
              locale: 'en',
              origin: 'http://localhost:3000',
              clone: cloneUrl,
            },
          },
          status: 302,
        });
        setupRedirectStub(302);

        const { finalRes, fetchRedirects, siteResolver } = await runTestWithRedirect(
          {
            pattern: 'not-found',
            target: '/found',
            redirectType: REDIRECT_TYPE_302,
            isQueryStringPreserved: false,
            locale: 'en',
          },
          req,
          res
        );

        validateEndMessageDebugLog('redirects middleware end in %dms: %o', {
          headers: {},
          redirected: undefined,
          status: 302,
          url,
        });

        expect(siteResolver.getByHost).to.be.calledWith(hostname);
        // eslint-disable-next-line no-unused-expressions
        expect(fetchRedirects.called).to.be.true;
        expect(finalRes).to.deep.equal(res);
        expect(finalRes.status).to.equal(res.status);
      });

      it('should not strip locale from external absolute URLs', async () => {
        const externalUrl = 'https://example.com/en/this-is-en';
        const cloneUrl = () => Object.assign({}, req.nextUrl);

        const url = {
          href: externalUrl,
          pathname: '/en/this-is-en',
          origin: 'https://example.com',
          locale: 'en',
          search: '',
          clone: cloneUrl,
        };

        const { res, req } = createTestRequestResponse({
          response: { url },
          request: {
            nextUrl: {
              pathname: '/ra',
              href: 'http://localhost:3000/ra',
              origin: 'http://localhost:3000',
              locale: 'en',
              clone: cloneUrl,
            },
          },
          status: 302,
        });

        setupRedirectStub(302);

        const { finalRes } = await runTestWithRedirect(
          {
            pattern: '/ra',
            target: externalUrl,
            redirectType: REDIRECT_TYPE_302,
            isQueryStringPreserved: false,
            locale: 'en',
          },
          req,
          res
        );

        // finalRes.url can be a string (from our redirect stub) or an object in some environments,
        // so normalize to compare safely.
        const normalizeUrlValue = (u: any) => (typeof u === 'string' ? u : u?.href ?? '');
        expect(normalizeUrlValue(finalRes.url)).to.equal(externalUrl);
      });

      it('should redirect uses token $siteLang in target url', async () => {
        const cloneUrl = () => Object.assign({}, req.nextUrl);
        const url = {
          href: 'http://localhost:3000/da/found',
          pathname: '/da/found',
          origin: 'http://localhost:3000',
          locale: 'da',
          search: '',
          clone: cloneUrl,
        };
        const { res, req } = createTestRequestResponse({
          response: { url },
          request: {
            nextUrl: {
              pathname: '/not-found',
              search: '',
              href: 'http://localhost:3000/not-found',
              locale: 'en',
              origin: 'http://localhost:3000',
              clone: cloneUrl,
            },
          },
        });
        setupRedirectStub(301);

        const { finalRes, fetchRedirects, siteResolver } = await runTestWithRedirect(
          {
            pattern: '/not-found/',
            target: '/$siteLang/found',
            redirectType: REDIRECT_TYPE_301,
            isQueryStringPreserved: false,
            locale: 'en',
            sites: sitesFromConfigFile,
          },
          req,
          res
        );

        validateEndMessageDebugLog('redirects middleware end in %dms: %o', {
          headers: {},
          redirected: undefined,
          status: 301,
          url,
        });

        expect(siteResolver.getByHost).to.be.calledWith(hostname);
        // eslint-disable-next-line no-unused-expressions
        expect(fetchRedirects.called).to.be.true;
        expect(finalRes).to.deep.equal(res);
        expect(finalRes.status).to.equal(res.status);
      });

      it('should return default response if no redirect type defined', async () => {
        const cloneUrl = () => Object.assign({}, req.nextUrl);
        const url = {
          href: 'http://localhost:3000/found',
          pathname: '/found',
          origin: 'http://localhost:3000',
          locale: 'en',
          search: '',
          clone: cloneUrl,
        };
        const { res, req } = createTestRequestResponse({
          response: { url },
          request: {
            nextUrl: {
              pathname: '/not-found',
              href: 'http://localhost:3000/not-found',
              locale: 'en',
              clone() {
                return Object.assign({}, req.nextUrl);
              },
            },
          },
          status: 404,
        });

        const { finalRes, fetchRedirects, siteResolver } = await runTestWithRedirect(
          {
            pattern: 'not-found',
            target: 'http://localhost:3000/found',
            redirectType: 'default',
            isQueryStringPreserved: true,
            locale: 'en',
          },
          req,
          res
        );

        validateEndMessageDebugLog('redirects middleware end in %dms: %o', {
          headers: {
            'x-middleware-next': '1',
          },
          redirected: false,
          status: 200,
          url: '',
        });

        expect(siteResolver.getByHost).to.be.calledWith(hostname);
        // eslint-disable-next-line no-unused-expressions
        expect(fetchRedirects.called).to.be.true;
        expect(finalRes).to.deep.equal(res);
      });

      it('should rewrite path when redirect type is server transfer', async () => {
        const cloneUrl = () => Object.assign({}, req.nextUrl);
        const url = {
          clone: cloneUrl,
          href: 'http://localhost:3000/not-found',
          locale: 'en',
          pathname: 'http://localhost:3000/found',
        };
        const { res, req } = createTestRequestResponse({
          response: { url },
          request: {
            nextUrl: {
              pathname: '/not-found',
              href: 'http://localhost:3000/not-found',
              locale: 'en',
              clone: cloneUrl,
            },
          },
          status: 200,
        });
        setupRewriteStub(200, res);

        const { finalRes, fetchRedirects, siteResolver } = await runTestWithRedirect(
          {
            pattern: 'not-found',
            target: 'http://localhost:3000/found',
            redirectType: REDIRECT_TYPE_SERVER_TRANSFER,
            isQueryStringPreserved: true,
            locale: 'en',
          },
          req,
          res
        );

        validateEndMessageDebugLog('redirects middleware end in %dms: %o', {
          headers: {},
          redirected: undefined,
          status: 200,
          url,
        });

        expect(siteResolver.getByHost).to.be.calledWith(hostname);
        // eslint-disable-next-line no-unused-expressions
        expect(fetchRedirects.called).to.be.true;
        expect(finalRes.status).to.equal(res.status);
      });

      it('should use sc_site cookie', async () => {
        const cloneUrl = () => Object.assign({}, req.nextUrl);
        const siteName = 'foo';
        const res = NextResponse.redirect('http://localhost:3000/found', 301);
        res.cookies.set('sc_site', siteName);
        const req = createRequest({
          nextUrl: {
            href: 'http://localhost:3000/not-found',
            pathname: 'http://localhost:3000/not-found',
            locale: 'en',
            origin: 'http://localhost:3000',
            search: '',
            clone: cloneUrl,
          },
        });

        const { middleware, fetchRedirects, siteResolver } = createMiddleware({
          pattern: 'not-found',
          target: '/found',
          redirectType: REDIRECT_TYPE_301,
          isQueryStringPreserved: true,
          locale: 'en',
        });

        const expected = NextResponse.redirect('http://localhost:3000/found', {
          ...res,
          status: 301,
          headers: { ...res?.headers },
        });

        const finalRes = await middleware.getHandler()(req, res);

        validateDebugLog('redirects middleware start: %o', {
          hostname: 'foo.net',
          language: 'en',
          pathname: 'http://localhost:3000/not-found',
        });

        validateEndMessageDebugLog('redirects middleware end in %dms: %o', {
          headers: {
            location: 'http://localhost:3000/found',
            'set-cookie': 'sc_site=foo; Path=/',
            'x-middleware-set-cookie': 'sc_site=foo; Path=/',
          },
          redirected: false,
          status: 301,
          url: '',
        });

        expect(siteResolver.getByHost).not.called.to.equal(true);
        expect(siteResolver.getByName).to.be.calledWith(siteName);
        expect(fetchRedirects).to.be.calledWith(siteName);
        expect(finalRes.status).to.equal(expected.status);
      });

      it('should preserve site name from response data when provided, if no redirect type defined', async () => {
        const res = NextResponse.next();
        const site = 'learn2grow';
        res.cookies.set('sc_site', site);
        const req = createRequest({
          nextUrl: {
            href: 'http://localhost:3000/not-found',
            pathname: '/not-found',
            locale: 'en',
            clone() {
              return Object.assign({}, req.nextUrl);
            },
          },
        });

        const { middleware, fetchRedirects, siteResolver } = createMiddleware();

        const finalRes = await middleware.getHandler()(req, res);

        validateDebugLog('redirects middleware start: %o', {
          hostname: 'foo.net',
          language: 'en',
          pathname: '/not-found',
        });

        validateEndMessageDebugLog('redirects middleware end in %dms: %o', {
          headers: {
            'set-cookie': 'sc_site=learn2grow; Path=/',
            'x-middleware-next': '1',
            'x-middleware-set-cookie': 'sc_site=learn2grow; Path=/',
          },
          redirected: false,
          status: 200,
          url: '',
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
            href: 'http://localhost:3000/not-found',
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
          hostname: 'foo.net',
          language: 'en',
          pathname: '/not-found',
        });

        validateDebugLog('skipped (redirects middleware is disabled)');

        validateEndMessageDebugLog('redirects middleware end in %dms: %o', {
          headers: {
            'set-cookie': 'sc_site=learn2grow; Path=/',
            'x-middleware-next': '1',
            'x-middleware-set-cookie': 'sc_site=learn2grow; Path=/',
          },
          redirected: false,
          status: 200,
          url: '',
        });

        expect(siteResolver.getByHost).to.not.be.called;
        expect(siteResolver.getByName).to.not.be.called;
        expect(fetchRedirects.called).to.be.false;
        expect(finalRes.cookies.get('sc_site')?.value).to.equal(site);
      });

      it('default fallback hostname is used', async () => {
        const cloneUrl = () => Object.assign({}, req.nextUrl);
        const url = {
          clone: cloneUrl,
          href: 'http://localhost:3000/found',
          locale: 'en',
          origin: 'http://localhost:3000',
          pathname: '/not-found',
        };
        const { res, req } = createTestRequestResponse({
          response: { url },
          request: {
            headerValues: {
              host: undefined,
            },
            nextUrl: {
              pathname: '/not-found',
              href: 'http://localhost:3000/not-found',
              locale: 'en',
              origin: 'http://localhost:3000',
              clone: cloneUrl,
            },
          },
        });
        setupRedirectStub(301);

        const { finalRes, fetchRedirects, siteResolver } = await runTestWithRedirect(
          {
            pattern: 'not-found',
            target: 'http://localhost:3000/found',
            redirectType: REDIRECT_TYPE_301,
            isQueryStringPreserved: true,
            locale: 'en',
          },
          req,
          res,
          'localhost'
        );

        validateEndMessageDebugLog('redirects middleware end in %dms: %o', {
          headers: {},
          redirected: undefined,
          status: 301,
          url,
        });

        expect(siteResolver.getByHost).to.be.calledWith('localhost');
        expect(fetchRedirects).to.be.calledWith(siteName);

        // Normalize URL shape (string vs object) for comparison instead of deep equality
        expect(normalizeUrlValue(finalRes.url)).to.equal(normalizeUrlValue(res.url));
        expect(finalRes.status).to.equal(res.status);
      });

      it('custom fallback hostname is used', async () => {
        const cloneUrl = () => Object.assign({}, req.nextUrl);
        const url = {
          clone: cloneUrl,
          href: 'http://localhost:3000/found',
          locale: 'en',
          origin: 'http://localhost:3000',
          pathname: '/not-found',
        };
        const { res, req } = createTestRequestResponse({
          response: { url },
          request: {
            headerValues: {
              host: undefined,
            },
            nextUrl: {
              pathname: '/not-found',
              href: 'http://localhost:3000/not-found',
              locale: 'en',
              origin: 'http://localhost:3000',
              clone: cloneUrl,
            },
          },
        });
        setupRedirectStub(301);

        const { finalRes, fetchRedirects, siteResolver } = await runTestWithRedirect(
          {
            pattern: 'not-found',
            target: 'http://localhost:3000/found',
            redirectType: REDIRECT_TYPE_301,
            isQueryStringPreserved: true,
            locale: 'en',
            defaultHostname: 'foobar',
          },
          req,
          res,
          'foobar'
        );

        validateEndMessageDebugLog('redirects middleware end in %dms: %o', {
          headers: {},
          redirected: undefined,
          status: 301,
          url,
        });

        expect(siteResolver.getByHost).to.be.calledWith('foobar');
        expect(fetchRedirects).to.be.calledWith(siteName);

        // Normalize URL shape (string vs object) for comparison instead of deep equality
        expect(normalizeUrlValue(finalRes.url)).to.equal(normalizeUrlValue(res.url));
        expect(finalRes.status).to.equal(res.status);
      });

      it('should redirect, when next.config uses params trailingSlash is true', async () => {
        const cloneUrl = () => Object.assign({}, req.nextUrl);
        const url = {
          clone: cloneUrl,
          href: 'http://localhost:3000/found/',
          locale: 'en',
          origin: 'http://localhost:3000',
          pathname: '/not-found/',
        };
        const { res, req } = createTestRequestResponse({
          response: { url },
          request: {
            nextUrl: {
              pathname: '/not-found/',
              href: 'http://localhost:3000/not-found/',
              locale: 'en',
              origin: 'http://localhost:3000',
              clone: cloneUrl,
            },
          },
        });
        setupRedirectStub(301);

        const { finalRes, fetchRedirects, siteResolver } = await runTestWithRedirect(
          {
            pattern: '/not-found/',
            target: 'http://localhost:3000/found/',
            redirectType: REDIRECT_TYPE_301,
            isQueryStringPreserved: true,
            locale: 'en',
          },
          req,
          res
        );

        validateEndMessageDebugLog('redirects middleware end in %dms: %o', {
          headers: {},
          redirected: undefined,
          status: 301,
          url,
        });

        expect(siteResolver.getByHost).to.be.calledWith(hostname);
        // eslint-disable-next-line no-unused-expressions
        expect(fetchRedirects.called).to.be.true;

        // Normalize URL shape (string vs object) for comparison instead of deep equality
        expect(normalizeUrlValue(finalRes.url)).to.equal(normalizeUrlValue(res.url));
        expect(finalRes.status).to.equal(res.status);
      });

      it('should redirect when the isQueryStringPreserved parameter is true and the target URL contains query string parameters', async () => {
        const cloneUrl = () => Object.assign({}, req.nextUrl);
        const url = {
          clone: cloneUrl,
          href: 'http://localhost:3000/found?b=1&a=1',
          locale: 'en',
          origin: 'http://localhost:3000',
          search: '?b=1&a=1',
          pathname: '/found',
        };
        const { res, req } = createTestRequestResponse({
          response: { url },
          request: {
            nextUrl: {
              pathname: '/not-found',
              href: 'http://localhost:3000/not-found?b=1',
              locale: 'en',
              origin: 'http://localhost:3000',
              search: '?b=1',
              clone: cloneUrl,
            },
          },
        });
        setupRedirectStub(301);

        const { finalRes, fetchRedirects, siteResolver } = await runTestWithRedirect(
          {
            pattern: '/not-found?b=1',
            target: '/found?a=1',
            redirectType: REDIRECT_TYPE_301,
            isQueryStringPreserved: true,
            locale: 'en',
          },
          req,
          res
        );

        validateEndMessageDebugLog('redirects middleware end in %dms: %o', {
          headers: {},
          redirected: undefined,
          status: 301,
          url,
        });

        expect(siteResolver.getByHost).to.be.calledWith(hostname);
        // eslint-disable-next-line no-unused-expressions
        expect(fetchRedirects.called).to.be.true;
        expect(finalRes).to.deep.equal(res);
        expect(finalRes.status).to.equal(res.status);
      });

      it('should remove rewrite headers and redirect 301', async () => {
        const cloneUrl = () => Object.assign({}, req.nextUrl);
        const url = {
          clone: cloneUrl,
          href: 'http://localhost:3000/found',
          locale: 'en',
          origin: 'http://localhost:3000',
          search: '',
          pathname: '/found',
        };
        const { res, req } = createTestRequestResponse({
          response: { url },
          request: {
            nextUrl: {
              href: 'http://localhost:3000/not-found',
              pathname: '/not-found',
              locale: 'en',
              search: '',
              origin: 'http://localhost:3000',
              clone: cloneUrl,
            },
          },
        });
        setupRedirectStub(301);
        res.headers.set('x-middleware-next', '1');
        res.headers.set('x-middleware-rewrite', '1');
        res.headers.set(REWRITE_HEADER_NAME, 1);

        const { finalRes, fetchRedirects, siteResolver } = await runTestWithRedirect(
          {
            pattern: 'not-found',
            target: '/found',
            redirectType: REDIRECT_TYPE_301,
            isQueryStringPreserved: false,
            locale: 'en',
          },
          req,
          res
        );

        validateEndMessageDebugLog('redirects middleware end in %dms: %o', {
          headers: {},
          redirected: undefined,
          status: 301,
          url,
        });

        // Check that the headers were not removed
        expect(finalRes.headers.has('x-middleware-next')).to.equal(false);
        expect(finalRes.headers.has('x-middleware-rewrite')).to.equal(false);
        expect(finalRes.headers.has(REWRITE_HEADER_NAME)).to.equal(false);

        expect(siteResolver.getByHost).to.be.calledWith(hostname);
        // eslint-disable-next-line no-unused-expressions
        expect(fetchRedirects.called).to.be.true;
        expect(finalRes.status).to.equal(res.status);
      });

      it('should return 301 redirect when pattern has special symbols "?"', async () => {
        const cloneUrl = () => Object.assign({}, req.nextUrl);
        const url = {
          clone: cloneUrl,
          href: 'http://localhost:3000/found?a=1&w=1',
          locale: 'en',
          origin: 'http://localhost:3000',
          search: '?a=1&w=1',
          pathname: '/found',
        };

        const { res, req } = createTestRequestResponse({
          response: { url },
          request: {
            nextUrl: {
              pathname: '/not-found/',
              search: '?a=1&w=1',
              href: 'http://localhost:3000/not-found/?a=1&w=1',
              locale: 'en',
              origin: 'http://localhost:3000',
              clone: cloneUrl,
            },
          },
        });
        setupRedirectStub(301);

        const { finalRes, fetchRedirects, siteResolver } = await runTestWithRedirect(
          {
            pattern: '/[/]?not-found?a=1&w=1/',
            target: '/found',
            redirectType: REDIRECT_TYPE_301,
            isQueryStringPreserved: true,
            locale: 'en',
          },
          req,
          res
        );

        validateEndMessageDebugLog('redirects middleware end in %dms: %o', {
          headers: {},
          redirected: undefined,
          status: 301,
          url,
        });

        expect(siteResolver.getByHost).to.be.calledWith(hostname);
        // eslint-disable-next-line no-unused-expressions
        expect(fetchRedirects.called).to.be.true;
        expect(finalRes).to.deep.equal(res);
        expect(finalRes.status).to.equal(res.status);
      });

      it('should return 301 redirect when pattern has another order of query string', async () => {
        const cloneUrl = () => Object.assign({}, req.nextUrl);
        const url = {
          clone: cloneUrl,
          href: 'http://localhost:3000/found?a=1&w=1',
          locale: 'en',
          origin: 'http://localhost:3000',
          search: '?a=1&w=1',
          pathname: '/found',
        };

        const { res, req } = createTestRequestResponse({
          response: { url },
          request: {
            nextUrl: {
              pathname: '/not-found/',
              search: '?a=1&w=1',
              href: 'http://localhost:3000/not-found/?a=1&w=1',
              locale: 'en',
              origin: 'http://localhost:3000',
              clone: cloneUrl,
            },
          },
        });
        setupRedirectStub(301);

        const { finalRes, fetchRedirects, siteResolver } = await runTestWithRedirect(
          {
            pattern: '/not-found?w=1&a=1/',
            target: '/found',
            redirectType: REDIRECT_TYPE_301,
            isQueryStringPreserved: true,
            locale: 'en',
          },
          req,
          res
        );

        validateEndMessageDebugLog('redirects middleware end in %dms: %o', {
          headers: {},
          redirected: undefined,
          status: 301,
          url,
        });

        expect(siteResolver.getByHost).to.be.calledWith(hostname);
        // eslint-disable-next-line no-unused-expressions
        expect(fetchRedirects.called).to.be.true;
        expect(finalRes).to.deep.equal(res);
        expect(finalRes.status).to.equal(res.status);
      });
    });

    describe('should redirect to normalized path when nextjs specific "path" query string parameter is provided', () => {
      it('should return 301 redirect', async () => {
        const cloneUrl = () => Object.assign({}, req.nextUrl);
        const url = {
          clone: cloneUrl,
          href: 'http://localhost:3000/found',
          locale: 'en',
          origin: 'http://localhost:3000',
          search: '',
          pathname: '/found',
        };

        const { res, req } = createTestRequestResponse({
          response: { url },
          request: {
            nextUrl: {
              pathname: '/not-found',
              search: '?path=not-found',
              href: 'http://localhost:3000/not-found/?path=not-found',
              locale: 'en',
              origin: 'http://localhost:3000',
              clone: cloneUrl,
            },
          },
        });
        setupRedirectStub(301);

        const { finalRes, fetchRedirects, siteResolver } = await runTestWithRedirect(
          {
            pattern: '/not-found',
            target: '/found',
            redirectType: REDIRECT_TYPE_301,
            isQueryStringPreserved: false,
            locale: 'en',
          },
          req,
          res
        );

        validateEndMessageDebugLog('redirects middleware end in %dms: %o', {
          headers: {},
          redirected: undefined,
          status: 301,
          url,
        });

        expect(siteResolver.getByHost).to.be.calledWith(hostname);
        // eslint-disable-next-line no-unused-expressions
        expect(fetchRedirects.called).to.be.true;
        expect(finalRes).to.deep.equal(res);
        expect(finalRes.status).to.equal(res.status);
      });

      it('should return 301 redirect when trailingSlash is true', async () => {
        const cloneUrl = () => Object.assign({}, req.nextUrl);
        const url = {
          clone: cloneUrl,
          href: 'http://localhost:3000/found/',
          locale: 'en',
          origin: 'http://localhost:3000',
          search: '',
          pathname: '/found/',
        };

        const { res, req } = createTestRequestResponse({
          response: { url },
          request: {
            nextUrl: {
              pathname: '/not-found/',
              search: '?path=not-found',
              href: 'http://localhost:3000/not-found/?path=not-found',
              locale: 'en',
              origin: 'http://localhost:3000',
              clone: cloneUrl,
            },
          },
        });
        setupRedirectStub(301);
        const { finalRes, fetchRedirects, siteResolver } = await runTestWithRedirect(
          {
            pattern: '/not-found/',
            target: '/found/',
            redirectType: REDIRECT_TYPE_301,
            isQueryStringPreserved: true,
            locale: 'en',
          },
          req,
          res
        );

        validateEndMessageDebugLog('redirects middleware end in %dms: %o', {
          headers: {},
          redirected: undefined,
          status: 301,
          url,
        });

        expect(siteResolver.getByHost).to.be.calledWith(hostname);
        // eslint-disable-next-line no-unused-expressions
        expect(fetchRedirects.called).to.be.true;
        expect(finalRes).to.deep.equal(res);
        expect(finalRes.status).to.equal(res.status);
      });

      it('should clean redirect headers and return a 302 redirect', async () => {
        const cloneUrl = () => Object.assign({}, req.nextUrl);
        const url = {
          clone: cloneUrl,
          href: 'http://localhost:3000/found',
          locale: 'en',
          origin: 'http://localhost:3000',
          search: '',
          pathname: '/found',
        };

        const { res, req } = createTestRequestResponse({
          response: { url },
          request: {
            nextUrl: {
              pathname: '/not-found',
              search: '?path=not-found&abc=edf',
              href: 'http://localhost:3000/not-found?path=not-found&abc=edf',
              locale: 'en',
              origin: 'http://localhost:3000',
              clone: cloneUrl,
            },
          },
          status: 302,
        });
        setupRedirectStub(302);
        res.headers.set('x-middleware-next', '1');
        res.headers.set('x-middleware-rewrite', '1');
        res.headers.set(REWRITE_HEADER_NAME, 1);

        const { finalRes, fetchRedirects, siteResolver } = await runTestWithRedirect(
          {
            pattern: '/not-found?abc=edf',
            target: '/found',
            redirectType: REDIRECT_TYPE_302,
            isQueryStringPreserved: false,
            locale: 'en',
          },
          req,
          res
        );

        validateEndMessageDebugLog('redirects middleware end in %dms: %o', {
          headers: {},
          redirected: undefined,
          status: 302,
          url,
        });

        // Check that the headers were not removed
        expect(finalRes.headers.has('x-middleware-next')).to.equal(false);
        expect(finalRes.headers.has('x-middleware-rewrite')).to.equal(false);
        expect(finalRes.headers.has(REWRITE_HEADER_NAME)).to.equal(false);

        expect(siteResolver.getByHost).to.be.calledWith(hostname);
        // eslint-disable-next-line no-unused-expressions
        expect(fetchRedirects.called).to.be.true;
        expect(finalRes).to.deep.equal(res);
        expect(finalRes.status).to.equal(res.status);
      });

      it('should redirect regardless of case in pattern and target', async () => {
        // Set up a clone function (used by both req and res)
        const cloneUrl = () => Object.assign({}, req.nextUrl);
        const url = {
          href: 'http://localhost:3000/Found',
          pathname: '/Found',
          origin: 'http://localhost:3000',
          locale: 'en',
          search: '',
          clone: cloneUrl,
        };

        // Create the test request and response
        const { res, req } = createTestRequestResponse({
          response: { url },
          request: {
            nextUrl: {
              pathname: '/About',
              href: 'http://localhost:3000/About',
              locale: 'en',
              origin: 'http://localhost:3000',
              clone: cloneUrl,
            },
          },
          status: 301,
        });

        setupRedirectStub(301);
        res.headers.set('x-middleware-next', '1');
        res.headers.set('x-middleware-rewrite', '1');
        res.headers.set(REWRITE_HEADER_NAME, 1);

        const { finalRes, fetchRedirects, siteResolver } = await runTestWithRedirect(
          {
            pattern: '/About',
            target: '/Found',
            redirectType: REDIRECT_TYPE_301,
            isQueryStringPreserved: false,
            locale: 'en',
          },
          req,
          res
        );

        validateEndMessageDebugLog('redirects middleware end in %dms: %o', {
          headers: {},
          redirected: undefined,
          status: 301,
          url,
        });

        expect(siteResolver.getByHost).to.be.calledWith(hostname);
        expect(siteResolver.getByHost).to.have.been.called;
        expect(fetchRedirects.called).to.be.true;
        expect(finalRes.status).to.equal(301);
      });

      it('should redirect to lowercase target even if incoming path is mixed-case', async () => {
        const cloneUrl = () => Object.assign({}, req.nextUrl);
        const url = {
          href: 'http://localhost:3000/about',
          pathname: '/about',
          origin: 'http://localhost:3000',
          locale: 'en',
          search: '',
          clone: cloneUrl,
        };

        const { res, req } = createTestRequestResponse({
          response: { url },
          request: {
            nextUrl: {
              pathname: '/AnotherPage',
              href: 'http://localhost:3000/AnotherPage',
              locale: 'en',
              origin: 'http://localhost:3000',
              clone: cloneUrl,
            },
          },
          status: 301,
        });

        setupRedirectStub(301);
        res.headers.set('x-middleware-next', '1');
        res.headers.set('x-middleware-rewrite', '1');
        res.headers.set(REWRITE_HEADER_NAME, 1);

        const { finalRes, fetchRedirects, siteResolver } = await runTestWithRedirect(
          {
            pattern: '/anotherpage',
            target: '/about',
            redirectType: REDIRECT_TYPE_301,
            isQueryStringPreserved: false,
            locale: 'en',
          },
          req,
          res
        );

        validateEndMessageDebugLog('redirects middleware end in %dms: %o', {
          headers: {},
          redirected: undefined,
          status: 301,
          url,
        });

        expect(siteResolver.getByHost).to.be.calledWith(hostname);
        expect(siteResolver.getByHost).to.have.been.called;
        expect(fetchRedirects.called).to.be.true;
        expect(finalRes.status).to.equal(301);
      });

      // TODO: This test is failing because of this bug https://sitecore.atlassian.net/browse/JSS-3955
      xit('should return rewrite', async () => {
        const cloneUrl = () => Object.assign({}, req.nextUrl);
        const url = {
          origin: 'http://localhost:3000',
          pathname: '/found',
          href: 'http://localhost:3000/found',
          search: '',
          locale: 'en',
          clone: cloneUrl,
        };

        const { res, req } = createTestRequestResponse({
          response: { url },
          request: {
            nextUrl: {
              pathname: '/not-found',
              search: '?path=not-found&abc=edf',
              href: 'http://localhost:3000/not-found?path=not-found&abc=edf',
              locale: 'en',
              origin: 'http://localhost:3000',
              clone: cloneUrl,
            },
          },
          status: 302,
        });
        setupRewriteStub(200, res);

        const { finalRes, fetchRedirects, siteResolver } = await runTestWithRedirect(
          {
            pattern: '/not-found',
            target: '/found',
            redirectType: REDIRECT_TYPE_SERVER_TRANSFER,
            isQueryStringPreserved: false,
            locale: 'en',
          },
          req,
          res
        );

        validateEndMessageDebugLog('redirects middleware end in %dms: %o', {
          headers: {
            'x-sc-rewrite': 'http://localhost:3000/found',
          },
          redirected: undefined,
          url,
          status: 200,
        });

        expect(siteResolver.getByHost).to.be.calledWith(hostname);
        // eslint-disable-next-line no-unused-expressions
        expect(fetchRedirects.called).to.be.true;
        expect(finalRes).to.deep.equal(res);
        expect(finalRes.status).to.equal(res.status);

        nextRedirectStub.restore();
      });
    });
  });
});
