import { expect } from 'chai';
import nock from 'nock';
import {
  GraphQLRedirectsService,
  RedirectsQueryResult,
  siteNameError,
} from './graphql-redirects-service';

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

describe('GraphQLRedirectsService', () => {
  const endpoint = 'http://site';
  const apiKey = 'some-api-key';
  const siteName = 'site-name';

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

      expect(result).to.deep.equal(redirectsQueryResult.site.siteInfo.redirects);

      return expect(nock.isDone()).to.be.true;
    });

    it('should get no redirects', async () => {
      mockRedirectsRequest();

      const service = new GraphQLRedirectsService({ endpoint, apiKey, siteName });
      const result = await service.fetchRedirects();

      expect(result).to.deep.equal(redirectsQueryResultNull.site.siteInfo.redirects);

      return expect(nock.isDone()).to.be.true;
    });
  });
});
