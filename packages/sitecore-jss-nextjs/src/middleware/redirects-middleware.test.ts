/* eslint-disable no-unused-expressions */
/* eslint-disable dot-notation */
import chai, { use } from 'chai';
import chaiString from 'chai-string';
import sinonChai from 'sinon-chai';
import sinon, { spy } from 'sinon';
import nextjs, { NextRequest, NextResponse } from 'next/server';
import { debug } from '@sitecore-jss/sitecore-jss';

import { RedirectsMiddleware } from './redirects-middleware';

use(sinonChai);
const expect = chai.use(chaiString).expect;

describe('RedirectsMiddleware', () => {
  let req: NextRequest;
  let res: NextResponse;
  let redirectsMiddleware: RedirectsMiddleware;
  let next: sinon.SinonSpy;
  let debugStub: sinon.SinonStub;

  beforeEach(() => {
    req = ({
      url: '/en',
      headers: {},
      cookies: {},
      locale: 'en',
      next: () => Promise.resolve(),
    } as unknown) as NextRequest;

    res = ({
      status: 200,
      headers: {},
      cookies: {},
      body: '',
      json: () => Promise.resolve(),
      redirect: () => Promise.resolve(),
      next: () => Promise.resolve(),
    } as unknown) as NextResponse;

    next = spy();

    debugStub = sinon.stub(debug, 'log');
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('constructor', () => {
    it('should create instance of RedirectsMiddleware', () => {
      redirectsMiddleware = new RedirectsMiddleware({
        siteName: 'fake-site',
        apiKey: 'fake-api-key',
        graphQLEndpoint: 'fake-endpoint',
        locales: ['en'],
      });

      expect(redirectsMiddleware).to.be.instanceOf(RedirectsMiddleware);
    });
  });

  describe('getHandler', () => {
    it('should return handler', () => {
      redirectsMiddleware = new RedirectsMiddleware({
        siteName: 'fake-site',
        apiKey: 'fake-api-key',
        graphQLEndpoint: 'fake-endpoint',
        locales: ['en'],
      });

      const handler = redirectsMiddleware.getHandler();

      expect(handler).to.be.a('function');
    });
  });

  describe('handler', () => {
    it('should return next response if disabled', async () => {
      redirectsMiddleware = new RedirectsMiddleware({
        siteName: 'fake-site',
        apiKey: 'fake-api-key',
        graphQLEndpoint: 'fake-endpoint',
        locales: ['en'],
        disabled: () => true,
      });

      const handler = redirectsMiddleware.getHandler();

      await handler(req, res, next);

      expect(next).to.be.calledOnce;
    });

    it('should return next response if excluded route', async () => {
      redirectsMiddleware = new RedirectsMiddleware({
        siteName: 'fake-site',
        apiKey: 'fake-api-key',
        graphQLEndpoint: 'fake-endpoint',
        locales: ['en'],
        excludedRoutes: ['/en'],
      });

      const handler = redirectsMiddleware.getHandler();
      
      await handler(req, res, next);

      expect(next).to.be.calledOnce;
}
