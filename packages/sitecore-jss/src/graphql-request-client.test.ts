/* eslint-disable no-unused-expressions */
import { expect, use, spy } from 'chai';
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
});
