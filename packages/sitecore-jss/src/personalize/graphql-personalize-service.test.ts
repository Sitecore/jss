import { expect, use } from 'chai';
import spies from 'chai-spies';
import nock from 'nock';
import { GraphQLPersonalizeService } from './graphql-personalize-service';

use(spies);

describe('GraphQLPersonalizeService', () => {
  const endpoint = 'http://sctest/graphql';
  const siteName = 'sitecore';
  const apiKey = 'api-key';
  const contentId = 'content-id';
  const segments = ['segment-1', 'segment-2'];

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

  afterEach(() => {
    nock.cleanAll();
  });

  it('should return personalize info for a route', async () => {
    nock('http://sctest', {
      reqheaders: {
        sc_apikey: apiKey,
      },
    })
      .post('/graphql')
      .reply(200, {
        data: personalizeQueryResult,
      });

    const service = new GraphQLPersonalizeService(config);
    const personalizeData = await service.getPersonalizeInfo(
      variables.itemPath,
      variables.language
    );

    expect(personalizeData).to.deep.equal({
      contentId: 'content-id_en_1',
      segments: ['segment-1', 'segment-2'],
    });
  });
  it('should return undefined if itemPath / language not found', async () => {
    nock('http://sctest', {
      reqheaders: {
        sc_apikey: apiKey,
      },
    })
      .post('/graphql')
      .reply(200, {
        data: {
          layout: {},
        },
      });

    const service = new GraphQLPersonalizeService(config);
    const personalizeData = await service.getPersonalizeInfo('/sitecore/content/home', '');

    expect(personalizeData).to.eql(undefined);
  });

  it('shold return an error', async () => {
    nock('http://sctest', {
      reqheaders: {
        sc_apikey: apiKey,
      },
    })
      .post('/graphql')
      .reply(401, {
        error: 'error',
      });

    const service = new GraphQLPersonalizeService(config);

    await service.getPersonalizeInfo(variables.itemPath, variables.language).catch((error) => {
      expect(error.response.status).to.equal(401);
      expect(error.response.error).to.equal('error');
    });
  });
});
