import { expect, use } from 'chai';
import spies from 'chai-spies';
import nock from 'nock';
import { GraphQLPersonalizeService } from './graphql-personalize-service';
import debugApi from 'debug';

use(spies);

describe('GraphQLPersonalizeService', () => {
  const endpoint = 'http://jssnextweb/graphql';
  const siteName = 'sitecore';
  const apiKey = 'api-key';
  const contentId = 'content-id';
  const segments = ['segment-1', 'segment-2'];
  const query = /* GraphQL */ `
    query($siteName: String!, $language: String!, $itemPath: String!) {
      layout(site: $siteName, routePath: $itemPath, language: $language) {
        item {
          id
          version
          personalization {
            segmentIds
          }
        }
      }
    }
  `;
  const variables = {
    siteName,
    language: 'en',
    itemPath: '/sitecore/content/home',
  };
  const config = {
    endpoint,
    siteName,
    apiKey,
  };
  const personalizeQueryResult = {
    layout: {
      item: {
        id: contentId,
        version: '1',
        personalization: {
          segmentIds: segments,
        },
      },
    },
  };

  beforeEach(() => {
    debugApi.enable('*');
  });

  afterEach(() => {
    debugApi.disable();
    nock.cleanAll();
  });

  it('should fetch personalize data', async () => {
    nock('http://jssnextweb', {
      reqheaders: {
        sc_apikey: apiKey,
      },
    })
      .post('/graphql', (body) => {
        return body.query.replace(/\n|\s/g, '') === query;
      })
      .reply(200, {
        data: personalizeQueryResult,
      });

    const service = new GraphQLPersonalizeService(config);
    const personalizeData = await service.getPersonalizeInfo(
      variables.itemPath,
      variables.language
    );

    expect(personalizeData).to.deep.equal(personalizeQueryResult);
  });

  it('should return personalize info for a route', async () => {
    nock('http://jssnextweb', {
      reqheaders: {
        sc_apikey: apiKey,
      },
    })
      .post('/graphql', (body) => {
        return body.query.replace(/\n|\s/g, '') === query;
      })
      .reply(200, {
        data: personalizeQueryResult,
      });

    const service = new GraphQLPersonalizeService(config);
    const personalizeData = await service.getPersonalizeInfo(
      variables.itemPath,
      variables.language
    );

    expect(personalizeData).to.deep.equal({
      contentId: 'content-id',
      segments: ['segment-1', 'segment-2'],
    });
  });

  it('should return undefined if itemPath / language not found', async () => {
    nock('http://jssnextweb', {
      reqheaders: {
        sc_apikey: apiKey,
      },
    })
      .post('/graphql')
      .reply(200, {
        data: personalizeQueryResult,
      });

    const service = new GraphQLPersonalizeService(config);
    const personalizeData = await service.getPersonalizeInfo('not-found', 'not-found');

    expect(personalizeData).to.eql(undefined);
  });

  it('shold return an error', async () => {
    nock('http://jssnextweb', {
      reqheaders: {
        sc_apikey: apiKey,
      },
    })
      .post('/graphql')
      .reply(401, {
        error: 'whoops',
      });

    const service = new GraphQLPersonalizeService(config);

    await service.getPersonalizeInfo(variables.itemPath, variables.language).catch((error) => {
      expect(error.response.status).to.equal(401);
      expect(error.response.error).to.equal('whoops');
    });
  });
});
