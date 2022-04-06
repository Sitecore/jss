/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect, use } from 'chai';
import nock from 'nock';
import { spy } from 'sinon';
import sinonChai from 'sinon-chai';
import { RedirectsQueryResult } from '@sitecore-jss/sitecore-jss/src/site';
import { RedirectsMiddleware } from './redirects-middleware';

use(sinonChai);

const mockRequest = (url: URL) => {
  return {
    nextUrl: {
      clone: spy(() => url),
    },
  } as any;
};

const redirectsQueryResult = {
  site: {
    siteInfo: {
      redirects: [
        {
          pattern: '/notfound2/',
          target: '/404',
          redirectType: 'REDIRECT_302',
          isQueryStringPreserved: false,
        },
        {
          pattern: '/notfound/',
          target: '/404',
          redirectType: 'REDIRECT_301',
          isQueryStringPreserved: true,
        },
        {
          pattern: '/server_transfer/',
          target: '/404',
          redirectType: 'SERVER_TRANSFER',
          isQueryStringPreserved: true,
        },
      ],
    },
  },
} as RedirectsQueryResult;

describe('RedirectsMiddleware', () => {
  const endpoint = 'http://site';
  const apiKey = 'some-api-key';
  const siteName = 'site-name';
  const currentLocation_301 = 'http://site.com/notfound';
  const mockQueryString = '?query_string=1';
  const currentLocation_302 = 'http://site.com/notfound2';
  const currentLocation_server_transfer = 'http://site.com/server_transfer';
  const redirectLocation = 'http://site.com/404';

  afterEach(() => {
    nock.cleanAll();
  });

  const mockRedirectsRequest = () => {
    nock(endpoint)
      .post('/')
      .reply(200, { data: redirectsQueryResult });
  };

  it('should redirect http code 301', async () => {
    mockRedirectsRequest();
    const service = new RedirectsMiddleware({ endpoint, apiKey, siteName });
    const mockUrl = new URL(currentLocation_301);
    const req = mockRequest(mockUrl);
    const handler = service.getHandler();

    const response = await handler(req);
    expect(response.status).to.equal(301);
    expect(response.headers.get('Location')).to.equal(redirectLocation);
  });

  it('should redirect http code 301 with query string', async () => {
    mockRedirectsRequest();
    const service = new RedirectsMiddleware({ endpoint, apiKey, siteName });
    const mockUrl = new URL(`${currentLocation_301}${mockQueryString}`);
    const req = mockRequest(mockUrl);
    const handler = service.getHandler();

    const response = await handler(req);
    expect(response.status).to.equal(301);
    expect(response.headers.get('Location')).to.equal(`${redirectLocation}${mockQueryString}`);
  });

  it('should redirect http code 302', async () => {
    mockRedirectsRequest();
    const service = new RedirectsMiddleware({ endpoint, apiKey, siteName });
    const mockUrl = new URL(currentLocation_302);
    const req = mockRequest(mockUrl);
    const handler = service.getHandler();

    const response = await handler(req);
    expect(response.status).to.equal(302);
    expect(response.headers.get('Location')).to.equal(redirectLocation);
  });

  it('should redirect type SERVER_TRANSFER', async () => {
    mockRedirectsRequest();
    const service = new RedirectsMiddleware({ endpoint, apiKey, siteName });
    const mockUrl = new URL(currentLocation_server_transfer);
    const req = mockRequest(mockUrl);
    const handler = service.getHandler();

    const response = await handler(req);
    expect(response.status).to.equal(200);
    expect(response.headers.get('x-middleware-rewrite')).to.includes(redirectLocation);
  });
});
