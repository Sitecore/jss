/* eslint-disable no-unused-expressions */
/* eslint-disable dot-notation */
import chai, { use } from 'chai';
import chaiString from 'chai-string';
import sinonChai from 'sinon-chai';
import sinon, { spy } from 'sinon';
import nextjs, { NextRequest, NextResponse } from 'next/server';
import { GraphQLRequestClient, debug } from '@sitecore-jss/sitecore-jss';
import { SiteResolver } from '@sitecore-jss/sitecore-jss/site';
import { CdpHelper } from '@sitecore-jss/sitecore-jss/personalize';
import { PersonalizeMiddleware } from './personalize-middleware';

use(sinonChai);
const expect = chai.use(chaiString).expect;

describe('PersonalizeMiddleware', () => {
  const ua = 'user-agent-string';
  const userAgentStub = sinon.stub(nextjs, 'userAgent').returns({ ua } as any);
  const debugSpy = spy(debug, 'personalize');
  const validateDebugLog = (message, ...params) => {
    expect(debugSpy.args.find((log) => log[0] === message)).to.deep.equal([message, ...params]);
  };
  const validateEndMessageDebugLog = (message, params) => {
    const logParams = debugSpy.args.find((log) => log[0] === message) as Array<unknown>;
    expect(logParams[2]).to.deep.equal(params);
  };

  const hostname = 'foo.net';
  const siteName = 'bar';

  const pageId = 'item-id';
  const variantIds = ['variant-1', 'variant-2'];
  const defaultLang = 'en';
  const referrer = 'http://localhost:3000';
  const createRequest = (props: any = {}) => {
    const req = {
      ...props,
      nextUrl: {
        pathname: '/styleguide',
        locale: defaultLang,
        searchParams: {
          get(key) {
            return {
              utm_campaign: 'utm_campaign',
              utm_content: undefined,
              utm_medium: undefined,
              utm_source: undefined,
            }[key];
          },
        },
        clone() {
          return Object.assign({}, req.nextUrl);
        },
        ...props?.nextUrl,
      },
      cookies: {
        get(cookieName: string) {
          const cookies = {
            'bid_cdp-client-key': 'browser-id',
            ...props.cookieValues,
          };

          return { value: cookies[cookieName] };
        },
        ...props.cookies,
      },
      headers: {
        host: hostname,
        get(key: string) {
          return req.headers[key];
        },
        referer: referrer,
        ...props.headerValues,
      },
      referrer: 'about:client',
    } as NextRequest;

    Object.defineProperties(req.headers, {
      set: {
        value: (key, value) => {
          req.headers[key] = value;
        },
        enumerable: false,
      },
      forEach: {
        value: (cb) => {
          Object.keys(req.headers).forEach((key) => cb(req.headers[key], key, req.headers));
        },
        enumerable: false,
      },
    });

    return req;
  };

  const createResponse = (props: any = {}) => {
    const res = {
      cookies: {
        set(key, value) {
          res.cookies[key] = value;
        },
        get(key) {
          return { value: res.cookies[key] };
        },
        getAll() {
          return Object.keys(res.cookies).map((key) => ({ name: key, value: res.cookies[key] }));
        },
        ...props.cookieValues,
      },
      headers: {
        host: hostname,
        get(key: string) {
          return res.headers[key];
        },
        ...props.headerValues,
      },
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

  const createMiddleware = (
    props: {
      [key: string]: unknown;
      language?: string;
      siteResolver?: SiteResolver;
      edgeConfig?: any;
      cdpConfig?: any;
      scope?: string;
      variantId?: string;
      personalizeInfo?: {
        pageId: string;
        variantIds: string[];
      } | null;
      getPersonalizeInfoStub?: sinon.SinonStub;
      personalizeStub?: sinon.SinonStub;
      handleCookieStub?: sinon.SinonStub;
    } = {}
  ) => {
    const cdpConfig = {
      sitecoreEdgeContextId: '0000-0000-0000',
      sitecoreEdgeUrl: 'https://foo.bar',
      ...(props?.cdpConfig || {}),
    };
    const clientFactory = GraphQLRequestClient.createClientFactory({
      apiKey: 'edge-api-key',
      endpoint: 'http://edge-endpoint/api/graph/edge',
    });
    const edgeConfig = {
      clientFactory,
      ...(props?.edgeConfig || {}),
    };

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

    const siteResolver: SiteResolver = props.siteResolver || new MockSiteResolver([]);
    const middleware = new PersonalizeMiddleware({
      siteResolver,
      ...props,
      cdpConfig,
      edgeConfig,
    });

    const initPersonalizeServer = (middleware['initPersonalizeServer'] = sinon.stub());

    const personalize = (middleware['personalize'] =
      props.personalizeStub ||
      sinon.stub().returns(
        Promise.resolve({
          variantId: props.variantId,
        })
      ));

    const getPersonalizeInfo = (middleware['personalizeService']['getPersonalizeInfo'] =
      props.getPersonalizeInfoStub ||
      sinon.stub().returns(
        Promise.resolve(
          props.personalizeInfo === null
            ? undefined
            : props.personalizeInfo || {
                pageId,
                variantIds,
              }
        )
      ));

    return {
      middleware,
      getPersonalizeInfo,
      siteResolver,
      initPersonalizeServer,
      personalize,
    };
  };

  // Stub for NextResponse generation, see https://github.com/vercel/next.js/issues/42374
  (Headers.prototype as any).getAll = () => [];

  beforeEach(() => {
    userAgentStub.resetHistory();
    debugSpy.resetHistory();
  });

  afterEach(() => {
    userAgentStub.returns({ ua } as any);
  });

  describe('request skipped', () => {
    it('disabled', async () => {
      const props = {
        disabled: (req) => req?.nextUrl.pathname === '/styleguide' && req.nextUrl.locale === 'en',
      };

      const req = createRequest();

      const res = createResponse();

      const { middleware } = createMiddleware(props);

      const finalRes = await middleware.getHandler()(req, res);

      validateDebugLog('personalize middleware start: %o', {
        hostname: 'foo.net',
        pathname: '/styleguide',
        language: 'en',
        headers: {
          ...req.headers,
        },
      });

      validateDebugLog('skipped (personalize middleware is disabled)');

      expect(finalRes).to.deep.equal(res);
    });

    it('redirected', async () => {
      const req = createRequest();

      const res = createResponse({ redirected: true });

      const { middleware } = createMiddleware();

      const finalRes = await middleware.getHandler()(req, res);

      validateDebugLog('personalize middleware start: %o', {
        hostname: 'foo.net',
        pathname: '/styleguide',
        language: 'en',
        headers: {
          ...req.headers,
        },
      });

      validateDebugLog('skipped (%s)', 'redirected');

      expect(finalRes).to.deep.equal(res);
    });

    describe('preview', () => {
      it('prerender bypass cookie is present', async () => {
        const req = createRequest({
          cookieValues: {
            __prerender_bypass: true,
          },
        });
        const res = createResponse();
        const { middleware } = createMiddleware();
        const getCookiesSpy = spy(req.cookies, 'get');
        const finalRes = await middleware.getHandler()(req, res);

        validateDebugLog('personalize middleware start: %o', {
          hostname: 'foo.net',
          pathname: '/styleguide',
          language: 'en',
          headers: {
            ...req.headers,
          },
        });
        validateDebugLog('skipped (%s)', 'preview');
        expect(getCookiesSpy.calledWith('__prerender_bypass')).to.be.true;
        expect(finalRes).to.deep.equal(res);
      });

      it('preview data cookie is present', async () => {
        const req = createRequest({
          cookieValues: {
            __next_preview_data: true,
          },
        });
        const res = createResponse();
        const { middleware } = createMiddleware();
        const getCookiesSpy = spy(req.cookies, 'get');
        const finalRes = await middleware.getHandler()(req, res);

        validateDebugLog('personalize middleware start: %o', {
          hostname: 'foo.net',
          pathname: '/styleguide',
          language: 'en',
          headers: {
            ...req.headers,
          },
        });
        validateDebugLog('skipped (%s)', 'preview');
        expect(getCookiesSpy.calledWith('__prerender_bypass')).to.be.true;
        expect(getCookiesSpy.calledWith('__next_preview_data')).to.be.true;
        expect(finalRes).to.deep.equal(res);
      });
    });
    describe('excluded route', () => {
      const res = createResponse();
      const test = async (pathname: string, middleware) => {
        const req = createRequest({
          nextUrl: {
            pathname,
          },
        });
        const finalRes = await middleware.getHandler()(req, res);
        const headers = {};
        req.headers.forEach((value, key) => (headers[key] = value));
        validateDebugLog('personalize middleware start: %o', {
          hostname: 'foo.net',
          pathname,
          language: 'en',
          headers,
        });
        validateDebugLog('skipped (%s)', 'route excluded');
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
    it('personalize info not found', async () => {
      const req = createRequest();
      const res = createResponse();
      const { middleware, getPersonalizeInfo } = createMiddleware({
        personalizeInfo: null,
      });
      const finalRes = await middleware.getHandler()(req, res);
      const headers = {};
      req.headers.forEach((value, key) => (headers[key] = value));
      validateDebugLog('personalize middleware start: %o', {
        hostname: 'foo.net',
        pathname: '/styleguide',
        language: 'en',
        headers,
      });
      expect(getPersonalizeInfo.calledWith('/styleguide', 'en')).to.be.true;
      validateDebugLog('skipped (personalize info not found)');
      expect(finalRes).to.deep.equal(res);
    });
    it('no personalization configured', async () => {
      const req = createRequest();
      const res = createResponse();
      const { middleware, getPersonalizeInfo } = createMiddleware({
        personalizeInfo: {
          pageId,
          variantIds: [],
        },
      });
      const finalRes = await middleware.getHandler()(req, res);
      const headers = {};
      req.headers.forEach((value, key) => (headers[key] = value));
      validateDebugLog('personalize middleware start: %o', {
        hostname: 'foo.net',
        pathname: '/styleguide',
        language: 'en',
        headers,
      });
      expect(getPersonalizeInfo.calledWith('/styleguide', 'en')).to.be.true;
      validateDebugLog('skipped (no personalization configured)');
      expect(finalRes).to.deep.equal(res);
    });
    it('no variant identified', async () => {
      const req = createRequest();
      const res = createResponse();
      const {
        middleware,
        getPersonalizeInfo,
        initPersonalizeServer,
        personalize,
      } = createMiddleware({
        variantId: undefined,
      });
      const headers = {};
      req.headers.forEach((value, key) => (headers[key] = value));
      const finalRes = await middleware.getHandler()(req, res);
      validateDebugLog('personalize middleware start: %o', {
        hostname: 'foo.net',
        pathname: '/styleguide',
        language: 'en',
        headers,
      });
      expect(getPersonalizeInfo.calledWith('/styleguide', 'en')).to.be.true;
      expect(initPersonalizeServer.called).to.be.true;
      expect(personalize.called).to.be.true;
      validateDebugLog('skipped (no variant(s) identified)');
      expect(finalRes).to.deep.equal(res);
    });
    it('invalid variant', async () => {
      const req = createRequest();
      const res = createResponse();
      const handleCookieStub = sinon.stub().resolves();
      const invalidVariant = 'invalid-variant';
      const {
        middleware,
        getPersonalizeInfo,
        initPersonalizeServer,
        personalize,
      } = createMiddleware({
        personalizeInfo: {
          pageId,
          variantIds,
        },
        variantId: invalidVariant,
        handleCookieStub,
      });
      const finalRes = await middleware.getHandler()(req, res);
      const headers = {};
      req.headers.forEach((value, key) => (headers[key] = value));
      validateDebugLog('personalize middleware start: %o', {
        hostname: 'foo.net',
        pathname: '/styleguide',
        language: 'en',
        headers,
      });
      expect(getPersonalizeInfo.calledWith('/styleguide', 'en')).to.be.true;
      expect(initPersonalizeServer.called).to.be.true;
      expect(personalize.called).to.be.true;
      validateDebugLog('invalid variant %s', invalidVariant);
      expect(finalRes).to.deep.equal(res);
    });

    it('prefetch', async () => {
      const req = createRequest({
        headerValues: {
          purpose: 'prefetch',
        },
      });
      const res = createResponse();
      const { middleware } = createMiddleware();
      const finalRes = await middleware.getHandler()(req, res);

      validateDebugLog('personalize middleware start: %o', {
        hostname: 'foo.net',
        pathname: '/styleguide',
        language: 'en',
        headers: {
          ...req.headers,
        },
      });
      validateDebugLog('skipped (prefetch)');
      expect(finalRes).to.deep.equal(res);
      expect(finalRes.headers['x-middleware-cache']).to.equal('no-cache');
    });
  });

  describe('request passed', () => {
    it('fallback defaultLocale is used', async () => {
      const language = 'da-DK';
      const req = createRequest({
        nextUrl: {
          locale: undefined,
          defaultLocale: language,
        },
      });
      const res = createResponse();
      const nextRewriteStub = sinon.stub(nextjs.NextResponse, 'rewrite').returns(res);
      const {
        middleware,
        getPersonalizeInfo,
        siteResolver,
        initPersonalizeServer,
        personalize,
      } = createMiddleware({
        language,
        variantId: 'variant-2',
        personalizeInfo: {
          variantIds,
          pageId,
        },
      });
      const finalRes = await middleware.getHandler()(req, res);

      validateDebugLog('personalize middleware start: %o', {
        headers: {
          ...req.headers,
        },
        hostname: 'foo.net',
        pathname: '/styleguide',
        language: language,
      });
      expect(getPersonalizeInfo.calledWith('/styleguide', 'da-DK')).to.be.true;
      expect(initPersonalizeServer.calledOnce).to.be.true;
      expect(personalize.calledOnce).to.be.true;
      validateEndMessageDebugLog('personalize middleware end in %dms: %o', {
        rewritePath: '/_variantId_variant-2/styleguide',
        headers: {
          ...res.headers,
          'x-middleware-cache': 'no-cache',
          'x-sc-rewrite': '/_variantId_variant-2/styleguide',
        },
      });
      expect(siteResolver.getByHost).to.be.calledWith(hostname);
      expect(finalRes).to.deep.equal(res);
      nextRewriteStub.restore();
    });

    it('fallback locale is used', async () => {
      const req = createRequest({
        nextUrl: {
          locale: undefined,
          defaultLocale: undefined,
        },
      });
      const res = createResponse();
      const nextRewriteStub = sinon.stub(nextjs.NextResponse, 'rewrite').returns(res);
      const {
        middleware,
        getPersonalizeInfo,
        siteResolver,
        initPersonalizeServer,
        personalize,
      } = createMiddleware({
        variantId: 'variant-2',
      });
      const finalRes = await middleware.getHandler()(req, res);

      validateDebugLog('personalize middleware start: %o', {
        headers: {
          ...req.headers,
        },
        hostname: 'foo.net',
        pathname: '/styleguide',
        language: 'en',
      });
      expect(getPersonalizeInfo.calledWith('/styleguide', 'en')).to.be.true;
      expect(initPersonalizeServer.calledOnce).to.be.true;
      expect(personalize.calledOnce).to.be.true;
      validateEndMessageDebugLog('personalize middleware end in %dms: %o', {
        rewritePath: '/_variantId_variant-2/styleguide',
        headers: {
          ...res.headers,
          'x-middleware-cache': 'no-cache',
          'x-sc-rewrite': '/_variantId_variant-2/styleguide',
        },
      });
      expect(siteResolver.getByHost).to.be.calledWith(hostname);
      expect(finalRes).to.deep.equal(res);
      nextRewriteStub.restore();
    });

    it('custom response object is not provided', async () => {
      const req = createRequest();
      const res = createResponse();
      const nextRewriteStub = sinon.stub(nextjs.NextResponse, 'rewrite').returns(res);
      const {
        middleware,
        getPersonalizeInfo,
        siteResolver,
        initPersonalizeServer,
        personalize,
      } = createMiddleware({
        variantId: 'variant-2',
      });
      const finalRes = await middleware.getHandler()(req);

      expect(getPersonalizeInfo.calledWith('/styleguide', 'en')).to.be.true;
      expect(initPersonalizeServer.calledOnce).to.be.true;
      expect(personalize.calledOnce).to.be.true;
      validateDebugLog('personalize middleware start: %o', {
        headers: {
          ...req.headers,
        },
        hostname: 'foo.net',
        pathname: '/styleguide',
        language: 'en',
      });
      validateEndMessageDebugLog('personalize middleware end in %dms: %o', {
        rewritePath: '/_variantId_variant-2/styleguide',
        headers: {
          ...res.headers,
          'x-middleware-cache': 'no-cache',
          'x-sc-rewrite': '/_variantId_variant-2/styleguide',
        },
      });
      expect(siteResolver.getByHost).to.be.calledWith(hostname);
      expect(finalRes).to.deep.equal(res);
      nextRewriteStub.restore();
    });

    it('optional experience params are not present', async () => {
      userAgentStub.returns({ ua: '' } as any);
      const req = createRequest({ headerValues: { referer: null } });
      const res = createResponse();
      const nextRewriteStub = sinon.stub(nextjs.NextResponse, 'rewrite').returns(res);
      const {
        middleware,
        getPersonalizeInfo,
        siteResolver,
        initPersonalizeServer,
        personalize,
      } = createMiddleware({
        variantId: 'variant-2',
      });
      const finalRes = await middleware.getHandler()(req, res);

      validateDebugLog('personalize middleware start: %o', {
        headers: {
          ...req.headers,
        },
        hostname: 'foo.net',
        pathname: '/styleguide',
        language: 'en',
      });
      expect(getPersonalizeInfo.calledWith('/styleguide', 'en')).to.be.true;
      expect(initPersonalizeServer.calledOnce).to.be.true;
      expect(personalize.calledOnce).to.be.true;
      validateEndMessageDebugLog('personalize middleware end in %dms: %o', {
        rewritePath: '/_variantId_variant-2/styleguide',
        headers: {
          ...res.headers,
          'x-middleware-cache': 'no-cache',
          'x-sc-rewrite': '/_variantId_variant-2/styleguide',
        },
      });
      expect(siteResolver.getByHost).to.be.calledWith(hostname);
      expect(finalRes).to.deep.equal(res);
      nextRewriteStub.restore();
    });
    it('sc_site cookie is provided', async () => {
      const req = createRequest();
      const res = createResponse({
        cookieValues: {
          'BID_cdp-client-key': 'browser-id',
          sc_site: 'foo',
        },
      });
      const nextRewriteStub = sinon.stub(nextjs.NextResponse, 'rewrite').returns(res);
      const {
        middleware,
        getPersonalizeInfo,
        initPersonalizeServer,
        personalize,
        siteResolver,
      } = createMiddleware({
        variantId: 'variant-2',
      });
      const finalRes = await middleware.getHandler()(req, res);

      validateDebugLog('personalize middleware start: %o', {
        headers: {
          ...req.headers,
        },
        hostname: 'foo.net',
        pathname: '/styleguide',
        language: 'en',
      });
      expect(getPersonalizeInfo.calledWith('/styleguide', 'en', 'foo')).to.be.true;
      expect(initPersonalizeServer.calledOnce).to.be.true;
      expect(personalize.calledOnce).to.be.true;
      validateEndMessageDebugLog('personalize middleware end in %dms: %o', {
        rewritePath: '/_variantId_variant-2/styleguide',
        headers: {
          ...res.headers,
          'x-middleware-cache': 'no-cache',
          'x-sc-rewrite': '/_variantId_variant-2/styleguide',
        },
      });
      expect(siteResolver.getByHost).not.called.to.equal(true);
      expect(siteResolver.getByName).calledOnceWith('foo');
      expect(finalRes).to.deep.equal(res);
      nextRewriteStub.restore();
    });

    it('x-sc-rewrite header is provided', async () => {
      const req = createRequest();
      const res = createResponse({
        headerValues: {
          'x-sc-rewrite': '/_site_nextjs-app/styleguide',
        },
      });
      const nextRewriteStub = sinon.stub(nextjs.NextResponse, 'rewrite').returns(res);
      const {
        middleware,
        getPersonalizeInfo,
        initPersonalizeServer,
        personalize,
        siteResolver,
      } = createMiddleware({
        variantId: 'variant-2',
      });
      const finalRes = await middleware.getHandler()(req, res);

      validateDebugLog('personalize middleware start: %o', {
        headers: {
          ...req.headers,
        },
        hostname: 'foo.net',
        pathname: '/styleguide',
        language: 'en',
      });
      expect(getPersonalizeInfo.calledWith('/styleguide', 'en', siteName)).to.be.true;
      expect(initPersonalizeServer.calledOnce).to.be.true;
      expect(personalize.calledOnce).to.be.true;
      validateEndMessageDebugLog('personalize middleware end in %dms: %o', {
        rewritePath: '/_variantId_variant-2/_site_nextjs-app/styleguide',
        headers: {
          ...res.headers,
          'x-middleware-cache': 'no-cache',
          'x-sc-rewrite': '/_variantId_variant-2/_site_nextjs-app/styleguide',
        },
      });
      expect(siteResolver.getByHost).to.be.calledWith(hostname);
      expect(finalRes).to.deep.equal(res);
      nextRewriteStub.restore();
    });

    it('default fallback hostname is used', async () => {
      const req = createRequest({
        headerValues: {
          host: undefined,
        },
      });
      const res = createResponse();
      const nextRewriteStub = sinon.stub(nextjs.NextResponse, 'rewrite').returns(res);
      const {
        middleware,
        getPersonalizeInfo,
        initPersonalizeServer,
        personalize,
        siteResolver,
      } = createMiddleware({
        variantId: 'variant-2',
      });
      const finalRes = await middleware.getHandler()(req, res);

      validateDebugLog('personalize middleware start: %o', {
        headers: {
          ...req.headers,
        },
        hostname: 'localhost',
        pathname: '/styleguide',
        language: 'en',
      });
      expect(getPersonalizeInfo.calledWith('/styleguide', 'en', siteName)).to.be.true;
      expect(initPersonalizeServer.calledOnce).to.be.true;
      expect(personalize.calledOnce).to.be.true;
      validateEndMessageDebugLog('personalize middleware end in %dms: %o', {
        rewritePath: '/_variantId_variant-2/styleguide',
        headers: {
          ...res.headers,
          'x-middleware-cache': 'no-cache',
          'x-sc-rewrite': '/_variantId_variant-2/styleguide',
        },
      });
      expect(siteResolver.getByHost).to.be.calledWith('localhost');
      expect(finalRes).to.deep.equal(res);
      nextRewriteStub.restore();
    });

    it('custom fallback hostname is used', async () => {
      const req = createRequest({
        headerValues: {
          host: undefined,
        },
      });
      const res = createResponse();
      const nextRewriteStub = sinon.stub(nextjs.NextResponse, 'rewrite').returns(res);
      const {
        middleware,
        getPersonalizeInfo,
        initPersonalizeServer,
        personalize,
        siteResolver,
      } = createMiddleware({
        variantId: 'variant-2',
        defaultHostname: 'foobar',
      });
      const finalRes = await middleware.getHandler()(req, res);
      expect(initPersonalizeServer.calledOnce).to.be.true;
      expect(personalize.calledOnce).to.be.true;
      validateDebugLog('personalize middleware start: %o', {
        headers: { ...req.headers },
        hostname: 'foobar',
        pathname: '/styleguide',
        language: 'en',
      });
      expect(getPersonalizeInfo.calledWith('/styleguide', 'en', siteName)).to.be.true;
      validateEndMessageDebugLog('personalize middleware end in %dms: %o', {
        rewritePath: '/_variantId_variant-2/styleguide',
        headers: {
          ...res.headers,
          'x-middleware-cache': 'no-cache',
          'x-sc-rewrite': '/_variantId_variant-2/styleguide',
        },
      });
      expect(siteResolver.getByHost).to.be.calledWith('foobar');
      expect(finalRes).to.deep.equal(res);
      nextRewriteStub.restore();
    });

    it('configured scope is used', async () => {
      const pageId = 'item-id';
      const scope = 'myscope';
      const req = createRequest();
      const res = createResponse();
      const nextRewriteStub = sinon.stub(nextjs.NextResponse, 'rewrite').returns(res);
      const personalizeStub = sinon.stub().returns(Promise.resolve({ variantId: undefined }));
      const { middleware, getPersonalizeInfo, personalize } = createMiddleware({
        scope,
        personalizeInfo: {
          pageId,
          variantIds: ['variant1'],
        },
        personalizeStub,
      });
      const finalRes = await middleware.getHandler()(req, res);

      expect(getPersonalizeInfo.calledWith('/styleguide', 'en', siteName)).to.be.true;
      expect(
        personalize.calledWith(
          sinon.match({ friendlyId: CdpHelper.getPageFriendlyId(pageId, 'en', scope) }),
          sinon.match.any
        )
      ).to.be.true;
      expect(finalRes).to.deep.equal(res);
      nextRewriteStub.restore();
    });

    it('component testing is executed', async () => {
      const pageId = 'item-id';
      const req = createRequest();
      const res = createResponse();
      const nextRewriteStub = sinon.stub(nextjs.NextResponse, 'rewrite').returns(res);
      const personalizeStub = sinon.stub();
      personalizeStub
        .withArgs(
          sinon.match({ friendlyId: CdpHelper.getComponentFriendlyId(pageId, 'component1', 'en') }),
          sinon.match.any
        )
        .returns(Promise.resolve({ variantId: 'component1_default' }));
      personalizeStub
        .withArgs(
          sinon.match({ friendlyId: CdpHelper.getComponentFriendlyId(pageId, 'component2', 'en') }),
          sinon.match.any
        )
        .returns(Promise.resolve({ variantId: 'component2_variant1' }));
      personalizeStub
        .withArgs(
          sinon.match({ friendlyId: CdpHelper.getComponentFriendlyId(pageId, 'component3', 'en') }),
          sinon.match.any
        )
        .returns(Promise.resolve({ variantId: 'component3_variant3' }));
      const { middleware, getPersonalizeInfo, initPersonalizeServer } = createMiddleware({
        personalizeInfo: {
          pageId,
          variantIds: [
            'component1_variant1',
            'component2_variant1',
            'component2_variant2',
            'component3_variant1',
            'component3_variant2',
            'component3_variant3',
          ],
        },
        personalizeStub,
      });
      const finalRes = await middleware.getHandler()(req);

      expect(getPersonalizeInfo.calledWith('/styleguide', 'en')).to.be.true;
      expect(initPersonalizeServer.calledOnce).to.be.true;
      expect(personalizeStub.calledThrice).to.be.true;
      validateDebugLog('personalize middleware start: %o', {
        headers: {
          ...req.headers,
        },
        hostname: 'foo.net',
        pathname: '/styleguide',
        language: 'en',
      });
      validateEndMessageDebugLog('personalize middleware end in %dms: %o', {
        rewritePath:
          '/_variantId_component1_default/_variantId_component2_variant1/_variantId_component3_variant3/styleguide',
        headers: {
          ...res.headers,
          'x-middleware-cache': 'no-cache',
          'x-sc-rewrite':
            '/_variantId_component1_default/_variantId_component2_variant1/_variantId_component3_variant3/styleguide',
        },
      });
      expect(finalRes).to.deep.equal(res);
      nextRewriteStub.restore();
    });
  });

  describe('error handling', () => {
    const req = createRequest();
    const res = createResponse({
      body: '<div> Regular page </div>',
    });

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

    it('should log error when getPersonalizeInfo throws', async () => {
      const error = new Error('Edge fails');

      const getPersonalizeInfoWithError = sinon.stub().throws(error);

      const {
        middleware,
        getPersonalizeInfo,
        initPersonalizeServer,
        personalize,
      } = createMiddleware({
        getPersonalizeInfoStub: getPersonalizeInfoWithError,
      });

      const finalRes = await middleware.getHandler()(req, res);

      expect(initPersonalizeServer.called).to.be.false;
      expect(personalize.called).to.be.false;

      expect(getPersonalizeInfo.called).to.be.true;
      expect(errorSpy.getCall(0).calledWith('Personalize middleware failed:')).to.be.true;
      expect(errorSpy.getCall(1).calledWith(error)).to.be.true;

      expect(finalRes).to.deep.equal(res);
    });
  });
});
