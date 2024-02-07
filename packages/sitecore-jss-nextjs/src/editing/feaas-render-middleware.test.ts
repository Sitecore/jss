/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect, use } from 'chai';
import { NextApiRequest, NextApiResponse } from 'next';
import { AxiosDataFetcher } from '@sitecore-jss/sitecore-jss';
import {
  QUERY_PARAM_EDITING_SECRET,
  QUERY_PARAM_PROTECTION_BYPASS_SITECORE,
  QUERY_PARAM_PROTECTION_BYPASS_VERCEL,
} from './constants';
import { FEAASRenderMiddleware } from './feaas-render-middleware';
import { spy, match } from 'sinon';
import sinonChai from 'sinon-chai';

use(sinonChai);

const mockNextJsPreviewCookies = [
  '__prerender_bypass:1122334455',
  '__next_preview_data:6677889900',
];

type Query = {
  [key: string]: string;
};

const mockRequest = (query?: Query, method?: string, host?: string) => {
  return {
    body: {},
    method: method ?? 'GET',
    query: query ?? {},
    headers: { host: host ?? 'localhost:3000' },
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
  res.send = spy(() => {
    return res;
  });
  res.end = spy(() => {
    return res;
  });
  res.getHeader = spy((name: string) => {
    return name === 'Set-Cookie' ? mockNextJsPreviewCookies : undefined;
  });
  res.setHeader = spy();
  res.setPreviewData = spy(() => {
    return res;
  });
  return res;
};

const mockFetcher = (html?: string) => {
  const fetcher = {} as AxiosDataFetcher;
  fetcher.get = spy<any>(() => {
    return Promise.resolve({ data: html ?? '' });
  });
  return fetcher;
};

describe('FEAASRenderMiddleware', () => {
  const secret = 'secret1234';

  beforeEach(() => {
    process.env.JSS_EDITING_SECRET = secret;
  });

  after(() => {
    delete process.env.JSS_EDITING_SECRET;
  });

  it('should handle request', async () => {
    const html = '<html key="test1"><body key="test2">Something amazing</body></html>';
    const query = {} as Query;
    query[QUERY_PARAM_EDITING_SECRET] = secret;

    const fetcher = mockFetcher(html);
    const req = mockRequest(query);
    const res = mockResponse();

    const middleware = new FEAASRenderMiddleware({
      dataFetcher: fetcher,
    });
    const handler = middleware.getHandler();

    await handler(req, res);

    expect(res.setPreviewData, 'set preview mode w/ data').to.have.been.calledWith({});
    expect(res.getHeader, 'get preview cookies').to.have.been.calledWith('Set-Cookie');
    expect(fetcher.get).to.have.been.calledOnce;
    expect(fetcher.get, 'pass along preview cookies').to.have.been.calledWith(
      match('http://localhost:3000/feaas/render?timestamp'),
      {
        headers: {
          Cookie: mockNextJsPreviewCookies.join(';'),
        },
      }
    );
    expect(res.status).to.have.been.calledOnce;
    expect(res.status).to.have.been.calledWith(200);
    expect(res.send).to.have.been.calledOnce;
    expect(res.send).to.have.been.calledWith(
      '<html key="test1"><body key="test2">Something amazing</body></html>'
    );
  });

  it('should handle request when feaasSrc query parameter is present', async () => {
    const html = '<html key="test1"><body key="test2">Something amazing</body></html>';
    const query = {
      feaasSrc: 'https://feaas.blob.core.windows.net/components/xxx/xyz/responsive/staged',
    } as Query;
    query[QUERY_PARAM_EDITING_SECRET] = secret;

    const fetcher = mockFetcher(html);
    const req = mockRequest(query);
    const res = mockResponse();

    const middleware = new FEAASRenderMiddleware({
      dataFetcher: fetcher,
    });
    const handler = middleware.getHandler();

    await handler(req, res);

    expect(res.setPreviewData, 'set preview mode w/ data').to.have.been.calledWith({});
    expect(res.getHeader, 'get preview cookies').to.have.been.calledWith('Set-Cookie');
    expect(fetcher.get).to.have.been.calledOnce;
    expect(fetcher.get, 'pass along preview cookies').to.have.been.calledWith(
      match(
        'http://localhost:3000/feaas/render?feaasSrc=https%3A%2F%2Ffeaas.blob.core.windows.net%2Fcomponents%2Fxxx%2Fxyz%2Fresponsive%2Fstaged&timestamp'
      ),
      {
        headers: {
          Cookie: mockNextJsPreviewCookies.join(';'),
        },
      }
    );
    expect(res.status).to.have.been.calledOnce;
    expect(res.status).to.have.been.calledWith(200);
    expect(res.send).to.have.been.calledOnce;
    expect(res.send).to.have.been.calledWith(
      '<html key="test1"><body key="test2">Something amazing</body></html>'
    );
  });

  it('should throw error for page render request', async () => {
    const html = '<html phkey="test1"><body phkey="test2">Error occured</body></html>';
    const query = {} as Query;
    query[QUERY_PARAM_EDITING_SECRET] = secret;
    const previewData = {};

    const fetcher = {} as AxiosDataFetcher;
    fetcher.get = spy<any>(() => {
      return Promise.reject({ response: { data: html, status: 500 } });
    });

    const req = mockRequest(query);
    const res = mockResponse();

    const middleware = new FEAASRenderMiddleware({
      dataFetcher: fetcher,
    });
    const handler = middleware.getHandler();

    await handler(req, res);

    expect(res.setPreviewData, 'set preview mode w/ data').to.have.been.calledWith(previewData);
    expect(res.getHeader, 'get preview cookies').to.have.been.calledWith('Set-Cookie');
    expect(fetcher.get).to.have.been.calledOnce;
    expect(fetcher.get, 'pass along preview cookies').to.have.been.calledWith(
      match('http://localhost:3000/feaas/render?timestamp'),
      {
        headers: {
          Cookie: mockNextJsPreviewCookies.join(';'),
        },
      }
    );
    expect(res.status).to.have.been.calledOnce;
    expect(res.status).to.have.been.calledWith(500);
    expect(res.json).to.have.been.calledOnce;
  });

  it('should respondWith 405 for unsupported method', async () => {
    const fetcher = mockFetcher();
    const req = mockRequest({}, 'POST');
    const res = mockResponse();

    const middleware = new FEAASRenderMiddleware({
      dataFetcher: fetcher,
    });
    const handler = middleware.getHandler();

    await handler(req, res);

    expect(res.setHeader).to.have.been.calledWithExactly('Allow', 'GET');
    expect(res.status).to.have.been.calledOnce;
    expect(res.status).to.have.been.calledWith(405);
    expect(res.json).to.have.been.calledOnce;
  });

  it('should respond with 401 for missing secret', async () => {
    const fetcher = mockFetcher();
    const query = {} as Query;
    const req = mockRequest(query);
    const res = mockResponse();

    const middleware = new FEAASRenderMiddleware({
      dataFetcher: fetcher,
    });
    const handler = middleware.getHandler();

    await handler(req, res);

    expect(res.status).to.have.been.calledOnce;
    expect(res.status).to.have.been.calledWith(401);
    expect(res.json).to.have.been.calledOnce;
  });

  it('should respond with 401 for invalid secret', async () => {
    const fetcher = mockFetcher();
    const query = {} as Query;
    query[QUERY_PARAM_EDITING_SECRET] = 'nope';
    const req = mockRequest(query);
    const res = mockResponse();

    const middleware = new FEAASRenderMiddleware({
      dataFetcher: fetcher,
    });
    const handler = middleware.getHandler();

    await handler(req, res);

    expect(res.status).to.have.been.calledOnce;
    expect(res.status).to.have.been.calledWith(401);
    expect(res.json).to.have.been.calledOnce;
  });

  it('should use host header with http for serverUrl', async () => {
    const html = '<html><body>Something amazing</body></html>';
    const fetcher = mockFetcher(html);
    const query = {} as Query;
    query[QUERY_PARAM_EDITING_SECRET] = secret;
    const req = mockRequest(query, undefined, 'testhostheader.com');
    const res = mockResponse();

    const middleware = new FEAASRenderMiddleware({
      dataFetcher: fetcher,
    });
    const handler = middleware.getHandler();

    await handler(req, res);

    expect(fetcher.get).to.have.been.calledWithMatch('http://testhostheader.com');
  });

  it('should use https for serverUrl on Vercel', async () => {
    const html = '<html><body>Something amazing</body></html>';
    const fetcher = mockFetcher(html);
    const query = {} as Query;
    query[QUERY_PARAM_EDITING_SECRET] = secret;
    const req = mockRequest(query, undefined, 'vercel.com');
    const res = mockResponse();
    process.env.VERCEL = '1';

    const middleware = new FEAASRenderMiddleware({
      dataFetcher: fetcher,
    });
    const handler = middleware.getHandler();

    await handler(req, res);

    expect(fetcher.get).to.have.been.calledWithMatch('https://vercel.com');

    delete process.env.VERCEL;
  });

  it('should use custom resolveServerUrl', async () => {
    const html = '<html><body>Something amazing</body></html>';
    const fetcher = mockFetcher(html);
    const query = {} as Query;
    query[QUERY_PARAM_EDITING_SECRET] = secret;
    const req = mockRequest(query);
    const res = mockResponse();

    const serverUrl = 'https://test.com';

    const middleware = new FEAASRenderMiddleware({
      dataFetcher: fetcher,
      resolveServerUrl: () => {
        return serverUrl;
      },
    });
    const handler = middleware.getHandler();

    await handler(req, res);

    expect(fetcher.get).to.have.been.calledWithMatch(serverUrl);
  });

  it('should use custom resolvePageUrl', async () => {
    const html = '<html><body>Something amazing</body></html>';
    const fetcher = mockFetcher(html);
    const query = {} as Query;
    query[QUERY_PARAM_EDITING_SECRET] = secret;
    const req = mockRequest(query);
    const res = mockResponse();

    const serverUrl = 'https://test.com';
    const expectedPageUrl = `${serverUrl}/some/path/feaas/render`;
    const resolvePageUrl = spy((serverUrl: string) => {
      return `${serverUrl}/some/path/feaas/render`;
    });

    const middleware = new FEAASRenderMiddleware({
      dataFetcher: fetcher,
      resolvePageUrl: resolvePageUrl,
      resolveServerUrl: () => {
        return serverUrl;
      },
    });
    const handler = middleware.getHandler();

    await handler(req, res);

    expect(resolvePageUrl).to.have.been.calledOnce;
    expect(resolvePageUrl).to.have.been.calledWith(serverUrl);
    expect(fetcher.get).to.have.been.calledOnce;
    expect(fetcher.get).to.have.been.calledWithMatch(expectedPageUrl);
  });

  it('should respondWith 500 if rendered html empty', async () => {
    const fetcher = mockFetcher('');
    const query = {} as Query;
    query[QUERY_PARAM_EDITING_SECRET] = secret;
    const req = mockRequest(query);
    const res = mockResponse();

    const middleware = new FEAASRenderMiddleware({
      dataFetcher: fetcher,
    });
    const handler = middleware.getHandler();

    await handler(req, res);

    expect(res.status).to.have.been.calledOnce;
    expect(res.status).to.have.been.calledWith(500);
    expect(res.json).to.have.been.calledOnce;
  });

  it('should pass along protection bypass query parameters', async () => {
    const html = '<html phkey="test1"><body phkey="test2">Something amazing</body></html>';
    const query = {} as Query;
    const bypassTokenSitecore = 'token1234Sitecore';
    const bypassTokenVercel = 'token1234Vercel';
    query[QUERY_PARAM_EDITING_SECRET] = secret;
    query[QUERY_PARAM_PROTECTION_BYPASS_SITECORE] = bypassTokenSitecore;
    query[QUERY_PARAM_PROTECTION_BYPASS_VERCEL] = bypassTokenVercel;
    const previewData = {};

    const fetcher = mockFetcher(html);
    const req = mockRequest(query);
    const res = mockResponse();

    const middleware = new FEAASRenderMiddleware({
      dataFetcher: fetcher,
    });
    const handler = middleware.getHandler();

    await handler(req, res);

    expect(res.setPreviewData, 'set preview mode w/ data').to.have.been.calledWith(previewData);
    expect(fetcher.get).to.have.been.calledOnce;
    expect(fetcher.get, 'pass along protection bypass query params').to.have.been.calledWithMatch(
      `http://localhost:3000/feaas/render?${QUERY_PARAM_PROTECTION_BYPASS_SITECORE}=${bypassTokenSitecore}&${QUERY_PARAM_PROTECTION_BYPASS_VERCEL}=${bypassTokenVercel}&timestamp`
    );
  });
});
