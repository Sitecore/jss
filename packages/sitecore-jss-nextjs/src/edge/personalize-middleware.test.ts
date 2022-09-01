/* eslint-disable no-unused-expressions */
import chai, { use } from 'chai';
import chaiString from 'chai-string';
import sinonChai from 'sinon-chai';
import sinon, { spy } from 'sinon';
import nock from 'nock';

import { debug } from '@sitecore-jss/sitecore-jss';

import { PersonalizeMiddleware } from './personalize-middleware';
import nextjs, { NextRequest, NextResponse } from 'next/server';

use(sinonChai);
const expect = chai.use(chaiString).expect;

describe('PersonalizeMiddleware', () => {
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

  const createRequest = (props: any = {}) =>
    ({
      ...props,
      nextUrl: {
        pathname: '/styleguide',
        locale: 'en',
        ...props?.nextUrl,
      },
      cookies: {
        get(cookieName: string) {
          const cookies = { 'bid_cdp-client-key': 'browser-id-value' };

          return cookies[cookieName];
        },
        ...props?.cookies,
      },
    } as NextRequest);

  const createResponse = (props: any = {}) =>
    ({
      cookies: {},
      ...props,
    } as NextResponse);

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

  describe('disabled', () => {
    const props = {
      disabled: (req) => req?.nextUrl.pathname === '/styleguide' && req.nextUrl.locale === 'en',
    };

    const req = createRequest();

    const res = createResponse();

    it('default response returned', async () => {
      const middleware = createMiddleware(props);

      const getCookiesSpy = spy(req.cookies, 'get');

      const debugSpy = spy(debug, 'personalize');

      const finalRes = await middleware.getHandler()(req);

      expect(debugSpy.callCount).to.equal(2);

      expect(
        debugSpy.getCall(0).calledWith('personalize middleware start: %o', {
          pathname: '/styleguide',
          language: 'en',
        })
      ).to.be.true;

      expect(debugSpy.getCall(1).calledWith('skipped (personalize middleware is disabled)')).to.be
        .true;

      expect(getCookiesSpy.calledWith('bid_cdp-client-key')).to.be.true;

      expect(finalRes).to.deep.equal(NextResponse.next());

      getCookiesSpy.restore();
      debugSpy.restore();
    });

    it('custom response returned', async () => {
      const middleware = createMiddleware(props);

      const debugSpy = spy(debug, 'personalize');

      const getCookiesSpy = spy(req.cookies, 'get');

      const finalRes = await middleware.getHandler()(req, res);

      expect(
        debugSpy.getCall(0).calledWith('personalize middleware start: %o', {
          pathname: '/styleguide',
          language: 'en',
        })
      ).to.be.true;

      expect(debugSpy.getCall(1).calledWith('skipped (personalize middleware is disabled)')).to.be
        .true;

      expect(getCookiesSpy.calledWith('bid_cdp-client-key')).to.be.true;

      expect(finalRes).to.deep.equal(res);

      getCookiesSpy.restore();
      debugSpy.restore();
    });
  });

  it('redirected', async () => {
    const req = createRequest();

    const res = createResponse({ redirected: true });

    const middleware = createMiddleware();

    const getCookiesSpy = spy(req.cookies, 'get');

    const debugSpy = spy(debug, 'personalize');

    const finalRes = await middleware.getHandler()(req, res);

    expect(debugSpy.callCount).to.equal(2);

    expect(
      debugSpy.getCall(0).calledWith('personalize middleware start: %o', {
        pathname: '/styleguide',
        language: 'en',
      })
    ).to.be.true;

    expect(debugSpy.getCall(1).calledWith('skipped (%s)', 'redirected')).to.be.true;

    expect(getCookiesSpy.calledWith('bid_cdp-client-key')).to.be.true;

    expect(finalRes).to.deep.equal(res);

    getCookiesSpy.restore();
    debugSpy.restore();
  });

  describe('preview', () => {
    it('prerender bypass', async () => {
      const req = createRequest({
        cookies: {
          get(cookieName: string) {
            const cookies = { 'bid_cdp-client-key': 'browser-id-value', __prerender_bypass: true };

            return cookies[cookieName];
          },
        },
      });

      const res = createResponse();

      const middleware = createMiddleware();

      const getCookiesSpy = spy(req.cookies, 'get');

      const debugSpy = spy(debug, 'personalize');

      const finalRes = await middleware.getHandler()(req, res);

      expect(debugSpy.callCount).to.equal(2);

      expect(
        debugSpy.getCall(0).calledWith('personalize middleware start: %o', {
          pathname: '/styleguide',
          language: 'en',
        })
      ).to.be.true;

      expect(debugSpy.getCall(1).calledWith('skipped (%s)', 'preview')).to.be.true;

      expect(getCookiesSpy.calledWith('bid_cdp-client-key')).to.be.true;
      expect(getCookiesSpy.calledWith('__prerender_bypass')).to.be.true;

      expect(finalRes).to.deep.equal(res);

      getCookiesSpy.restore();
      debugSpy.restore();
    });

    it('preview data', async () => {
      const req = createRequest({
        cookies: {
          get(cookieName: string) {
            const cookies = { 'bid_cdp-client-key': 'browser-id-value', __next_preview_data: true };

            return cookies[cookieName];
          },
        },
      });

      const res = createResponse();

      const middleware = createMiddleware();

      const getCookiesSpy = spy(req.cookies, 'get');

      const debugSpy = spy(debug, 'personalize');

      const finalRes = await middleware.getHandler()(req, res);

      expect(debugSpy.callCount).to.equal(2);

      expect(
        debugSpy.getCall(0).calledWith('personalize middleware start: %o', {
          pathname: '/styleguide',
          language: 'en',
        })
      ).to.be.true;

      expect(debugSpy.getCall(1).calledWith('skipped (%s)', 'preview')).to.be.true;

      expect(getCookiesSpy.calledWith('bid_cdp-client-key')).to.be.true;
      expect(getCookiesSpy.calledWith('__prerender_bypass')).to.be.true;
      expect(getCookiesSpy.calledWith('__next_preview_data')).to.be.true;

      expect(finalRes).to.deep.equal(res);

      getCookiesSpy.restore();
      debugSpy.restore();
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

      const debugSpy = spy(debug, 'personalize');

      const getCookiesSpy = spy(req.cookies, 'get');

      const finalRes = await middleware.getHandler()(req, res);

      expect(
        debugSpy.getCall(0).calledWith('personalize middleware start: %o', {
          pathname,
          language: 'en',
        })
      ).to.be.true;

      expect(debugSpy.getCall(1).calledWith('skipped (%s)', 'route excluded')).to.be.true;

      expect(getCookiesSpy.calledWith('bid_cdp-client-key')).to.be.true;

      expect(finalRes).to.deep.equal(res);

      getCookiesSpy.restore();
      debugSpy.restore();
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

    const debugSpy = spy(debug, 'personalize');

    const finalRes = await middleware.getHandler()(req, res);

    expect(debugSpy.callCount).to.equal(3);

    expect(
      debugSpy.getCall(0).calledWith('personalize middleware start: %o', {
        pathname: '/styleguide',
        language: 'en',
      })
    ).to.be.true;

    expect(
      debugSpy
        .getCall(1)
        .calledWith('fetching personalize info for %s %s %s', 'nextjs-app', '/styleguide', 'en')
    ).to.be.true;

    expect(debugSpy.getCall(2).calledWith('skipped (personalize info not found)')).to.be.true;

    expect(getCookiesSpy.calledWith('bid_cdp-client-key')).to.be.true;

    expect(finalRes).to.deep.equal(res);

    getCookiesSpy.restore();
    debugSpy.restore();
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

    const debugSpy = spy(debug, 'personalize');

    const finalRes = await middleware.getHandler()(req, res);

    expect(debugSpy.callCount).to.equal(3);

    expect(
      debugSpy.getCall(0).calledWith('personalize middleware start: %o', {
        pathname: '/styleguide',
        language: 'en',
      })
    ).to.be.true;

    expect(
      debugSpy
        .getCall(1)
        .calledWith('fetching personalize info for %s %s %s', 'nextjs-app', '/styleguide', 'en')
    ).to.be.true;

    expect(debugSpy.getCall(2).calledWith('skipped (no personalization configured)')).to.be.true;

    expect(getCookiesSpy.calledWith('bid_cdp-client-key')).to.be.true;

    expect(finalRes).to.deep.equal(res);

    getCookiesSpy.restore();
    debugSpy.restore();
  });

  it('browser id does not exist and browser id generation failed', async () => {
    mockPersonalizeDataRequest();

    mockBrowserIdGenerationRequest(undefined);

    const req = createRequest({
      cookies: {
        get(cookieName: string) {
          const cookies = {};

          return cookies[cookieName];
        },
      },
    });

    const res = createResponse();

    const middleware = createMiddleware();

    const getCookiesSpy = spy(req.cookies, 'get');

    const debugSpy = spy(debug, 'personalize');

    const finalRes = await middleware.getHandler()(req, res);

    expect(
      debugSpy.getCall(0).calledWith('personalize middleware start: %o', {
        pathname: '/styleguide',
        language: 'en',
      })
    ).to.be.true;

    expect(
      debugSpy
        .getCall(1)
        .calledWith('fetching personalize info for %s %s %s', 'nextjs-app', '/styleguide', 'en')
    ).to.be.true;

    expect(debugSpy.getCall(2).calledWith('generating browser id')).to.be.true;

    expect(debugSpy.getCall(5).calledWith('skipped (browser id generation failed)')).to.be.true;

    expect(getCookiesSpy.calledWith('bid_cdp-client-key')).to.be.true;

    expect(finalRes).to.deep.equal(res);

    getCookiesSpy.restore();
    debugSpy.restore();
  });

  it('no variant identified', async () => {
    const userAgentStub = sinon.stub(nextjs, 'userAgent').returns({ ua: 'ua' } as any);

    mockPersonalizeDataRequest();

    mockBrowserIdGenerationRequest(browserId);

    const params = {
      geo: {
        city: 'geo-city',
        country: 'geo-country',
        latitude: null,
        longitude: null,
        region: null,
      },
      referrer: 'http://localhost:3000',
      ua: 'ua',
      utm: {
        campaign: 'utm_campaign',
        content: undefined,
        medium: undefined,
        source: undefined,
      },
    };

    nock('http://cdp-endpoint')
      .post('/v2/callFlows', {
        clientKey: 'cdp-client-key',
        pointOfSale: 'cdp-pos',
        params,
        browserId: 'browser-id',
        friendlyId: contentId,
        channel: 'WEB',
      })
      .reply(200, {
        variantId: undefined,
      });

    const req = createRequest({
      nextUrl: {
        searchParams: {
          get(key) {
            return { utm_campaign: 'utm_campaign' }[key];
          },
        },
      },
      cookies: {
        get(cookieName: string) {
          const cookies = {};

          return cookies[cookieName];
        },
      },
      geo: {
        city: 'geo-city',
        country: 'geo-country',
      },
      referrer: 'http://localhost:3000',
    });

    const res = createResponse();

    const middleware = createMiddleware();

    const getCookiesSpy = spy(req.cookies, 'get');

    const debugSpy = spy(debug, 'personalize');

    const finalRes = await middleware.getHandler()(req, res);

    expect(
      debugSpy.getCall(0).calledWith('personalize middleware start: %o', {
        pathname: '/styleguide',
        language: 'en',
      })
    ).to.be.true;

    expect(
      debugSpy
        .getCall(1)
        .calledWith('fetching personalize info for %s %s %s', 'nextjs-app', '/styleguide', 'en')
    ).to.be.true;

    expect(debugSpy.getCall(2).calledWith('generating browser id')).to.be.true;

    expect(
      debugSpy
        .getCall(5)
        .calledWith('executing experience for %s %s %o', contentId, 'browser-id', params)
    ).to.be.true;

    expect(debugSpy.getCall(8).calledWith('skipped (no variant identified)')).to.be.true;

    expect(getCookiesSpy.calledWith('bid_cdp-client-key')).to.be.true;

    expect(finalRes).to.deep.equal(res);

    getCookiesSpy.restore();
    debugSpy.restore();
    userAgentStub.restore();
  });

  it('invalid variant', async () => {
    const userAgentStub = sinon.stub(nextjs, 'userAgent').returns({ ua: 'ua' } as any);

    mockPersonalizeDataRequest();

    mockBrowserIdGenerationRequest(browserId);

    const params = {
      geo: {
        city: 'geo-city',
        country: 'geo-country',
        latitude: null,
        longitude: null,
        region: null,
      },
      referrer: 'http://localhost:3000',
      ua: 'ua',
      utm: {
        campaign: 'utm_campaign',
        content: undefined,
        medium: undefined,
        source: undefined,
      },
    };

    nock('http://cdp-endpoint')
      .post('/v2/callFlows', {
        clientKey: 'cdp-client-key',
        pointOfSale: 'cdp-pos',
        params,
        browserId: 'browser-id',
        friendlyId: contentId,
        channel: 'WEB',
      })
      .reply(200, {
        variantId: 'invalid-variant',
      });

    const req = createRequest({
      nextUrl: {
        searchParams: {
          get(key) {
            return { utm_campaign: 'utm_campaign' }[key];
          },
        },
      },
      cookies: {
        get(cookieName: string) {
          const cookies = {};

          return cookies[cookieName];
        },
      },
      geo: {
        city: 'geo-city',
        country: 'geo-country',
      },
      referrer: 'http://localhost:3000',
    });

    const res = createResponse({
      headers: {
        set(key, value) {
          res.headers[key] = value;
        },
      },
    });

    const middleware = createMiddleware();

    const getCookiesSpy = spy(req.cookies, 'get');

    const debugSpy = spy(debug, 'personalize');

    const finalRes = await middleware.getHandler()(req, res);

    expect(
      debugSpy.getCall(0).calledWith('personalize middleware start: %o', {
        pathname: '/styleguide',
        language: 'en',
      })
    ).to.be.true;

    expect(
      debugSpy
        .getCall(1)
        .calledWith('fetching personalize info for %s %s %s', 'nextjs-app', '/styleguide', 'en')
    ).to.be.true;

    expect(debugSpy.getCall(2).calledWith('generating browser id')).to.be.true;

    expect(
      debugSpy
        .getCall(5)
        .calledWith('executing experience for %s %s %o', contentId, 'browser-id', params)
    ).to.be.true;

    expect(debugSpy.getCall(8).calledWith('skipped (invalid variant)')).to.be.true;

    expect(getCookiesSpy.calledWith('bid_cdp-client-key')).to.be.true;

    expect(finalRes).to.deep.equal(res);

    getCookiesSpy.restore();
    debugSpy.restore();
    userAgentStub.restore();
  });

  it('request handled', async () => {
    const userAgentStub = sinon.stub(nextjs, 'userAgent').returns({ ua: 'ua' } as any);

    mockPersonalizeDataRequest();

    mockBrowserIdGenerationRequest(browserId);

    const params = {
      geo: {
        city: 'geo-city',
        country: 'geo-country',
        latitude: null,
        longitude: null,
        region: null,
      },
      referrer: 'http://localhost:3000',
      ua: 'ua',
      utm: {
        campaign: 'utm_campaign',
        content: undefined,
        medium: undefined,
        source: undefined,
      },
    };

    nock('http://cdp-endpoint')
      .post('/v2/callFlows', {
        clientKey: 'cdp-client-key',
        pointOfSale: 'cdp-pos',
        params,
        browserId: 'browser-id',
        friendlyId: contentId,
        channel: 'WEB',
      })
      .reply(200, {
        variantId: 'variant-2',
      });

    const req = createRequest({
      nextUrl: {
        searchParams: {
          get(key) {
            return { utm_campaign: 'utm_campaign' }[key];
          },
        },
        clone() {
          return Object.assign({}, req.nextUrl);
        },
      },
      cookies: {
        get(cookieName: string) {
          const cookies = {};

          return cookies[cookieName];
        },
      },
      geo: {
        city: 'geo-city',
        country: 'geo-country',
      },
      referrer: 'http://localhost:3000',
    });

    const res = createResponse({
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
    });

    const nextRewriteStub = sinon.stub(nextjs.NextResponse, 'rewrite').returns(res);

    const middleware = createMiddleware();

    const getCookiesSpy = spy(req.cookies, 'get');

    const debugSpy = spy(debug, 'personalize');

    const finalRes = await middleware.getHandler()(req, res);

    expect(
      debugSpy.getCall(0).calledWith('personalize middleware start: %o', {
        pathname: '/styleguide',
        language: 'en',
      })
    ).to.be.true;

    expect(
      debugSpy
        .getCall(1)
        .calledWith('fetching personalize info for %s %s %s', 'nextjs-app', '/styleguide', 'en')
    ).to.be.true;

    expect(debugSpy.getCall(2).calledWith('generating browser id')).to.be.true;

    expect(
      debugSpy
        .getCall(5)
        .calledWith('executing experience for %s %s %o', contentId, 'browser-id', params)
    ).to.be.true;

    expect(
      debugSpy.getCall(8).calledWith('personalize middleware end: %o', {
        rewritePath: '/_variantId_variant-2/styleguide',
        browserId: 'browser-id',
        headers: {
          'x-middleware-cache': 'no-cache',
          set: res.headers.set,
        },
      })
    ).to.be.true;

    expect(getCookiesSpy.calledWith('bid_cdp-client-key')).to.be.true;

    expect(finalRes).to.deep.equal(res);

    getCookiesSpy.restore();
    debugSpy.restore();
    userAgentStub.restore();
    nextRewriteStub.restore();
  });
});
