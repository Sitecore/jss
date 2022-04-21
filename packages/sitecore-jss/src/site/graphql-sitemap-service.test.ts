import { expect } from 'chai';
import nock from 'nock';
import { GraphQLSitemapService } from './graphql-sitemap-service';
import { siteNameError } from '../constants';

const sitemapQueryResultNull = {
  site: {
    siteInfo: null,
  },
};

describe('GraphQLSitemapService', () => {
  const endpoint = 'http://site';
  const apiKey = 'some-api-key';
  const siteName = 'site-name';
  const mockSitemap = ['sitemap.xml'];
  const mockSitemaps = ['sitemap-1.xml', 'sitemap-2.xml', 'sitemap-3.xml'];

  afterEach(() => {
    nock.cleanAll();
  });

  const mockSitemapRequest = (sitemapUrls?: string[]) => {
    nock(endpoint)
      .post('/')
      .reply(
        200,
        siteName
          ? {
              data: {
                site: {
                  siteInfo: {
                    sitemap: sitemapUrls,
                  },
                },
              },
            }
          : {
              data: sitemapQueryResultNull,
            }
      );
  };

  describe('Fetch sitemap', () => {
    it('should get error if sitemap has empty sitename', async () => {
      mockSitemapRequest();

      const service = new GraphQLSitemapService({ endpoint, apiKey, siteName: '' });
      await service.fetchSitemaps().catch((error: Error) => {
        expect(error.message).to.equal(siteNameError);
      });

      return expect(nock.isDone()).to.be.false;
    });

    it('should fetch sitemap', async () => {
      mockSitemapRequest(mockSitemap);

      const service = new GraphQLSitemapService({ endpoint, apiKey, siteName });
      const sitemaps = await service.fetchSitemaps();

      expect(sitemaps.length).to.equal(1);
      expect(sitemaps).to.deep.equal(mockSitemap);

      return expect(nock.isDone()).to.be.true;
    });

    it('should fetch sitemaps', async () => {
      mockSitemapRequest(mockSitemaps);

      const service = new GraphQLSitemapService({ endpoint, apiKey, siteName });
      const sitemaps = await service.fetchSitemaps();

      expect(sitemaps.length).to.equal(3);
      expect(sitemaps).to.deep.equal(mockSitemaps);

      return expect(nock.isDone()).to.be.true;
    });

    it('should get exists sitemap', async () => {
      const mockIdSitemap = '-3';
      mockSitemapRequest(mockSitemaps);

      const service = new GraphQLSitemapService({ endpoint, apiKey, siteName });
      const sitemap = await service.getSitemap(mockIdSitemap);

      expect(sitemap).to.deep.equal(mockSitemaps[2]);

      return expect(nock.isDone()).to.be.true;
    });

    it('should get null if sitemap not exists', async () => {
      const mockIdSitemap = '-5';
      mockSitemapRequest(mockSitemaps);

      const service = new GraphQLSitemapService({ endpoint, apiKey, siteName });
      const sitemap = await service.getSitemap(mockIdSitemap);

      expect(sitemap).to.be.undefined;

      return expect(nock.isDone()).to.be.true;
    });
  });
});
