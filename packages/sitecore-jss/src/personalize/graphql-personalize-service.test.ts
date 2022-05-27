import { expect, use } from 'chai';
import spies from 'chai-spies';
import nock from 'nock';
import { GraphQLPersonalizeService } from './graphql-personalize-service';

use(spies);

describe('GraphQLPersonalizeService', () => {
  const endpoint = 'http://sctest/graphql';
  const siteName = 'sitecore';
  const apiKey = 'api-key';
  const id = 'item-id';
  const version = '1';
  const segments = ['segment-1', 'segment-2'];

  const config = {
    endpoint,
    siteName,
    apiKey,
  };
  const personalizeQueryResult = {
    layout: {
      item: {
        id,
        version,
        personalization: {
          variantIds: segments,
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
    const personalizeData = await service.getPersonalizeInfo('/sitecore/content/home', 'en');

    expect(personalizeData).to.deep.equal({
      contentId: `${id}_en_${version}`.toLowerCase(),
      segments,
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

    await service.getPersonalizeInfo('/sitecore/content/home', 'en').catch((error) => {
      expect(error.response.status).to.equal(401);
      expect(error.response.error).to.equal('error');
    });
  });
});
