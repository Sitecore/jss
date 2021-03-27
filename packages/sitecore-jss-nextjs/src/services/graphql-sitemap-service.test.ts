import { expect } from 'chai';
import nock from 'nock';
import { GraphQLSitemapService } from './graphql-sitemap-service';
import rootItemQueryResult from '../testData/rootItemQueryResult.json';
import sitemapQueryResult from '../testData/sitemapQueryResult.json';

describe('GraphQLSitemapService', () => {
  const rootItemPath = '/sitecore/next/home';
  const endpoint = 'http://site';

  afterEach(() => {
    nock.cleanAll();
  });

  const mockRootItemIdRequest = (results?: { data: { item: { id: string } | undefined } }) => {
    nock(endpoint, {
      reqheaders: {
        sc_apikey: '0FBFF61E-267A-43E3-9252-B77E71CEE4BA',
      },
    })
      .post('/', /RootItemQuery/gi)
      .reply(
        200,
        results === undefined
          ? rootItemQueryResult
          : {
              data: {
                search: {
                  results,
                },
              },
            }
      );
  };

  const mockPathsRequest = (results?: { url: { path: string } }[]) => {
    nock(endpoint, {
      reqheaders: {
        sc_apikey: '0FBFF61E-267A-43E3-9252-B77E71CEE4BA',
      },
    })
      .post('/', /SitePageQuery/gi)
      .reply(
        200,
        results === undefined
          ? sitemapQueryResult
          : {
              data: {
                search: {
                  total: results.length,
                  pageInfo: {
                    hasNext: false,
                  },
                  results,
                },
              },
            }
      );
  };

  const expectedSSGSitemap = [
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
  ];

  describe('Fetch sitemap in SSG mode', () => {
    // language param tests

    it('should work when 1 language is requested', async () => {
      mockRootItemIdRequest();
      mockPathsRequest();

      const service = new GraphQLSitemapService({ endpoint });
      const sitemap = await service.fetchSSGSitemap(['ua'], rootItemPath);
      expect(sitemap).to.deep.equal(expectedSSGSitemap);

      return expect(nock.isDone()).to.be.true;
    });

    it('should work when multiple languages are requested', async () => {
      const lang1 = 'ua';
      const lang2 = 'da-DK';

      mockRootItemIdRequest();
      nock(endpoint)
        .post('/', (body) => {
          return body.variables.language === lang1;
        })
        .reply(200, {
          data: {
            search: {
              total: 4,
              pageInfo: {
                hasNext: false,
              },
              results: [
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
              ],
            },
          },
        });

      nock(endpoint)
        .post('/', (body) => {
          return body.variables.language === lang2;
        })
        .reply(200, {
          data: {
            search: {
              total: 4,
              pageInfo: {
                hasNext: false,
              },
              results: [
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
              ],
            },
          },
        });

      const service = new GraphQLSitemapService({ endpoint });
      const sitemap = await service.fetchSSGSitemap([lang1, lang2], rootItemPath);

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

      return expect(nock.isDone()).to.be.true;
    });

    it('should throw error if valid language is not provided', async () => {
      const service = new GraphQLSitemapService({ endpoint });
      await service.fetchSSGSitemap([], rootItemPath).catch((error: RangeError) => {
        expect(error.message).to.equal('The list of languages cannot be empty');
      });
    });

    // pageSize param test

    it('should use a custom pageSize, if provided', async () => {
      const customPageSize = 20;
      mockRootItemIdRequest();
      nock(endpoint)
        .post('/', (body) => body.variables.pageSize === customPageSize)
        .reply(200, sitemapQueryResult);

      const service = new GraphQLSitemapService({ endpoint, pageSize: customPageSize });
      const sitemap = await service.fetchSSGSitemap(['ua'], rootItemPath);

      expect(sitemap).to.deep.equal(expectedSSGSitemap);
      return expect(nock.isDone()).to.be.true;
    });

    it('should use default value if pageSize is not specified', async () => {
      mockRootItemIdRequest();
      nock(endpoint)
        .post('/', (body) => body.variables.pageSize === 10)
        .reply(200, sitemapQueryResult);

      const service = new GraphQLSitemapService({ endpoint, pageSize: undefined });
      const sitemap = await service.fetchSSGSitemap(['ua'], rootItemPath);

      expect(sitemap).to.deep.equal(expectedSSGSitemap);
      return expect(nock.isDone()).to.be.true;
    });

    it('should work if endpoint returns 0 pages', async () => {
      mockRootItemIdRequest();
      mockPathsRequest([]);

      const service = new GraphQLSitemapService({ endpoint });
      const sitemap = await service.fetchSSGSitemap(['ua'], rootItemPath);
      expect(sitemap).to.deep.equal([]);
      return expect(nock.isDone()).to.be.true;
    });

    it('should throw error if SitePageQuery fails', async () => {
      mockRootItemIdRequest();
      nock(endpoint)
        .post('/', /SitePageQuery/gi)
        .reply(500, 'Error 😥');

      const service = new GraphQLSitemapService({ endpoint });
      await service.fetchSSGSitemap(['ua'], rootItemPath).catch((error: RangeError) => {
        expect(error.message).to.contain('SitePageQuery');
        expect(error.message).to.contain('Error 😥');
      });
      return expect(nock.isDone()).to.be.true;
    });

    it('should throw error if RootItemQuery fails', async () => {
      nock(endpoint)
        .post('/', /RootItemQuery/gi)
        .reply(500, 'Error 😥');

      const service = new GraphQLSitemapService({ endpoint });
      await service.fetchSSGSitemap(['ua'], rootItemPath).catch((error: RangeError) => {
        expect(error.message).to.contain('RootItemQuery');
        expect(error.message).to.contain('Error 😥');
      });
      return expect(nock.isDone()).to.be.true;
    });

    it('should throw error if rootItemPath is not provided', async () => {
      mockRootItemIdRequest();
      mockPathsRequest();

      const service = new GraphQLSitemapService({ endpoint });
      await service.fetchSSGSitemap(['en'], '').catch((error: RangeError) => {
        expect(error.message).to.equal('The root item path must be a non-empty string');
      });

      return expect(nock.isDone()).to.be.false;
    });

    it('should throw error if a valid rootItemId is not found based on the specified rootItemPath', async () => {
      mockRootItemIdRequest({ data: { item: undefined } });

      const service = new GraphQLSitemapService({ endpoint });
      await service.fetchSSGSitemap(['ua'], rootItemPath).catch((error) => {
        expect(error.message).to.equal(
          `The item path ${rootItemPath} did not return a valid item ID`
        );
      });

      return expect(nock.isDone()).to.be.true;
    });
  });

  const expectedExportSitemap = [
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
  ];

  describe('Fetch sitemap in export mode', () => {
    it('should fetch sitemap', async () => {
      mockRootItemIdRequest();
      mockPathsRequest();

      const service = new GraphQLSitemapService({ endpoint });
      const sitemap = await service.fetchExportSitemap('ua', rootItemPath);

      expect(sitemap).to.deep.equal(expectedExportSitemap);
      return expect(nock.isDone()).to.be.true;
    });

    it('should work if endpoint returns 0 pages', async () => {
      mockRootItemIdRequest();
      mockPathsRequest([]);

      const service = new GraphQLSitemapService({ endpoint });
      const sitemap = await service.fetchExportSitemap('ua', rootItemPath);

      expect(sitemap).to.deep.equal([]);
      return expect(nock.isDone()).to.be.true;
    });

    it('should throw error if SitePageQuery fails', async () => {
      mockRootItemIdRequest();
      nock(endpoint)
        .post('/', /SitePageQuery/gi)
        .reply(500, 'Error 😥');

      const service = new GraphQLSitemapService({ endpoint });
      await service.fetchExportSitemap('ua', rootItemPath).catch((error: RangeError) => {
        expect(error.message).to.contain('SitePageQuery');
        expect(error.message).to.contain('Error 😥');
      });
      return expect(nock.isDone()).to.be.true;
    });

    it('should throw error if RootItemQuery fails', async () => {
      nock(endpoint)
        .post('/', /RootItemQuery/gi)
        .reply(500, 'Error 😥');

      const service = new GraphQLSitemapService({ endpoint });
      await service.fetchExportSitemap('ua', rootItemPath).catch((error: RangeError) => {
        expect(error.message).to.contain('RootItemQuery');
        expect(error.message).to.contain('Error 😥');
      });
      return expect(nock.isDone()).to.be.true;
    });

    it('should throw error if language is not provided', async () => {
      mockRootItemIdRequest();
      mockPathsRequest();

      const service = new GraphQLSitemapService({ endpoint });
      await service.fetchExportSitemap('', rootItemPath).catch((error: RangeError) => {
        expect(error.message).to.equal('The language value must be a non-empty string');
      });

      return expect(nock.isDone()).to.be.false;
    });

    it('should throw error if rootItemPath is not provided', async () => {
      mockRootItemIdRequest();
      mockPathsRequest();

      const service = new GraphQLSitemapService({ endpoint });
      await service.fetchExportSitemap('en', '').catch((error: RangeError) => {
        expect(error.message).to.equal('The root item path must be a non-empty string');
      });

      return expect(nock.isDone()).to.be.false;
    });

    it('should throw error if a valid rootItemId is not found based on the specified rootItemPath', async () => {
      mockRootItemIdRequest({ data: { item: undefined } });

      const service = new GraphQLSitemapService({ endpoint });
      await service.fetchExportSitemap('ua', rootItemPath).catch((error) => {
        expect(error.message).to.equal(
          `The item path ${rootItemPath} did not return a valid item ID`
        );
      });

      return expect(nock.isDone()).to.be.true;
    });
  });
});
