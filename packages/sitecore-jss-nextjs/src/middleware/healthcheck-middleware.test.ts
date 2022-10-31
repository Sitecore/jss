import { expect, use } from 'chai';
import { NextApiRequest, NextApiResponse } from 'next';
import { HealthcheckMiddleware } from './healthcheck-middleware';
import { spy } from 'sinon';
import sinonChai from 'sinon-chai';

use(sinonChai);

const mockRequest = () => {
  return {
    method: 'GET',
  } as NextApiRequest;
};

const mockResponse = () => {
  const res = {} as NextApiResponse;
  res.status = spy(() => {
    return res;
  });
  res.send = spy(() => {
    return res;
  });
  return res;
};

describe('HealthcheckMiddleware', () => {
  it('should handle request', async () => {
    const req = mockRequest();
    const res = mockResponse();

    const middleware = new HealthcheckMiddleware();
    const handler = middleware.getHandler();

    await handler(req, res);

    expect(res.status).to.have.been.calledOnceWith(200);
    expect(res.send).to.have.been.calledOnceWith('Healthy');
  });
});
