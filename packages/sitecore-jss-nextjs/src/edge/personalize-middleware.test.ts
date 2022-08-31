/* eslint-disable no-unused-expressions */
// import React from 'react';
// import { expect } from 'chai';
// import { mount } from 'enzyme';

import chai, { use } from 'chai';
import chaiString from 'chai-string';
import sinonChai from 'sinon-chai';
import sinon, { spy } from 'sinon';
import nock from 'nock';

import { debug } from '@sitecore-jss/sitecore-jss';
// import { enableDebug } from '@sitecore-jss/sitecore-jss-react';

import { PersonalizeMiddleware } from './personalize-middleware';
import { NextRequest, NextResponse } from 'next/server';

use(sinonChai);
const expect = chai.use(chaiString).expect;

describe.only('PersonalizeMiddleware', () => {
  describe('disabled', () => {
    const createMiddleware = () =>
      new PersonalizeMiddleware({
        cdpConfig: {
          clientKey: 'cdp-client-key',
          endpoint: 'cdp-endpoint',
          pointOfSale: 'cdp-pos',
        },
        edgeConfig: {
          apiKey: 'edge-api-key',
          endpoint: 'http://edge-endpoint/api/graph/edge',
          siteName: 'nextjs-app',
        },
        disabled: (req, res) => req?.nextUrl.pathname === '/' && req.nextUrl.locale === 'en',
      });

    const req = {
      nextUrl: {
        pathname: '/',
        locale: 'en',
      },
      cookies: {
        get(cookieName: string) {
          const cookies = { 'bid_cdp-client-key': 'browser-id-value' };

          return cookies[cookieName];
        },
      },
    } as NextRequest;

    const res = {
      cookies: {},
    } as NextResponse;

    it('default response returned', async () => {
      const middleware = createMiddleware();

      const getCookiesSpy = spy(req.cookies, 'get');

      const debugSpy = spy(debug, 'personalize');

      const finalRes = await middleware.getHandler()(req);

      expect(debugSpy.callCount).to.equal(2);

      expect(
        debugSpy.getCall(0).calledWith('personalize middleware start: %o', {
          pathname: '/',
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
      const middleware = createMiddleware();

      const debugSpy = spy(debug, 'personalize');

      const getCookiesSpy = spy(req.cookies, 'get');

      const finalRes = await middleware.getHandler()(req, res);

      expect(
        debugSpy.getCall(0).calledWith('personalize middleware start: %o', {
          pathname: '/',
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
    const createMiddleware = () =>
      new PersonalizeMiddleware({
        cdpConfig: {
          clientKey: 'cdp-client-key',
          endpoint: 'cdp-endpoint',
          pointOfSale: 'cdp-pos',
        },
        edgeConfig: {
          apiKey: 'edge-api-key',
          endpoint: 'http://edge-endpoint/api/graph/edge',
          siteName: 'nextjs-app',
        },
      });

    const req = {
      nextUrl: {
        pathname: '/',
        locale: 'en',
      },
      cookies: {
        get(cookieName: string) {
          const cookies = { 'bid_cdp-client-key': 'browser-id-value' };

          return cookies[cookieName];
        },
      },
    } as NextRequest;

    const res = {
      cookies: {},
      redirected: true,
    } as NextResponse;

    const middleware = createMiddleware();

    const getCookiesSpy = spy(req.cookies, 'get');

    const debugSpy = spy(debug, 'personalize');

    const finalRes = await middleware.getHandler()(req, res);

    expect(debugSpy.callCount).to.equal(2);

    expect(
      debugSpy.getCall(0).calledWith('personalize middleware start: %o', {
        pathname: '/',
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
      const createMiddleware = () =>
        new PersonalizeMiddleware({
          cdpConfig: {
            clientKey: 'cdp-client-key',
            endpoint: 'cdp-endpoint',
            pointOfSale: 'cdp-pos',
          },
          edgeConfig: {
            apiKey: 'edge-api-key',
            endpoint: 'http://edge-endpoint/api/graph/edge',
            siteName: 'nextjs-app',
          },
        });

      const req = {
        nextUrl: {
          pathname: '/',
          locale: 'en',
        },
        cookies: {
          get(cookieName: string) {
            const cookies = { 'bid_cdp-client-key': 'browser-id-value', __prerender_bypass: true };

            return cookies[cookieName];
          },
        },
      } as NextRequest;

      const res = {
        cookies: {},
      } as NextResponse;

      const middleware = createMiddleware();

      const getCookiesSpy = spy(req.cookies, 'get');

      const debugSpy = spy(debug, 'personalize');

      const finalRes = await middleware.getHandler()(req, res);

      expect(debugSpy.callCount).to.equal(2);

      expect(
        debugSpy.getCall(0).calledWith('personalize middleware start: %o', {
          pathname: '/',
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
      const createMiddleware = () =>
        new PersonalizeMiddleware({
          cdpConfig: {
            clientKey: 'cdp-client-key',
            endpoint: 'cdp-endpoint',
            pointOfSale: 'cdp-pos',
          },
          edgeConfig: {
            apiKey: 'edge-api-key',
            endpoint: 'http://edge-endpoint/api/graph/edge',
            siteName: 'nextjs-app',
          },
        });

      const req = {
        nextUrl: {
          pathname: '/',
          locale: 'en',
        },
        cookies: {
          get(cookieName: string) {
            const cookies = { 'bid_cdp-client-key': 'browser-id-value', __next_preview_data: true };

            return cookies[cookieName];
          },
        },
      } as NextRequest;

      const res = {
        cookies: {},
      } as NextResponse;

      const middleware = createMiddleware();

      const getCookiesSpy = spy(req.cookies, 'get');

      const debugSpy = spy(debug, 'personalize');

      const finalRes = await middleware.getHandler()(req, res);

      expect(debugSpy.callCount).to.equal(2);

      expect(
        debugSpy.getCall(0).calledWith('personalize middleware start: %o', {
          pathname: '/',
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
    const res = {
      cookies: {},
    } as NextResponse;

    const test = async (pathname: string, middleware) => {
      const req = {
        nextUrl: {
          pathname,
          locale: 'en',
        },
        cookies: {
          get(cookieName: string) {
            const cookies = { 'bid_cdp-client-key': 'browser-id-value' };

            return cookies[cookieName];
          },
        },
      } as NextRequest;

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
      const middleware = new PersonalizeMiddleware({
        cdpConfig: {
          clientKey: 'cdp-client-key',
          endpoint: 'cdp-endpoint',
          pointOfSale: 'cdp-pos',
        },
        edgeConfig: {
          apiKey: 'edge-api-key',
          endpoint: 'http://edge-endpoint/api/graph/edge',
          siteName: 'nextjs-app',
        },
      });

      await test('/src/image.png', middleware);
      await test('/api/layout/render', middleware);
      await test('/sitecore/render', middleware);
      await test('/_next/webpack', middleware);
    });

    it('custom excludeRoute function', async () => {
      const excludeRoute = (pathname: string) => pathname === '/crazypath/luna';

      const middleware = new PersonalizeMiddleware({
        cdpConfig: {
          clientKey: 'cdp-client-key',
          endpoint: 'cdp-endpoint',
          pointOfSale: 'cdp-pos',
        },
        edgeConfig: {
          apiKey: 'edge-api-key',
          endpoint: 'http://edge-endpoint/api/graph/edge',
          siteName: 'nextjs-app',
        },
        excludeRoute,
      });

      await test('/crazypath/luna', middleware);
    });
  });

  it.only('personalize info not found', async () => {
    const personalizeQueryResult = {
      layout: {},
    };

    nock('http://edge-endpoint', {
      reqheaders: {
        sc_apikey: 'edge-api-key',
      },
    })
      .post('/graphql')
      .reply(200, {
        data: personalizeQueryResult,
      });

    const createMiddleware = () =>
      new PersonalizeMiddleware({
        cdpConfig: {
          clientKey: 'cdp-client-key',
          endpoint: 'cdp-endpoint',
          pointOfSale: 'cdp-pos',
        },
        edgeConfig: {
          apiKey: 'edge-api-key',
          endpoint: 'http://edge-endpoint/graphql',
          siteName: 'nextjs-app',
        },
      });

    const req = {
      nextUrl: {
        pathname: '/styleguide',
        locale: 'en',
      },
      cookies: {
        get(cookieName: string) {
          const cookies = { 'bid_cdp-client-key': 'browser-id-value' };

          return cookies[cookieName];
        },
      },
    } as NextRequest;

    const res = {
      cookies: {},
    } as NextResponse;

    // const id = 'item-id';
    // const version = '1';
    // const variantIds = ['variant-1', 'variant-2'];
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
});
