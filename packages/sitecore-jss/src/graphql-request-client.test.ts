/* eslint-disable no-unused-expressions */
/* eslint-disable dot-notation */
import { expect, use, spy } from 'chai';
import sinon from 'sinon';
import spies from 'chai-spies';
import nock from 'nock';
import { GraphQLRequestClient, DefaultRetryStrategy } from './graphql-request-client';
import { ClientError } from 'graphql-request';
import debugApi from 'debug';
import debug from './debug';

use(spies);

describe('GraphQLRequestClient', () => {
  const endpoint = 'http://jssnextweb/graphql';
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

  it('should execute graphql request', async () => {
    nock('http://jssnextweb')
      .post('/graphql')
      .reply(200, {
        data: {
          result: 'Hello world...',
        },
      });

    const graphQLClient = new GraphQLRequestClient(endpoint);
    const data = await graphQLClient.request('test');

    expect(data).to.deep.equal({ result: 'Hello world...' });
  });

  it('should send sc_apikey header', async () => {
    const apiKey = 'cjhNRWNVOHRFTklwUjhYa0RSTnBhSStIam1mNE1KN1pyeW13c3FnRVExTT18bXRzdC1kLTAxOQ==';
    nock('http://jssnextweb', {
      reqheaders: {
        sc_apikey: apiKey,
      },
    })
      .post('/graphql')
      .reply(200, {
        data: {
          result: 'Hello world...',
        },
      });

    const graphQLClient = new GraphQLRequestClient(endpoint, { apiKey });
    await graphQLClient.request('test');
  });

  it('should debug log request and response', async () => {
    nock('http://jssnextweb')
      .post('/graphql')
      .reply(200, {
        data: {
          result: 'Hello world...',
        },
      });

    const graphQLClient = new GraphQLRequestClient(endpoint);
    await graphQLClient.request('test');

    expect(debug.http.log, 'request and response log').to.be.called.twice;
  });

  it('should debug log request and response error', () => {
    nock('http://jssnextweb')
      .post('/graphql')
      .reply(400);

    const graphQLClient = new GraphQLRequestClient(endpoint);
    return graphQLClient.request('test').catch(() => {
      expect(debug.http.log, 'request and response error log').to.be.called.twice;
    });
  });

  it('should use debugger override', async () => {
    nock('http://jssnextweb')
      .post('/graphql')
      .reply(200, {
        data: {
          result: 'Hello world...',
        },
      });

    const graphQLClient = new GraphQLRequestClient(endpoint, { debugger: debug.layout });
    await graphQLClient.request('test');

    expect(debug.layout.log, 'request and response log').to.be.called.twice;
  });

  it('should throw error when endpoint is not a valid url', () => {
    const endpoint = 'invalid';

    try {
      new GraphQLRequestClient(endpoint, { debugger: debug.layout });
    } catch (error) {
      expect(error.toString()).to.equal(
        `Error: Invalid GraphQL endpoint '${endpoint}'. Verify that 'layoutServiceHost' property in 'scjssconfig.json' file or appropriate environment variable is set`
      );
    }
  });

  it('should throw error when request is aborted with default timeout value', async () => {
    nock('http://jssnextweb')
      .post('/graphql')
      .delay(100)
      .reply(200, {
        data: {
          result: 'Hello world...',
        },
      });

    const graphQLClient = new GraphQLRequestClient(endpoint);
    await graphQLClient.request('test').catch((error) => {
      expect(error.name).to.equal('AbortError');
    });
  });

  it('should throw error upon request timeout using provided timeout value', async () => {
    nock('http://jssnextweb')
      .post('/graphql')
      .delay(30)
      .reply(408, {
        data: {
          result: 'Hello world...',
        },
      });

    const graphQLClient = new GraphQLRequestClient(endpoint, { timeout: 10 });
    await graphQLClient.request('test').catch((error) => {
      expect(error.name).to.equal('AbortError');
    });
  });

  describe('createClientFactory', () => {
    it('should create a graphql request factory', () => {
      const clientFactory = GraphQLRequestClient.createClientFactory({
        endpoint: 'https://foo.com',
        apiKey: 'bar',
      });

      const client = clientFactory({ retries: 5, timeout: 300 });

      expect(client instanceof GraphQLRequestClient).to.equal(true);
      expect(client['retries']).to.equal(5);
      expect(client['timeout']).to.equal(300);
    });
  });

  describe('Working with retryer', () => {
    it('should use the clientConfig values configured by the client', () => {
      const clientConfig = {
        retries: 4,
        retryStrategy: {
          getDelay: () => 1000,
          shouldRetry: () => true,
        },
      };

      const graphQLClient = new GraphQLRequestClient(endpoint, clientConfig);

      expect(graphQLClient['retries']).to.equal(clientConfig.retries);
      expect(graphQLClient['retryStrategy']).to.deep.equal(clientConfig.retryStrategy);
    });

    it('should fallback to use default values when clientConfig is undefined', () => {
      const clientConfig = { retries: undefined, retryStrategy: undefined };
      const graphQLClient = new GraphQLRequestClient(endpoint, clientConfig);

      expect(graphQLClient['retries']).to.equal(3);
      expect(graphQLClient['retryStrategy']).to.deep.equal(
        new DefaultRetryStrategy({ statusCodes: [429, 502, 503, 504, 520, 521, 522, 523, 524] })
      );
    });

    it('should be enabled by default and use default value of 3 when retries are not configured', async function() {
      this.timeout(8000);
      nock('http://jssnextweb')
        .post('/graphql')
        .reply(429)
        .post('/graphql')
        .reply(429)
        .post('/graphql')
        .reply(429);

      const graphQLClient = new GraphQLRequestClient(endpoint, { retries: undefined });
      spy.on(graphQLClient['client'], 'request');
      await graphQLClient.request('test').catch((error) => {
        expect(error).to.not.be.undefined;
        expect(graphQLClient['client'].request).to.be.called.exactly(4);
        spy.restore(graphQLClient);
      });
    });

    it('should be disabled when 0 retries are configured', async function() {
      this.timeout(8000);
      nock('http://jssnextweb')
        .post('/graphql')
        .reply(429)
        .post('/graphql')
        .reply(429)
        .post('/graphql')
        .reply(429);

      const graphQLClient = new GraphQLRequestClient(endpoint, { retries: 0 });
      spy.on(graphQLClient['client'], 'request');
      await graphQLClient.request('test').catch((error) => {
        expect(error).to.not.be.undefined;
        expect(graphQLClient['client'].request).to.be.called.exactly(1);
        spy.restore(graphQLClient);
      });
    });

    it('should use retry and throw error when retries specified', async function() {
      this.timeout(8000);
      nock('http://jssnextweb')
        .post('/graphql')
        .reply(429)
        .post('/graphql')
        .reply(429)
        .post('/graphql')
        .reply(429);

      const graphQLClient = new GraphQLRequestClient(endpoint, {
        retries: 2,
      });
      spy.on(graphQLClient['client'], 'request');
      await graphQLClient.request('test').catch((error) => {
        expect(error).to.not.be.undefined;
        expect(graphQLClient['client'].request).to.be.called.exactly(3);
        spy.restore(graphQLClient);
      });
    });

    it('should use retry and resolve if one of the requests resolves', async function() {
      this.timeout(8000);
      nock('http://jssnextweb')
        .post('/graphql')
        .reply(429)
        .post('/graphql')
        .reply(429)
        .post('/graphql')
        .reply(200, {
          data: {
            result: 'Hello world...',
          },
        });
      const graphQLClient = new GraphQLRequestClient(endpoint, { retries: 2 });
      spy.on(graphQLClient['client'], 'request');

      const data = await graphQLClient.request('test');

      expect(data).to.not.be.null;
      expect(graphQLClient['client'].request).to.be.called.exactly(3);
      spy.restore(graphQLClient);
    });

    it('should use [retry-after] header value when response is 429', async function() {
      this.timeout(7000);
      nock('http://jssnextweb')
        .post('/graphql')
        .reply(429, {}, { 'Retry-After': '2' });
      const graphQLClient = new GraphQLRequestClient(endpoint, { retries: 1 });
      spy.on(graphQLClient, 'debug');

      await graphQLClient.request('test').catch(() => {
        expect(graphQLClient['debug']).to.have.been.called.with(
          'Error: %d. Retrying in %dms (attempt %d).',
          429,
          2000,
          1
        );
        spy.restore(graphQLClient);
      });
    });

    it('should use default delay time when [retry-after] header comes out empty in response of 429', async function() {
      this.timeout(7000);
      nock('http://jssnextweb')
        .post('/graphql')
        .reply(429, {}, { 'Retry-After': '' });
      const graphQLClient = new GraphQLRequestClient(endpoint, { retries: 1 });
      spy.on(graphQLClient, 'debug');

      await graphQLClient.request('test').catch(() => {
        expect(graphQLClient['debug']).to.have.been.called.with(
          'Error: %d. Retrying in %dms (attempt %d).',
          429,
          1000,
          1
        );
        spy.restore(graphQLClient);
      });
    });

    it('should throw error when request is aborted value after retry', async function() {
      this.timeout(3000);
      nock('http://jssnextweb')
        .post('/graphql')
        .reply(429)
        .post('/graphql')
        .delay(100)
        .reply(200, {
          data: {
            result: 'Hello world...',
          },
        });

      const graphQLClient = new GraphQLRequestClient(endpoint, { retries: 1, timeout: 50 });
      spy.on(graphQLClient['client'], 'request');
      try {
        await graphQLClient.request('test');
        // If the request does not throw an error, fail the test
        expect.fail('Expected request to throw an error');
      } catch (error) {
        expect(graphQLClient['client'].request).to.be.called.exactly(2);
        expect(error.name).to.equal('AbortError');
      } finally {
        spy.restore(graphQLClient);
      }
    });

    describe('Retrayable status codes', () => {
      const retryableStatusCodeThrowError = async (statusCode: number) => {
        nock('http://jssnextweb')
          .post('/graphql')
          .reply(statusCode)
          .post('/graphql')
          .reply(statusCode)
          .post('/graphql')
          .reply(statusCode);

        const graphQLClient = new GraphQLRequestClient(endpoint, {
          retries: 2,
        });

        spy.on(graphQLClient['client'], 'request');

        try {
          await graphQLClient.request('test');
        } catch (error) {
          expect(error).to.not.be.undefined;
          expect(graphQLClient['client'].request).to.have.been.called.exactly(3);
          spy.restore(graphQLClient);
        }
      };

      // Test cases for each retryable status code
      for (const statusCode of [429, 502, 503, 504, 520, 521, 522, 523, 524]) {
        it(`should retry and throw error for ${statusCode} when retries specified`, async function() {
          this.timeout(8000);
          await retryableStatusCodeThrowError(statusCode);
        });
      }

      const retryableStatusCodeResolve = async (statusCode: number) => {
        nock('http://jssnextweb')
          .post('/graphql')
          .reply(statusCode)
          .post('/graphql')
          .reply(statusCode)
          .post('/graphql')
          .reply(200, {
            data: {
              result: 'Hello world...',
            },
          });

        const graphQLClient = new GraphQLRequestClient(endpoint, {
          retries: 3,
        });

        spy.on(graphQLClient['client'], 'request');

        const data = await graphQLClient.request('test');

        try {
          await graphQLClient.request('test');
          expect(data).to.not.be.null;
        } catch (error) {
          expect(graphQLClient['client'].request).to.have.been.called.exactly(4);
          spy.restore(graphQLClient);
        }
      };

      // Test cases for each retryable status code
      for (const statusCode of [429, 502, 503, 504, 520, 521, 522, 523, 524]) {
        it(`should retry and resolve for ${statusCode} if one of the request resolves`, async function() {
          this.timeout(16000);
          await retryableStatusCodeResolve(statusCode);
        });
      }

      const retryableErrorCodeThrowError = async (errorCode: string) => {
        nock('http://jssnextweb')
          .post('/graphql')
          .replyWithError({ code: errorCode })
          .post('/graphql')
          .replyWithError({ code: errorCode })
          .post('/graphql')
          .replyWithError({ code: errorCode });

        const graphQLClient = new GraphQLRequestClient(endpoint, {
          retries: 2,
        });

        spy.on(graphQLClient['client'], 'request');

        try {
          await graphQLClient.request('test');
        } catch (error) {
          expect(error).to.not.be.undefined;
          expect(graphQLClient['client'].request).to.have.been.called.exactly(3);
          spy.restore(graphQLClient);
        }
      };

      // Test cases for each retryable error codes
      for (const errorCode of ['ECONNRESET', 'ETIMEDOUT', 'EPROTO']) {
        it(`should retry and throw error for ${errorCode} when retries specified`, async function() {
          this.timeout(8000);
          await retryableErrorCodeThrowError(errorCode);
        });
      }

      const retryableErrorCodeResolve = async (errorCode: string) => {
        nock('http://jssnextweb')
          .post('/graphql')
          .replyWithError({ code: errorCode })
          .post('/graphql')
          .replyWithError({ code: errorCode })
          .post('/graphql')
          .reply(200, {
            data: {
              result: 'Hello world...',
            },
          });

        const graphQLClient = new GraphQLRequestClient(endpoint, {
          retries: 3,
        });

        spy.on(graphQLClient['client'], 'request');

        const data = await graphQLClient.request('test');

        try {
          await graphQLClient.request('test');
          expect(data).to.not.be.null;
        } catch (error) {
          expect(graphQLClient['client'].request).to.have.been.called.exactly(4);
          spy.restore(graphQLClient);
        }
      };

      // Test cases for each retryable status code
      for (const errorCode of ['ECONNRESET', 'ETIMEDOUT', 'EPROTO']) {
        it(`should retry and resolve for ${errorCode} if one of the request resolves`, async function() {
          this.timeout(16000);
          await retryableErrorCodeResolve(errorCode);
        });
      }

      it('should retry based on custom retryStrategy', async function() {
        this.timeout(8000);

        nock('http://jssnextweb')
          .post('/graphql')
          .reply(502, {
            data: {
              result: 'Hello world...',
            },
          });

        const customRetryStrategy = {
          shouldRetry: (_: any, attempt: number) => attempt <= 3,
          getDelay: () => 1000,
        };

        const graphQLClient = new GraphQLRequestClient(endpoint, {
          retries: 4,
          retryStrategy: customRetryStrategy,
        });

        spy.on(graphQLClient['client'], 'request');

        try {
          await graphQLClient.request('test');
        } catch (error) {
          expect(error).to.not.be.undefined;
          expect(graphQLClient['client'].request).to.be.called.exactly(4);
          spy.restore(graphQLClient);
        }
      });

      it('should delay before retrying based on exponential backoff', async function() {
        this.timeout(32000);

        nock('http://jssnextweb')
          .post('/graphql')
          .reply(429)
          .post('/graphql')
          .reply(429)
          .post('/graphql')
          .reply(429)
          .post('/graphql')
          .reply(429);

        const graphQLClient = new GraphQLRequestClient(endpoint, {
          retries: 4,
        });

        spy.on(graphQLClient['client'], 'request');

        try {
          await graphQLClient.request('test');

          expect(graphQLClient['client'].request).to.have.been.called.exactly(1);

          const clock = sinon.useFakeTimers();
          clock.tick(1000);

          await graphQLClient.request('test');
          expect(graphQLClient['client'].request).to.have.been.called.exactly(2);

          clock.tick(2000);

          await graphQLClient.request('test');
          expect(graphQLClient['client'].request).to.have.been.called.exactly(3);

          clock.tick(4000);

          await graphQLClient.request('test');
          expect(graphQLClient['client'].request).to.have.been.called.exactly(4);

          clock.restore();
        } catch (error) {
          console.log('error');
        }
      });
    });

    describe('DefaultRetryStrategy', () => {
      const mockClientError = new ClientError(
        {
          data: undefined,
          errors: [{ message: 'GaphqlError' }],
          extensions: undefined,
          status: 429,
        },
        {
          query: 'query',
        }
      );
      it('should return true from shouldRetry and use default values from constructor', () => {
        const retryStrategy = new DefaultRetryStrategy();

        const shouldRetry = retryStrategy.shouldRetry(mockClientError, 1, 3);
        expect(shouldRetry).to.equal(true);
      });

      it('should return false when attempt exceeds retries', () => {
        const retryStrategy = new DefaultRetryStrategy({ statusCodes: [503] });
        mockClientError.response.status = 503;

        const shouldRetry = retryStrategy.shouldRetry(mockClientError, 2, 1);
        expect(shouldRetry).to.equal(false);
      });

      it('should return false when retries is 0', () => {
        const retryStrategy = new DefaultRetryStrategy({ statusCodes: [503] });
        mockClientError.response.status = 503;

        const shouldRetry = retryStrategy.shouldRetry(mockClientError, 1, 0);
        expect(shouldRetry).to.equal(false);
      });

      it('should return delay using exponential backoff when Retry-After header is not present', () => {
        const retryStrategy = new DefaultRetryStrategy();
        const delay = retryStrategy.getDelay(mockClientError, 3);
        const expectedDelay = Math.pow(retryStrategy['factor'], 3 - 1) * 1000;
        expect(delay).to.equal(expectedDelay);
      });

      it('should use custom exponential factor', () => {
        const customFactor = 3;
        const retryStrategy = new DefaultRetryStrategy({
          statusCodes: [429],
          factor: customFactor,
        });

        const delay = retryStrategy.getDelay(mockClientError, 3);
        const expectedDelay = Math.pow(customFactor, 3 - 1) * 1000;
        expect(delay).to.equal(expectedDelay);
      });
    });
  });
});
