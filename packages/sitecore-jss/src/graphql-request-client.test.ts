/* eslint-disable no-unused-expressions */
/* eslint-disable dot-notation */
import { expect, use, spy } from 'chai';
import sinon from 'sinon';
import spies from 'chai-spies';
import nock from 'nock';
import { GraphQLRequestClient } from './graphql-request-client';
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

  // it('should use retry and resolve if one of the requests resolves', async function() {
  //   this.timeout(8000);
  //   nock('http://jssnextweb')
  //     .post('/graphql')
  //     .reply(429)
  //     .post('/graphql')
  //     .reply(429)
  //     .post('/graphql')
  //     .reply(200, {
  //       data: {
  //         result: 'Hello world...',
  //       },
  //     });
  //   const graphQLClient = new GraphQLRequestClient(endpoint, { retries: 2 });
  //   spy.on(graphQLClient['client'], 'request');

  //   const data = await graphQLClient.request('test');

  //   expect(data).to.not.be.null;
  //   expect(graphQLClient['client'].request).to.be.called.exactly(3);
  //   spy.restore(graphQLClient);
  // });

  // it.only('should use [retry-after] header value when response is 429', async function() {
  //   this.timeout(6000);
  //   nock('http://jssnextweb')
  //     .post('/graphql')
  //     .reply(429, {}, { 'Retry-After': '2' });
  //   const graphQLClient = new GraphQLRequestClient(endpoint, { retries: 1 });
  //   spy.on(graphQLClient, 'debug');

  //   await graphQLClient.request('test').catch(() => {
  //     expect(graphQLClient['debug']).to.have.been.called.with(
  //       'Error: %d. Rate limit reached for GraphQL endpoint. Retrying in %ds. This was your %d attempt.',
  //       429,
  //       2,
  //       1
  //     );
  //     spy.restore(graphQLClient);
  //   });
  // });

  // it.only('should throw error when request is aborted with default timeout value after retry', async () => {
  //   nock('http://jssnextweb')
  //     .post('/graphql')
  //     .reply(429)
  //     .post('/graphql')
  //     .delay(100)
  //     .reply(200, {
  //       data: {
  //         result: 'Hello world...',
  //       },
  //     });

  //   const graphQLClient = new GraphQLRequestClient(endpoint, { retries: 2 });
  //   spy.on(graphQLClient['client'], 'request');
  //   await graphQLClient.request('test').catch((error) => {
  //     expect(graphQLClient['client'].request).to.be.called.exactly(3);
  //     expect(error.name).to.equal('AbortError');
  //     spy.restore(graphQLClient);
  //   });
  // });

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
    for (const statusCode of [502, 503, 504, 520, 521, 522, 523, 524]) {
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
    for (const statusCode of [429]) {
      it(`should retry and resolve for ${statusCode} if one of the request resolves`, async function() {
        this.timeout(16000);
        await retryableStatusCodeResolve(statusCode);
      });
    }

    it('should use custom retryStrategy and retry accordingly', async function() {
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
        retries: 3,
        retryStrategy: customRetryStrategy,
      });

      // Spy on the client's request method
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
});
