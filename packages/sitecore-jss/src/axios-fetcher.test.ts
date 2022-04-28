/* eslint-disable no-unused-expressions */

import { AxiosResponse, AxiosRequestConfig } from 'axios';
import { expect, use, spy } from 'chai';
import spies from 'chai-spies';
import { AxiosDataFetcher, AxiosDataFetcherConfig } from './axios-fetcher';
import debugApi from 'debug';
import debug from './debug';
import nock from 'nock';

use(spies);

describe('AxiosDataFetcher', () => {
  let debugNamespaces: string;

  before(() => {
    debugNamespaces = debugApi.disable();
    debugApi.enable(`${debug.http.namespace},${debug.layout.namespace}`);
  });

  beforeEach(() => {
    spy.on(debug.http, 'log', () => true);
    spy.on(debug.layout, 'log', () => true);
  });

  afterEach(() => {
    nock.cleanAll();
    spy.restore(debug.http);
    spy.restore(debug.layout);
  });

  after(() => {
    debugApi.enable(debugNamespaces);
  });

  describe('fetch', () => {
    it('should execute POST request with data', () => {
      nock('http://jssnextweb')
        .post('/styleguide')
        .reply(200, (_, requestBody) => requestBody);

      const fetcher = new AxiosDataFetcher();

      return fetcher
        .fetch('http://jssnextweb/styleguide', { x: 'val1', y: 'val2' })
        .then((res: AxiosResponse) => {
          expect(res.status).to.equal(200);
          expect(res.config.data).to.equal('{"x":"val1","y":"val2"}');
          expect(res.config.url).to.equal('http://jssnextweb/styleguide');
          expect(res.config.withCredentials, 'with credentials is not true').to.be.true;
        });
    });

    it('should execute GET request without data', () => {
      nock('http://jssnextweb')
        .get('/home')
        .reply(200, (_, requestBody) => requestBody);

      const fetcher = new AxiosDataFetcher();

      return fetcher.fetch('http://jssnextweb/home').then((res: AxiosResponse) => {
        expect(res.status).to.equal(200);
        expect(res.config.data).to.equal(undefined);
        expect(res.config.url).to.equal('http://jssnextweb/home');
        expect(res.config.withCredentials, 'with credentials is not true').to.be.true;
      });
    });

    it('should execute failed request with data', () => {
      nock('http://jssnextweb')
        .post('/styleguide')
        .reply(400, (_, requestBody) => requestBody);

      const fetcher = new AxiosDataFetcher();

      return fetcher
        .fetch('http://jssnextweb/styleguide', { x: 'val1', y: 'val2' })
        .catch((err) => {
          expect(err.response.status).to.equal(400);
          expect(err.response.config.url).to.equal('http://jssnextweb/styleguide');
        });
    });

    it('should execute request with custom config', () => {
      nock('http://jssnextweb')
        .get('/home')
        .reply(204, (_, requestBody) => requestBody);

      const config: AxiosDataFetcherConfig = {
        timeout: 200,
        auth: {
          username: 'xxx',
          password: 'bbb',
        },
      };

      const fetcher = new AxiosDataFetcher(config);

      return fetcher.fetch('http://jssnextweb/home').then((res: AxiosResponse) => {
        expect(res.status).to.equal(204);
        expect(res.config.auth).to.deep.equal({
          username: 'xxx',
          password: 'bbb',
        });
        expect(res.config.timeout).to.equal(200);
        expect(res.config.data).to.equal(undefined);
        expect(res.config.url).to.equal('http://jssnextweb/home');
        expect(res.config.withCredentials, 'with credentials is not true').to.be.true;
      });
    });

    it('should allow override of default config', () => {
      nock('http://jssnextweb')
        .get('/home')
        .reply(200, (_, requestBody) => requestBody);

      const config: AxiosDataFetcherConfig = {
        withCredentials: false,
      };

      const fetcher = new AxiosDataFetcher(config);

      return fetcher.fetch('http://jssnextweb/home').then((res: AxiosResponse) => {
        expect(res.status).to.equal(200);
        expect(res.config.url).to.equal('http://jssnextweb/home');
        expect(res.config.withCredentials, 'with credentials is not false').to.be.false;
      });
    });

    it('should fetch using req and res and invoke callbacks', () => {
      nock('http://jssnextweb')
        .get('/home')
        .reply(200, (_, requestBody) => ({
          requestBody: requestBody,
          data: { sitecore: { context: {}, route: { name: 'xxx' } } },
        }));

      const onReqSpy = spy((config: AxiosRequestConfig) => {
        return config;
      });

      const onResSpy = spy((response: AxiosResponse) => {
        return response;
      });

      const config: AxiosDataFetcherConfig = {
        timeout: 200,
        auth: {
          username: 'xxx',
          password: 'bbb',
        },
        onReq: onReqSpy,
        onRes: onResSpy,
      };

      const fetcher = new AxiosDataFetcher(config);

      return fetcher.fetch('http://jssnextweb/home', undefined).then((res: AxiosResponse) => {
        expect(res.status).to.equal(200);

        expect(res.config.url).to.equal('http://jssnextweb/home');
        expect(res.data.data).to.deep.equal({
          sitecore: {
            context: {},
            route: { name: 'xxx' },
          },
        });
        expect(onReqSpy).to.be.called.once;
        expect(onResSpy).to.be.called.once;
      });
    });

    it('should debug log request and response', async () => {
      nock('http://jssnextweb')
        .get('/home')
        .reply(200, (_, requestBody) => requestBody);

      const fetcher = new AxiosDataFetcher();

      await fetcher.fetch('http://jssnextweb/home');
      expect(debug.http.log, 'request and response log').to.be.called.twice;
    });

    it('should debug log request and response error', () => {
      nock('http://jssnextweb')
        .post('/home')
        .reply(400, (_, requestBody) => requestBody);

      const fetcher = new AxiosDataFetcher();

      return fetcher.fetch('http://jssnextweb/home').catch(() => {
        expect(debug.http.log, 'request and response error log').to.be.called.twice;
      });
    });

    it('should use debugger override', async () => {
      nock('http://jssnextweb')
        .get('/home')
        .reply(200, (_, requestBody) => requestBody);

      const fetcher = new AxiosDataFetcher({ debugger: debug.layout });

      await fetcher.fetch('http://jssnextweb/home');
      expect(debug.layout.log, 'request and response log').to.be.called.twice;
    });
  });

  describe('get', () => {
    it('should execute GET request', () => {
      nock('http://jssnextweb')
        .get('/home')
        .reply(200, (_, requestBody) => requestBody);

      const fetcher = new AxiosDataFetcher();

      return fetcher.get('http://jssnextweb/home').then((res: AxiosResponse) => {
        expect(res.status).to.equal(200);
        expect(res.config.url).to.equal('http://jssnextweb/home');
      });
    });
  });

  describe('head', () => {
    it('should execute HEAD request', () => {
      nock('http://jssnextweb')
        .head('/home')
        .reply(200, (_, requestBody) => requestBody);

      const fetcher = new AxiosDataFetcher();

      return fetcher.head('http://jssnextweb/home').then((res: AxiosResponse) => {
        expect(res.status).to.equal(200);
        expect(res.config.url).to.equal('http://jssnextweb/home');
      });
    });
  });

  describe('post', () => {
    it('should execute POST request', () => {
      nock('http://jssnextweb')
        .post('/styleguide')
        .reply(200, (_, requestBody) => requestBody);

      const fetcher = new AxiosDataFetcher();

      return fetcher
        .post('http://jssnextweb/styleguide', { x: 'val1', y: 'val2' })
        .then((res: AxiosResponse) => {
          expect(res.status).to.equal(200);
          expect(res.config.data).to.equal('{"x":"val1","y":"val2"}');
          expect(res.config.url).to.equal('http://jssnextweb/styleguide');
        });
    });
  });

  describe('put', () => {
    it('should execute PUT request', () => {
      nock('http://jssnextweb')
        .put('/styleguide')
        .reply(200, (_, requestBody) => requestBody);

      const fetcher = new AxiosDataFetcher();

      return fetcher
        .put('http://jssnextweb/styleguide', { x: 'val1', y: 'val2' })
        .then((res: AxiosResponse) => {
          expect(res.status).to.equal(200);
          expect(res.config.data).to.equal('{"x":"val1","y":"val2"}');
          expect(res.config.url).to.equal('http://jssnextweb/styleguide');
        });
    });

    describe('delete', () => {
      it('should execute GET request', () => {
        nock('http://jssnextweb')
          .delete('/home')
          .reply(200, (_, requestBody) => requestBody);

        const fetcher = new AxiosDataFetcher();

        return fetcher.delete('http://jssnextweb/home').then((res: AxiosResponse) => {
          expect(res.status).to.equal(200);
          expect(res.config.url).to.equal('http://jssnextweb/home');
        });
      });
    });
  });
});
