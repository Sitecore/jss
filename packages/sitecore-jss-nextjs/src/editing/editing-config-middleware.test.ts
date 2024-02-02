import { NextApiRequest, NextApiResponse } from 'next';
import { spy } from 'sinon';
import { expect } from 'chai';
import { EditingConfigMiddleware } from './editing-config-middleware';
import { QUERY_PARAM_EDITING_SECRET } from './constants';

type Query = {
  [key: string]: string;
};

const mockRequest = (method: string, query?: Query) => {
  return {
    method,
    query: query ?? {},
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
  return res;
};

const componentsArray = ['TestComponentOne', 'TestComponentTwo'];
const componentsMap = new Map<string, unknown>();
componentsMap.set('TestComponentOne', {});
componentsMap.set('TestComponentTwo', {});
const metadata = { packages: { testPackageOne: '0.1.1' } };

const expectedResult = {
  components: ['TestComponentOne', 'TestComponentTwo'],
  packages: { testPackageOne: '0.1.1' },
};

describe('EditingConfigMiddleware', () => {
  const secret = 'jss-editing-secret-mock';

  beforeEach(() => {
    process.env.JSS_EDITING_SECRET = secret;
  });

  after(() => {
    delete process.env.JSS_EDITING_SECRET;
  });

  it('should respond with 401 for missing secret', async () => {
    const key = 'wrongkey';
    const query = { key } as Query;
    const req = mockRequest('GET', query);
    const res = mockResponse();

    const middleware = new EditingConfigMiddleware({ components: componentsArray, metadata });
    const handler = middleware.getHandler();

    await handler(req, res);

    expect(res.status).to.have.been.calledWith(401);
    expect(res.end).to.have.been.calledOnce;
  });

  it('should respond with 401 for invalid secret', async () => {
    const key = 'wrongkey';
    const query = { key } as Query;
    query[QUERY_PARAM_EDITING_SECRET] = 'wrongsekret';
    const req = mockRequest('GET', query);
    const res = mockResponse();

    const middleware = new EditingConfigMiddleware({ components: componentsArray, metadata });
    const handler = middleware.getHandler();

    await handler(req, res);

    expect(res.status).to.have.been.calledWith(401);
    expect(res.end).to.have.been.calledOnce;
  });

  it('should respond with 200 and return config data with components array as argument', async () => {
    const key = 'wrongkey';
    const query = { key } as Query;
    query[QUERY_PARAM_EDITING_SECRET] = secret;
    const req = mockRequest('GET', query);
    const res = mockResponse();

    const middleware = new EditingConfigMiddleware({ components: componentsArray, metadata });
    const handler = middleware.getHandler();

    await handler(req, res);

    expect(res.status).to.have.been.calledOnce;
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledOnce;
    expect(res.json).to.have.been.calledWith(expectedResult);
  });

  it('should respond with 200 and return config data with components map as argument', async () => {
    const key = 'wrongkey';
    const query = { key } as Query;
    query[QUERY_PARAM_EDITING_SECRET] = secret;
    const req = mockRequest('GET', query);
    const res = mockResponse();

    const middleware = new EditingConfigMiddleware({ components: componentsMap, metadata });
    const handler = middleware.getHandler();

    await handler(req, res);

    expect(res.status).to.have.been.calledOnce;
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledOnce;
    expect(res.json).to.have.been.calledWith(expectedResult);
  });
});
