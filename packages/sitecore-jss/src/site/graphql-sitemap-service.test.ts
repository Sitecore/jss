import { expect } from 'chai';
import nock from 'nock';
import { GraphQLSitemapXmlService } from './graphql-sitemap-service';
import { siteNameError } from '../constants';
import { GraphQLRequestClient } from '../graphql-request-client';

const sitemapQueryResultNull = {
  site: {
    siteInfo: null,
  },
};

describe('GraphQLSitemapXmlService', () => {
  const endpoint = 'http://site';
  const apiKey = 'some-api-key';

  const clientFactory = GraphQLRequestClient.createClientFactory({
    endpoint,
    apiKey,
  });

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

      const service = new GraphQLSitemapXmlService({ clientFactory, siteName: '' });
      await service.fetchSitemaps().catch((error: Error) => {
        expect(error.message).to.equal(siteNameError);
      });

      return expect(nock.isDone()).to.be.false;
    });

    it('should fetch sitemap', async () => {
      mockSitemapRequest(mockSitemap);

      const service = new GraphQLSitemapXmlService({ clientFactory, siteName });
      const sitemaps = await service.fetchSitemaps();

      expect(sitemaps.length).to.equal(1);
      expect(sitemaps).to.deep.equal(mockSitemap);

      return expect(nock.isDone()).to.be.true;
    });

    it('should fetch sitemaps', async () => {
      mockSitemapRequest(mockSitemaps);

      const service = new GraphQLSitemapXmlService({ clientFactory, siteName });
      const sitemaps = await service.fetchSitemaps();

      expect(sitemaps.length).to.equal(3);
      expect(sitemaps).to.deep.equal(mockSitemaps);

      return expect(nock.isDone()).to.be.true;
    });

    it('should get null if sitemap not exists', async () => {
      const mockIdSitemap = '-5';
      mockSitemapRequest(mockSitemaps);

      const service = new GraphQLSitemapXmlService({ clientFactory, siteName });
      const sitemap = await service.getSitemap(mockIdSitemap);

      // eslint-disable-next-line no-unused-expressions
      expect(sitemap).to.be.undefined;

      return expect(nock.isDone()).to.be.true;
    });

    it('should fetch specific sitemap when id is provided', async () => {
      const mockIdSitemap = '3';
      mockSitemapRequest(mockSitemaps);

      const service = new GraphQLSitemapXmlService({ clientFactory, siteName });
      const sitemaps = await service.getSitemap(mockIdSitemap);

      expect(sitemaps).to.deep.equal(mockSitemaps[2]);

      return expect(nock.isDone()).to.be.true;
    });

    it('should fetch default sitemap when no id is provided', async () => {
      const defaultSitemap = 'sitemap.xml';
      const mockSitemapsWithDefault = [...mockSitemaps, defaultSitemap];
      mockSitemapRequest(mockSitemapsWithDefault);

      const service = new GraphQLSitemapXmlService({ clientFactory, siteName });
      const sitemaps = await service.getSitemap('');

      expect(sitemaps).to.deep.equal(defaultSitemap);
      return expect(nock.isDone()).to.be.true;
    });

    it('should normalize IDs with leading hyphens (e.g., "-1" → "1")', async () => {
      const mockSitemapsWithHyphenId = [...mockSitemaps, 'sitemap-1.xml'];
      mockSitemapRequest(mockSitemapsWithHyphenId);

      const service = new GraphQLSitemapXmlService({ clientFactory, siteName });
      const result = await service.getSitemap('-1');

      expect(result).to.deep.equal('sitemap-1.xml');
      expect(nock.isDone()).to.be.true;
    });

    it('should return undefined if sitemap does not exist', async () => {
      mockSitemapRequest(mockSitemaps);

      const service = new GraphQLSitemapXmlService({ clientFactory, siteName });
      const result = await service.getSitemap('999');

      expect(result).to.be.undefined;
      expect(nock.isDone()).to.be.true;
    });

    it('should return undefined when id is undefined', async () => {
      mockSitemapRequest(mockSitemaps);
      const service = new GraphQLSitemapXmlService({ clientFactory, siteName });
      const result = await service.getSitemap((undefined as unknown) as string);
      expect(result).to.be.undefined;
      expect(nock.isDone()).to.be.false;
    });

    it('should find "sitemap.xml" when id is an empty string', async () => {
      mockSitemapRequest(mockSitemaps);
      const service = new GraphQLSitemapXmlService({ clientFactory, siteName });
      const result = await service.getSitemap('');
      expect(result).to.deep.equal(undefined);
      expect(nock.isDone()).to.be.true;
    });

    it('should find "sitemap-1.xml" when id is "1"', async () => {
      mockSitemapRequest(mockSitemaps);
      const service = new GraphQLSitemapXmlService({ clientFactory, siteName });
      const result = await service.getSitemap('1');
      expect(result).to.deep.equal('sitemap-1.xml');
      expect(nock.isDone()).to.be.true;
    });
  });
});
