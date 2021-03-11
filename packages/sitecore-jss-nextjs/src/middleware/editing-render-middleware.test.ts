/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect, use, spy } from 'chai';
import spies from 'chai-spies';
import { NextApiRequest, NextApiResponse } from 'next';
import { AxiosDataFetcher } from '@sitecore-jss/sitecore-jss';
import { EditingDataService } from '../services/editing-data-service';
import { QUERY_PARAM_EDITING_SECRET } from '../services/editing-data-service';
import { EditingPreviewData } from '../sharedTypes/editing-data';
import { EE_PATH, EE_LANGUAGE, EE_LAYOUT, EE_DICTIONARY, EE_BODY } from '../testData/ee-data';
import { EditingRenderMiddleware, extractEditingData } from './editing-render-middleware';

use(spies);

const mockNextJsPreviewCookies = [
  '__prerender_bypass:1122334455',
  '__next_preview_data:6677889900',
];

type Query = {
  [key: string]: string;
};

const mockRequest = (body?: any, query?: Query, method?: string, host?: string) => {
  return {
    body: body ?? {},
    method: method ?? 'POST',
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

const mockDataService = (previewData?: EditingPreviewData) => {
  const service = {} as EditingDataService;
  service.setEditingData = spy(() => {
    return Promise.resolve(previewData ?? ({} as EditingPreviewData));
  });
  return service;
};

describe('EditingRenderMiddleware', () => {
  const secret = 'secret1234';

  beforeEach(() => {
    process.env.JSS_EDITING_SECRET = secret;
    delete process.env.VERCEL;
  });

  after(() => {
    delete process.env.JSS_EDITING_SECRET;
    delete process.env.VERCEL;
  });

  it('should handle request', async () => {
    const html = '<html phkey="test1"><body phkey="test2">Something amazing</body></html>';
    const query = {} as Query;
    query[QUERY_PARAM_EDITING_SECRET] = secret;
    const previewData = { key: 'key1234' } as EditingPreviewData;

    const fetcher = mockFetcher(html);
    const dataService = mockDataService(previewData);
    const req = mockRequest(EE_BODY, query);
    const res = mockResponse();

    const middleware = new EditingRenderMiddleware({
      dataFetcher: fetcher,
      editingDataService: dataService,
    });
    const handler = middleware.getHandler();

    await handler(req, res);

    expect(dataService.setEditingData, 'stash editing data').to.have.been.called();
    expect(res.setPreviewData, 'set preview mode w/ data').to.have.been.called.with(previewData);
    expect(res.getHeader, 'get preview cookies').to.have.been.called.with('Set-Cookie');
    expect(fetcher.get).to.have.been.called.once;
    expect(fetcher.get, 'pass along preview cookies').to.have.been.called.with({
      headers: {
        Cookie: mockNextJsPreviewCookies.join(';'),
      },
    });
    expect(res.status).to.have.been.called.once;
    expect(res.status).to.have.been.called.with(200);
    expect(res.json).to.have.been.called.once;
    expect(res.json).to.have.been.called.with({
      html: '<html key="test1"><body key="test2">Something amazing</body></html>',
    });
  });

  it('should respond with 405 for unsupported method', async () => {
    const fetcher = mockFetcher();
    const dataService = mockDataService();
    const req = mockRequest(EE_BODY, {}, 'GET');
    const res = mockResponse();

    const middleware = new EditingRenderMiddleware({
      dataFetcher: fetcher,
      editingDataService: dataService,
    });
    const handler = middleware.getHandler();

    await handler(req, res);

    expect(res.setHeader).to.have.been.called.with.exactly('Allow', 'POST');
    expect(res.status).to.have.been.called.once;
    expect(res.status).to.have.been.called.with(405);
    expect(res.json).to.have.been.called.once;
  });

  it('should respond with 401 for missing secret', async () => {
    const fetcher = mockFetcher();
    const dataService = mockDataService();
    const query = {} as Query;
    const req = mockRequest(EE_BODY, query);
    const res = mockResponse();

    const middleware = new EditingRenderMiddleware({
      dataFetcher: fetcher,
      editingDataService: dataService,
    });
    const handler = middleware.getHandler();

    await handler(req, res);

    expect(res.status).to.have.been.called.once;
    expect(res.status).to.have.been.called.with(401);
    expect(res.json).to.have.been.called.once;
  });

  it('should respond with 401 for invalid secret', async () => {
    const fetcher = mockFetcher();
    const dataService = mockDataService();
    const query = {} as Query;
    query[QUERY_PARAM_EDITING_SECRET] = 'nope';
    const req = mockRequest(EE_BODY, query);
    const res = mockResponse();

    const middleware = new EditingRenderMiddleware({
      dataFetcher: fetcher,
      editingDataService: dataService,
    });
    const handler = middleware.getHandler();

    await handler(req, res);

    expect(res.status).to.have.been.called.once;
    expect(res.status).to.have.been.called.with(401);
    expect(res.json).to.have.been.called.once;
  });

  it('should use editing secret from body', async () => {
    const html = '<html><body>Something amazing</body></html>';
    const fetcher = mockFetcher(html);
    const dataService = mockDataService();
    const query = {} as Query;
    const bodyWithSecret = Object.assign({}, EE_BODY, { jssEditingSecret: secret });
    const req = mockRequest(bodyWithSecret, query);
    const res = mockResponse();

    const middleware = new EditingRenderMiddleware({
      dataFetcher: fetcher,
      editingDataService: dataService,
    });
    const handler = middleware.getHandler();

    await handler(req, res);

    expect(res.status).to.have.been.called.once;
    expect(res.status).to.have.been.called.with(200);
    expect(res.json).to.have.been.called.once;
  });

  it('should use host header with http for serverUrl', async () => {
    const html = '<html><body>Something amazing</body></html>';
    const fetcher = mockFetcher(html);
    const dataService = mockDataService();
    const query = {} as Query;
    query[QUERY_PARAM_EDITING_SECRET] = secret;
    const req = mockRequest(EE_BODY, query, undefined, 'testhostheader.com');
    const res = mockResponse();

    const middleware = new EditingRenderMiddleware({
      dataFetcher: fetcher,
      editingDataService: dataService,
    });
    const handler = middleware.getHandler();

    await handler(req, res);

    expect(fetcher.get).to.have.been.called.once.and.satisfies((args: any) => {
      const spy = args.__spy;
      const url = spy.calls[0][0] as string;
      return url.startsWith('http://testhostheader.com');
    });
  });

  it('should use https for serverUrl on Vercel', async () => {
    const html = '<html><body>Something amazing</body></html>';
    const fetcher = mockFetcher(html);
    const dataService = mockDataService();
    const query = {} as Query;
    query[QUERY_PARAM_EDITING_SECRET] = secret;
    const req = mockRequest(EE_BODY, query, undefined, 'vercel.com');
    const res = mockResponse();
    process.env.VERCEL = '1';

    const middleware = new EditingRenderMiddleware({
      dataFetcher: fetcher,
      editingDataService: dataService,
    });
    const handler = middleware.getHandler();

    await handler(req, res);

    expect(fetcher.get).to.have.been.called.once.and.satisfies((args: any) => {
      const spy = args.__spy;
      const url = spy.calls[0][0] as string;
      return url.startsWith('https://vercel.com');
    });
  });

  it('should use custom resolveServerUrl', async () => {
    const html = '<html><body>Something amazing</body></html>';
    const fetcher = mockFetcher(html);
    const dataService = mockDataService();
    const query = {} as Query;
    query[QUERY_PARAM_EDITING_SECRET] = secret;
    const req = mockRequest(EE_BODY, query);
    const res = mockResponse();

    const serverUrl = 'https://test.com';

    const middleware = new EditingRenderMiddleware({
      dataFetcher: fetcher,
      editingDataService: dataService,
      resolveServerUrl: () => {
        return serverUrl;
      },
    });
    const handler = middleware.getHandler();

    await handler(req, res);

    expect(fetcher.get).to.have.been.called.once.and.satisfies((args: any) => {
      const spy = args.__spy;
      const url = spy.calls[0][0] as string;
      return url.startsWith(serverUrl);
    });
  });

  it('should use custom resolvePageUrl', async () => {
    const html = '<html><body>Something amazing</body></html>';
    const fetcher = mockFetcher(html);
    const dataService = mockDataService();
    const query = {} as Query;
    query[QUERY_PARAM_EDITING_SECRET] = secret;
    const req = mockRequest(EE_BODY, query);
    const res = mockResponse();

    const serverUrl = 'https://test.com';
    const expectedPageUrl = `${serverUrl}/some/path${EE_PATH}`;
    const resolvePageUrl = spy((serverUrl: string, itemPath: string) => {
      return `${serverUrl}/some/path${itemPath}`;
    });

    const middleware = new EditingRenderMiddleware({
      dataFetcher: fetcher,
      editingDataService: dataService,
      resolvePageUrl: resolvePageUrl,
      resolveServerUrl: () => {
        return serverUrl;
      },
    });
    const handler = middleware.getHandler();

    await handler(req, res);

    expect(resolvePageUrl).to.have.been.called.once;
    expect(resolvePageUrl).to.have.been.called.with(EE_PATH);
    expect(fetcher.get).to.have.been.called.once.and.satisfies((args: any) => {
      const spy = args.__spy;
      const url = spy.calls[0][0] as string;
      return url.startsWith(expectedPageUrl);
    });
  });

  it('should respond with 500 if rendered html empty', async () => {
    const fetcher = mockFetcher('');
    const dataService = mockDataService();
    const query = {} as Query;
    query[QUERY_PARAM_EDITING_SECRET] = secret;
    const req = mockRequest(EE_BODY, query);
    const res = mockResponse();

    const middleware = new EditingRenderMiddleware({
      dataFetcher: fetcher,
      editingDataService: dataService,
    });
    const handler = middleware.getHandler();

    await handler(req, res);

    expect(res.status).to.have.been.called.once;
    expect(res.status).to.have.been.called.with(500);
    expect(res.json).to.have.been.called.once;
  });
});

describe('extractEditingData', () => {
  it('should throw if body missing', () => {
    const req = mockRequest();
    expect(() => extractEditingData(req)).to.throw();
  });

  it('should return path', () => {
    const req = mockRequest(EE_BODY);
    const data = extractEditingData(req);
    expect(data.path).to.equal(EE_PATH);
  });

  it('should return language', () => {
    const req = mockRequest(EE_BODY);
    const data = extractEditingData(req);
    expect(data.language).to.equal(EE_LANGUAGE);
  });

  it('should return layout data', () => {
    const req = mockRequest(EE_BODY);
    const data = extractEditingData(req);
    const expected = JSON.parse(EE_LAYOUT);
    expect(data.layoutData).to.eql(expected);
  });

  it('should return dictionary', () => {
    const req = mockRequest(EE_BODY);
    const data = extractEditingData(req);
    const expected = JSON.parse(EE_DICTIONARY);
    expect(data.dictionary).to.eql(expected);
  });
});
