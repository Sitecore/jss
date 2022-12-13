/* eslint-disable dot-notation */
import chai, { use } from 'chai';
import chaiString from 'chai-string';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import { NextRequest, NextResponse } from 'next/server';
import { RedirectsMiddleware } from './redirects-middleware';
import { REDIRECT_TYPE_SERVER_TRANSFER } from '@sitecore-jss/sitecore-jss/site';

use(sinonChai);
const expect = chai.use(chaiString).expect;

describe('RedirectsMiddleware', () => {
  const referrer = 'http://localhost:3000';

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
      referrer,
    } as NextRequest;

    return req;
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
    } = {}
  ) => {
    const middleware = new RedirectsMiddleware({
      ...props,
      apiKey: 'edge-api-key',
      endpoint: 'http://edge-endpoint/api/graph/edge',
      siteName: 'nextjs-app',
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

    return { middleware, fetchRedirects };
  };

  afterEach(() => {
    sinon.restore();
  });

  describe('redirects middleware - getHandler', () => {
    describe('exclude route', () => {
      const res = NextResponse.next();

      const test = async (pathname: string, middleware) => {
        const req = createRequest({
          nextUrl: {
            pathname,
          },
        });

        const finalRes = await middleware.getHandler()(req, res);

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

        const { middleware } = createMiddleware({ excludeRoute });

        await test('/src/image.png', middleware);
        await test('/api/layout/render', middleware);
        await test('/sitecore/render', middleware);
        await test('/_next/webpack', middleware);
        await test('/crazypath/luna', middleware);
      });
    });

    it('should return next response if disabled is true', async () => {
      const props = {
        disabled: (req) => req?.nextUrl.pathname === '/styleguide' && req.nextUrl.locale === 'en',
      };
      const req = createRequest();
      const res = NextResponse.next();
      const { middleware } = createMiddleware(props);
      const finalRes = await middleware.getHandler()(req);

      expect(finalRes).to.deep.equal(res);
    });

    it('should return next response when redirects does not exist', async () => {
      const res = NextResponse.next();
      const req = createRequest();
      const { middleware, fetchRedirects } = createMiddleware();
      const finalRes = await middleware.getHandler()(req);
      // eslint-disable-next-line no-unused-expressions
      expect(fetchRedirects.called).to.be.true;
      expect(finalRes).to.deep.equal(res);
    });

    describe('should return appropriate redirect type when redirects exists', () => {
      it('should return 301 redirect', async () => {
        const res = NextResponse.redirect('http://localhost:3000/found', 301);
        const req = createRequest({
          nextUrl: {
            pathname: '/not-found',
            locale: 'en',
            clone() {
              return Object.assign({}, req.nextUrl);
            },
          },
        });

        const { middleware, fetchRedirects } = createMiddleware({
          pattern: 'not-found',
          target: 'http://localhost:3000/found',
          redirectType: 'REDIRECT_301',
          isQueryStringPreserved: true,
          locale: 'en',
        });

        const finalRes = await middleware.getHandler()(req);

        // eslint-disable-next-line no-unused-expressions
        expect(fetchRedirects.called).to.be.true;
        expect(finalRes).to.deep.equal(res);
        expect(finalRes.status).to.equal(res.status);
      });

      it('should override locale with locale parsed from target', async () => {
        const res = NextResponse.rewrite('http://localhost:3000/ua/found');
        const req = createRequest({
          nextUrl: {
            pathname: '/not-found',
            locale: 'en',
            clone() {
              return Object.assign({}, req.nextUrl);
            },
          },
        });

        const { middleware, fetchRedirects } = createMiddleware({
          pattern: 'not-found',
          target: '/ua/found',
          redirectType: 'REDIRECT_TYPE_SERVER_TRANSFER',
          isQueryStringPreserved: true,
          locale: 'en',
        });

        const finalRes = await middleware.getHandler()(req);

        // eslint-disable-next-line no-unused-expressions
        expect(fetchRedirects.called).to.be.true;
        expect(finalRes).to.deep.equal(res);
        expect(finalRes.status).to.equal(res.status);
      });

      it('should preserve query string on relative path redirect, when isQueryStringPreserved is true', async () => {
        const res = NextResponse.rewrite('http://localhost:3000/found?abc=def');
        const req = createRequest({
          nextUrl: {
            pathname: '/not-found',
            search: 'abc=def',
            clone() {
              return Object.assign({}, req.nextUrl);
            },
          },
        });

        const { middleware, fetchRedirects } = createMiddleware({
          pattern: 'not-found',
          target: '/found',
          redirectType: 'REDIRECT_TYPE_SERVER_TRANSFER',
          isQueryStringPreserved: true,
        });

        const finalRes = await middleware.getHandler()(req);

        // eslint-disable-next-line no-unused-expressions
        expect(fetchRedirects.called).to.be.true;
        expect(finalRes).to.deep.equal(res);
        expect(finalRes.status).to.equal(res.status);
      });

      it('should return 302 redirect', async () => {
        const res = NextResponse.redirect('http://localhost:3000/found', 302);
        const req = createRequest({
          nextUrl: {
            pathname: '/not-found',
            locale: 'en',
            clone() {
              return Object.assign({}, req.nextUrl);
            },
          },
        });

        const { middleware, fetchRedirects } = createMiddleware({
          pattern: 'not-found',
          target: 'http://localhost:3000/found',
          redirectType: 'REDIRECT_302',
          isQueryStringPreserved: true,
          locale: 'en',
        });

        const finalRes = await middleware.getHandler()(req);

        // eslint-disable-next-line no-unused-expressions
        expect(fetchRedirects.called).to.be.true;
        expect(finalRes).to.deep.equal(res);
        expect(finalRes.status).to.equal(res.status);
      });

      it('should return default response if no redirect type defined', async () => {
        const res = NextResponse.next();
        const req = createRequest({
          nextUrl: {
            pathname: '/not-found',
            locale: 'en',
            clone() {
              return Object.assign({}, req.nextUrl);
            },
          },
        });

        const { middleware, fetchRedirects } = createMiddleware({
          pattern: 'not-found',
          target: 'http://localhost:3000/found',
          redirectType: 'default',
          isQueryStringPreserved: true,
          locale: 'en',
        });

        const finalRes = await middleware.getHandler()(req);

        // eslint-disable-next-line no-unused-expressions
        expect(fetchRedirects.called).to.be.true;
        expect(finalRes).to.deep.equal(res);
      });

      it('should rewrite path when redirect type is server transfer', async () => {
        const res = NextResponse.rewrite('http://localhost:3000/found');
        const req = createRequest({
          nextUrl: {
            pathname: '/not-found',
            locale: 'en',
            clone() {
              return Object.assign({}, req.nextUrl);
            },
          },
        });

        const { middleware, fetchRedirects } = createMiddleware({
          pattern: 'not-found',
          target: 'http://localhost:3000/found',
          redirectType: REDIRECT_TYPE_SERVER_TRANSFER,
          isQueryStringPreserved: true,
          locale: 'en',
        });

        const finalRes = await middleware.getHandler()(req);

        // eslint-disable-next-line no-unused-expressions
        expect(fetchRedirects.called).to.be.true;
        expect(finalRes).to.deep.equal(res);
      });
    });
  });
});
