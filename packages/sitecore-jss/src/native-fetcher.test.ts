/* eslint-disable no-unused-expressions */
import { expect, use, spy } from 'chai';
import spies from 'chai-spies';
import { NativeDataFetcher } from './native-fetcher';
import debugApi from 'debug';
import debug from './debug';

use(spies);

let fetchInput: RequestInfo | undefined;
let fetchInit: RequestInit | undefined;

const mockFetch = (status: number, response: unknown = {}, jsonError?: string) => {
  return (input: RequestInfo, init?: RequestInit) => {
    fetchInput = input;
    fetchInit = init;
    return Promise.resolve({
      ok: status === 200,
      status,
      statusText: status === 200 ? 'OK' : 'ERROR',
      url: input,
      redirected: false,
      headers: {
        get: (name: string) => {
          return name === 'Content-Type' ? 'application/json' : '';
        },
      } as Headers,
      json: () => {
        return jsonError ? Promise.reject(jsonError) : Promise.resolve(response);
      },
    } as Response);
  };
};

const mockHeaders = () => {
  return () => ({
    set: spy(),
  });
};

describe('NativeDataFetcher', () => {
  let debugNamespaces: string;

  before(() => {
    debugNamespaces = debugApi.disable();
    debugApi.enable(`${debug.http.namespace},${debug.personalize.namespace}`);
  });

  beforeEach(() => {
    spy.on(global, 'Headers', mockHeaders());
    spy.on(debug.http, 'log', () => true);
    spy.on(debug.personalize, 'log', () => true);
  });

  afterEach(() => {
    fetchInput = undefined;
    fetchInit = undefined;
    spy.restore(global);
    spy.restore(debug.http);
    spy.restore(debug.personalize);
  });

  after(() => {
    debugApi.enable(debugNamespaces);
  });

  describe('fetch', () => {
    it('should execute POST request with data', async () => {
      const fetcher = new NativeDataFetcher();
      const postData = { x: 'val1', y: 'val2' };
      const respData = { z: 'val3' };

      spy.on(global, 'fetch', mockFetch(200, respData));

      const response = await fetcher.fetch('http://test.com/api', postData);
      expect(response.status).to.equal(200);
      expect(response.data).to.equal(respData);
      expect(fetchInput).to.equal('http://test.com/api');
      expect(fetchInit?.method).to.equal('POST');
      expect(fetchInit?.body).to.equal(JSON.stringify(postData));
    });

    it('should execute GET request without data', async () => {
      const fetcher = new NativeDataFetcher();
      const respData = { z: 'val3' };

      spy.on(global, 'fetch', mockFetch(200, respData));

      const response = await fetcher.fetch('http://test.com/api');
      expect(response.status).to.equal(200);
      expect(response.data).to.equal(respData);
      expect(fetchInput).to.equal('http://test.com/api');
      expect(fetchInit?.method).to.equal('GET');
      expect(fetchInit?.body).to.be.undefined;
    });

    it('should throw error for failed request', async () => {
      const fetcher = new NativeDataFetcher();

      spy.on(global, 'fetch', mockFetch(400));

      await fetcher.fetch('http://test.com/api').catch((error) => {
        expect(error).to.be.instanceOf(Error);
        expect(error.message).to.equal('HTTP 400 ERROR');
      });
    });

    it('should execute request with custom init', async () => {
      const headers = {
        x: 'x',
        y: 'y',
      };
      const fetcher = new NativeDataFetcher({
        credentials: 'same-origin',
        referrer: 'foo',
        headers,
      });

      spy.on(global, 'fetch', mockFetch(200));

      const response = await fetcher.fetch('http://test.com/api');
      expect(response.status).to.equal(200);
      expect(fetchInit?.credentials).to.equal('same-origin');
      expect(fetchInit?.referrer).to.equal('foo');
      expect(global.Headers).to.be.called.once;
      expect(global.Headers).to.be.called.with(headers);
    });

    it('should debug log request and response', async () => {
      const fetcher = new NativeDataFetcher();

      spy.on(global, 'fetch', mockFetch(200));

      await fetcher.fetch('http://test.com/api');
      expect(debug.http.log, 'request and response log').to.be.called.twice;
    });

    it('should debug log request and response error', async () => {
      const fetcher = new NativeDataFetcher();

      spy.on(global, 'fetch', mockFetch(400));

      await fetcher.fetch('http://test.com/api').catch(() => {
        expect(debug.http.log, 'request and response error log').to.be.called.twice;
      });
    });

    it('should use debugger override', async () => {
      const fetcher = new NativeDataFetcher({ debugger: debug.personalize });

      spy.on(global, 'fetch', mockFetch(200));

      await fetcher.fetch('http://test.com/api');
      expect(debug.personalize.log, 'request and response log').to.be.called.twice;
    });

    it('should use fetch override', async () => {
      const fetchOverride = spy(mockFetch(200));
      const fetcher = new NativeDataFetcher({ fetch: fetchOverride });

      await fetcher.fetch('http://test.com/api');
      expect(fetchOverride).to.be.called;
    });

    it('should handle response.json() error', async () => {
      const fetcher = new NativeDataFetcher();

      spy.on(global, 'fetch', mockFetch(200, {}, 'ERROR'));

      const response = await fetcher.fetch('http://test.com/api');
      expect(response.status).to.equal(200);
      expect(response.data).to.be.undefined;
      expect(
        debug.http.log,
        'request and response.json() error and response log'
      ).to.be.called.exactly(3);
    });
  });
});
