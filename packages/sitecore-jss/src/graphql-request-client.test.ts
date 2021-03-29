import { expect } from 'chai';
import nock from 'nock';
import { GraphQLRequestClient } from './graphql-request-client';

describe('GraphQLRequestClient', () => {
  const endpoint = 'http://jssnextweb/graphql';

  afterEach(nock.cleanAll);

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

    const graphQLClient = new GraphQLRequestClient(endpoint, apiKey);
    await graphQLClient.request('test');
  });
});
