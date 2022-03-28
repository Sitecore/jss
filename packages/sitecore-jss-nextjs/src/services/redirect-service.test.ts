import { expect } from 'chai';
import nock from 'nock';
import { GraphQLRedirectService, RedirectsQueryResult, siteNameError } from './redirect-service';

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
        },
      ],
    },
  },
} as RedirectsQueryResult;

describe('GraphQLRedirectService', () => {
  const endpoint = 'http://site';
  const apiKey = 'some-api-key';
  const siteName = 'site-name';

  afterEach(() => {
    nock.cleanAll();
  });

  const mockRobotsRequest = (siteName?: string) => {
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

  describe('Fetch robots.txt', () => {
    it('should get error if redirects has empty sitename', async () => {
      mockRobotsRequest();

      const service = new GraphQLRedirectService({ endpoint, apiKey, siteName: '' });
      await service.fetchRedirects().catch((error: Error) => {
        expect(error.message).to.equal(siteNameError);
      });

      return expect(nock.isDone()).to.be.false;
    });

    it('should get redirects', async () => {
      mockRobotsRequest(siteName);

      const service = new GraphQLRedirectService({ endpoint, apiKey, siteName });
      const result = await service.fetchRedirects();

      expect(result).to.deep.equal(redirectsQueryResult.site.siteInfo.redirects);

      return expect(nock.isDone()).to.be.true;
    });

    it('should get no redirects', async () => {
      mockRobotsRequest();

      const service = new GraphQLRedirectService({ endpoint, apiKey, siteName });
      const result = await service.fetchRedirects();

      expect(result).to.deep.equal(redirectsQueryResultNull.site.siteInfo.redirects);

      return expect(nock.isDone()).to.be.true;
    });
  });
});
