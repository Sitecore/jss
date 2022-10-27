/* eslint-disable dot-notation */
import { expect, use } from 'chai';
import spies from 'chai-spies';
import nock from 'nock';
import { GraphQLPersonalizeService } from './graphql-personalize-service';

use(spies);

describe('GraphQLPersonalizeService', () => {
  const endpoint = 'http://sctest/graphql';
  const siteName = 'sitecore';
  const apiKey = 'api-key';
  const id = 'itemid';
  const version = '1';
  const variantIds = ['variant-1', 'variant-2'];
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
          variantIds,
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
      contentId: `embedded_${id}_en`.toLowerCase(),
      variantIds,
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

  it('should throw an error', async () => {
    nock('http://sctest', {
      reqheaders: {
        sc_apikey: apiKey,
      },
    })
      .post('/graphql')
      .replyWithError('error_test');
    const service = new GraphQLPersonalizeService(config);

    await service.getPersonalizeInfo('/sitecore/content/home', 'en').catch((error) => {
      expect(error.message).to.contain('error_test');
    });
  });

  it('should return fallback value when timeout is exceeded using default timeout', async () => {
    nock('http://sctest', {
      reqheaders: {
        sc_apikey: apiKey,
      },
    })
      .post('/graphql')
      .delay(300)
      .reply(408);

    const service = new GraphQLPersonalizeService(config);

    const result = await service.getPersonalizeInfo('/sitecore/content/home', 'en');
    expect(result).to.equal(undefined);
  });
  it('should return fallback value when timeout is exceeded using provided timeout', async () => {
    nock('http://sctest', {
      reqheaders: {
        sc_apikey: apiKey,
      },
    })
      .post('/graphql')
      .delay(75)
      .reply(408);

    const service = new GraphQLPersonalizeService({ ...config, timeout: 50 });

    const result = await service.getPersonalizeInfo('/sitecore/content/home', 'en');
    expect(result).to.equal(undefined);
  });
  it('should return fallback value when api returns timeout error', async () => {
    nock('http://sctest', {
      reqheaders: {
        sc_apikey: apiKey,
      },
    })
      .post('/graphql')
      .reply(408);

    const service = new GraphQLPersonalizeService({ ...config, timeout: 50 });

    const result = await service.getPersonalizeInfo('/sitecore/content/home', 'en');

    expect(result).to.equal(undefined);
  });

  it('should cache service response', async () => {
    nock('http://sctest', {
      reqheaders: {
        sc_apikey: apiKey,
      },
    })
      .post('/graphql')
      .reply(200, {
        data: personalizeQueryResult,
      });

    const itemPath = '/sitecore/content/home';
    const lang = 'en';

    const service = new GraphQLPersonalizeService(config);
    const firstResult = await service.getPersonalizeInfo(itemPath, lang);

    expect(firstResult).to.deep.equal({
      contentId: `embedded_${id}_en`.toLowerCase(),
      variantIds,
    });

    nock.cleanAll();

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

    const secondResult = await service.getPersonalizeInfo(itemPath, lang);

    expect(secondResult).to.deep.equal(firstResult);
  });
});
