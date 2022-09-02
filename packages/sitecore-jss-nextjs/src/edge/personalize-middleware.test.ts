/* eslint-disable no-unused-expressions */
import chai, { use } from 'chai';
import chaiString from 'chai-string';
import sinonChai from 'sinon-chai';
import sinon, { spy } from 'sinon';
import nock from 'nock';
import nextjs, { NextRequest, NextResponse } from 'next/server';
import { debug } from '@sitecore-jss/sitecore-jss';
import { ExperienceParams } from '@sitecore-jss/sitecore-jss/personalize';

import { PersonalizeMiddleware } from './personalize-middleware';

use(sinonChai);
const expect = chai.use(chaiString).expect;

describe('PersonalizeMiddleware', () => {
  const userAgentStub = sinon.stub(nextjs, 'userAgent').returns({ ua: 'ua' } as any);
  const debugSpy = spy(debug, 'personalize');
  const validateDebugLog = (message, ...params) =>
    expect(debugSpy.args.find((log) => log[0] === message)).to.deep.equal([message, ...params]);

  const createMiddleware = (
    props: { [key: string]: unknown; cdpConfig?: any; edgeConfig?: any } = {}
  ) =>
    new PersonalizeMiddleware({
      ...props,
      cdpConfig: {
        clientKey: 'cdp-client-key',
        endpoint: 'http://cdp-endpoint',
        pointOfSale: 'cdp-pos',
        ...(props?.cdpConfig || {}),
      },
      edgeConfig: {
        apiKey: 'edge-api-key',
        endpoint: 'http://edge-endpoint/api/graph/edge',
        siteName: 'nextjs-app',
        ...(props?.edgeConfig || {}),
      },
    });

  const id = 'item-id';
  const version = '1';
  const variantIds = ['variant-1', 'variant-2'];
  const browserId = 'browser-id';
  const contentId = `${id}_en_${version}`.toLowerCase();
  const personalizeQueryResult = {
    layout: {
      item: {
        id,
        version,
        personalization: {
          variantIds,
        },
      },
    },
  };

  const referrer = 'http://localhost:3000';
  const experienceParams: ExperienceParams = {
    geo: {
      city: 'geo-city',
      country: 'geo-country',
      latitude: 'geo-latitude',
      longitude: 'geo-longitude',
      region: 'geo-region',
    },
    referrer,
    ua: 'ua',
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
        locale: 'en',
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
          const cookies = { 'bid_cdp-client-key': 'browser-id', ...props.cookieValues };

          return cookies[cookieName];
        },
        ...props?.cookies,
      },
      referrer,
      geo: props?.geo === null ? null : props?.geo || experienceParams.geo,
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
      headers: {
        set(key, value) {
          res.headers[key] = value;
        },
      },
      ...props,
    } as NextResponse;

    return res;
  };

  const mockPersonalizeDataRequest = (data: any = personalizeQueryResult) =>
    nock('http://edge-endpoint', {
      reqheaders: {
        sc_apikey: 'edge-api-key',
      },
    })
      .post('/api/graph/edge')
      .reply(200, {
        data,
      });

  const mockBrowserIdGenerationRequest = (ref) =>
    nock('http://cdp-endpoint')
      .get('/v1.2/browser/create.json?client_key=cdp-client-key&message={}')
      .reply(200, {
        ref,
      });

  const mockExecuteExperienceRequest = (
    variantId,
    { friendlyId = contentId, params = experienceParams } = {}
  ) =>
    nock('http://cdp-endpoint')
      .post('/v2/callFlows', {
        clientKey: 'cdp-client-key',
        pointOfSale: 'cdp-pos',
        params,
        browserId: 'browser-id',
        friendlyId,
        channel: 'WEB',
      })
      .reply(200, {
        variantId,
      });

  beforeEach(() => {
    userAgentStub.resetHistory();
    debugSpy.resetHistory();
  });

  afterEach(() => {
    userAgentStub.returns({ ua: 'ua' } as any);
  });

  describe('request skipped', () => {
    it('disabled', async () => {
      const props = {
        disabled: (req) => req?.nextUrl.pathname === '/styleguide' && req.nextUrl.locale === 'en',
      };

      const req = createRequest();

      const res = createResponse();

      const middleware = createMiddleware(props);

      const getCookiesSpy = spy(req.cookies, 'get');

      const finalRes = await middleware.getHandler()(req, res);

      validateDebugLog('personalize middleware start: %o', {
        pathname: '/styleguide',
        language: 'en',
      });

      validateDebugLog('skipped (personalize middleware is disabled)');

      expect(getCookiesSpy.calledWith('bid_cdp-client-key')).to.be.true;

      expect(finalRes).to.deep.equal(res);

      getCookiesSpy.restore();
    });

    it('redirected', async () => {
      const req = createRequest();

      const res = createResponse({ redirected: true });

      const middleware = createMiddleware();

      const getCookiesSpy = spy(req.cookies, 'get');

      const finalRes = await middleware.getHandler()(req, res);

      validateDebugLog('personalize middleware start: %o', {
        pathname: '/styleguide',
        language: 'en',
      });

      validateDebugLog('skipped (%s)', 'redirected');

      expect(getCookiesSpy.calledWith('bid_cdp-client-key')).to.be.true;

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

        const middleware = createMiddleware();

        const getCookiesSpy = spy(req.cookies, 'get');

        const finalRes = await middleware.getHandler()(req, res);

        validateDebugLog('personalize middleware start: %o', {
          pathname: '/styleguide',
          language: 'en',
        });

        validateDebugLog('skipped (%s)', 'preview');

        expect(getCookiesSpy.calledWith('bid_cdp-client-key')).to.be.true;
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

        const middleware = createMiddleware();

        const getCookiesSpy = spy(req.cookies, 'get');

        const finalRes = await middleware.getHandler()(req, res);

        validateDebugLog('personalize middleware start: %o', {
          pathname: '/styleguide',
          language: 'en',
        });

        validateDebugLog('skipped (%s)', 'preview');

        expect(getCookiesSpy.calledWith('bid_cdp-client-key')).to.be.true;
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
          pathname,
          language: 'en',
        });

        validateDebugLog('skipped (%s)', 'route excluded');

        expect(getCookiesSpy.calledWith('bid_cdp-client-key')).to.be.true;

        expect(finalRes).to.deep.equal(res);

        getCookiesSpy.restore();
        debugSpy.resetHistory();
      };

      it('default', async () => {
        const middleware = createMiddleware();

        await test('/src/image.png', middleware);
        await test('/api/layout/render', middleware);
        await test('/sitecore/render', middleware);
        await test('/_next/webpack', middleware);
      });

      it('custom excludeRoute function', async () => {
        const excludeRoute = (pathname: string) => pathname === '/crazypath/luna';

        const middleware = createMiddleware({ excludeRoute });

        await test('/crazypath/luna', middleware);
      });
    });

    it('personalize info not found', async () => {
      const personalizeQueryResult = {
        layout: {},
      };

      mockPersonalizeDataRequest(personalizeQueryResult);

      const req = createRequest();

      const res = createResponse();

      const middleware = createMiddleware();

      const getCookiesSpy = spy(req.cookies, 'get');

      const finalRes = await middleware.getHandler()(req, res);

      validateDebugLog('personalize middleware start: %o', {
        pathname: '/styleguide',
        language: 'en',
      });

      validateDebugLog('fetching personalize info for %s %s %s', 'nextjs-app', '/styleguide', 'en');

      validateDebugLog('skipped (personalize info not found)');

      expect(getCookiesSpy.calledWith('bid_cdp-client-key')).to.be.true;

      expect(finalRes).to.deep.equal(res);

      getCookiesSpy.restore();
    });

    it('no personalization configured', async () => {
      const personalizeQueryResult = {
        layout: {
          item: {
            id,
            version,
            personalization: {
              variantIds: [],
            },
          },
        },
      };

      mockPersonalizeDataRequest(personalizeQueryResult);

      const req = createRequest();

      const res = createResponse();

      const middleware = createMiddleware();

      const getCookiesSpy = spy(req.cookies, 'get');

      const finalRes = await middleware.getHandler()(req, res);

      validateDebugLog('personalize middleware start: %o', {
        pathname: '/styleguide',
        language: 'en',
      });

      validateDebugLog('fetching personalize info for %s %s %s', 'nextjs-app', '/styleguide', 'en');

      validateDebugLog('skipped (no personalization configured)');

      expect(getCookiesSpy.calledWith('bid_cdp-client-key')).to.be.true;

      expect(finalRes).to.deep.equal(res);

      getCookiesSpy.restore();
    });

    it('browser id generation failed', async () => {
      mockPersonalizeDataRequest();

      mockBrowserIdGenerationRequest(undefined);

      const req = createRequest({
        cookieValues: { 'bid_cdp-client-key': undefined },
      });

      const res = createResponse();

      const middleware = createMiddleware();

      const getCookiesSpy = spy(req.cookies, 'get');

      const finalRes = await middleware.getHandler()(req, res);

      validateDebugLog('personalize middleware start: %o', {
        pathname: '/styleguide',
        language: 'en',
      });

      validateDebugLog('fetching personalize info for %s %s %s', 'nextjs-app', '/styleguide', 'en');

      validateDebugLog('generating browser id');

      validateDebugLog('skipped (browser id generation failed)');

      expect(getCookiesSpy.calledWith('bid_cdp-client-key')).to.be.true;

      expect(finalRes).to.deep.equal(res);

      getCookiesSpy.restore();
    });

    it('no variant identified', async () => {
      mockPersonalizeDataRequest();

      mockExecuteExperienceRequest(undefined);

      const req = createRequest();

      const res = createResponse();

      const middleware = createMiddleware();

      const getCookiesSpy = spy(req.cookies, 'get');

      const finalRes = await middleware.getHandler()(req, res);

      validateDebugLog('personalize middleware start: %o', {
        pathname: '/styleguide',
        language: 'en',
      });

      validateDebugLog('fetching personalize info for %s %s %s', 'nextjs-app', '/styleguide', 'en');

      validateDebugLog(
        'executing experience for %s %s %o',
        contentId,
        'browser-id',
        experienceParams
      );

      validateDebugLog('skipped (no variant identified)');

      expect(getCookiesSpy.calledWith('bid_cdp-client-key')).to.be.true;

      expect(finalRes).to.deep.equal(res);

      getCookiesSpy.restore();
    });

    it('invalid variant', async () => {
      mockPersonalizeDataRequest();

      mockExecuteExperienceRequest('invalid-variant');

      const req = createRequest();

      const res = createResponse();

      const middleware = createMiddleware();

      const getCookiesSpy = spy(req.cookies, 'get');

      const finalRes = await middleware.getHandler()(req, res);

      validateDebugLog('personalize middleware start: %o', {
        pathname: '/styleguide',
        language: 'en',
      });

      validateDebugLog('fetching personalize info for %s %s %s', 'nextjs-app', '/styleguide', 'en');

      validateDebugLog(
        'executing experience for %s %s %o',
        contentId,
        'browser-id',
        experienceParams
      );

      validateDebugLog('skipped (invalid variant)');

      expect(getCookiesSpy.calledWith('bid_cdp-client-key')).to.be.true;

      expect(finalRes).to.deep.equal(res);

      getCookiesSpy.restore();
    });
  });

  describe('request passed', () => {
    it('browser id is present in cookies', async () => {
      mockPersonalizeDataRequest();

      mockExecuteExperienceRequest('variant-2');

      const req = createRequest({
        cookieValues: {
          'bid_cdp-client-key': 'browser-id',
        },
      });

      const res = createResponse();

      const nextRewriteStub = sinon.stub(nextjs.NextResponse, 'rewrite').returns(res);

      const middleware = createMiddleware();

      const getCookiesSpy = spy(req.cookies, 'get');

      const finalRes = await middleware.getHandler()(req, res);

      validateDebugLog('personalize middleware start: %o', {
        pathname: '/styleguide',
        language: 'en',
      });

      validateDebugLog('fetching personalize info for %s %s %s', 'nextjs-app', '/styleguide', 'en');

      validateDebugLog(
        'executing experience for %s %s %o',
        contentId,
        'browser-id',
        experienceParams
      );

      validateDebugLog('personalize middleware end: %o', {
        rewritePath: '/_variantId_variant-2/styleguide',
        browserId: 'browser-id',
        headers: {
          'x-middleware-cache': 'no-cache',
          set: res.headers.set,
        },
      });

      expect(getCookiesSpy.calledWith('bid_cdp-client-key')).to.be.true;

      expect(finalRes).to.deep.equal(res);

      expect(finalRes.cookies['bid_cdp-client-key']).to.equal(browserId);

      getCookiesSpy.restore();
      nextRewriteStub.restore();
    });

    it('browser id is not present in cookies', async () => {
      mockPersonalizeDataRequest();

      mockBrowserIdGenerationRequest(browserId);

      mockExecuteExperienceRequest('variant-2');

      const req = createRequest({
        cookieValues: {
          'bid_cdp-client-key': undefined,
        },
      });

      const res = createResponse();

      const nextRewriteStub = sinon.stub(nextjs.NextResponse, 'rewrite').returns(res);

      const middleware = createMiddleware();

      const getCookiesSpy = spy(req.cookies, 'get');

      const finalRes = await middleware.getHandler()(req, res);

      validateDebugLog('personalize middleware start: %o', {
        pathname: '/styleguide',
        language: 'en',
      });

      validateDebugLog('fetching personalize info for %s %s %s', 'nextjs-app', '/styleguide', 'en');

      validateDebugLog('generating browser id');

      validateDebugLog(
        'executing experience for %s %s %o',
        contentId,
        'browser-id',
        experienceParams
      );

      validateDebugLog('personalize middleware end: %o', {
        rewritePath: '/_variantId_variant-2/styleguide',
        browserId: 'browser-id',
        headers: {
          'x-middleware-cache': 'no-cache',
          set: res.headers.set,
        },
      });

      expect(getCookiesSpy.calledWith('bid_cdp-client-key')).to.be.true;

      expect(finalRes).to.deep.equal(res);

      expect(finalRes.cookies['bid_cdp-client-key']).to.equal(browserId);

      getCookiesSpy.restore();
      nextRewriteStub.restore();
    });

    it('fallback defaultLocale is used', async () => {
      const contentId = `${id}_da-dk_${version}`;

      mockPersonalizeDataRequest();

      mockExecuteExperienceRequest('variant-2', { friendlyId: contentId });

      const req = createRequest({
        nextUrl: {
          locale: undefined,
          defaultLocale: 'da-DK',
        },
      });

      const res = createResponse();

      const nextRewriteStub = sinon.stub(nextjs.NextResponse, 'rewrite').returns(res);

      const middleware = createMiddleware();

      const getCookiesSpy = spy(req.cookies, 'get');

      const finalRes = await middleware.getHandler()(req, res);

      validateDebugLog('personalize middleware start: %o', {
        pathname: '/styleguide',
        language: 'da-DK',
      });

      validateDebugLog(
        'fetching personalize info for %s %s %s',
        'nextjs-app',
        '/styleguide',
        'da-DK'
      );

      validateDebugLog(
        'executing experience for %s %s %o',
        contentId,
        'browser-id',
        experienceParams
      );

      validateDebugLog('personalize middleware end: %o', {
        rewritePath: '/_variantId_variant-2/styleguide',
        browserId: 'browser-id',
        headers: {
          'x-middleware-cache': 'no-cache',
          set: res.headers.set,
        },
      });

      expect(getCookiesSpy.calledWith('bid_cdp-client-key')).to.be.true;

      expect(finalRes).to.deep.equal(res);

      expect(finalRes.cookies['bid_cdp-client-key']).to.equal(browserId);

      getCookiesSpy.restore();
      nextRewriteStub.restore();
    });

    it('fallback locale is used', async () => {
      mockPersonalizeDataRequest();

      mockExecuteExperienceRequest('variant-2', { friendlyId: contentId });

      const req = createRequest({
        nextUrl: {
          locale: undefined,
          defaultLocale: undefined,
        },
      });

      const res = createResponse();

      const nextRewriteStub = sinon.stub(nextjs.NextResponse, 'rewrite').returns(res);

      const middleware = createMiddleware();

      const getCookiesSpy = spy(req.cookies, 'get');

      const finalRes = await middleware.getHandler()(req, res);

      validateDebugLog('personalize middleware start: %o', {
        pathname: '/styleguide',
        language: 'en',
      });

      validateDebugLog('fetching personalize info for %s %s %s', 'nextjs-app', '/styleguide', 'en');

      validateDebugLog(
        'executing experience for %s %s %o',
        contentId,
        'browser-id',
        experienceParams
      );

      validateDebugLog('personalize middleware end: %o', {
        rewritePath: '/_variantId_variant-2/styleguide',
        browserId: 'browser-id',
        headers: {
          'x-middleware-cache': 'no-cache',
          set: res.headers.set,
        },
      });

      expect(getCookiesSpy.calledWith('bid_cdp-client-key')).to.be.true;

      expect(finalRes).to.deep.equal(res);

      expect(finalRes.cookies['bid_cdp-client-key']).to.equal(browserId);

      getCookiesSpy.restore();
      nextRewriteStub.restore();
    });

    it('custom response object is not provided', async () => {
      mockPersonalizeDataRequest();

      mockExecuteExperienceRequest('variant-2');

      const req = createRequest();

      const res = createResponse();

      const nextRewriteStub = sinon.stub(nextjs.NextResponse, 'rewrite').returns(res);

      const middleware = createMiddleware();

      const getCookiesSpy = spy(req.cookies, 'get');

      const finalRes = await middleware.getHandler()(req);

      validateDebugLog('personalize middleware start: %o', {
        pathname: '/styleguide',
        language: 'en',
      });

      validateDebugLog('fetching personalize info for %s %s %s', 'nextjs-app', '/styleguide', 'en');

      validateDebugLog(
        'executing experience for %s %s %o',
        contentId,
        'browser-id',
        experienceParams
      );

      validateDebugLog('personalize middleware end: %o', {
        rewritePath: '/_variantId_variant-2/styleguide',
        browserId: 'browser-id',
        headers: {
          'x-middleware-cache': 'no-cache',
          set: res.headers.set,
        },
      });

      expect(getCookiesSpy.calledWith('bid_cdp-client-key')).to.be.true;

      expect(finalRes).to.deep.equal(res);

      expect(finalRes.cookies['bid_cdp-client-key']).to.equal(browserId);

      getCookiesSpy.restore();
      nextRewriteStub.restore();
    });

    it('optional experiece params are not present', async () => {
      userAgentStub.returns({ ua: undefined } as any);

      const params = {
        ...experienceParams,
        geo: {
          city: null,
          country: null,
          latitude: null,
          longitude: null,
          region: null,
        },
        ua: null,
      };

      mockPersonalizeDataRequest();

      mockExecuteExperienceRequest('variant-2', { params });

      const req = createRequest({
        geo: {},
      });

      const res = createResponse();

      const nextRewriteStub = sinon.stub(nextjs.NextResponse, 'rewrite').returns(res);

      const middleware = createMiddleware();

      const getCookiesSpy = spy(req.cookies, 'get');

      const finalRes = await middleware.getHandler()(req, res);

      validateDebugLog('personalize middleware start: %o', {
        pathname: '/styleguide',
        language: 'en',
      });

      validateDebugLog('fetching personalize info for %s %s %s', 'nextjs-app', '/styleguide', 'en');

      validateDebugLog('executing experience for %s %s %o', contentId, 'browser-id', {
        geo: {
          city: null,
          country: null,
          latitude: null,
          longitude: null,
          region: null,
        },
        referrer,
        ua: null,
        utm: {
          campaign: 'utm_campaign',
          content: null,
          medium: null,
          source: null,
        },
      });

      validateDebugLog('personalize middleware end: %o', {
        rewritePath: '/_variantId_variant-2/styleguide',
        browserId: 'browser-id',
        headers: {
          'x-middleware-cache': 'no-cache',
          set: res.headers.set,
        },
      });

      expect(getCookiesSpy.calledWith('bid_cdp-client-key')).to.be.true;

      expect(finalRes).to.deep.equal(res);

      expect(finalRes.cookies['bid_cdp-client-key']).to.equal(browserId);

      getCookiesSpy.restore();
      nextRewriteStub.restore();
    });

    it('request geo is not present', async () => {
      userAgentStub.returns({ ua: undefined } as any);

      const params = {
        ...experienceParams,
        geo: {
          city: null,
          country: null,
          latitude: null,
          longitude: null,
          region: null,
        },
        ua: null,
      };

      mockPersonalizeDataRequest();

      mockExecuteExperienceRequest('variant-2', { params });

      const req = createRequest({ geo: null });

      const res = createResponse();

      const nextRewriteStub = sinon.stub(nextjs.NextResponse, 'rewrite').returns(res);

      const middleware = createMiddleware();

      const getCookiesSpy = spy(req.cookies, 'get');

      const finalRes = await middleware.getHandler()(req, res);

      validateDebugLog('personalize middleware start: %o', {
        pathname: '/styleguide',
        language: 'en',
      });

      validateDebugLog('fetching personalize info for %s %s %s', 'nextjs-app', '/styleguide', 'en');

      validateDebugLog('executing experience for %s %s %o', contentId, 'browser-id', {
        geo: {
          city: null,
          country: null,
          latitude: null,
          longitude: null,
          region: null,
        },
        referrer,
        ua: null,
        utm: {
          campaign: 'utm_campaign',
          content: null,
          medium: null,
          source: null,
        },
      });

      validateDebugLog('personalize middleware end: %o', {
        rewritePath: '/_variantId_variant-2/styleguide',
        browserId: 'browser-id',
        headers: {
          'x-middleware-cache': 'no-cache',
          set: res.headers.set,
        },
      });

      expect(getCookiesSpy.calledWith('bid_cdp-client-key')).to.be.true;

      expect(finalRes).to.deep.equal(res);

      expect(finalRes.cookies['bid_cdp-client-key']).to.equal(browserId);

      getCookiesSpy.restore();
      nextRewriteStub.restore();
    });
  });
});
