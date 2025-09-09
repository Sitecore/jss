/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable dot-notation */
import { debug } from '@sitecore-jss/sitecore-jss';
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
  let nextRedirectStub: sinon.SinonStub;
  let nextRewriteStub: sinon.SinonStub;

  const sandbox = sinon.createSandbox();

  const debugSpy = spy(debug, 'redirects');

  const validateDebugLog = (message: string, ...params: any[]) => {
    expect(debugSpy.args.find((log) => log[0] === message)).to.deep.equal([message, ...params]);
  };

  const validateEndMessageDebugLog = (message: string, params: any) => {
    const logParams = debugSpy.args.find((log) => log[0] === message) as Array<unknown>;

    const normalizeUrl = (u: any) => {
      if (typeof u === 'string') return u;
      if (u && typeof u === 'object') return typeof u.href === 'string' ? u.href : String(u);
      return u;
    };

    const normalizeHeaders = (h: any) => {
      if (!h) return h;
      if (typeof Headers !== 'undefined' && h instanceof Headers) {
        return Object.fromEntries(h.entries());
      }
      if (h === '[object Headers]') return {};
      return h;
    };

    const actual = { ...(logParams[2] as any) };
    const expected = { ...(params as any) };

    if ('url' in actual) actual.url = normalizeUrl(actual.url);
    if ('url' in expected) expected.url = normalizeUrl(expected.url);
    if ('headers' in actual) actual.headers = normalizeHeaders(actual.headers);
    if ('headers' in expected) expected.headers = normalizeHeaders(expected.headers);

    expect(actual).to.deep.equal(expected);
  };

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
          return { value: (req as any).cookies[key] };
        },
        ...props.cookies,
      },
      headers: {
        host: hostname,
        get(key: string) {
          return (req as any).headers[key];
        },
        ...props.headerValues,
      },
      referrer,
    } as unknown as NextRequest;

    return req;
  };

  const createResponse = ({ setCookies, ...rest }: any = {}) => {
    const res: any = {
      cookies: {
        set: setCookies || (() => {}),
        get: getCookies || (() => {}),
      },
      headers: {},
      ...rest,
    };

    Object.defineProperties(res.headers, {
      set: {
        value: (key: string, value: string) => {
          (res.headers as any)[key] = value;
        },
        enumerable: false,
      },
      forEach: {
        value: (cb: (value: string, key: string, obj: any) => void) => {
          Object.keys(res.headers).forEach((key) => cb((res.headers as any)[key], key, res.headers));
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
      disabled?: (req: NextRequest, res: NextResponse) => boolean;
    } = {}
  ) => {
    class MockSiteResolver extends SiteResolver {
      sites = sitesFromConfigFile;

      getByName = sandbox.stub().callsFake((name: string) => ({
        name,
        language: (props as any).language || '',
        hostName: hostname,
      }));

      getByHost = sandbox.stub().callsFake((hostName: string) => ({
        name: siteName,
        language: (props as any).language || 'da',
        hostName,
      }));
    }

    const siteResolver = props.siteResolver || new MockSiteResolver([]);

    const middleware = new RedirectsMiddleware({
      enabled: true,
      contextId: '1243',
      edgeUrl: '123',
      clientContextId: '123',
      sites: [],
      locales: ['en', 'ua', 'pl-PL'],
      ...props,
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

    (middleware as any)['siteResolver'] = siteResolver;

    const fetchRedirects = ((middleware as any)['redirectsService']['fetchRedirects'] =
      props.fetchRedirectsStub ||
      sandbox.stub().returns(Promise.resolve(Object.keys(props).length ? redirectMaps : [])));

    return { middleware, fetchRedirects, siteResolver };
  };

  const setupRedirectStub = (status = 307) => {
    nextRedirectStub = sandbox.stub(NextResponse, 'redirect').callsFake((url: any, init: any) => {
      const statusCode = typeof init === 'number' ? init : init?.status || status;
      const headers = typeof init === 'object' ? init?.headers : {};
      return {
        url,
        status: statusCode,
        cookies: { set: setCookies, get: getCookies },
        headers: new Headers(headers),
      } as unknown as NextResponse;
    });
  };

  const setupRewriteStub = (status = 200, res: any) => {
    nextRewriteStub = sandbox.stub(NextResponse, 'rewrite').callsFake((url: any) => {
      return {
        url,
        status,
        cookies: { set: setCookies, get: getCookies },
        headers: res.headers,
      } as unknown as NextResponse;
    });
  };

  const runWithHandler = async (middleware: RedirectsMiddleware, req: NextRequest, res: NextResponse) => {
    const handler = middleware.getHandler();
    return handler(req, res);
  };

  const runTestWithRedirect = async (middlewareOptions: any, req: NextRequest, res: NextResponse, _hostname = hostname) => {
    const { middleware, fetchRedirects, siteResolver } = createMiddleware(middlewareOptions);
    const finalRes = await runWithHandler(middleware, req, res);

    validateDebugLog('redirects middleware start: %o', {
      hostname: _hostname,
      language: middlewareOptions.locale || 'en',
      pathname: (req as any).nextUrl.pathname,
    });

    return { finalRes, fetchRedirects, siteResolver };
  };

  const createTestRequestResponse = ({ response, request, status = 301 }: any) => {
    const res =
      status !== 404
        ? createResponse({
            status,
            setCookies,
            headers: new Headers({}),
            ...response,
          })
        : NextResponse.next();
    const req = createRequest(request);
    return { res, req };
  };

  // Stub for NextResponse generation, see https://github.com/vercel/next.js/issues/42374
  (Headers.prototype as any).getAll = () => [];

  beforeEach(() => {
    debugSpy.resetHistory();
  });

  afterEach(() => {
    sandbox.restore();
    nextRedirectStub?.restore();
    nextRewriteStub?.restore();
  });

  describe('handler', () => {
    describe('preview', () => {
      it('prerender bypass cookie is present (returns same res)', async () => {
        const { middleware } = createMiddleware();
        const res = NextResponse.next();

        const req = createRequest({
          cookies: {
            __prerender_bypass: true,
          },
        });

        const finalRes = await runWithHandler(middleware, req, res);

        validateDebugLog('redirects middleware start: %o', {
          hostname: 'foo.net',
          language: 'en',
          pathname: '/styleguide',
        });

        validateDebugLog('skipped (%s)', 'preview');

        validateEndMessageDebugLog('redirects middleware end in %dms: %o', {
          headers: { 'x-middleware-next': '1' },
          redirected: false,
          status: 200,
          url: '',
        });

        expect(finalRes).to.deep.equal(res);
      });

      it('preview data cookie is present (returns same res)', async () => {
        const { middleware } = createMiddleware();
        const res = NextResponse.next();

        const req = createRequest({
          cookies: {
            __next_preview_data: true,
          },
        });

        const finalRes = await runWithHandler(middleware, req, res);

        validateDebugLog('redirects middleware start: %o', {
          hostname: 'foo.net',
          language: 'en',
          pathname: '/styleguide',
        });

        validateDebugLog('skipped (%s)', 'preview');

        validateEndMessageDebugLog('redirects middleware end in %dms: %o', {
          headers: { 'x-middleware-next': '1' },
          redirected: false,
          status: 200,
          url: '',
        });

        expect(finalRes).to.deep.equal(res);
      });
    });

    it('returns same res when disabled/skip', async () => {
      const res = createResponse({ url: 'http://localhost:3000' });
      const req = createRequest();
      const { middleware } = createMiddleware({
        disabled: (req: NextRequest) =>
          (req as any)?.nextUrl.pathname === '/styleguide' && (req as any).nextUrl.locale === 'en',
      });

      const finalRes = await runWithHandler(middleware, req, res as any);

      validateDebugLog('redirects middleware start: %o', {
        hostname: 'foo.net',
        language: 'en',
        pathname: '/styleguide',
      });

      validateDebugLog('skipped (redirects middleware is disabled)');

      expect(finalRes).to.deep.equal(res as any);
    });

    it('returns same res when no redirect', async () => {
      const res = createResponse({ url: 'http://localhost:3000/found' });
      const nextStub = sandbox.stub(NextResponse, 'next').returns(res as unknown as NextResponse);
      const req = createRequest();
      const { middleware, fetchRedirects, siteResolver } = createMiddleware();

      const finalRes = await runWithHandler(middleware, req, res as any);

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
      expect(fetchRedirects.called).to.be.true;
      expect(finalRes).to.deep.equal(res as any);

      nextStub.restore();
    });

    describe('redirects/rewrites', () => {
      it('301 redirect', async () => {
        const cloneUrl = () => Object.assign({}, (req as any).nextUrl);
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
          res as any
        );

        validateEndMessageDebugLog('redirects middleware end in %dms: %o', {
          headers: {},
          redirected: undefined,
          status: 301,
          url,
        });

        expect(siteResolver.getByHost).to.be.calledWith(hostname);
        expect(fetchRedirects.called).to.be.true;
        expect(finalRes.status).to.equal(301);
      });

      it('server-transfer rewrite sets x-sc-rewrite', async () => {
        const cloneUrl = () => Object.assign({}, (req as any).nextUrl);
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
          res as any
        );

        // debug log includes our extracted header:
        validateEndMessageDebugLog('redirects middleware end in %dms: %o', {
          headers: {},
          redirected: undefined,
          status: 200,
          url,
        });

        // Response should have our custom rewrite header
        expect((finalRes as any).headers.get(REWRITE_HEADER_NAME)).to.equal('http://localhost:3000/found');

        expect(siteResolver.getByHost).to.be.calledWith(hostname);
        expect(fetchRedirects.called).to.be.true;
        expect(finalRes.status).to.equal(200);
      });

      it('preserves QS on rewrite when isQueryStringPreserved=true', async () => {
        const cloneUrl = () => Object.assign({}, (req as any).nextUrl);
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

        const { finalRes } = await runTestWithRedirect(
          {
            pattern: 'not-found?abc=def',
            target: '/found',
            redirectType: REDIRECT_TYPE_SERVER_TRANSFER,
            isQueryStringPreserved: true,
          },
          req,
          res as any
        );

        expect((finalRes as any).headers.get(REWRITE_HEADER_NAME)).to.equal(
          'http://localhost:3000/found?abc=def'
        );
        expect(finalRes.status).to.equal(200);
      });

      it('external absolute URL (no locale stripping)', async () => {
        const externalUrl = 'https://example.com/en/this-is-en';
        const cloneUrl = () => Object.assign({}, (req as any).nextUrl);

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
          res as any
        );

        expect((finalRes as any).url).to.equal(externalUrl);
      });

      it('cleans middleware headers on redirect', async () => {
        const cloneUrl = () => Object.assign({}, (req as any).nextUrl);
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
        (res as any).headers.set('x-middleware-next', '1');
        (res as any).headers.set('x-middleware-rewrite', '1');
        (res as any).headers.set(REWRITE_HEADER_NAME, 1);

        const { finalRes } = await runTestWithRedirect(
          {
            pattern: 'not-found',
            target: '/found',
            redirectType: REDIRECT_TYPE_301,
            isQueryStringPreserved: false,
            locale: 'en',
          },
          req,
          res as any
        );

        expect(finalRes.headers.has('x-middleware-next')).to.equal(false);
        expect(finalRes.headers.has('x-middleware-rewrite')).to.equal(false);
        expect(finalRes.headers.has(REWRITE_HEADER_NAME)).to.equal(false);
        expect(finalRes.status).to.equal(301);
      });

      it('default fallback hostname is used', async () => {
        const cloneUrl = () => Object.assign({}, (req as any).nextUrl);
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
          res as any,
          'localhost'
        );

        expect(siteResolver.getByHost).to.be.calledWith('localhost');
        expect(fetchRedirects).to.be.calledWith(siteName);
        expect(finalRes.status).to.equal(301);
      });
    });

    it('returns same res when target type is unknown (default branch)', async () => {
      const res = NextResponse.next();
      const req = createRequest({
        nextUrl: {
          pathname: '/not-found',
          href: 'http://localhost:3000/not-found',
          locale: 'en',
          clone() {
            return Object.assign({}, (req as any).nextUrl);
          },
        },
      });

      // no redirects, so middleware should short-circuit to "no redirect"
      const { middleware } = createMiddleware({
        pattern: 'not-found',
        target: '/found',
        redirectType: 'something-else',
        isQueryStringPreserved: true,
        locale: 'en',
      });

      const finalRes = await runWithHandler(middleware, req, res);

      // either disabled/skip or "skipped (redirect does not exist)" can apply; here expect default end log
      validateEndMessageDebugLog('redirects middleware end in %dms: %o', {
        headers: { 'x-middleware-next': '1' },
        redirected: false,
        status: 200,
        url: '',
      });

      expect(finalRes).to.deep.equal(res);
    });
  });
});
