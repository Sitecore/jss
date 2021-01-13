/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect, use, spy } from 'chai';
import spies from 'chai-spies';
import { NextApiRequest, NextApiResponse } from 'next';
import { QUERY_PARAM_SECRET } from '../services/editing-data-service';
import { EditingData } from '../sharedTypes/editing-data';
import { EditingDataCache } from './editing-data-cache';
import { EditingDataMiddleware } from './editing-data-middleware';

use(spies);

type Query = {
  [key: string]: string;
};

const mockRequest = (method: string, query?: Query, body?: any) => {
  return {
    method,
    query: query ?? {},
    body: body ?? {},
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
  res.setHeader = spy();
  return res;
};

const mockCache = (data?: any) => {
  const cache = {} as EditingDataCache;
  cache.set = spy();
  cache.get = spy(() => {
    return data;
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
    process.env.EDITING_SECRET_TOKEN = secret;
  });

  after(() => {
    delete process.env.EDITING_SECRET_TOKEN;
  });

  it('should handle PUT request', async () => {
    const key = 'key1234';
    const query = { key } as Query;
    query[QUERY_PARAM_SECRET] = secret;
    const cache = mockCache();
    const req = mockRequest('PUT', query, mockEditingData);
    const res = mockResponse();

    const middleware = new EditingDataMiddleware({ editingDataCache: cache });
    const handler = middleware.getHandler();

    await handler(req, res);

    expect(cache.set).to.be.called.once;
    expect(cache.set).to.be.called.with(key, mockEditingData);
    expect(res.status).to.be.called.once;
    expect(res.status).to.be.called.with(200);
    expect(res.end).to.be.called.once;
  });

  it('should handle GET request', async () => {
    const key = 'key1234';
    const query = { key } as Query;
    query[QUERY_PARAM_SECRET] = secret;
    const cache = mockCache(mockEditingData);
    const req = mockRequest('GET', query);
    const res = mockResponse();

    const middleware = new EditingDataMiddleware({ editingDataCache: cache });
    const handler = middleware.getHandler();

    await handler(req, res);

    expect(cache.get).to.be.called.once;
    expect(cache.get).to.be.called.with(key);
    expect(res.status).to.be.called.once;
    expect(res.status).to.be.called.with(200);
    expect(res.json).to.be.called.once;
    expect(res.json).to.be.called.with(mockEditingData);
  });

  it('should use dynamicRouteKey if set', async () => {
    const dynamicRouteKey = 'custom';
    const key = 'key1234';
    const query = {} as Query;
    query[dynamicRouteKey] = key;
    query[QUERY_PARAM_SECRET] = secret;
    const cache = mockCache(mockEditingData);
    const req = mockRequest('GET', query);
    const res = mockResponse();

    const middleware = new EditingDataMiddleware({
      dynamicRouteKey: dynamicRouteKey,
      editingDataCache: cache,
    });
    const handler = middleware.getHandler();

    await handler(req, res);

    expect(cache.get).to.be.called.once;
    expect(cache.get).to.be.called.with(key);
    expect(res.status).to.be.called.once;
    expect(res.status).to.be.called.with(200);
    expect(res.json).to.be.called.once;
    expect(res.json).to.be.called.with(mockEditingData);
  });

  it('should respond with 400 for invalid editing data', async () => {
    const key = 'key1234';
    const query = { key } as Query;
    query[QUERY_PARAM_SECRET] = secret;
    const cache = mockCache();
    const req = mockRequest('PUT', query, { invalid: 'data' });
    const res = mockResponse();

    const middleware = new EditingDataMiddleware({ editingDataCache: cache });
    const handler = middleware.getHandler();

    await handler(req, res);

    expect(cache.set).to.not.be.called;
    expect(res.status).to.be.called.once;
    expect(res.status).to.be.called.with(400);
    expect(res.end).to.be.called.once;
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

    expect(cache.get).to.not.be.called;
    expect(res.status).to.be.called.once;
    expect(res.status).to.be.called.with(401);
    expect(res.end).to.be.called.once;
  });

  it('should respond with 401 for invalid secret', async () => {
    const key = 'key1234';
    const query = { key } as Query;
    query[QUERY_PARAM_SECRET] = 'nope';
    const cache = mockCache();
    const req = mockRequest('GET', query);
    const res = mockResponse();

    const middleware = new EditingDataMiddleware({ editingDataCache: cache });
    const handler = middleware.getHandler();

    await handler(req, res);

    expect(cache.get).to.not.be.called;
    expect(res.status).to.be.called.once;
    expect(res.status).to.be.called.with(401);
    expect(res.end).to.be.called.once;
  });

  it('should respond with 405 for unsupported method', async () => {
    const key = 'key1234';
    const query = { key } as Query;
    query[QUERY_PARAM_SECRET] = secret;
    const cache = mockCache();
    const req = mockRequest('POST', query);
    const res = mockResponse();

    const middleware = new EditingDataMiddleware({ editingDataCache: cache });
    const handler = middleware.getHandler();

    await handler(req, res);

    expect(cache.get).to.not.be.called;
    expect(cache.set).to.not.be.called;
    expect(res.setHeader).to.be.called.with('Allow', ['GET', 'PUT']);
    expect(res.status).to.be.called.once;
    expect(res.status).to.be.called.with(405);
    expect(res.end).to.be.called.once;
  });
});
