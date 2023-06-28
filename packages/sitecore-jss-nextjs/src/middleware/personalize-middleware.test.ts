/* eslint-disable no-unused-expressions */
/* eslint-disable dot-notation */
import chai, { use } from 'chai';
import chaiString from 'chai-string';
import sinonChai from 'sinon-chai';
import sinon, { spy } from 'sinon';
import nextjs, { NextRequest, NextResponse } from 'next/server';
import { debug } from '@sitecore-jss/sitecore-jss';
import { ExperienceParams } from '@sitecore-jss/sitecore-jss/personalize';
import { SiteResolver } from '@sitecore-jss/sitecore-jss/site';
import { PersonalizeMiddleware } from './personalize-middleware';

use(sinonChai);
const expect = chai.use(chaiString).expect;

describe('PersonalizeMiddleware', () => {
  const ua = 'user-agent-string';
  const userAgentStub = sinon.stub(nextjs, 'userAgent').returns({ ua } as any);
  const debugSpy = spy(debug, 'personalize');
  const validateDebugLog = (message, ...params) =>
    expect(debugSpy.args.find((log) => log[0] === message)).to.deep.equal([message, ...params]);

  const hostname = 'foo.net';
  const siteName = 'bar';

  const id = 'item-id';
  const version = '1';
  const variantIds = ['variant-1', 'variant-2'];
  const browserId = 'browser-id';
  const contentId = `${id}_en_${version}`.toLowerCase();
  const defaultLang = 'en';
  const pointOfSale = 'cdp-pos';

  const referrer = 'http://localhost:3000';
  const experienceParams: ExperienceParams = {
    referrer,
    utm: {
      campaign: 'utm_campaign',
      content: null,
      medium: null,
      source: null,
    },
  };

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
              utm_content: null,
              utm_medium: null,
              utm_source: null,
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
            'BID_cdp-client-key': 'browser-id',
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
        ...props.headerValues,
        referer: referrer,
      },
      referrer: 'about:client',
    } as NextRequest;

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
      cdpConfig?: any;
      edgeConfig?: any;
      variantId?: string;
      browserId?: string;
      personalizeInfo?: {
        contentId: string;
        variantIds: string[];
      } | null;
      executeExperienceStub?: sinon.SinonStub;
      generateBrowserIdStub?: sinon.SinonStub;
      getPersonalizeInfoStub?: sinon.SinonStub;
    } = {}
  ) => {
    const cdpConfig = {
      clientKey: 'cdp-client-key',
      endpoint: 'http://cdp-endpoint',
      ...(props?.cdpConfig || {}),
    };

    const edgeConfig = {
      apiKey: 'edge-api-key',
      endpoint: 'http://edge-endpoint/api/graph/edge',
      ...(props?.edgeConfig || {}),
    };

    class MockSiteResolver extends SiteResolver {
      getByName = sinon.stub().callsFake((siteName: string) => ({
        name: siteName,
        language: props.language || '',
        hostName: hostname,
        pointOfSale: {
          [props.language || defaultLang]: pointOfSale,
        },
      }));

      getByHost = sinon.stub().callsFake((hostName: string) => ({
        name: siteName,
        language: props.language || '',
        hostName,
        pointOfSale: {
          [props.language || defaultLang]: pointOfSale,
        },
      }));
    }

    const siteResolver: SiteResolver = props.siteResolver || new MockSiteResolver([]);

    const middleware = new PersonalizeMiddleware({
      siteResolver,
      ...props,
      cdpConfig,
      edgeConfig,
    });

    const executeExperience = (middleware['cdpService']['executeExperience'] =
      props.executeExperienceStub || sinon.stub().returns(Promise.resolve(props.variantId)));

    const generateBrowserId = (middleware['cdpService']['generateBrowserId'] =
      props.generateBrowserIdStub || sinon.stub().returns(Promise.resolve(props.browserId)));

    const getPersonalizeInfo = (middleware['personalizeService']['getPersonalizeInfo'] =
      props.getPersonalizeInfoStub ||
      sinon.stub().returns(
        Promise.resolve(
          props.personalizeInfo === null
            ? undefined
            : props.personalizeInfo || {
                contentId,
                variantIds,
              }
        )
      ));

    return {
      middleware,
      executeExperience,
      generateBrowserId,
      getPersonalizeInfo,
      siteResolver,
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

      const getCookiesSpy = spy(req.cookies, 'get');

      const finalRes = await middleware.getHandler()(req, res);

      validateDebugLog('personalize middleware start: %o', {
        browserId: 'browser-id',
        hostname: 'foo.net',
        pathname: '/styleguide',
        language: 'en',
      });

      validateDebugLog('skipped (personalize middleware is disabled)');

      expect(getCookiesSpy.calledWith('BID_cdp-client-key')).to.be.true;

      expect(finalRes).to.deep.equal(res);

      getCookiesSpy.restore();
    });

    it('redirected', async () => {
      const req = createRequest();

      const res = createResponse({ redirected: true });

      const { middleware } = createMiddleware();

      const getCookiesSpy = spy(req.cookies, 'get');

      const finalRes = await middleware.getHandler()(req, res);

      validateDebugLog('personalize middleware start: %o', {
        browserId: 'browser-id',
        hostname: 'foo.net',
        pathname: '/styleguide',
        language: 'en',
      });

      validateDebugLog('skipped (%s)', 'redirected');

      expect(getCookiesSpy.calledWith('BID_cdp-client-key')).to.be.true;

      expect(finalRes).to.deep.equal(res);

      getCookiesSpy.restore();
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
          browserId: 'browser-id',
          hostname: 'foo.net',
          pathname: '/styleguide',
          language: 'en',
        });

        validateDebugLog('skipped (%s)', 'preview');

        expect(getCookiesSpy.calledWith('BID_cdp-client-key')).to.be.true;
        expect(getCookiesSpy.calledWith('__prerender_bypass')).to.be.true;

        expect(finalRes).to.deep.equal(res);

        getCookiesSpy.restore();
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
          browserId: 'browser-id',
          hostname: 'foo.net',
          pathname: '/styleguide',
          language: 'en',
        });

        validateDebugLog('skipped (%s)', 'preview');

        expect(getCookiesSpy.calledWith('BID_cdp-client-key')).to.be.true;
        expect(getCookiesSpy.calledWith('__prerender_bypass')).to.be.true;
        expect(getCookiesSpy.calledWith('__next_preview_data')).to.be.true;

        expect(finalRes).to.deep.equal(res);

        getCookiesSpy.restore();
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

        const getCookiesSpy = spy(req.cookies, 'get');

        const finalRes = await middleware.getHandler()(req, res);

        validateDebugLog('personalize middleware start: %o', {
          browserId: 'browser-id',
          hostname: 'foo.net',
          pathname,
          language: 'en',
        });

        validateDebugLog('skipped (%s)', 'route excluded');

        expect(getCookiesSpy.calledWith('BID_cdp-client-key')).to.be.true;

        expect(finalRes).to.deep.equal(res);

        getCookiesSpy.restore();
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

      const getCookiesSpy = spy(req.cookies, 'get');

      const finalRes = await middleware.getHandler()(req, res);

      validateDebugLog('personalize middleware start: %o', {
        browserId: 'browser-id',
        hostname: 'foo.net',
        pathname: '/styleguide',
        language: 'en',
      });

      expect(getPersonalizeInfo.calledWith('/styleguide', 'en')).to.be.true;

      validateDebugLog('skipped (personalize info not found)');

      expect(getCookiesSpy.calledWith('BID_cdp-client-key')).to.be.true;

      expect(finalRes).to.deep.equal(res);

      getCookiesSpy.restore();
    });

    it('no personalization configured', async () => {
      const req = createRequest();

      const res = createResponse();

      const { middleware, getPersonalizeInfo } = createMiddleware({
        personalizeInfo: {
          contentId,
          variantIds: [],
        },
      });

      const getCookiesSpy = spy(req.cookies, 'get');

      const finalRes = await middleware.getHandler()(req, res);

      validateDebugLog('personalize middleware start: %o', {
        browserId: 'browser-id',
        hostname: 'foo.net',
        pathname: '/styleguide',
        language: 'en',
      });

      expect(getPersonalizeInfo.calledWith('/styleguide', 'en')).to.be.true;

      validateDebugLog('skipped (no personalization configured)');

      expect(getCookiesSpy.calledWith('BID_cdp-client-key')).to.be.true;

      expect(finalRes).to.deep.equal(res);

      getCookiesSpy.restore();
    });

    it('browser id generation failed', async () => {
      const req = createRequest({
        cookieValues: { 'BID_cdp-client-key': undefined },
      });

      const res = createResponse();

      const { middleware, generateBrowserId, getPersonalizeInfo } = createMiddleware({
        browserId: undefined,
      });

      const getCookiesSpy = spy(req.cookies, 'get');

      const finalRes = await middleware.getHandler()(req, res);

      validateDebugLog('personalize middleware start: %o', {
        browserId: undefined,
        hostname: 'foo.net',
        pathname: '/styleguide',
        language: 'en',
      });

      expect(getPersonalizeInfo.calledWith('/styleguide', 'en')).to.be.true;

      expect(generateBrowserId.calledOnce).to.be.true;

      validateDebugLog('skipped (browser id generation failed)');

      expect(getCookiesSpy.calledWith('BID_cdp-client-key')).to.be.true;

      expect(finalRes).to.deep.equal(res);

      getCookiesSpy.restore();
    });

    it('no variant identified', async () => {
      const req = createRequest();

      const res = createResponse();

      const { middleware, executeExperience, getPersonalizeInfo } = createMiddleware({
        variantId: undefined,
      });

      const getCookiesSpy = spy(req.cookies, 'get');

      const finalRes = await middleware.getHandler()(req, res);

      validateDebugLog('personalize middleware start: %o', {
        browserId: 'browser-id',
        hostname: 'foo.net',
        pathname: '/styleguide',
        language: 'en',
      });

      expect(getPersonalizeInfo.calledWith('/styleguide', 'en')).to.be.true;

      expect(executeExperience.calledWith(contentId, browserId, ua, pointOfSale, experienceParams))
        .to.be.true;

      validateDebugLog('skipped (no variant identified)');

      expect(getCookiesSpy.calledWith('BID_cdp-client-key')).to.be.true;

      expect(finalRes).to.deep.equal(res);

      getCookiesSpy.restore();
    });

    it('invalid variant', async () => {
      const req = createRequest();

      const res = createResponse();

      const { middleware, getPersonalizeInfo, executeExperience } = createMiddleware({
        variantId: 'invalid-variant',
      });

      const getCookiesSpy = spy(req.cookies, 'get');

      const finalRes = await middleware.getHandler()(req, res);

      validateDebugLog('personalize middleware start: %o', {
        browserId: 'browser-id',
        hostname: 'foo.net',
        pathname: '/styleguide',
        language: 'en',
      });

      expect(getPersonalizeInfo.calledWith('/styleguide', 'en')).to.be.true;

      expect(executeExperience.calledWith(contentId, browserId, ua, pointOfSale, experienceParams))
        .to.be.true;

      validateDebugLog('skipped (invalid variant)');

      expect(getCookiesSpy.calledWith('BID_cdp-client-key')).to.be.true;

      expect(finalRes).to.deep.equal(res);

      getCookiesSpy.restore();
    });
  });

  describe('request passed', () => {
    it('browser id is present in cookies', async () => {
      const req = createRequest({
        cookieValues: {
          'BID_cdp-client-key': 'browser-id',
        },
      });

      const res = createResponse();

      const nextRewriteStub = sinon.stub(nextjs.NextResponse, 'rewrite').returns(res);

      const { middleware, getPersonalizeInfo, executeExperience, siteResolver } = createMiddleware({
        variantId: 'variant-2',
      });

      const getCookiesSpy = spy(req.cookies, 'get');

      const finalRes = await middleware.getHandler()(req, res);

      validateDebugLog('personalize middleware start: %o', {
        browserId: 'browser-id',
        hostname: 'foo.net',
        pathname: '/styleguide',
        language: 'en',
      });

      expect(getPersonalizeInfo.calledWith('/styleguide', 'en')).to.be.true;

      expect(executeExperience.calledWith(contentId, browserId, ua, pointOfSale, experienceParams))
        .to.be.true;

      validateDebugLog('personalize middleware end: %o', {
        rewritePath: '/_variantId_variant-2/styleguide',
        browserId: 'browser-id',
        headers: {
          ...res.headers,
          'x-middleware-cache': 'no-cache',
          'x-sc-rewrite': '/_variantId_variant-2/styleguide',
        },
      });

      expect(siteResolver.getByHost).to.be.calledWith(hostname);

      expect(getCookiesSpy.calledWith('BID_cdp-client-key')).to.be.true;

      expect(finalRes).to.deep.equal(res);

      expect(finalRes.cookies['BID_cdp-client-key']).to.equal(browserId);

      getCookiesSpy.restore();
      nextRewriteStub.restore();
    });

    it('browser id is not present in cookies', async () => {
      const req = createRequest({
        cookieValues: {
          'BID_cdp-client-key': undefined,
        },
      });

      const res = createResponse();

      const nextRewriteStub = sinon.stub(nextjs.NextResponse, 'rewrite').returns(res);

      const {
        middleware,
        generateBrowserId,
        getPersonalizeInfo,
        executeExperience,
        siteResolver,
      } = createMiddleware({
        browserId,
        variantId: 'variant-2',
      });

      const getCookiesSpy = spy(req.cookies, 'get');

      const finalRes = await middleware.getHandler()(req, res);

      validateDebugLog('personalize middleware start: %o', {
        browserId: undefined,
        hostname: 'foo.net',
        pathname: '/styleguide',
        language: 'en',
      });

      expect(generateBrowserId.calledOnce).to.be.true;

      expect(getPersonalizeInfo.calledWith('/styleguide', 'en')).to.be.true;

      expect(executeExperience.calledWith(contentId, browserId, ua, pointOfSale, experienceParams))
        .to.be.true;

      validateDebugLog('personalize middleware end: %o', {
        rewritePath: '/_variantId_variant-2/styleguide',
        browserId: 'browser-id',
        headers: {
          ...res.headers,
          'x-middleware-cache': 'no-cache',
          'x-sc-rewrite': '/_variantId_variant-2/styleguide',
        },
      });

      expect(siteResolver.getByHost).to.be.calledWith(hostname);

      expect(getCookiesSpy.calledWith('BID_cdp-client-key')).to.be.true;

      expect(finalRes).to.deep.equal(res);

      expect(finalRes.cookies['BID_cdp-client-key']).to.equal(browserId);

      getCookiesSpy.restore();
      nextRewriteStub.restore();
    });

    it('fallback defaultLocale is used', async () => {
      const contentId = `${id}_da-dk_${version}`;
      const language = 'da-DK';
      const req = createRequest({
        nextUrl: {
          locale: undefined,
          defaultLocale: language,
        },
      });

      const res = createResponse();

      const nextRewriteStub = sinon.stub(nextjs.NextResponse, 'rewrite').returns(res);

      const { middleware, getPersonalizeInfo, executeExperience, siteResolver } = createMiddleware({
        language,
        variantId: 'variant-2',
        personalizeInfo: {
          variantIds,
          contentId,
        },
      });

      const getCookiesSpy = spy(req.cookies, 'get');

      const finalRes = await middleware.getHandler()(req, res);

      validateDebugLog('personalize middleware start: %o', {
        browserId: 'browser-id',
        hostname: 'foo.net',
        pathname: '/styleguide',
        language: language,
      });

      expect(getPersonalizeInfo.calledWith('/styleguide', 'da-DK')).to.be.true;

      expect(executeExperience.calledWith(contentId, browserId, ua, pointOfSale, experienceParams))
        .to.be.true;

      validateDebugLog('personalize middleware end: %o', {
        rewritePath: '/_variantId_variant-2/styleguide',
        browserId: 'browser-id',
        headers: {
          ...res.headers,
          'x-middleware-cache': 'no-cache',
          'x-sc-rewrite': '/_variantId_variant-2/styleguide',
        },
      });

      expect(siteResolver.getByHost).to.be.calledWith(hostname);

      expect(getCookiesSpy.calledWith('BID_cdp-client-key')).to.be.true;

      expect(finalRes).to.deep.equal(res);

      expect(finalRes.cookies['BID_cdp-client-key']).to.equal(browserId);

      getCookiesSpy.restore();
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

      const { middleware, getPersonalizeInfo, executeExperience, siteResolver } = createMiddleware({
        variantId: 'variant-2',
      });

      const getCookiesSpy = spy(req.cookies, 'get');

      const finalRes = await middleware.getHandler()(req, res);

      validateDebugLog('personalize middleware start: %o', {
        browserId: 'browser-id',
        hostname: 'foo.net',
        pathname: '/styleguide',
        language: 'en',
      });

      expect(getPersonalizeInfo.calledWith('/styleguide', 'en')).to.be.true;

      expect(executeExperience.calledWith(contentId, browserId, ua, pointOfSale, experienceParams))
        .to.be.true;

      validateDebugLog('personalize middleware end: %o', {
        rewritePath: '/_variantId_variant-2/styleguide',
        browserId: 'browser-id',
        headers: {
          ...res.headers,
          'x-middleware-cache': 'no-cache',
          'x-sc-rewrite': '/_variantId_variant-2/styleguide',
        },
      });

      expect(siteResolver.getByHost).to.be.calledWith(hostname);

      expect(getCookiesSpy.calledWith('BID_cdp-client-key')).to.be.true;

      expect(finalRes).to.deep.equal(res);

      expect(finalRes.cookies['BID_cdp-client-key']).to.equal(browserId);

      getCookiesSpy.restore();
      nextRewriteStub.restore();
    });

    it('custom response object is not provided', async () => {
      const req = createRequest();

      const res = createResponse();

      const nextRewriteStub = sinon.stub(nextjs.NextResponse, 'rewrite').returns(res);

      const { middleware, getPersonalizeInfo, executeExperience, siteResolver } = createMiddleware({
        variantId: 'variant-2',
      });

      const getCookiesSpy = spy(req.cookies, 'get');

      const finalRes = await middleware.getHandler()(req);

      expect(getPersonalizeInfo.calledWith('/styleguide', 'en')).to.be.true;

      expect(executeExperience.calledWith(contentId, browserId, ua, pointOfSale, experienceParams))
        .to.be.true;

      validateDebugLog('personalize middleware start: %o', {
        browserId: 'browser-id',
        hostname: 'foo.net',
        pathname: '/styleguide',
        language: 'en',
      });

      validateDebugLog('personalize middleware end: %o', {
        rewritePath: '/_variantId_variant-2/styleguide',
        browserId: 'browser-id',
        headers: {
          ...res.headers,
          'x-middleware-cache': 'no-cache',
          'x-sc-rewrite': '/_variantId_variant-2/styleguide',
        },
      });

      expect(siteResolver.getByHost).to.be.calledWith(hostname);

      expect(getCookiesSpy.calledWith('BID_cdp-client-key')).to.be.true;

      expect(finalRes).to.deep.equal(res);

      expect(finalRes.cookies['BID_cdp-client-key']).to.equal(browserId);

      getCookiesSpy.restore();
      nextRewriteStub.restore();
    });

    it('optional experiece params are not present', async () => {
      userAgentStub.returns({ ua: '' } as any);

      const req = createRequest();

      const res = createResponse();

      const nextRewriteStub = sinon.stub(nextjs.NextResponse, 'rewrite').returns(res);

      const { middleware, getPersonalizeInfo, executeExperience, siteResolver } = createMiddleware({
        variantId: 'variant-2',
      });

      const getCookiesSpy = spy(req.cookies, 'get');

      const finalRes = await middleware.getHandler()(req, res);

      validateDebugLog('personalize middleware start: %o', {
        browserId: 'browser-id',
        hostname: 'foo.net',
        pathname: '/styleguide',
        language: 'en',
      });

      expect(getPersonalizeInfo.calledWith('/styleguide', 'en')).to.be.true;

      expect(
        executeExperience.calledWith(contentId, browserId, '', pointOfSale, {
          referrer,
          utm: {
            campaign: 'utm_campaign',
            content: null,
            medium: null,
            source: null,
          },
        })
      ).to.be.true;

      validateDebugLog('personalize middleware end: %o', {
        rewritePath: '/_variantId_variant-2/styleguide',
        browserId: 'browser-id',
        headers: {
          ...res.headers,
          'x-middleware-cache': 'no-cache',
          'x-sc-rewrite': '/_variantId_variant-2/styleguide',
        },
      });

      expect(siteResolver.getByHost).to.be.calledWith(hostname);

      expect(getCookiesSpy.calledWith('BID_cdp-client-key')).to.be.true;

      expect(finalRes).to.deep.equal(res);

      expect(finalRes.cookies['BID_cdp-client-key']).to.equal(browserId);

      getCookiesSpy.restore();
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

      const { middleware, getPersonalizeInfo, executeExperience, siteResolver } = createMiddleware({
        variantId: 'variant-2',
      });

      const getCookiesSpy = spy(req.cookies, 'get');

      const finalRes = await middleware.getHandler()(req, res);

      validateDebugLog('personalize middleware start: %o', {
        browserId: 'browser-id',
        hostname: 'foo.net',
        pathname: '/styleguide',
        language: 'en',
      });

      expect(getPersonalizeInfo.calledWith('/styleguide', 'en', 'foo')).to.be.true;

      expect(executeExperience.calledWith(contentId, browserId, ua, pointOfSale, experienceParams))
        .to.be.true;

      validateDebugLog('personalize middleware end: %o', {
        rewritePath: '/_variantId_variant-2/styleguide',
        browserId: 'browser-id',
        headers: {
          ...res.headers,
          'x-middleware-cache': 'no-cache',
          'x-sc-rewrite': '/_variantId_variant-2/styleguide',
        },
      });

      expect(siteResolver.getByHost).not.called.to.equal(true);
      expect(siteResolver.getByName).calledOnceWith('foo');

      expect(getCookiesSpy.calledWith('BID_cdp-client-key')).to.be.true;

      expect(finalRes).to.deep.equal(res);

      expect(finalRes.cookies['BID_cdp-client-key']).to.equal(browserId);

      getCookiesSpy.restore();
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

      const { middleware, getPersonalizeInfo, executeExperience, siteResolver } = createMiddleware({
        variantId: 'variant-2',
      });

      const getCookiesSpy = spy(req.cookies, 'get');

      const finalRes = await middleware.getHandler()(req, res);

      validateDebugLog('personalize middleware start: %o', {
        browserId: 'browser-id',
        hostname: 'foo.net',
        pathname: '/styleguide',
        language: 'en',
      });

      expect(getPersonalizeInfo.calledWith('/styleguide', 'en', siteName)).to.be.true;

      expect(executeExperience.calledWith(contentId, browserId, ua, pointOfSale, experienceParams))
        .to.be.true;

      validateDebugLog('personalize middleware end: %o', {
        rewritePath: '/_variantId_variant-2/_site_nextjs-app/styleguide',
        browserId: 'browser-id',
        headers: {
          ...res.headers,
          'x-middleware-cache': 'no-cache',
          'x-sc-rewrite': '/_variantId_variant-2/_site_nextjs-app/styleguide',
        },
      });

      expect(siteResolver.getByHost).to.be.calledWith(hostname);

      expect(getCookiesSpy.calledWith('BID_cdp-client-key')).to.be.true;

      expect(finalRes).to.deep.equal(res);

      expect(finalRes.cookies['BID_cdp-client-key']).to.equal(browserId);

      getCookiesSpy.restore();
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

      const { middleware, getPersonalizeInfo, executeExperience, siteResolver } = createMiddleware({
        variantId: 'variant-2',
      });

      const getCookiesSpy = spy(req.cookies, 'get');

      const finalRes = await middleware.getHandler()(req, res);

      validateDebugLog('personalize middleware start: %o', {
        browserId: 'browser-id',
        hostname: 'localhost',
        pathname: '/styleguide',
        language: 'en',
      });

      expect(getPersonalizeInfo.calledWith('/styleguide', 'en', siteName)).to.be.true;

      expect(executeExperience.calledWith(contentId, browserId, ua, pointOfSale, experienceParams))
        .to.be.true;

      validateDebugLog('personalize middleware end: %o', {
        rewritePath: '/_variantId_variant-2/styleguide',
        browserId: 'browser-id',
        headers: {
          ...res.headers,
          'x-middleware-cache': 'no-cache',
          'x-sc-rewrite': '/_variantId_variant-2/styleguide',
        },
      });

      expect(siteResolver.getByHost).to.be.calledWith('localhost');

      expect(getCookiesSpy.calledWith('BID_cdp-client-key')).to.be.true;

      expect(finalRes).to.deep.equal(res);

      expect(finalRes.cookies['BID_cdp-client-key']).to.equal(browserId);

      getCookiesSpy.restore();
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

      const { middleware, getPersonalizeInfo, executeExperience, siteResolver } = createMiddleware({
        variantId: 'variant-2',
        defaultHostname: 'foobar',
      });

      const getCookiesSpy = spy(req.cookies, 'get');

      const finalRes = await middleware.getHandler()(req, res);

      validateDebugLog('personalize middleware start: %o', {
        browserId: 'browser-id',
        hostname: 'foobar',
        pathname: '/styleguide',
        language: 'en',
      });

      expect(getPersonalizeInfo.calledWith('/styleguide', 'en', siteName)).to.be.true;

      expect(executeExperience.calledWith(contentId, browserId, ua, pointOfSale, experienceParams))
        .to.be.true;

      validateDebugLog('personalize middleware end: %o', {
        rewritePath: '/_variantId_variant-2/styleguide',
        browserId: 'browser-id',
        headers: {
          ...res.headers,
          'x-middleware-cache': 'no-cache',
          'x-sc-rewrite': '/_variantId_variant-2/styleguide',
        },
      });

      expect(siteResolver.getByHost).to.be.calledWith('foobar');

      expect(getCookiesSpy.calledWith('BID_cdp-client-key')).to.be.true;

      expect(finalRes).to.deep.equal(res);

      expect(finalRes.cookies['BID_cdp-client-key']).to.equal(browserId);

      getCookiesSpy.restore();
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

    it('should log error when executeExperience throws', async () => {
      const error = new Error('CDP executeExperience fails');

      const executeExperienceWithError = sinon.stub().throws(error);

      const { middleware, executeExperience } = createMiddleware({
        executeExperienceStub: executeExperienceWithError,
      });

      const finalRes = await middleware.getHandler()(req, res);

      expect(executeExperience.called).to.be.true;

      expect(errorSpy.getCall(0).calledWith('Personalize middleware failed:')).to.be.true;
      expect(errorSpy.getCall(1).calledWith(error)).to.be.true;

      expect(finalRes).to.deep.equal(res);
    });

    it('should log error when generateBrowserId throws', async () => {
      const error = new Error('CDP generateBrowserId fails');
      const req = createRequest({
        cookieValues: { 'BID_cdp-client-key': undefined },
      });

      const generateBrowserIdWithError = sinon.stub().throws(error);

      const { middleware, generateBrowserId } = createMiddleware({
        browserId: undefined,
        generateBrowserIdStub: generateBrowserIdWithError,
      });

      const finalRes = await middleware.getHandler()(req, res);

      expect(generateBrowserId.called).to.be.true;

      expect(errorSpy.getCall(0).calledWith('Personalize middleware failed:')).to.be.true;
      expect(errorSpy.getCall(1).calledWith(error)).to.be.true;

      expect(finalRes).to.deep.equal(res);
    });

    it('should log error when getPersonalizeInfo throws', async () => {
      const error = new Error('Edge fails');

      const getPersonalizeInfoWithError = sinon.stub().throws(error);

      const { middleware, getPersonalizeInfo } = createMiddleware({
        getPersonalizeInfoStub: getPersonalizeInfoWithError,
      });

      const finalRes = await middleware.getHandler()(req, res);

      expect(getPersonalizeInfo.called).to.be.true;
      expect(errorSpy.getCall(0).calledWith('Personalize middleware failed:')).to.be.true;
      expect(errorSpy.getCall(1).calledWith(error)).to.be.true;

      expect(finalRes).to.deep.equal(res);
    });
  });
});
