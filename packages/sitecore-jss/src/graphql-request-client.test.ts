import { expect } from 'chai';
import nock from 'nock';
import { GraphQLRequestClient } from './graphql-request-client';

describe('GraphQLRequestClient', () => {
  const ENDPOINT = 'http://jssnextweb/graphql';

  const graphQLClient = new GraphQLRequestClient(ENDPOINT);

  const mockGraphQLRequest = () => {
    nock('http://jssnextweb')
      .post('/graphql')
      .reply(200, {
        data: {
          result: 'Hello world...',
        },
      });
  };

  beforeEach(() => {
    nock.cleanAll();
  });

  it('should execute graphql request', async () => {
    mockGraphQLRequest();

    const data = await graphQLClient.request('test');

    expect(data).to.deep.equal({ result: 'Hello world...' });
  });
});
