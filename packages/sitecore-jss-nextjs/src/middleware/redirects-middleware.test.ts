/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable dot-notation */
import chai, { use } from 'chai';
import chaiString from 'chai-string';
import sinonChai from 'sinon-chai';
import sinon, { spy } from 'sinon';
import { NextRequest, NextResponse } from 'next/server';
import { debug } from '@sitecore-jss/sitecore-jss';
import {
  REDIRECT_TYPE_301,
  REDIRECT_TYPE_302,
  REDIRECT_TYPE_SERVER_TRANSFER,
  SiteResolver,
} from '@sitecore-jss/sitecore-jss/site';
import { RedirectsMiddleware } from './redirects-middleware';

use(sinonChai);
const expect = chai.use(chaiString).expect;

describe.only('RedirectsMiddleware', () => {
  const debugSpy = spy(debug, 'redirects');
  const validateDebugLog = (message: string, ...params: any[]) => {
    const hit = debugSpy.args.find((log) => log[0] === message);
    if (!hit) {
      const seen = debugSpy.args.map((log) => log[0]);
      throw new Error(
        `Did not find debug message "${message}". Saw:\n${seen
          .map((m) => `  - ${String(m)}`)
          .join('\n')}`
      );
    }
    expect(hit).to.deep.equal([message, ...params]);
  };

  const END_PREFIX = 'redirects middleware end';

  const validateEndMessageDebugLog = (message: string, expected: any) => {
    const endCalls = debugSpy.args.filter(
      (log) =>
        typeof log[0] === 'string' &&
        (log[0] === message || (log[0] as string).startsWith(END_PREFIX))
    );

    if (endCalls.length === 0) {
      const seen = debugSpy.args.map((log) => String(log[0]));
      throw new Error(
        `Did not find end message "${message}". Saw:\n${seen.map((m) => `  - ${m}`).join('\n')}`
      );
    }

    const hit = endCalls[endCalls.length - 1];

    const [, ...rest] = hit;
    const payload =
      rest.find(
        (x) => x && typeof x === 'object' && 'status' in x && 'url' in x && 'headers' in x
      ) ?? null;

    if (!payload) {
      throw new Error(
        `End log found but no payload with {status,url,headers}. Call was:\n${JSON.stringify(
          hit,
          null,
          2
        )}`
      );
    }

    expect(payload).to.deep.equal(expected);
  };

  const referrer = 'http://localhost:3000';
  const hostname = 'foo.net';
  const siteName = 'nextjs-app';
  const sitesFromConfigFile = [
    { name: 'basicSite', hostName: 'localhost', language: 'en' },
    { name: 'nextjs-app', hostName: '*', language: 'da' },
  ];

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
                  pattern: props.pattern as string,
                  target: props.target as string,
                  redirectType: props.redirectType as string,
                  isQueryStringPreserved: props.isQueryStringPreserved as boolean,
                  locale: props.locale as string | undefined,
                },
              ]
            : []
        )
      ));

    return { middleware, fetchRedirects, siteResolver };
  };

  // Stub for NextResponse generation, see https://github.com/vercel/next.js/issues/42374
  (Headers.prototype as any).getAll = () => [];

  const sandbox = sinon.createSandbox();

  let redirectStub: sinon.SinonStub;
  let rewriteStub: sinon.SinonStub;
  let nextStub: sinon.SinonStub;

  beforeEach(() => {
    if ((NextResponse.redirect as any).restore) (NextResponse.redirect as any).restore();
    if ((NextResponse.rewrite as any).restore) (NextResponse.rewrite as any).restore();
    if ((NextResponse.next as any).restore) (NextResponse.next as any).restore();

    const makeCookies = () => {
      const jar = new Map<string, string>();
      return {
        set(name: string, valueOrOpts: any) {
          const value = typeof valueOrOpts === 'string' ? valueOrOpts : valueOrOpts?.value ?? '';
          jar.set(name, value);
        },
        get(name: string) {
          const v = jar.get(name);
          return v === undefined ? undefined : { value: v };
        },
        delete(name: string) {
          jar.delete(name);
        },
      };
    };

    nextStub = sandbox.stub(NextResponse, 'next').callsFake(() => {
      return ({
        status: 200,
        redirected: false,
        url: '',
        headers: new Headers({ 'x-middleware-next': '1' }),
        cookies: makeCookies(),
      } as unknown) as NextResponse;
    });

    redirectStub = sandbox.stub(NextResponse, 'redirect').callsFake((url, init) => {
      const status = typeof init === 'number' ? init : init?.status ?? 307;
      const headers = typeof init === 'object' && init?.headers ? init.headers : {};
      return ({
        url,
        status,
        headers: new Headers(headers),
        cookies: makeCookies(),
      } as unknown) as NextResponse;
    });

    rewriteStub = sandbox.stub(NextResponse, 'rewrite').callsFake((url) => {
      return ({
        url,
        headers: new Headers({}),
        cookies: makeCookies(),
      } as unknown) as NextResponse;
    });
  });

  afterEach(() => {
    sandbox.restore();
    if ((NextResponse.redirect as any).restore) (NextResponse.redirect as any).restore();
    if ((NextResponse.rewrite as any).restore) (NextResponse.rewrite as any).restore();
    if ((NextResponse.next as any).restore) (NextResponse.next as any).restore();
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
      const res = createResponse({ url: 'http://localhost:3000' });

      nextStub.callsFake(() => (res as unknown) as NextResponse);

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

      expect(finalRes).to.equal(res);

      nextStub.resetBehavior();
      nextStub.callsFake(
        () => ({ status: 200, headers: new Headers({ 'x-middleware-next': '1' }) } as any)
      );
    });

    it('should return next response when redirects does not exist', async () => {
      const res = createResponse({ url: 'http://localhost:3000/found' });

      nextStub.callsFake(() => (res as unknown) as NextResponse);

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
      expect(fetchRedirects.called).to.be.true;
      expect(finalRes).to.equal(res);
    });

    describe('should return appropriate redirect type when redirects exists', () => {
      it('should return 301 redirect', async () => {
        const setCookies = () => {};
        const res = createResponse({
          url: 'http://localhost:3000/found',
          status: 301,
          setCookies,
          headers: new Headers({}),
        });

        redirectStub.callsFake((url, init) => {
          const status = typeof init === 'number' ? init : init?.status ?? 307;
          const headers = typeof init === 'object' && init?.headers ? init.headers : {};
          return ({
            url,
            status,
            cookies: { set: setCookies },
            headers: new Headers(headers),
          } as unknown) as NextResponse;
        });

        const req = createRequest({
          nextUrl: {
            pathname: '/not-found',
            locale: 'en',
            href: 'http://localhost:3000/not-found',
            clone() {
              return Object.assign({}, req.nextUrl);
            },
          },
        });

        const { middleware, fetchRedirects, siteResolver } = createMiddleware({
          pattern: 'not-found',
          target: 'http://localhost:3000/found',
          redirectType: REDIRECT_TYPE_301,
          isQueryStringPreserved: true,
          locale: 'en',
        });

        const finalRes = await middleware.getHandler()(req);

        validateDebugLog('redirects middleware start: %o', {
          hostname: 'foo.net',
          language: 'en',
          pathname: '/not-found',
        });

        validateEndMessageDebugLog('redirects middleware end in %dms: %o', {
          headers: {},
          redirected: undefined,
          status: 301,
          url: 'http://localhost:3000/found',
        });

        expect(siteResolver.getByHost).to.be.calledWith(hostname);
        expect(fetchRedirects.called).to.be.true;
        expect(finalRes.status).to.equal(res.status);
        expect((finalRes as any).url).to.equal(res.url);
      });

      it('should override locale with locale parsed from target', async () => {
        const setCookies = () => {};
        const res = createResponse({
          url: 'http://localhost:3000/ua/found',
          status: 301,
          setCookies,
        });

        rewriteStub.callsFake((url) => {
          return ({
            url,
            status: 301,
            cookies: { set: setCookies },
            headers: res.headers,
          } as unknown) as NextResponse;
        });

        const req = createRequest({
          nextUrl: {
            pathname: '/not-found',
            href: 'http://localhost:3000/not-found',
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
          hostname: 'foo.net',
          language: 'en',
        });

        validateEndMessageDebugLog('redirects middleware end in %dms: %o', {
          headers: {},
          redirected: undefined,
          status: 301,
          url: 'http://localhost:3000/ua/found',
        });

        expect(siteResolver.getByHost).to.be.calledWith(hostname);
        expect(fetchRedirects.called).to.be.true;
        expect(finalRes.status).to.equal(res.status);
        expect((finalRes as any).url).to.equal(res.url);
      });

      it('should preserve query string on relative path redirect, when isQueryStringPreserved is true', async () => {
        const setCookies = () => {};
        const res = createResponse({
          url: 'http://localhost:3000/found?abc=def',
          status: 301,
          setCookies,
        });

        rewriteStub.callsFake((url) => {
          return ({
            url,
            status: 301,
            cookies: { set: setCookies },
            headers: res.headers,
          } as unknown) as NextResponse;
        });

        const req = createRequest({
          nextUrl: {
            pathname: '/not-found',
            search: 'abc=def',
            href: 'http://localhost:3000/not-found?abc=def',
            clone() {
              return Object.assign({}, req.nextUrl);
            },
          },
        });

        const { middleware, fetchRedirects, siteResolver } = createMiddleware({
          pattern: 'not-found',
          target: 'found',
          redirectType: REDIRECT_TYPE_SERVER_TRANSFER,
          isQueryStringPreserved: true,
        });

        const finalRes = await middleware.getHandler()(req);

        validateDebugLog('redirects middleware start: %o', {
          hostname: 'foo.net',
          language: 'en',
          pathname: '/not-found',
        });

        validateEndMessageDebugLog('redirects middleware end in %dms: %o', {
          headers: {},
          redirected: undefined,
          status: 301,
          url: 'http://localhost:3000/found?abc=def',
        });

        expect(siteResolver.getByHost).to.be.calledWith(hostname);
        expect(fetchRedirects.called).to.be.true;
        expect(finalRes.status).to.equal(res.status);
        expect((finalRes as any).url).to.equal(res.url);
      });

      it('should redirect, when pattern uses with query string', async () => {
        const setCookies = () => {};
        const res = createResponse({
          url: 'http://localhost:3000/found',
          status: 301,
          setCookies,
        });

        redirectStub.callsFake((url, init) => {
          const status = typeof init === 'number' ? init : init?.status ?? 307;
          return ({
            url,
            status,
            cookies: { set: setCookies },
            headers: res.headers,
          } as unknown) as NextResponse;
        });

        const req = createRequest({
          nextUrl: {
            pathname: '/not-found',
            search: '?abc=def',
            href: 'http://localhost:3000/not-found?abc=def',
            locale: 'en',
            clone() {
              return Object.assign({}, req.nextUrl);
            },
          },
        });

        const { middleware, fetchRedirects, siteResolver } = createMiddleware({
          pattern: 'not-found\\?abc=def',
          target: 'http://localhost:3000/found',
          redirectType: REDIRECT_TYPE_301,
          isQueryStringPreserved: true,
          locale: 'en',
        });

        const finalRes = await middleware.getHandler()(req);

        validateDebugLog('redirects middleware start: %o', {
          hostname: 'foo.net',
          language: 'en',
          pathname: '/not-found',
        });

        validateEndMessageDebugLog('redirects middleware end in %dms: %o', {
          headers: {},
          redirected: undefined,
          status: 301,
          url: 'http://localhost:3000/found',
        });

        expect(siteResolver.getByHost).to.be.calledWith(hostname);
        expect(fetchRedirects.called).to.be.true;
        expect(finalRes.status).to.equal(res.status);
        expect((finalRes as any).url).to.equal(res.url);
      });

      it('should not redirect, when pattern uses with query string', async () => {
        const req = createRequest({
          nextUrl: {
            pathname: '/not-found',
            search: '?other=param',
            href: 'http://localhost:3000/not-found?other=param',
            locale: 'en',
            clone() {
              return Object.assign({}, req.nextUrl);
            },
          },
        });

        const { middleware, fetchRedirects, siteResolver } = createMiddleware({
          pattern: 'not-found\\?abc=def',
          target: 'http://localhost:3000/found',
          redirectType: REDIRECT_TYPE_301,
          isQueryStringPreserved: true,
          locale: 'en',
        });

        const finalRes = await middleware.getHandler()(req);

        validateDebugLog('redirects middleware start: %o', {
          hostname: 'foo.net',
          language: 'en',
          pathname: '/not-found',
        });

        validateEndMessageDebugLog('redirects middleware end in %dms: %o', {
          headers: { 'x-middleware-next': '1' },
          redirected: false,
          status: 200,
          url: '',
        });

        expect(siteResolver.getByHost).to.be.calledWith(hostname);
        expect(fetchRedirects.called).to.be.true;

        expect(redirectStub.called).to.be.false;
        expect(finalRes.status).to.equal(200);
        expect((finalRes as any).url).to.equal('');
      });

      it('should prefer locale-specific rule over generic regardless of order', async () => {
        const setCookies = () => {};
        const res = createResponse({
          url: 'http://localhost:3000/anotherPage',
          status: 301,
          setCookies,
          headers: new Headers({}),
        });

        redirectStub.callsFake((url, init) => {
          const status = typeof init === 'number' ? init : init?.status ?? 307;
          const headers = typeof init === 'object' ? init?.headers : {};
          return ({
            url,
            status,
            cookies: { set: setCookies },
            headers: new Headers(headers),
          } as unknown) as NextResponse;
        });

        const req = createRequest({
          nextUrl: {
            pathname: '/uk-UA/test',
            locale: 'uk-UA',
            href: 'http://localhost:3000/uk-UA/test',
            clone() {
              return Object.assign({}, req.nextUrl);
            },
          },
        });

        const fetchRedirectsStub = sinon.stub().resolves([
          {
            pattern: 'test',
            target: '/page',
            redirectType: REDIRECT_TYPE_301,
            isQueryStringPreserved: true,
          },
          {
            pattern: 'uk-UA/test',
            target: '/anotherPage',
            redirectType: REDIRECT_TYPE_301,
            isQueryStringPreserved: true,
            locale: 'uk-UA',
          },
        ]);

        const { middleware, siteResolver } = createMiddleware({ fetchRedirectsStub });

        const finalRes = await middleware.getHandler()(req);

        validateDebugLog('redirects middleware start: %o', {
          hostname: 'foo.net',
          language: 'uk-ua',
          pathname: '/uk-UA/test',
        });

        validateEndMessageDebugLog('redirects middleware end in %dms: %o', {
          headers: {},
          redirected: undefined,
          status: 301,
          url: 'http://localhost:3000/anotherPage',
        });

        expect(siteResolver.getByHost).to.be.calledWith(hostname);
        expect(fetchRedirectsStub.called).to.be.true;
        expect(finalRes.status).to.equal(301);
        expect((finalRes as any).url).to.equal('http://localhost:3000/anotherPage');
      });

      it('should allow generic rule to match locale-prefixed path when no locale-specific rule exists', async () => {
        const setCookies = () => {};
        const res = createResponse({
          url: 'http://localhost:3000/page',
          status: 301,
          setCookies,
          headers: new Headers({}),
        });

        redirectStub.callsFake((url, init) => {
          const status = typeof init === 'number' ? init : init?.status ?? 307;
          const headers = typeof init === 'object' ? init?.headers : {};
          return ({
            url,
            status,
            cookies: { set: setCookies },
            headers: new Headers(headers),
          } as unknown) as NextResponse;
        });

        const req = createRequest({
          nextUrl: {
            pathname: '/uk-UA/test',
            locale: 'uk-UA',
            href: 'http://localhost:3000/uk-UA/test',
            clone() {
              return Object.assign({}, req.nextUrl);
            },
          },
        });

        const { middleware, fetchRedirects } = createMiddleware({
          pattern: 'test',
          target: '/page',
          redirectType: REDIRECT_TYPE_301,
          isQueryStringPreserved: true,
        });

        const finalRes = await middleware.getHandler()(req);

        validateDebugLog('redirects middleware start: %o', {
          hostname: 'foo.net',
          language: 'uk-ua',
          pathname: '/uk-UA/test',
        });

        validateEndMessageDebugLog('redirects middleware end in %dms: %o', {
          headers: {},
          redirected: undefined,
          status: 301,
          url: 'http://localhost:3000/page',
        });

        expect(fetchRedirects.called).to.be.true;
        expect(finalRes.status).to.equal(301);
        expect((finalRes as any).url).to.equal('http://localhost:3000/page');
      });

      it('should match pathname+search when pattern contains "?" (query-aware)', async () => {
        const setCookies = () => {};
        const res = createResponse({
          url: 'http://localhost:3000/found',
          status: 301,
          setCookies,
          headers: new Headers({}),
        });

        redirectStub.callsFake((url, init) => {
          const status = typeof init === 'number' ? init : init?.status ?? 307;
          const headers = typeof init === 'object' ? init?.headers : {};
          return ({
            url,
            status,
            cookies: { set: setCookies },
            headers: new Headers(headers),
          } as unknown) as NextResponse;
        });

        const req = createRequest({
          nextUrl: {
            pathname: '/not-found',
            search: '?abc=def',
            locale: 'en',
            href: 'http://localhost:3000/not-found?abc=def',
            clone() {
              return Object.assign({}, req.nextUrl);
            },
          },
        });

        const { middleware, fetchRedirects } = createMiddleware({
          pattern: 'not-found\\?abc=def',
          target: 'http://localhost:3000/found',
          redirectType: REDIRECT_TYPE_301,
          isQueryStringPreserved: true,
          locale: 'en',
        });

        const finalRes = await middleware.getHandler()(req);

        validateDebugLog('redirects middleware start: %o', {
          hostname: 'foo.net',
          language: 'en',
          pathname: '/not-found',
        });

        validateEndMessageDebugLog('redirects middleware end in %dms: %o', {
          headers: {},
          redirected: undefined,
          status: 301,
          url: 'http://localhost:3000/found',
        });

        expect(fetchRedirects.called).to.be.true;
        expect(finalRes.status).to.equal(301);
        expect((finalRes as any).url).to.equal('http://localhost:3000/found');
      });

      it('should ignore query string when pattern does not contain "?" (path-only)', async () => {
        const setCookies = () => {};
        const res = createResponse({
          url: 'http://localhost:3000/found',
          status: 301,
          setCookies,
          headers: new Headers({}),
        });

        redirectStub.callsFake((url, init) => {
          const status = typeof init === 'number' ? init : init?.status ?? 307;
          const headers = typeof init === 'object' ? init?.headers : {};
          return ({
            url,
            status,
            cookies: { set: setCookies },
            headers: new Headers(headers),
          } as unknown) as NextResponse;
        });

        const req = createRequest({
          nextUrl: {
            pathname: '/not-found',
            search: '?ignored=yes',
            href: 'http://localhost:3000/not-found?ignored=yes',
            clone() {
              return Object.assign({}, req.nextUrl);
            },
          },
        });

        const { middleware, fetchRedirects } = createMiddleware({
          pattern: 'not-found',
          target: 'http://localhost:3000/found',
          redirectType: REDIRECT_TYPE_301,
          isQueryStringPreserved: true,
        });

        const finalRes = await middleware.getHandler()(req);

        validateEndMessageDebugLog('redirects middleware end in %dms: %o', {
          headers: {},
          redirected: undefined,
          status: 301,
          url: 'http://localhost:3000/found',
        });

        expect(fetchRedirects.called).to.be.true;
        expect(finalRes.status).to.equal(301);
        expect((finalRes as any).url).to.equal('http://localhost:3000/found');
      });

      it('should return 302 redirect', async () => {
        const setCookies = () => {};
        const res = createResponse({
          url: 'http://localhost:3000/found',
          status: 302,
          setCookies,
        });

        redirectStub.callsFake((_url, _init) => (res as unknown) as NextResponse);

        const req = createRequest({
          nextUrl: {
            pathname: '/not-found',
            href: 'http://localhost:3000/not-found',
            locale: 'en',
            clone() {
              return Object.assign({}, req.nextUrl);
            },
          },
        });

        const { middleware, fetchRedirects, siteResolver } = createMiddleware({
          pattern: 'not-found',
          target: 'http://localhost:3000/found',
          redirectType: REDIRECT_TYPE_302,
          isQueryStringPreserved: false,
          locale: 'en',
        });

        const finalRes = await middleware.getHandler()(req);

        validateDebugLog('redirects middleware start: %o', {
          hostname: 'foo.net',
          language: 'en',
          pathname: '/not-found',
        });

        validateEndMessageDebugLog('redirects middleware end in %dms: %o', {
          headers: {},
          redirected: undefined,
          status: 302,
          url: 'http://localhost:3000/found',
        });

        expect(siteResolver.getByHost).to.be.calledWith(hostname);
        expect(fetchRedirects.called).to.be.true;
        expect(finalRes).to.equal(res); // identity
        expect(finalRes.status).to.equal(res.status);
      });

      it('should redirect uses token $siteLang in target url', async () => {
        const setCookies = () => {};
        const res = createResponse({
          url: 'http://localhost:3000/da/found',
          status: 301,
          setCookies,
        });

        redirectStub.callsFake((_url, _init) => (res as unknown) as NextResponse);

        const req = createRequest({
          nextUrl: {
            pathname: '/not-found',
            search: 'abc=def',
            href: 'http://localhost:3000/not-found',
            locale: 'en',
            clone() {
              return Object.assign({}, req.nextUrl);
            },
          },
        });

        const { middleware, fetchRedirects, siteResolver } = createMiddleware({
          pattern: '/not-found/',
          target: 'http://localhost:3000/$siteLang/found',
          redirectType: REDIRECT_TYPE_301,
          isQueryStringPreserved: false,
          locale: 'en',
          sites: sitesFromConfigFile,
        });

        const finalRes = await middleware.getHandler()(req);

        validateDebugLog('redirects middleware start: %o', {
          hostname: 'foo.net',
          language: 'en',
          pathname: '/not-found',
        });

        validateEndMessageDebugLog('redirects middleware end in %dms: %o', {
          headers: {},
          redirected: undefined,
          status: 301,
          url: 'http://localhost:3000/da/found',
        });

        expect(siteResolver.getByHost).to.be.calledWith(hostname);
        expect(fetchRedirects.called).to.be.true;
        expect(finalRes).to.equal(res); // identity now valid
        expect(finalRes.status).to.equal(res.status);
      });

      it('should return default response if no redirect type defined', async () => {
        const setCookies = () => {};
        const res = createResponse({
          url: 'http://localhost:3000/found',
          status: 301,
          setCookies,
        });

        nextStub.callsFake(() => (res as unknown) as NextResponse);

        const req = createRequest({
          nextUrl: {
            pathname: '/not-found',
            href: 'http://localhost:3000/not-found',
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
          hostname: 'foo.net',
          language: 'en',
          pathname: '/not-found',
        });

        validateEndMessageDebugLog('redirects middleware end in %dms: %o', {
          headers: {},
          redirected: undefined,
          status: 301,
          url: 'http://localhost:3000/found',
        });

        expect(siteResolver.getByHost).to.be.calledWith(hostname);
        expect(fetchRedirects.called).to.be.true;
        expect(finalRes).to.equal(res);
      });

      it('should rewrite path when redirect type is server transfer', async () => {
        const setCookies = () => {};
        const res = createResponse({
          url: 'http://localhost:3000/found',
          setCookies,
        });

        rewriteStub.callsFake((_url) => (res as unknown) as NextResponse);

        const req = createRequest({
          nextUrl: {
            pathname: '/not-found',
            href: 'http://localhost:3000/not-found',
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
          hostname: 'foo.net',
          language: 'en',
          pathname: '/not-found',
        });

        validateEndMessageDebugLog('redirects middleware end in %dms: %o', {
          headers: {},
          redirected: undefined,
          status: undefined,
          url: 'http://localhost:3000/found',
        });

        expect(siteResolver.getByHost).to.be.calledWith(hostname);
        expect(fetchRedirects.called).to.be.true;
        expect(finalRes).to.equal(res);
      });

      it('should use sc_site cookie', async () => {
        const siteName = 'foo';

        const resRedirect = createResponse({ url: 'http://localhost:3000/found', status: 301 });
        redirectStub.callsFake(() => (resRedirect as unknown) as NextResponse);

        const baseRes = NextResponse.next();
        baseRes.cookies.set('sc_site', siteName);

        class CookieFirstResolver extends SiteResolver {
          getByHost = sinon.stub().returns(undefined);
          getByName = sinon.stub().callsFake((name: string) => ({
            name,
            language: 'en',
            hostName: 'from-cookie',
          }));
        }
        const customResolver = new CookieFirstResolver([]);

        const req = createRequest({
          cookies: { sc_site: siteName },
          nextUrl: {
            href: 'http://localhost:3000/not-found',
            pathname: '/not-found',
            locale: 'en',
            clone() {
              return Object.assign({}, req.nextUrl);
            },
          },
        });

        const { middleware, siteResolver } = createMiddleware({ siteResolver: customResolver });

        const getExistsRedirectStub = sinon.stub(middleware as any, 'getExistsRedirect').resolves({
          pattern: 'not-found',
          target: 'http://localhost:3000/found',
          redirectType: REDIRECT_TYPE_301,
          isQueryStringPreserved: true,
          locale: 'en',
        });

        const finalRes = await middleware.getHandler()(req, baseRes);

        validateDebugLog('redirects middleware start: %o', {
          hostname: 'foo.net',
          language: 'en',
          pathname: '/not-found',
        });

        validateEndMessageDebugLog('redirects middleware end in %dms: %o', {
          headers: {},
          redirected: undefined,
          status: 301,
          url: 'http://localhost:3000/found',
        });

        expect(siteResolver.getByHost).to.not.be.called;
        expect(siteResolver.getByName).to.be.calledWith(siteName);
        expect(getExistsRedirectStub).to.have.been.calledWith(req, siteName);

        expect(finalRes).to.equal(resRedirect);
        expect(finalRes.status).to.equal(301);
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

        const { middleware, fetchRedirects, siteResolver } = createMiddleware({
          pattern: 'not-found',
          target: 'http://localhost:3000/found',
          redirectType: 'default',
          isQueryStringPreserved: true,
          locale: 'en',
        });

        const finalRes = await middleware.getHandler()(req, res);

        validateDebugLog('redirects middleware start: %o', {
          hostname: 'foo.net',
          language: 'en',
          pathname: '/not-found',
        });

        validateEndMessageDebugLog('redirects middleware end in %dms: %o', {
          headers: { 'x-middleware-next': '1' },
          redirected: false,
          status: 200,
          url: '',
        });

        const firstFetchArg = fetchRedirects.getCall(0).args[0];
        expect(firstFetchArg).to.equal(site);

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
          headers: { 'x-middleware-next': '1' },
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
        const expectedUrl = 'http://localhost:3000/found';
        const expectedStatus = 301;

        const req = createRequest({
          headerValues: { host: undefined },
          nextUrl: {
            pathname: '/not-found',
            href: 'http://localhost:3000/not-found',
            locale: 'en',
            clone() {
              return Object.assign({}, req.nextUrl);
            },
          },
        });

        const { middleware, fetchRedirects, siteResolver } = createMiddleware({
          pattern: 'not-found',
          target: expectedUrl,
          redirectType: REDIRECT_TYPE_301,
          isQueryStringPreserved: true,
          locale: 'en',
        });

        const finalRes = await middleware.getHandler()(req);

        validateDebugLog('redirects middleware start: %o', {
          hostname: 'localhost',
          language: 'en',
          pathname: '/not-found',
        });

        validateEndMessageDebugLog('redirects middleware end in %dms: %o', {
          headers: {},
          redirected: undefined,
          status: expectedStatus,
          url: expectedUrl,
        });

        expect(siteResolver.getByHost).to.be.calledWith('localhost');
        expect(fetchRedirects).to.be.calledWith(siteName);

        expect(redirectStub.called).to.be.true;
        expect(finalRes.status).to.equal(expectedStatus);
        expect((finalRes as any).url).to.equal(expectedUrl);
        const headersObj = Object.fromEntries((finalRes.headers as any) ?? []);
        expect(headersObj).to.deep.equal({});
      });

      it('custom fallback hostname is used', async () => {
        const setCookies = () => {};
        const res = createResponse({
          url: 'http://localhost:3000/found',
          status: 301,
          setCookies,
        });

        redirectStub.callsFake((url, init) => {
          const status = typeof init === 'number' ? init : init?.status ?? 307;
          return ({
            url,
            status,
            cookies: { set: setCookies },
            headers: res.headers,
          } as unknown) as NextResponse;
        });

        const req = createRequest({
          headerValues: { host: undefined },
          nextUrl: {
            pathname: '/not-found',
            href: 'http://localhost:3000/not-found',
            locale: 'en',
            clone() {
              return Object.assign({}, req.nextUrl);
            },
          },
        });

        const { middleware, fetchRedirects, siteResolver } = createMiddleware({
          pattern: 'not-found',
          target: 'http://localhost:3000/found',
          redirectType: REDIRECT_TYPE_301,
          isQueryStringPreserved: true,
          locale: 'en',
          defaultHostname: 'foobar',
        });

        const finalRes = await middleware.getHandler()(req);

        validateDebugLog('redirects middleware start: %o', {
          pathname: '/not-found',
          hostname: 'foobar',
          language: 'en',
        });

        validateEndMessageDebugLog('redirects middleware end in %dms: %o', {
          headers: {},
          redirected: undefined,
          status: 301,
          url: 'http://localhost:3000/found',
        });

        expect(siteResolver.getByHost).to.be.calledWith('foobar');
        expect(fetchRedirects).to.be.calledWith(siteName);
        expect(finalRes.status).to.equal(res.status);
        expect((finalRes as any).url).to.equal(res.url);
      });

      it('should redirect, when next.config uses params trailingSlash is true', async () => {
        const setCookies = () => {};
        const res = createResponse({
          url: 'http://localhost:3000/found/',
          status: 301,
          setCookies,
        });

        redirectStub.callsFake((url, init) => {
          const status = typeof init === 'number' ? init : init?.status ?? 307;
          return ({
            url,
            status,
            cookies: { set: setCookies },
            headers: res.headers,
          } as unknown) as NextResponse;
        });

        const req = createRequest({
          nextUrl: {
            pathname: '/not-found/',
            href: 'http://localhost:3000/not-found/',
            locale: 'en',
            clone() {
              return Object.assign({}, req.nextUrl);
            },
          },
        });

        const { middleware, fetchRedirects, siteResolver } = createMiddleware({
          pattern: '/not-found/',
          target: 'http://localhost:3000/found/',
          redirectType: REDIRECT_TYPE_301,
          isQueryStringPreserved: true,
          locale: 'en',
        });

        const finalRes = await middleware.getHandler()(req);

        validateDebugLog('redirects middleware start: %o', {
          hostname: 'foo.net',
          language: 'en',
          pathname: '/not-found/',
        });

        validateEndMessageDebugLog('redirects middleware end in %dms: %o', {
          headers: {},
          redirected: undefined,
          status: 301,
          url: 'http://localhost:3000/found/',
        });

        expect(siteResolver.getByHost).to.be.calledWith(hostname);
        expect(fetchRedirects.called).to.be.true;
        expect(finalRes.status).to.equal(res.status);
        expect((finalRes as any).url).to.equal(res.url);
      });
    });
  });
});
