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

  const mockNonEmptyResponse = () => {
    nock('http://sctest', {
      reqheaders: {
        sc_apikey: apiKey,
      },
    })
      .post('/graphql')
      .reply(200, {
        data: personalizeQueryResult,
      });
  };

  const mockEmptyResponse = () => {
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
  };

  afterEach(() => {
    nock.cleanAll();
  });

  it('should return personalize info for a route', async () => {
    mockNonEmptyResponse();

    const service = new GraphQLPersonalizeService(config);
    const personalizeData = await service.getPersonalizeInfo(
      '/sitecore/content/home',
      'en',
      siteName
    );

    expect(personalizeData).to.deep.equal({
      contentId: `embedded_${id}_en`.toLowerCase(),
      variantIds,
    });
  });

  it('should return undefined if itemPath / language not found', async () => {
    mockEmptyResponse();

    const service = new GraphQLPersonalizeService(config);
    const personalizeData = await service.getPersonalizeInfo(
      '/sitecore/content/home',
      '',
      siteName
    );

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

    await service.getPersonalizeInfo('/sitecore/content/home', 'en', siteName).catch((error) => {
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

    const result = await service.getPersonalizeInfo('/sitecore/content/home', 'en', siteName);
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

    const result = await service.getPersonalizeInfo('/sitecore/content/home', 'en', siteName);
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

    const result = await service.getPersonalizeInfo('/sitecore/content/home', 'en', siteName);

    expect(result).to.equal(undefined);
  });

  it('should cache service response by default', async () => {
    mockNonEmptyResponse();

    const itemPath = '/sitecore/content/home';
    const lang = 'en';

    const service = new GraphQLPersonalizeService(config);
    const firstResult = await service.getPersonalizeInfo(itemPath, lang, siteName);

    expect(firstResult).to.deep.equal({
      contentId: `embedded_${id}_en`.toLowerCase(),
      variantIds,
    });

    mockEmptyResponse();

    const secondResult = await service.getPersonalizeInfo(itemPath, lang, siteName);

    expect(secondResult).to.deep.equal(firstResult);
  });

  it('should be possible to disable cache', async () => {
    mockNonEmptyResponse();

    const itemPath = '/sitecore/content/home';
    const lang = 'en';

    const service = new GraphQLPersonalizeService({
      ...config,
      cacheEnabled: false,
    });
    const firstResult = await service.getPersonalizeInfo(itemPath, lang, siteName);

    expect(firstResult).to.deep.equal({
      contentId: `embedded_${id}_en`.toLowerCase(),
      variantIds,
    });

    mockEmptyResponse();

    const secondResult = await service.getPersonalizeInfo(itemPath, lang, siteName);

    expect(secondResult).to.not.deep.equal(firstResult);
  });

  it('cache timeout should be used', async () => {
    mockNonEmptyResponse();

    const itemPath = '/sitecore/content/home';
    const lang = 'en';

    const service = new GraphQLPersonalizeService({
      ...config,
      cacheTimeout: 0.2,
    });
    const firstResult = await service.getPersonalizeInfo(itemPath, lang, siteName);

    mockEmptyResponse();

    const cacheNonUpdate = new Promise((resolve) => {
      setTimeout(
        () =>
          service.getPersonalizeInfo(itemPath, lang, siteName).then((newResult) => {
            expect(newResult).to.deep.equal(firstResult);
            resolve(undefined);
          }),
        100
      );
    });

    const cacheUpdate = new Promise((resolve) => {
      setTimeout(
        () =>
          service.getPersonalizeInfo(itemPath, lang, siteName).then((newResult) => {
            expect(newResult).to.deep.equal(undefined);
            resolve(undefined);
          }),
        250
      );
    });
    await cacheNonUpdate;

    await cacheUpdate;
  });
});
