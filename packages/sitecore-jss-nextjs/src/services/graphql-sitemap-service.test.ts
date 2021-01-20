import { expect } from 'chai';
import nock from 'nock';
import { GraphQLSitemapService } from './graphql-sitemap-service';

describe('GraphQLSitemapService', () => {
  const ROOT_ITEM = '/sitecore/next/home';
  const graphQLLayoutService = new GraphQLSitemapService({
    endpoint: 'http://jssnextweb/graphql',
  });

  const mockRootItemIdRequest = () => {
    nock('http://jssnextweb')
      .post('/graphql')
      .reply(200, {
        data: {
          item: {
            id: '4FEFEBB5-49D7-4E8F-89D5-D40BC1F23BAD',
          },
        },
      });
  };

  const mockPathsRequest = (results: { url: { path: string } }[]) => {
    nock('http://jssnextweb')
      .post('/graphql')
      .reply(200, {
        data: {
          search: {
            results,
          },
        },
      });
  };

  beforeEach(() => {
    nock.cleanAll();
  });

  describe('SSG mode', () => {
    it('should fetch sitemap', async () => {
      mockRootItemIdRequest();

      mockPathsRequest([
        {
          url: { path: '/' },
        },
        {
          url: { path: '/x1' },
        },
        {
          url: { path: '/y1/y2/y3/y4' },
        },
        {
          url: { path: '/y1/y2' },
        },
      ]);

      const sitemap = await graphQLLayoutService.fetchSSGSitemap(['ua'], ROOT_ITEM);

      expect(sitemap).to.deep.equal([
        {
          params: {
            path: [''],
          },
          locale: 'ua',
        },
        {
          params: {
            path: ['x1'],
          },
          locale: 'ua',
        },
        {
          params: {
            path: ['y1', 'y2', 'y3', 'y4'],
          },
          locale: 'ua',
        },
        {
          params: {
            path: ['y1', 'y2'],
          },
          locale: 'ua',
        },
      ]);
    });

    it('should fetch sitemap using multiple locales', async () => {
      mockRootItemIdRequest();

      mockPathsRequest([
        {
          url: { path: '/' },
        },
        {
          url: { path: '/x1' },
        },
        {
          url: { path: '/y1/y2/y3/y4' },
        },
        {
          url: { path: '/y1/y2' },
        },
      ]);

      mockPathsRequest([
        {
          url: { path: '/' },
        },
        {
          url: { path: '/x1-da-DK' },
        },
        {
          url: { path: '/y1/y2/y3/y4-da-DK' },
        },
        {
          url: { path: '/y1/y2-da-DK' },
        },
      ]);

      const sitemap = await graphQLLayoutService.fetchSSGSitemap(['ua', 'da-DK'], ROOT_ITEM);

      expect(sitemap).to.deep.equal([
        {
          params: {
            path: [''],
          },
          locale: 'ua',
        },
        {
          params: {
            path: ['x1'],
          },
          locale: 'ua',
        },
        {
          params: {
            path: ['y1', 'y2', 'y3', 'y4'],
          },
          locale: 'ua',
        },
        {
          params: {
            path: ['y1', 'y2'],
          },
          locale: 'ua',
        },
        {
          params: {
            path: [''],
          },
          locale: 'da-DK',
        },
        {
          params: {
            path: ['x1-da-DK'],
          },
          locale: 'da-DK',
        },
        {
          params: {
            path: ['y1', 'y2', 'y3', 'y4-da-DK'],
          },
          locale: 'da-DK',
        },
        {
          params: {
            path: ['y1', 'y2-da-DK'],
          },
          locale: 'da-DK',
        },
      ]);
    });

    it('should fetch sitemap when items is empty', async () => {
      mockRootItemIdRequest();

      mockPathsRequest([]);

      const sitemap = await graphQLLayoutService.fetchSSGSitemap(['ua'], ROOT_ITEM);

      expect(sitemap).to.deep.equal([]);
    });

    it('should fetch sitemap if locales are not provided', async () => {
      mockRootItemIdRequest();

      const sitemap = await graphQLLayoutService.fetchSSGSitemap([], ROOT_ITEM);

      expect(sitemap).to.deep.equal([]);
    });

    it('should not fetch sitemap if rootItemId is not provided', async () => {
      nock('http://jssnextweb')
        .post('/graphql')
        .reply(200, {
          data: null,
        });

      const sitemap = await graphQLLayoutService.fetchSSGSitemap([], ROOT_ITEM);

      expect(sitemap).to.deep.equal([]);
    });

    it('should handle error when request root item id', async () => {
      nock('http://jssnextweb')
        .post('/graphql')
        .reply(401, {
          error: 'whoops',
        });

      const sitemap = await graphQLLayoutService.fetchSSGSitemap(['ua'], ROOT_ITEM);

      expect(sitemap).to.deep.equal([]);
    });

    it('should handle error when request paths', async () => {
      mockRootItemIdRequest();

      nock('http://jssnextweb')
        .post('/graphql')
        .reply(401, 'whoops');

      const sitemap = await graphQLLayoutService.fetchSSGSitemap(['ua'], ROOT_ITEM);

      expect(sitemap).to.deep.equal([]);
    });
  });

  describe('Export mode', () => {
    it('should fetch sitemap', async () => {
      mockRootItemIdRequest();

      mockPathsRequest([
        {
          url: { path: '/' },
        },
        {
          url: { path: '/x1' },
        },
        {
          url: { path: '/y1/y2/y3/y4' },
        },
        {
          url: { path: '/y1/y2' },
        },
      ]);

      const sitemap = await graphQLLayoutService.fetchExportSitemap('ua', ROOT_ITEM);

      expect(sitemap).to.deep.equal([
        {
          params: {
            path: [''],
          },
        },
        {
          params: {
            path: ['x1'],
          },
        },
        {
          params: {
            path: ['y1', 'y2', 'y3', 'y4'],
          },
        },
        {
          params: {
            path: ['y1', 'y2'],
          },
        },
      ]);
    });

    it('should fetch sitemap when items is empty', async () => {
      mockRootItemIdRequest();

      mockPathsRequest([]);

      const sitemap = await graphQLLayoutService.fetchExportSitemap('ua', ROOT_ITEM);

      expect(sitemap).to.deep.equal([]);
    });

    it('should not fetch sitemap if rootItemId is not provided', async () => {
      nock('http://jssnextweb')
        .post('/graphql')
        .reply(200, {
          data: null,
        });

      const sitemap = await graphQLLayoutService.fetchSSGSitemap([], ROOT_ITEM);

      expect(sitemap).to.deep.equal([]);
    });

    it('should handle error when request root item id', async () => {
      nock('http://jssnextweb')
        .post('/graphql')
        .reply(401, {
          error: 'whoops',
        });

      const sitemap = await graphQLLayoutService.fetchSSGSitemap(['ua'], ROOT_ITEM);

      expect(sitemap).to.deep.equal([]);
    });

    it('should handle error when request paths', async () => {
      mockRootItemIdRequest();

      nock('http://jssnextweb')
        .post('/graphql')
        .reply(401, 'whoops');

      const sitemap = await graphQLLayoutService.fetchSSGSitemap(['ua'], ROOT_ITEM);

      expect(sitemap).to.deep.equal([]);
    });
  })
});
