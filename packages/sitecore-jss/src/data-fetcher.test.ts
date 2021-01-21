/* eslint-disable no-unused-expressions */

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { expect, use, spy } from 'chai';
import spies from 'chai-spies';
import { AxiosDataFetcher, AxiosDataFetcherConfig } from './data-fetcher';

use(spies);

describe('AxiosDataFetcher', () => {
  let mock: MockAdapter;

  before(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  after(() => {
    mock.restore();
  });

  describe('fetch', () => {
    it('should execute POST request with data', () => {
      mock.onPost().reply((config) => {
        // append axios config as response data
        return [200, { ...config }];
      });

      const fetcher = new AxiosDataFetcher();

      return fetcher.fetch('/styleguide', { x: 'val1', y: 'val2' }).then((res: AxiosResponse) => {
        expect(res.status).to.equal(200);
        expect(res.data.data).to.equal('{"x":"val1","y":"val2"}');
        expect(res.data.url).to.equal('/styleguide');
        expect(res.data.withCredentials, 'with credentials is not true').to.be.true;
      });
    });

    it('should execute GET request withouth data', () => {
      mock.onGet().reply((config) => {
        // append axios config as response data
        return [200, { ...config }];
      });

      const fetcher = new AxiosDataFetcher();

      return fetcher.fetch('/home').then((res: AxiosResponse) => {
        expect(res.status).to.equal(200);
        expect(res.data.data).to.equal(undefined);
        expect(res.data.url).to.equal('/home');
        expect(res.data.withCredentials, 'with credentials is not true').to.be.true;
      });
    });

    it('should execute failed request with data', () => {
      mock.onPost().reply((config) => {
        // append axios config as response data
        return [400, { ...config }];
      });

      const fetcher = new AxiosDataFetcher();

      return fetcher.fetch('/styleguide', { x: 'val1', y: 'val2' }).catch((err) => {
        expect(err.response.status).to.equal(400);
        expect(err.response.data.url).to.equal('/styleguide');
      });
    });

    it('should execute request with custom config', () => {
      mock.onGet().reply((config) => {
        // append axios config as response data
        return [204, { ...config }];
      });

      const config: AxiosDataFetcherConfig = {
        timeout: 200,
        auth: {
          username: 'xxx',
          password: 'bbb',
        },
      };

      const fetcher = new AxiosDataFetcher(config);

      return fetcher.fetch('/home').then((res: AxiosResponse) => {
        expect(res.status).to.equal(204);
        expect(res.data.auth).to.deep.equal({
          username: 'xxx',
          password: 'bbb',
        });
        expect(res.data.timeout).to.equal(200);
        expect(res.data.data).to.equal(undefined);
        expect(res.data.url).to.equal('/home');
        expect(res.data.withCredentials, 'with credentials is not true').to.be.true;
      });
    });

    it('should allow override of default config', () => {
      mock.onGet().reply((config) => {
        // append axios config as response data
        return [200, { ...config }];
      });

      const config: AxiosDataFetcherConfig = {
        withCredentials: false,
      };

      const fetcher = new AxiosDataFetcher(config);

      return fetcher.fetch('/home').then((res: AxiosResponse) => {
        expect(res.status).to.equal(200);
        expect(res.data.url).to.equal('/home');
        expect(res.data.withCredentials, 'with credentials is not false').to.be.false;
      });
    });

    it('should fetch using req and res and invoke callbacks', () => {
      mock.onGet().reply((config) => {
        return [
          200,
          {
            ...config,
            data: { sitecore: { context: {}, route: { name: 'xxx' } } },
          },
        ];
      });

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

      return fetcher.fetch('/home', undefined).then((res: AxiosResponse) => {
        expect(res.status).to.equal(200);

        expect(res.data.url).to.equal('/home');
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
  });

  describe('get', () => {
    it('should execute GET request', () => {
      mock.onGet().reply((config) => {
        // append axios config as response data
        return [200, { ...config }];
      });

      const fetcher = new AxiosDataFetcher();

      return fetcher.get('/home').then((res: AxiosResponse) => {
        expect(res.status).to.equal(200);
        expect(res.data.url).to.equal('/home');
      });
    });
  });

  describe('head', () => {
    it('should execute HEAD request', () => {
      mock.onHead().reply((config) => {
        // append axios config as response data
        return [200, { ...config }];
      });

      const fetcher = new AxiosDataFetcher();

      return fetcher.head('/home').then((res: AxiosResponse) => {
        expect(res.status).to.equal(200);
        expect(res.data.url).to.equal('/home');
      });
    });
  });

  describe('post', () => {
    it('should execute POST request', () => {
      mock.onPost().reply((config) => {
        // append axios config as response data
        return [200, { ...config }];
      });

      const fetcher = new AxiosDataFetcher();

      return fetcher.post('/styleguide', { x: 'val1', y: 'val2' }).then((res: AxiosResponse) => {
        expect(res.status).to.equal(200);
        expect(res.data.data).to.equal('{"x":"val1","y":"val2"}');
        expect(res.data.url).to.equal('/styleguide');
      });
    });
  });

  describe('put', () => {
    it('should execute PUT request', () => {
      mock.onPut().reply((config) => {
        // append axios config as response data
        return [200, { ...config }];
      });

      const fetcher = new AxiosDataFetcher();

      return fetcher.put('/styleguide', { x: 'val1', y: 'val2' }).then((res: AxiosResponse) => {
        expect(res.status).to.equal(200);
        expect(res.data.data).to.equal('{"x":"val1","y":"val2"}');
        expect(res.data.url).to.equal('/styleguide');
      });
    });

    describe('delete', () => {
      it('should execute GET request', () => {
        mock.onDelete().reply((config) => {
          // append axios config as response data
          return [200, { ...config }];
        });

        const fetcher = new AxiosDataFetcher();

        return fetcher.delete('/home').then((res: AxiosResponse) => {
          expect(res.status).to.equal(200);
          expect(res.data.url).to.equal('/home');
        });
      });
    });
  });
});
