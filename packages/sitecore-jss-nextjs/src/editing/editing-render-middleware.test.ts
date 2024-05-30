/* eslint-disable dot-notation */
/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect, use } from 'chai';
import { NextApiRequest, NextApiResponse } from 'next';
import { AxiosDataFetcher } from '@sitecore-jss/sitecore-jss';
import { EditingDataService, EditingPreviewData } from './editing-data-service';
import {
  EDITING_ALLOWED_ORIGINS,
  QUERY_PARAM_EDITING_SECRET,
  QUERY_PARAM_PROTECTION_BYPASS_SITECORE,
  QUERY_PARAM_PROTECTION_BYPASS_VERCEL,
} from './constants';
import {
  EE_PATH,
  EE_LANGUAGE,
  EE_LAYOUT,
  EE_DICTIONARY,
  EE_BODY,
  EE_COMPONENT_BODY,
} from '../test-data/ee-data';
import {
  ChromesHandler,
  EditingRenderMiddleware,
  MetadataQueryParams,
} from './editing-render-middleware';
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

const allowedOrigin = 'https://allowed.com';

const mockRequest = (
  body?: any,
  query?: Query | MetadataQueryParams,
  method?: string,
  headers?: { [key: string]: string }
) => {
  return {
    body: body ?? {},
    method: method ?? 'POST',
    query: query ?? {},
    headers: {
      host: 'localhost:3000',
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
  res.getHeader = spy((name: string) => {
    return name === 'Set-Cookie' ? mockNextJsPreviewCookies : undefined;
  });
  res.setHeader = spy();
  res.setPreviewData = spy(() => {
    return res;
  });
  res.redirect = spy();
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
    process.env.JSS_ALLOWED_ORIGINS = allowedOrigin;
    delete process.env.VERCEL;
  });

  after(() => {
    delete process.env.JSS_EDITING_SECRET;
    delete process.env.VERCEL;
    delete process.env.JSS_ALLOWED_ORIGINS;
  });

  it('should respondWith 405 for unsupported method', async () => {
    const query = {} as Query;
    query[QUERY_PARAM_EDITING_SECRET] = secret;
    const req = mockRequest(EE_BODY, query, 'PUT');
    const res = mockResponse();

    const middleware = new EditingRenderMiddleware();
    const handler = middleware.getHandler();

    await handler(req, res);

    expect(res.setHeader).to.have.been.calledWithExactly('Allow', 'GET, POST');
    expect(res.status).to.have.been.calledOnce;
    expect(res.status).to.have.been.calledWith(405);
    expect(res.json).to.have.been.calledOnce;
  });

  it('should respond with 401 for invalid secret', async () => {
    const query = {} as Query;
    query[QUERY_PARAM_EDITING_SECRET] = 'nope';
    const req = mockRequest(EE_BODY, query);
    const res = mockResponse();

    const middleware = new EditingRenderMiddleware();
    const handler = middleware.getHandler();

    await handler(req, res);

    expect(res.status).to.have.been.calledOnce;
    expect(res.status).to.have.been.calledWith(401);
    expect(res.json).to.have.been.calledOnce;
  });

  it('should stop request and return 401 when CORS match is not met', async () => {
    const req = mockRequest({}, {}, 'POST', { origin: 'https://notallowed.com' });
    const res = mockResponse();
    const middleware = new EditingRenderMiddleware();
    const handler = middleware.getHandler();

    await handler(req, res);

    expect(res.status).to.have.been.calledOnce;
    expect(res.status).to.have.been.calledWith(401);
    expect(res.json).to.have.been.calledOnce;
    expect(res.json).to.have.been.calledWith({
      html: '<html><body>Requests from origin https://notallowed.com not allowed</body></html>',
    });
  });

  it('should respond with 401 for missing secret', async () => {
    const query = {} as Query;
    const req = mockRequest(EE_BODY, query);
    const res = mockResponse();

    const middleware = new EditingRenderMiddleware();
    const handler = middleware.getHandler();

    await handler(req, res);

    expect(res.status).to.have.been.calledOnce;
    expect(res.status).to.have.been.calledWith(401);
    expect(res.json).to.have.been.calledOnce;
  });

  describe('metadata handler', () => {
    const query = {
      mode: 'edit',
      route: '/styleguide',
      sc_itemid: '{11111111-1111-1111-1111-111111111111}',
      sc_lang: 'en',
      sc_site: 'website',
      sc_variant: 'dev,dev2',
      sc_version: 'latest',
      secret: secret,
    } as MetadataQueryParams;

    it('should handle request', async () => {
      const req = mockRequest(EE_BODY, query, 'GET');
      const res = mockResponse();

      const middleware = new EditingRenderMiddleware();
      const handler = middleware.getHandler();

      await handler(req, res);

      expect(res.setPreviewData, 'set preview mode w/ data').to.have.been.calledWith({
        site: 'website',
        itemId: '{11111111-1111-1111-1111-111111111111}',
        language: 'en',
        variantId: 'dev',
        version: 'latest',
        editMode: 'metadata',
        pageState: 'edit',
      });

      expect(res.redirect).to.have.been.calledOnce;
      expect(res.redirect).to.have.been.calledWith('/styleguide');
      expect(res.setHeader).to.have.been.calledWith(
        'Content-Security-Policy',
        `frame-ancestors 'self' https://allowed.com ${EDITING_ALLOWED_ORIGINS.join(' ')}`
      );
    });

    it('should use custom resolvePageUrl', async () => {
      const req = mockRequest(EE_BODY, query, 'GET');
      const res = mockResponse();

      const middleware = new EditingRenderMiddleware({
        resolvePageUrl: (args) => {
          return `/custom/path${args.itemPath}`;
        },
      });

      const handler = middleware.getHandler();

      await handler(req, res);

      expect(res.setPreviewData, 'set preview mode w/ data').to.have.been.calledWith({
        site: 'website',
        itemId: '{11111111-1111-1111-1111-111111111111}',
        language: 'en',
        variantId: 'dev',
        version: 'latest',
        editMode: 'metadata',
        pageState: 'edit',
      });

      expect(res.redirect).to.have.been.calledOnce;
      expect(res.redirect).to.have.been.calledWith('/custom/path/styleguide');
    });
  });

  describe('chromes handler', () => {
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

      expect(dataService.setEditingData, 'stash editing data').to.have.been.called;
      expect(res.setPreviewData, 'set preview mode w/ data').to.have.been.calledWith(previewData);
      expect(res.getHeader, 'get preview cookies').to.have.been.calledWith('Set-Cookie');
      expect(fetcher.get).to.have.been.calledOnce;
      expect(fetcher.get, 'pass along preview cookies').to.have.been.calledWith(
        match('http://localhost:3000/test/path?timestamp'),
        {
          headers: {
            Cookie: mockNextJsPreviewCookies.join(';'),
          },
        }
      );
      expect(res.status).to.have.been.calledOnce;
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledOnce;
      expect(res.json).to.have.been.calledWith({
        html: '<html key="test1"><body key="test2">Something amazing</body></html>',
      });
    });

    it('should handle component rendering request', async () => {
      const html =
        '<html phkey="test1"><body phkey="test2"><div id="editing-component"><h1>Hello world</h1><p>Something amazing</p></div></body></html>';
      const query = {} as Query;
      query[QUERY_PARAM_EDITING_SECRET] = secret;
      const previewData = { key: 'key1234' } as EditingPreviewData;

      const fetcher = mockFetcher(html);
      const dataService = mockDataService(previewData);
      const req = mockRequest(EE_COMPONENT_BODY, query);
      const res = mockResponse();

      const middleware = new EditingRenderMiddleware({
        dataFetcher: fetcher,
        editingDataService: dataService,
      });
      const handler = middleware.getHandler();

      await handler(req, res);

      expect(dataService.setEditingData, 'stash editing data').to.have.been.called;
      expect(res.setPreviewData, 'set preview mode w/ data').to.have.been.calledWith(previewData);
      expect(res.getHeader, 'get preview cookies').to.have.been.calledWith('Set-Cookie');
      expect(fetcher.get).to.have.been.calledOnce;
      expect(fetcher.get, 'pass along preview cookies').to.have.been.calledWith(
        match('http://localhost:3000/test/path?timestamp'),
        {
          headers: {
            Cookie: mockNextJsPreviewCookies.join(';'),
          },
        }
      );
      expect(res.status).to.have.been.calledOnce;
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledOnce;
      expect(res.json).to.have.been.calledWith({
        html: '<h1>Hello world</h1><p>Something amazing</p>',
      });
    });

    it('should throw error when component rendering markup is missing', async () => {
      const html = '<html phkey="test1"><body phkey="test2"><div></div></body></html>';
      const query = {} as Query;
      query[QUERY_PARAM_EDITING_SECRET] = secret;
      const previewData = { key: 'key1234' } as EditingPreviewData;

      const fetcher = mockFetcher(html);
      const dataService = mockDataService(previewData);
      const req = mockRequest(EE_COMPONENT_BODY, query);
      const res = mockResponse();

      const middleware = new EditingRenderMiddleware({
        dataFetcher: fetcher,
        editingDataService: dataService,
      });
      const handler = middleware.getHandler();

      await handler(req, res);

      expect(dataService.setEditingData, 'stash editing data').to.have.been.called;
      expect(res.setPreviewData, 'set preview mode w/ data').to.have.been.calledWith(previewData);
      expect(res.getHeader, 'get preview cookies').to.have.been.calledWith('Set-Cookie');
      expect(fetcher.get).to.have.been.calledOnce;
      expect(fetcher.get, 'pass along preview cookies').to.have.been.calledWith(
        match('http://localhost:3000/test/path?timestamp'),
        {
          headers: {
            Cookie: mockNextJsPreviewCookies.join(';'),
          },
        }
      );
      expect(res.status).to.have.been.calledOnce;
      expect(res.status).to.have.been.calledWith(500);
      expect(res.json).to.have.been.calledOnce;
      expect(res.json).to.have.been.calledWithMatch({
        html: '<html><body>Error: Failed to render component for /test/path</body></html>',
      });
    });

    it('should handle 404 for route data request', async () => {
      const html = '<html phkey="test1"><body phkey="test2">Page not found</body></html>';
      const query = {} as Query;
      query[QUERY_PARAM_EDITING_SECRET] = secret;
      const previewData = { key: 'key1234' } as EditingPreviewData;

      const fetcher = {} as AxiosDataFetcher;
      fetcher.get = spy<any>(() => {
        return Promise.reject({ response: { data: html, status: 404 } });
      });

      const dataService = mockDataService(previewData);
      const req = mockRequest(EE_BODY, query);
      const res = mockResponse();

      const middleware = new EditingRenderMiddleware({
        dataFetcher: fetcher,
        editingDataService: dataService,
      });
      const handler = middleware.getHandler();

      await handler(req, res);

      expect(dataService.setEditingData, 'stash editing data').to.have.been.called;
      expect(res.setPreviewData, 'set preview mode w/ data').to.have.been.calledWith(previewData);
      expect(res.getHeader, 'get preview cookies').to.have.been.calledWith('Set-Cookie');
      expect(fetcher.get).to.have.been.calledOnce;
      expect(fetcher.get, 'pass along preview cookies').to.have.been.calledWith(
        match('http://localhost:3000/test/path?timestamp'),
        {
          headers: {
            Cookie: mockNextJsPreviewCookies.join(';'),
          },
        }
      );
      expect(res.status).to.have.been.calledOnce;
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledOnce;
      expect(res.json).to.have.been.calledWith({
        html: '<html key="test1"><body key="test2">Page not found</body></html>',
      });
    });

    it('should throw error for route data request', async () => {
      const html = '<html phkey="test1"><body phkey="test2">Error occured</body></html>';
      const query = {} as Query;
      query[QUERY_PARAM_EDITING_SECRET] = secret;
      const previewData = { key: 'key1234' } as EditingPreviewData;

      const fetcher = {} as AxiosDataFetcher;
      fetcher.get = spy<any>(() => {
        return Promise.reject({ response: { data: html, status: 500 } });
      });

      const dataService = mockDataService(previewData);
      const req = mockRequest(EE_BODY, query);
      const res = mockResponse();

      const middleware = new EditingRenderMiddleware({
        dataFetcher: fetcher,
        editingDataService: dataService,
      });
      const handler = middleware.getHandler();

      await handler(req, res);

      expect(dataService.setEditingData, 'stash editing data').to.have.been.called;
      expect(res.setPreviewData, 'set preview mode w/ data').to.have.been.calledWith(previewData);
      expect(res.getHeader, 'get preview cookies').to.have.been.calledWith('Set-Cookie');
      expect(fetcher.get).to.have.been.calledOnce;
      expect(fetcher.get, 'pass along preview cookies').to.have.been.calledWith(
        match('http://localhost:3000/test/path?timestamp'),
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

      expect(res.status).to.have.been.calledOnce;
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledOnce;
    });

    it('should use host header with http for serverUrl', async () => {
      const html = '<html><body>Something amazing</body></html>';
      const fetcher = mockFetcher(html);
      const dataService = mockDataService();
      const query = {} as Query;
      query[QUERY_PARAM_EDITING_SECRET] = secret;
      const req = mockRequest(EE_BODY, query, undefined, { host: 'testhostheader.com' });
      const res = mockResponse();

      const middleware = new EditingRenderMiddleware({
        dataFetcher: fetcher,
        editingDataService: dataService,
      });
      const handler = middleware.getHandler();

      await handler(req, res);

      expect(fetcher.get).to.have.been.calledWithMatch('http://testhostheader.com');
    });

    it('should use https for serverUrl on Vercel', async () => {
      const html = '<html><body>Something amazing</body></html>';
      const fetcher = mockFetcher(html);
      const dataService = mockDataService();
      const query = {} as Query;
      query[QUERY_PARAM_EDITING_SECRET] = secret;
      const req = mockRequest(EE_BODY, query, undefined, { host: 'vercel.com' });
      const res = mockResponse();
      process.env.VERCEL = '1';

      const middleware = new EditingRenderMiddleware({
        dataFetcher: fetcher,
        editingDataService: dataService,
      });
      const handler = middleware.getHandler();

      await handler(req, res);

      expect(fetcher.get).to.have.been.calledWithMatch('https://vercel.com');
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

      expect(fetcher.get).to.have.been.calledWithMatch(serverUrl);
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
      const resolvePageUrl = spy((args: { serverUrl?: string; itemPath: string }) => {
        return `${serverUrl}/some/path${args.itemPath}`;
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

      expect(resolvePageUrl).to.have.been.calledOnce;
      expect(resolvePageUrl).to.have.been.calledWith({ serverUrl, itemPath: EE_PATH });
      expect(fetcher.get).to.have.been.calledOnce;
      expect(fetcher.get).to.have.been.calledWithMatch(expectedPageUrl);
    });

    it('should respondWith 500 if rendered html empty', async () => {
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

      expect(dataService.setEditingData, 'stash editing data').to.have.been.called;
      expect(res.setPreviewData, 'set preview mode w/ data').to.have.been.calledWith(previewData);
      expect(fetcher.get).to.have.been.calledOnce;
      expect(fetcher.get, 'pass along protection bypass query params').to.have.been.calledWithMatch(
        `http://localhost:3000/test/path?${QUERY_PARAM_PROTECTION_BYPASS_SITECORE}=${bypassTokenSitecore}&${QUERY_PARAM_PROTECTION_BYPASS_VERCEL}=${bypassTokenVercel}&timestamp`
      );
    });

    describe('extractEditingData', () => {
      it('should throw if body missing', () => {
        const handler = new ChromesHandler();
        const req = mockRequest();
        expect(() => handler['extractEditingData'](req)).to.throw();
      });

      it('should return path', () => {
        const handler = new ChromesHandler();
        const req = mockRequest(EE_BODY);
        const data = handler['extractEditingData'](req);
        expect(data.path).to.equal(EE_PATH);
      });

      it('should return language', () => {
        const handler = new ChromesHandler();
        const req = mockRequest(EE_BODY);
        const data = handler['extractEditingData'](req);
        expect(data.language).to.equal(EE_LANGUAGE);
      });

      it('should return layout data', () => {
        const handler = new ChromesHandler();
        const req = mockRequest(EE_BODY);
        const data = handler['extractEditingData'](req);
        const expected = JSON.parse(EE_LAYOUT);
        expect(data.layoutData).to.eql(expected);
      });

      it('should return dictionary', () => {
        const handler = new ChromesHandler();
        const req = mockRequest(EE_BODY);
        const data = handler['extractEditingData'](req);
        const expected = JSON.parse(EE_DICTIONARY);
        expect(data.dictionary).to.eql(expected);
      });
    });
  });
});
