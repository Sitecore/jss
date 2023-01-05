/* eslint-disable dot-notation */
import { expect, use, spy } from 'chai';
import spies from 'chai-spies';
import nock from 'nock';
import { GraphQLRedirectsService, RedirectsQueryResult } from './graphql-redirects-service';
import { siteNameError } from '../constants';

use(spies);

const redirectsQueryResultNull = {
  site: {
    siteInfo: {
      redirects: [],
    },
  },
} as RedirectsQueryResult;

const redirectsQueryResult = {
  site: {
    siteInfo: {
      redirects: [
        {
          pattern: '/notfound',
          target: '/404',
          redirectType: 'REDIRECT_301',
          isQueryStringPreserved: true,
          locale: 'en',
        },
      ],
    },
  },
} as RedirectsQueryResult;

describe('GraphQLRedirectsService', () => {
  const endpoint = 'http://site';
  const apiKey = 'some-api-key';
  const siteName = 'site-name';
  const config = {
    endpoint,
    apiKey,
    siteName,
  };

  afterEach(() => {
    nock.cleanAll();
  });

  const mockRedirectsRequest = (siteName?: string) => {
    nock(endpoint)
      .post('/')
      .reply(
        200,
        siteName
          ? {
              data: redirectsQueryResult,
            }
          : {
              data: redirectsQueryResultNull,
            }
      );
  };

  describe('fetch redirects from site by graphql', () => {
    it('should get error if redirects has empty siteName', async () => {
      mockRedirectsRequest();

      const service = new GraphQLRedirectsService({ endpoint, apiKey, siteName: '' });
      await service.fetchRedirects().catch((error: Error) => {
        expect(error.message).to.equal(siteNameError);
      });

      return expect(nock.isDone()).to.be.false;
    });

    it('should get redirects', async () => {
      mockRedirectsRequest(siteName);

      const service = new GraphQLRedirectsService({ endpoint, apiKey, siteName });
      const result = await service.fetchRedirects();

      expect(result).to.deep.equal(redirectsQueryResult.site?.siteInfo?.redirects);

      return expect(nock.isDone()).to.be.true;
    });

    it('should get no redirects', async () => {
      mockRedirectsRequest();

      const service = new GraphQLRedirectsService({ endpoint, apiKey, siteName });
      const result = await service.fetchRedirects();

      expect(result).to.deep.equal(redirectsQueryResultNull.site?.siteInfo?.redirects);

      return expect(nock.isDone()).to.be.true;
    });

    it('should cache fetch response', async () => {
      mockRedirectsRequest(siteName);
      const service = new GraphQLRedirectsService(config);
      const redirectsResponse = await service.fetchRedirects();

      expect(redirectsResponse).to.deep.equal(redirectsQueryResult.site?.siteInfo?.redirects);

      nock.cleanAll();

      nock(endpoint)
        .post('/')
        .reply(200, {
          data: {
            site: {},
          },
        });

      const cachedResponse = await service.fetchRedirects();

      expect(cachedResponse).to.deep.equal(redirectsResponse);
    });

    it('should be possible to disable cache', async () => {
      mockRedirectsRequest(siteName);
      const service = new GraphQLRedirectsService({ ...config, cacheEnabled: false });
      const redirectsResponse = await service.fetchRedirects();

      expect(redirectsResponse).to.deep.equal(redirectsQueryResult.site?.siteInfo?.redirects);

      nock.cleanAll();

      nock(endpoint)
        .post('/')
        .reply(200, {
          data: {
            site: {},
          },
        });

      const cachedResponse = await service.fetchRedirects();

      expect(cachedResponse).to.not.deep.equal(redirectsResponse);
    });

    it('should use dynamic site name', async () => {
      const dynamicSiteName = 'foo';
      mockRedirectsRequest(dynamicSiteName);
      const service = new GraphQLRedirectsService(config);

      const getCacheValueSpy = spy.on(service['cache'], 'getCacheValue');
      const setCacheValueSpy = spy.on(service['cache'], 'setCacheValue');

      const redirectsResponse = await service.fetchRedirects(dynamicSiteName);

      expect(getCacheValueSpy).to.have.been.called.with('redirects-foo');
      expect(setCacheValueSpy).to.have.been.called.with('redirects-foo', redirectsQueryResult);

      expect(redirectsResponse).to.deep.equal(redirectsQueryResult.site?.siteInfo?.redirects);

      nock.cleanAll();

      nock(endpoint)
        .post('/')
        .reply(200, {
          data: {
            site: {},
          },
        });

      const cachedResponse = await service.fetchRedirects(dynamicSiteName);

      expect(cachedResponse).to.deep.equal(redirectsResponse);

      spy.restore(service['cache']);
    });
  });
});
