/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect, use } from 'chai';
import { NextApiRequest, NextApiResponse } from 'next';
import { QUERY_PARAM_EDITING_SECRET } from '@sitecore-jss/sitecore-jss/editing';
import { EditingData } from './editing-data';
import { EditingDataCache } from './editing-data-cache';
import { EditingDataMiddleware } from './editing-data-middleware';
import { spy } from 'sinon';
import sinonChai from 'sinon-chai';

use(sinonChai);

type Query = {
  [key: string]: string;
};

const allowedOrigin = 'https://allowed.com';

const mockRequest = (
  method: string,
  query?: Query,
  body?: unknown,
  headers?: { [key: string]: string }
) => {
  return {
    method,
    query: query ?? {},
    body: body ?? {},
    headers: {
      origin: allowedOrigin,
      ...headers,
    },
  } as NextApiRequest;
};

const mockResponse = () => {
  const res = {} as NextApiResponse;
  res.status = spy(() => {
    return res;
  });
  res.json = spy(() => {
    return res;
  });
  res.end = spy(() => {
    return res;
  });
  res.setHeader = spy(() => {
    return res;
  });
  res.getHeader = spy(() => {
    return undefined;
  });
  return res;
};

const mockCache = (data?: EditingData) => {
  const cache = {} as EditingDataCache;
  cache.set = spy();
  cache.get = spy(() => {
    return Promise.resolve(data);
  });
  return cache;
};

const mockEditingData = {
  path: '/styleguide',
  language: 'en',
  layoutData: {},
  dictionary: {},
} as EditingData;

describe('EditingDataMiddleware', () => {
  const secret = 'secret1234';

  beforeEach(() => {
    process.env.JSS_EDITING_SECRET = secret;
    process.env.JSS_ALLOWED_ORIGINS = allowedOrigin;
  });

  after(() => {
    delete process.env.JSS_EDITING_SECRET;
    delete process.env.JSS_ALLOWED_ORIGINS;
  });

  it('should handle PUT request', async () => {
    const key = 'key1234';
    const query = { key } as Query;
    query[QUERY_PARAM_EDITING_SECRET] = secret;
    const cache = mockCache();
    const req = mockRequest('PUT', query, mockEditingData);
    const res = mockResponse();

    const middleware = new EditingDataMiddleware({ editingDataCache: cache });
    const handler = middleware.getHandler();

    await handler(req, res);

    expect(cache.set).to.have.been.calledOnce;
    expect(cache.set).to.have.been.calledWithExactly(key, mockEditingData);
    expect(res.status).to.have.been.calledOnce;
    expect(res.status).to.have.been.calledWith(200);
    expect(res.end).to.have.been.calledOnce;
  });

  it('should handle GET request', async () => {
    const key = 'key1234';
    const query = { key } as Query;
    query[QUERY_PARAM_EDITING_SECRET] = secret;
    const cache = mockCache(mockEditingData);
    const req = mockRequest('GET', query);
    const res = mockResponse();

    const middleware = new EditingDataMiddleware({ editingDataCache: cache });
    const handler = middleware.getHandler();

    await handler(req, res);

    expect(cache.get).to.have.been.calledOnce;
    expect(cache.get).to.have.been.calledWith(key);
    expect(res.status).to.have.been.calledOnce;
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledOnce;
    expect(res.json).to.have.been.calledWith(mockEditingData);
  });

  it('should use dynamicRouteKey if set', async () => {
    const dynamicRouteKey = 'custom';
    const key = 'key1234';
    const query = {} as Query;
    query[dynamicRouteKey] = key;
    query[QUERY_PARAM_EDITING_SECRET] = secret;
    const cache = mockCache(mockEditingData);
    const req = mockRequest('GET', query);
    const res = mockResponse();

    const middleware = new EditingDataMiddleware({
      dynamicRouteKey: dynamicRouteKey,
      editingDataCache: cache,
    });
    const handler = middleware.getHandler();

    await handler(req, res);

    expect(cache.get).to.have.been.calledOnce;
    expect(cache.get).to.have.been.calledWith(key);
    expect(res.status).to.have.been.calledOnce;
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledOnce;
    expect(res.json).to.have.been.calledWith(mockEditingData);
  });

  it('should stop request and return 401 when CORS match is not met', async () => {
    const req = mockRequest('GET', {}, {}, { origin: 'https://notallowed.com' });
    const res = mockResponse();
    const cache = mockCache();
    const middleware = new EditingDataMiddleware({ editingDataCache: cache });
    const handler = middleware.getHandler();

    await handler(req, res);

    expect(res.status).to.have.been.calledOnce;
    expect(res.status).to.have.been.calledWith(401);
    expect(res.json).to.have.been.calledOnce;
    expect(res.json).to.have.been.calledWith({ message: 'Invalid origin' });
  });

  it('should respond with 400 for invalid editing data', async () => {
    const key = 'key1234';
    const query = { key } as Query;
    query[QUERY_PARAM_EDITING_SECRET] = secret;
    const cache = mockCache();
    const req = mockRequest('PUT', query, { invalid: 'data' });
    const res = mockResponse();

    const middleware = new EditingDataMiddleware({ editingDataCache: cache });
    const handler = middleware.getHandler();

    await handler(req, res);

    expect(cache.set).to.not.have.been.called;
    expect(res.status).to.have.been.calledOnce;
    expect(res.status).to.have.been.calledWith(400);
    expect(res.end).to.have.been.calledOnce;
  });

  it('should respond with 401 for missing secret', async () => {
    const key = 'key1234';
    const query = { key } as Query;
    const cache = mockCache();
    const req = mockRequest('GET', query);
    const res = mockResponse();

    const middleware = new EditingDataMiddleware({ editingDataCache: cache });
    const handler = middleware.getHandler();

    await handler(req, res);

    expect(cache.get).to.not.have.been.called;
    expect(res.status).to.have.been.calledOnce;
    expect(res.status).to.have.been.calledWith(401);
    expect(res.end).to.have.been.calledOnce;
  });

  it('should respond with 401 for invalid secret', async () => {
    const key = 'key1234';
    const query = { key } as Query;
    query[QUERY_PARAM_EDITING_SECRET] = 'nope';
    const cache = mockCache();
    const req = mockRequest('GET', query);
    const res = mockResponse();

    const middleware = new EditingDataMiddleware({ editingDataCache: cache });
    const handler = middleware.getHandler();

    await handler(req, res);

    expect(cache.get).to.not.have.been.called;
    expect(res.status).to.have.been.calledOnce;
    expect(res.status).to.have.been.calledWith(401);
    expect(res.end).to.have.been.calledOnce;
  });

  it('should respond with 405 for unsupported method', async () => {
    const key = 'key1234';
    const query = { key } as Query;
    query[QUERY_PARAM_EDITING_SECRET] = secret;
    const cache = mockCache();
    const req = mockRequest('POST', query);
    const res = mockResponse();

    const middleware = new EditingDataMiddleware({ editingDataCache: cache });
    const handler = middleware.getHandler();

    await handler(req, res);

    expect(cache.get).to.not.have.been.called;
    expect(cache.set).to.not.have.been.called;
    expect(res.setHeader).to.have.been.calledWithExactly('Allow', ['GET', 'PUT']);
    expect(res.status).to.have.been.calledOnce;
    expect(res.status).to.have.been.calledWith(405);
    expect(res.end).to.have.been.calledOnce;
  });
});
