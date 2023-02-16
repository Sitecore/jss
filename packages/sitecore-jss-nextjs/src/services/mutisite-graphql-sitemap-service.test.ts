import { expect } from 'chai';
import nock from 'nock';
import {
  MultisiteGraphQLSitemapService,
  MultisiteGraphQLSitemapServiceConfig,
} from './mutisite-graphql-sitemap-service';
import { getSiteEmptyError, languageError } from './graphql-sitemap-service';
import sitemapDefaultQueryResult from '../test-data/sitemapDefaultQueryResult.json';
import sitemapPersonalizeQueryResult from '../test-data/sitemapPersonalizeQueryResult.json';
import sitemapServiceMultisiteResult from '../test-data/sitemapServiceMultisiteResult';
import { GraphQLClient, GraphQLRequestClient } from '@sitecore-jss/sitecore-jss/graphql';

class TestService extends MultisiteGraphQLSitemapService {
  public client: GraphQLClient;
  constructor(options: MultisiteGraphQLSitemapServiceConfig) {
    super(options);
    this.client = this.getGraphQLClient();
  }
}

describe('MultisiteGraphQLSitemapService', () => {
  const endpoint = 'http://site';
  const apiKey = 'some-api-key';
  const sites = ['site-name'];

  afterEach(() => {
    nock.cleanAll();
  });

  const mockPathsRequest = (results?: { url: { path: string } }[]) => {
    nock(endpoint)
      .post('/', /DefaultSitemapQuery/gi)
      .reply(
        200,
        results === undefined
          ? sitemapDefaultQueryResult
          : {
              data: {
                site: {
                  siteInfo: {
                    routes: {
                      total: results.length,
                      pageInfo: {
                        hasNext: false,
                      },
                      results,
                    },
                  },
                },
              },
            }
      );
  };

  describe('Fetch sitemap in SSG mode', () => {
    it('should work when 1 language is requested', async () => {
      mockPathsRequest();

      const service = new MultisiteGraphQLSitemapService({ endpoint, apiKey, sites });
      const sitemap = await service.fetchSSGSitemap(['ua']);
      expect(sitemap).to.deep.equal(sitemapServiceMultisiteResult);

      return expect(nock.isDone()).to.be.true;
    });

    it('should work when includePaths and excludePaths are provided', async () => {
      const includedPaths = ['/y1/'];
      const excludedPaths = ['/y1/y2/y3/y4'];

      nock(endpoint)
        .post('/', (body) => {
          return body.variables.includedPaths && body.variables.excludedPaths;
        })
        .reply(200, {
          data: {
            site: {
              siteInfo: {
                routes: {
                  total: 1,
                  pageInfo: {
                    hasNext: false,
                  },
                  results: [
                    {
                      path: '/y1/y2/',
                    },
                  ],
                },
              },
            },
          },
        });

      nock(endpoint)
        .post('/')
        .reply(200, {
          data: {
            site: {
              siteInfo: {
                routes: {
                  total: 4,
                  pageInfo: {
                    hasNext: false,
                  },
                  results: [
                    {
                      path: '/',
                    },
                    {
                      path: '/x1',
                    },
                    {
                      path: '/y1/y2/y3/y4',
                    },
                    {
                      path: '/y1/y2',
                    },
                  ],
                },
              },
            },
          },
        });

      const service = new MultisiteGraphQLSitemapService({
        endpoint,
        apiKey,
        sites,
        includedPaths,
        excludedPaths,
      });
      const sitemap = await service.fetchSSGSitemap(['en']);

      return expect(sitemap).to.deep.equal([
        {
          params: {
            path: ['_site_site-name', 'y1', 'y2'],
          },
          locale: 'en',
        },
      ]);
    });

    describe('Fetch sitemap in SSG mode', () => {
      it('should work when 1 language is requested', async () => {
        mockPathsRequest();

        const service = new MultisiteGraphQLSitemapService({ endpoint, apiKey, sites });
        const sitemap = await service.fetchSSGSitemap(['ua']);
        expect(sitemap).to.deep.equal(sitemapServiceMultisiteResult);

        return expect(nock.isDone()).to.be.true;
      });

      it('should work when includePaths and excludePaths are provided', async () => {
        const includedPaths = ['/y1/'];
        const excludedPaths = ['/y1/y2/y3/y4'];

        nock(endpoint)
          .post('/', (body) => {
            return body.variables.includedPaths && body.variables.excludedPaths;
          })
          .reply(200, {
            data: {
              site: {
                siteInfo: {
                  routes: {
                    total: 1,
                    pageInfo: {
                      hasNext: false,
                    },
                    results: [
                      {
                        path: '/y1/y2/',
                      },
                    ],
                  },
                },
              },
            },
          });

        nock(endpoint)
          .post('/')
          .reply(200, {
            data: {
              site: {
                siteInfo: {
                  routes: {
                    total: 4,
                    pageInfo: {
                      hasNext: false,
                    },
                    results: [
                      {
                        path: '/',
                      },
                      {
                        path: '/x1',
                      },
                      {
                        path: '/y1/y2/y3/y4',
                      },
                      {
                        path: '/y1/y2',
                      },
                    ],
                  },
                },
              },
            },
          });

        const service = new MultisiteGraphQLSitemapService({
          endpoint,
          apiKey,
          sites,
          includedPaths,
          excludedPaths,
        });
        const sitemap = await service.fetchSSGSitemap(['en']);

        return expect(sitemap).to.deep.equal([
          {
            params: {
              path: ['_site_site-name', 'y1', 'y2'],
            },
            locale: 'en',
          },
        ]);
      });

      it('should return aggregated paths for multiple sites with no personalization', async () => {
        const multipleSites = ['site1', 'site2'];
        const lang = 'ua';

        nock(endpoint)
          .persist()
          .post('/', (body) => {
            return body.variables.siteName === multipleSites[0];
          })
          .reply(200, {
            data: {
              site: {
                siteInfo: {
                  routes: {
                    total: 4,
                    pageInfo: {
                      hasNext: false,
                    },
                    results: [
                      {
                        path: '/',
                      },
                      {
                        path: '/x1',
                      },
                      {
                        path: '/y1/y2/y3/y4',
                      },
                      {
                        path: '/y1/y2',
                      },
                    ],
                  },
                },
              },
            },
          });

        nock(endpoint)
          .persist()
          .post('/', (body) => {
            return body.variables.siteName === multipleSites[1];
          })
          .reply(200, {
            data: {
              site: {
                siteInfo: {
                  routes: {
                    total: 2,
                    pageInfo: {
                      hasNext: false,
                    },
                    results: [
                      {
                        path: '/y1',
                      },
                      {
                        path: '/x1/x2',
                      },
                    ],
                  },
                },
              },
            },
          });

        const service = new MultisiteGraphQLSitemapService({
          endpoint,
          apiKey,
          sites: multipleSites,
        });
        const sitemap = await service.fetchSSGSitemap([lang]);

        expect(sitemap).to.deep.equal([
          {
            params: {
              path: ['_site_site1'],
            },
            locale: lang,
          },
          {
            params: {
              path: ['_site_site1', 'x1'],
            },
            locale: lang,
          },
          {
            params: {
              path: ['_site_site1', 'y1', 'y2', 'y3', 'y4'],
            },
            locale: lang,
          },
          {
            params: {
              path: ['_site_site1', 'y1', 'y2'],
            },
            locale: lang,
          },
          {
            params: {
              path: ['_site_site2', 'y1'],
            },
            locale: lang,
          },
          {
            params: {
              path: ['_site_site2', 'x1', 'x2'],
            },
            locale: lang,
          },
        ]);
        return expect(nock.isDone()).to.be.true;
      });

      it('should return aggregated paths for multiple sites and personalized sites', async () => {
        const multipleSites = ['site1', 'site2'];
        const lang = 'ua';

        nock(endpoint)
          .post('/', /PersonalizeSitemapQuery/gi)
          .reply(200, sitemapPersonalizeQueryResult);

        nock(endpoint)
          .persist()
          .post('/', (body) => {
            return body.variables.siteName === multipleSites[1];
          })
          .reply(200, {
            data: {
              site: {
                siteInfo: {
                  routes: {
                    total: 4,
                    pageInfo: {
                      hasNext: false,
                    },
                    results: [
                      {
                        path: '/',
                      },
                      {
                        path: '/x1',
                      },
                      {
                        path: '/y1/y2/y3/y4',
                      },
                      {
                        path: '/y1/y2',
                      },
                    ],
                  },
                },
              },
            },
          });

        const service = new MultisiteGraphQLSitemapService({
          endpoint,
          apiKey,
          sites: multipleSites,
          includePersonalizedRoutes: true,
        });
        const sitemap = await service.fetchSSGSitemap([lang]);

        expect(sitemap).to.deep.equal([
          {
            params: {
              path: ['_site_site1'],
            },
            locale: lang,
          },
          {
            params: {
              path: ['_variantId_green', '_site_site1'],
            },
            locale: lang,
          },
          {
            params: {
              path: ['_site_site1', 'y1', 'y2', 'y3', 'y4'],
            },
            locale: lang,
          },
          {
            params: {
              path: ['_variantId_green', '_site_site1', 'y1', 'y2', 'y3', 'y4'],
            },
            locale: lang,
          },
          {
            params: {
              path: ['_variantId_red', '_site_site1', 'y1', 'y2', 'y3', 'y4'],
            },
            locale: lang,
          },
          {
            params: {
              path: ['_variantId_purple', '_site_site1', 'y1', 'y2', 'y3', 'y4'],
            },
            locale: lang,
          },
          {
            params: {
              path: ['_site_site2'],
            },
            locale: lang,
          },
          {
            params: {
              path: ['_site_site2', 'x1'],
            },
            locale: lang,
          },
          {
            params: {
              path: ['_site_site2', 'y1', 'y2', 'y3', 'y4'],
            },
            locale: lang,
          },
          {
            params: {
              path: ['_site_site2', 'y1', 'y2'],
            },
            locale: lang,
          },
        ]);
        return expect(nock.isDone()).to.be.true;
      });

      it('should work when multiple languages are requested', async () => {
        const lang1 = 'ua';
        const lang2 = 'da-DK';

        nock(endpoint)
          .post('/', (body) => {
            return body.variables.language === lang1;
          })
          .reply(200, {
            data: {
              site: {
                siteInfo: {
                  routes: {
                    total: 4,
                    pageInfo: {
                      hasNext: false,
                    },
                    results: [
                      {
                        path: '/',
                      },
                      {
                        path: '/x1',
                      },
                      {
                        path: '/y1/y2/y3/y4',
                      },
                      {
                        path: '/y1/y2',
                      },
                    ],
                  },
                },
              },
            },
          });

        nock(endpoint)
          .post('/', (body) => {
            return body.variables.language === lang2;
          })
          .reply(200, {
            data: {
              site: {
                siteInfo: {
                  routes: {
                    total: 4,
                    pageInfo: {
                      hasNext: false,
                    },
                    results: [
                      {
                        path: '/',
                      },
                      {
                        path: '/x1-da-DK',
                      },
                      {
                        path: '/y1/y2/y3/y4-da-DK',
                      },
                      {
                        path: '/y1/y2-da-DK',
                      },
                    ],
                  },
                },
              },
            },
          });

        const service = new MultisiteGraphQLSitemapService({ endpoint, apiKey, sites });
        const sitemap = await service.fetchSSGSitemap([lang1, lang2]);

        expect(sitemap).to.deep.equal([
          {
            params: {
              path: ['_site_site-name'],
            },
            locale: 'ua',
          },
          {
            params: {
              path: ['_site_site-name', 'x1'],
            },
            locale: 'ua',
          },
          {
            params: {
              path: ['_site_site-name', 'y1', 'y2', 'y3', 'y4'],
            },
            locale: 'ua',
          },
          {
            params: {
              path: ['_site_site-name', 'y1', 'y2'],
            },
            locale: 'ua',
          },
          {
            params: {
              path: ['_site_site-name'],
            },
            locale: 'da-DK',
          },
          {
            params: {
              path: ['_site_site-name', 'x1-da-DK'],
            },
            locale: 'da-DK',
          },
          {
            params: {
              path: ['_site_site-name', 'y1', 'y2', 'y3', 'y4-da-DK'],
            },
            locale: 'da-DK',
          },
          {
            params: {
              path: ['_site_site-name', 'y1', 'y2-da-DK'],
            },
            locale: 'da-DK',
          },
        ]);

        return expect(nock.isDone()).to.be.true;
      });

      it('should work when null results are present', async () => {
        const lang = 'en';

        nock(endpoint)
          .post('/', (body) => {
            return body.variables.language === lang;
          })
          .reply(200, {
            data: {
              site: {
                siteInfo: {
                  routes: {
                    total: 4,
                    pageInfo: {
                      hasNext: false,
                    },
                    results: [
                      {
                        path: '/',
                      },
                      {
                        path: '/x1',
                      },
                      null,
                      null,
                    ],
                  },
                },
              },
            },
          });

        const service = new MultisiteGraphQLSitemapService({ endpoint, apiKey, sites });
        const sitemap = await service.fetchSSGSitemap([lang]);

        expect(sitemap).to.deep.equal([
          {
            params: {
              path: ['_site_site-name'],
            },
            locale: 'en',
          },
          {
            params: {
              path: ['_site_site-name', 'x1'],
            },
            locale: 'en',
          },
        ]);

        return expect(nock.isDone()).to.be.true;
      });

      it('should throw error if valid language is not provided', async () => {
        const service = new MultisiteGraphQLSitemapService({ endpoint, apiKey, sites });
        await service.fetchSSGSitemap([]).catch((error: RangeError) => {
          expect(error.message).to.equal(languageError);
        });
      });

      it('should throw error if query returns nothing for a provided site name', async () => {
        const service = new MultisiteGraphQLSitemapService({ endpoint, apiKey, sites });
        nock(endpoint)
          .post('/', (body) => {
            return body.variables.siteName === sites[0];
          })
          .reply(200, {
            data: {
              site: {
                siteInfo: null,
              },
            },
          });
        await service.fetchSSGSitemap(['en']).catch((error: RangeError) => {
          expect(error.message).to.equal(getSiteEmptyError(sites[0]));
        });
      });

      it('should throw error if empty language is provided', async () => {
        mockPathsRequest();

        const service = new MultisiteGraphQLSitemapService({ endpoint, apiKey, sites });
        await service.fetchExportSitemap('').catch((error: RangeError) => {
          expect(error.message).to.equal('The language must be a non-empty string');
        });

        return expect(nock.isDone()).to.be.false;
      });

      it('should use a custom pageSize, if provided', async () => {
        const customPageSize = 20;

        nock(endpoint)
          .post('/', (body) => body.variables.pageSize === customPageSize)
          .reply(200, sitemapDefaultQueryResult);

        const service = new MultisiteGraphQLSitemapService({
          endpoint,
          apiKey,
          sites,
          pageSize: customPageSize,
        });
        const sitemap = await service.fetchSSGSitemap(['ua']);

        expect(sitemap).to.deep.equal(sitemapServiceMultisiteResult);
        return expect(nock.isDone()).to.be.true;
      });

      it('should use default value if pageSize is not specified', async () => {
        nock(endpoint)
          .post(
            '/',
            (body) =>
              body.query.indexOf('$pageSize: Int = 10') > 0 && body.variables.pageSize === undefined
          )
          .reply(200, sitemapDefaultQueryResult);

        const service = new MultisiteGraphQLSitemapService({
          endpoint,
          apiKey,
          sites,
          pageSize: undefined,
        });
        const sitemap = await service.fetchSSGSitemap(['ua']);

        expect(sitemap).to.deep.equal(sitemapServiceMultisiteResult);
        return expect(nock.isDone()).to.be.true;
      });

      it('should work if sitemap has 0 pages', async () => {
        mockPathsRequest([]);

        const service = new MultisiteGraphQLSitemapService({ endpoint, apiKey, sites });
        const sitemap = await service.fetchSSGSitemap(['ua']);
        expect(sitemap).to.deep.equal([]);
        return expect(nock.isDone()).to.be.true;
      });

      it('should throw error if SitemapQuery fails', async () => {
        nock(endpoint)
          .post('/', /DefaultSitemapQuery/gi)
          .reply(500, 'Error 😥');

        const service = new MultisiteGraphQLSitemapService({ endpoint, apiKey, sites });
        await service.fetchSSGSitemap(['ua']).catch((error: RangeError) => {
          expect(error.message).to.contain('SitemapQuery');
          expect(error.message).to.contain('Error 😥');
        });
        return expect(nock.isDone()).to.be.true;
      });
    });
  });

  const expectedMultisiteExportSitemap = [
    {
      params: {
        path: ['_site_site-name'],
      },
    },
    {
      params: {
        path: ['_site_site-name', 'x1'],
      },
    },
    {
      params: {
        path: ['_site_site-name', 'y1', 'y2', 'y3', 'y4'],
      },
    },
    {
      params: {
        path: ['_site_site-name', 'y1', 'y2'],
      },
    },
  ];

  describe('Fetch sitemap in export mode', () => {
    it('should fetch multisite sitemap', async () => {
      mockPathsRequest();
      const service = new MultisiteGraphQLSitemapService({ endpoint, apiKey, sites });
      const sitemap = await service.fetchExportSitemap('ua');
      expect(sitemap).to.deep.equal(expectedMultisiteExportSitemap);
      return expect(nock.isDone()).to.be.true;
    });
    it('should work if endpoint returns 0 pages', async () => {
      mockPathsRequest([]);
      const service = new MultisiteGraphQLSitemapService({ endpoint, apiKey, sites });
      const sitemap = await service.fetchExportSitemap('ua');
      expect(sitemap).to.deep.equal([]);
      return expect(nock.isDone()).to.be.true;
    });
    it('should throw error if SitemapQuery fails', async () => {
      nock(endpoint)
        .post('/', /DefaultSitemapQuery/gi)
        .reply(500, 'Error 😥');
      const service = new MultisiteGraphQLSitemapService({ endpoint, apiKey, sites });
      await service.fetchExportSitemap('ua').catch((error: RangeError) => {
        expect(error.message).to.contain('SitemapQuery');
        expect(error.message).to.contain('Error 😥');
      });
      return expect(nock.isDone()).to.be.true;
    });
    it('should throw error if language is not provided', async () => {
      mockPathsRequest();
      const service = new MultisiteGraphQLSitemapService({ endpoint, apiKey, sites });
      await service.fetchExportSitemap('').catch((error: RangeError) => {
        expect(error.message).to.equal('The language must be a non-empty string');
      });
      return expect(nock.isDone()).to.be.false;
    });
  });
  it('should throw error if query returns nothing for a provided site name', async () => {
    const service = new MultisiteGraphQLSitemapService({ endpoint, apiKey, sites });
    nock(endpoint)
      .post('/', (body) => {
        return body.variables.siteName === sites[0];
      })
      .reply(200, {
        data: {
          site: {
            siteInfo: null,
          },
        },
      });
    await service.fetchExportSitemap('en').catch((error: RangeError) => {
      expect(error.message).to.equal(getSiteEmptyError(sites[0]));
    });
  });
  it('should provide a default GraphQL client', () => {
    const service = new TestService({
      endpoint,
      apiKey,
      sites,
    });
    const graphQLClient = service.client as GraphQLClient;
    const graphQLRequestClient = service.client as GraphQLRequestClient;
    // eslint-disable-next-line no-unused-expressions
    expect(graphQLClient).to.exist;
    // eslint-disable-next-line no-unused-expressions
    expect(graphQLRequestClient).to.exist;
  });
});
