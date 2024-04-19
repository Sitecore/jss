import { expect } from 'chai';
import nock from 'nock';
import {
  getSiteEmptyError,
  GraphQLSitemapService,
  GraphQLSitemapServiceConfig,
  languageError,
} from './graphql-sitemap-service';
import sitemapDefaultQueryResult from '../test-data/sitemapDefaultQueryResult.json';
import sitemapPersonalizeQueryResult from '../test-data/sitemapPersonalizeQueryResult.json';
import sitemapServiceSinglesiteResult from '../test-data/sitemapServiceSinglesiteResult';
import { GraphQLClient, GraphQLRequestClient } from '@sitecore-jss/sitecore-jss/graphql';

class TestService extends GraphQLSitemapService {
  public client: GraphQLClient;
  constructor(options: GraphQLSitemapServiceConfig) {
    super(options);
    this.client = this.getGraphQLClient();
  }
}

// todo: should throw error if no app root found
/*
it('should return null if no app root found', async () => {
  nock(endpoint, {
    reqheaders: {
      sc_apikey: apiKey,
    },
  })
    .post('/', /GetSiteRoot/gi)
    .reply(200, {
      data: {
        layout: {
          homePage: {
            rootItem: [],
          },
        },
      },
    });

  const client = new GraphQLRequestClient({
    endpoint,
    apiKey,
  });

  await getAppRootId(client, 'siteName', 'language').catch((error) => {
    expect(error.message).to.equal('Error fetching Sitecore site root item');
  });
});
*/
describe('GraphQLSitemapService', () => {
  const endpoint = 'http://site';
  const apiKey = 'some-api-key';
  const siteName = 'site-name';
  const clientFactory = GraphQLRequestClient.createClientFactory({
    endpoint,
    apiKey,
  });

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

      const service = new GraphQLSitemapService({ clientFactory, siteName });
      const sitemap = await service.fetchSSGSitemap(['ua']);
      expect(sitemap).to.deep.equal(sitemapServiceSinglesiteResult);

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

      const service = new GraphQLSitemapService({
        clientFactory,
        siteName,
        includedPaths,
        excludedPaths,
      });
      const sitemap = await service.fetchSSGSitemap(['en']);

      return expect(sitemap).to.deep.equal([
        {
          params: {
            path: ['y1', 'y2'],
          },
          locale: 'en',
        },
      ]);
    });

    describe('Fetch sitemap in SSG mode', () => {
      it('should work when 1 language is requested', async () => {
        mockPathsRequest();

        const service = new GraphQLSitemapService({ clientFactory, siteName });
        const sitemap = await service.fetchSSGSitemap(['ua']);
        expect(sitemap).to.deep.equal(sitemapServiceSinglesiteResult);

        return expect(nock.isDone()).to.be.true;
      });

      it('should work for single site when 1 language is requested', async () => {
        mockPathsRequest();

        const service = new GraphQLSitemapService({ clientFactory, siteName });
        const sitemap = await service.fetchSSGSitemap(['ua']);
        expect(sitemap).to.deep.equal(sitemapServiceSinglesiteResult);

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

        const service = new GraphQLSitemapService({
          clientFactory,
          siteName,
          includedPaths,
          excludedPaths,
        });
        const sitemap = await service.fetchSSGSitemap(['en']);

        return expect(sitemap).to.deep.equal([
          {
            params: {
              path: ['y1', 'y2'],
            },
            locale: 'en',
          },
        ]);
      });

      it('should return personalized paths when personalize data is requested and returned for single site', async () => {
        const lang = 'ua';

        nock(endpoint)
          .post('/', /PersonalizeSitemapQuery/gi)
          .reply(200, sitemapPersonalizeQueryResult);

        const service = new GraphQLSitemapService({
          clientFactory,
          siteName,
          includePersonalizedRoutes: true,
        });
        const sitemap = await service.fetchSSGSitemap([lang]);

        expect(sitemap).to.deep.equal([
          {
            params: {
              path: [''],
            },
            locale: lang,
          },
          {
            params: {
              path: ['_variantId_green'],
            },
            locale: lang,
          },
          {
            params: {
              path: ['y1', 'y2', 'y3', 'y4'],
            },
            locale: lang,
          },
          {
            params: {
              path: ['_variantId_green', 'y1', 'y2', 'y3', 'y4'],
            },
            locale: lang,
          },
          {
            params: {
              path: ['_variantId_red', 'y1', 'y2', 'y3', 'y4'],
            },
            locale: lang,
          },
          {
            params: {
              path: ['_variantId_purple', 'y1', 'y2', 'y3', 'y4'],
            },
            locale: lang,
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

        const service = new GraphQLSitemapService({ clientFactory, siteName });
        const sitemap = await service.fetchSSGSitemap([lang]);

        expect(sitemap).to.deep.equal([
          {
            params: {
              path: [''],
            },
            locale: 'en',
          },
          {
            params: {
              path: ['x1'],
            },
            locale: 'en',
          },
        ]);

        return expect(nock.isDone()).to.be.true;
      });

      it('should throw error if valid language is not provided', async () => {
        const service = new GraphQLSitemapService({ clientFactory, siteName });
        await service.fetchSSGSitemap([]).catch((error: RangeError) => {
          expect(error.message).to.equal(languageError);
        });
      });

      it('should throw error if query returns nothing for a provided site name', async () => {
        const service = new GraphQLSitemapService({ clientFactory, siteName });
        nock(endpoint)
          .post('/', (body) => {
            return body.variables.siteName === siteName;
          })
          .reply(200, {
            data: {
              site: {
                siteInfo: null,
              },
            },
          });
        await service.fetchSSGSitemap(['en']).catch((error: RangeError) => {
          expect(error.message).to.equal(getSiteEmptyError(siteName));
        });
      });

      it('should throw error if empty language is provided', async () => {
        mockPathsRequest();

        const service = new GraphQLSitemapService({ clientFactory, siteName });
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

        const service = new GraphQLSitemapService({
          clientFactory,
          siteName,
          pageSize: customPageSize,
        });
        const sitemap = await service.fetchSSGSitemap(['ua']);

        expect(sitemap).to.deep.equal(sitemapServiceSinglesiteResult);
        return expect(nock.isDone()).to.be.true;
      });

      it('should use default value if pageSize is not specified', async () => {
        nock(endpoint)
          .post(
            '/',
            (body) =>
              body.query.indexOf('$pageSize: Int = 100') > 0 &&
              body.variables.pageSize === undefined
          )
          .reply(200, sitemapDefaultQueryResult);

        const service = new GraphQLSitemapService({
          clientFactory,
          siteName,
          pageSize: undefined,
        });
        const sitemap = await service.fetchSSGSitemap(['ua']);

        expect(sitemap).to.deep.equal(sitemapServiceSinglesiteResult);
        return expect(nock.isDone()).to.be.true;
      });

      it('should work if sitemap has 0 pages', async () => {
        mockPathsRequest([]);

        const service = new GraphQLSitemapService({ clientFactory, siteName });
        const sitemap = await service.fetchSSGSitemap(['ua']);
        expect(sitemap).to.deep.equal([]);
        return expect(nock.isDone()).to.be.true;
      });

      it('should throw error if SitemapQuery fails', async () => {
        nock(endpoint)
          .post('/', /DefaultSitemapQuery/gi)
          .reply(500, 'Error 😥');

        const service = new GraphQLSitemapService({ clientFactory, siteName });
        await service.fetchSSGSitemap(['ua']).catch((error: RangeError) => {
          expect(error.message).to.contain('SitemapQuery');
          expect(error.message).to.contain('Error 😥');
        });
        return expect(nock.isDone()).to.be.true;
      });
    });
  });

  const expectedSinglesiteExportSitemap = [
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
    it('should fetch singlesite sitemap', async () => {
      mockPathsRequest();
      const service = new GraphQLSitemapService({ clientFactory, siteName });
      const sitemap = await service.fetchExportSitemap('ua');
      expect(sitemap).to.deep.equal(expectedSinglesiteExportSitemap);
      return expect(nock.isDone()).to.be.true;
    });
    it('should work if endpoint returns 0 pages', async () => {
      mockPathsRequest([]);
      const service = new GraphQLSitemapService({ clientFactory, siteName });
      const sitemap = await service.fetchExportSitemap('ua');
      expect(sitemap).to.deep.equal([]);
      return expect(nock.isDone()).to.be.true;
    });
    it('should throw error if SitemapQuery fails', async () => {
      nock(endpoint)
        .post('/', /DefaultSitemapQuery/gi)
        .reply(500, 'Error 😥');
      const service = new GraphQLSitemapService({ clientFactory, siteName });
      await service.fetchExportSitemap('ua').catch((error: RangeError) => {
        expect(error.message).to.contain('SitemapQuery');
        expect(error.message).to.contain('Error 😥');
      });
      return expect(nock.isDone()).to.be.true;
    });
    it('should throw error if language is not provided', async () => {
      mockPathsRequest();
      const service = new GraphQLSitemapService({ clientFactory, siteName });
      await service.fetchExportSitemap('').catch((error: RangeError) => {
        expect(error.message).to.equal('The language must be a non-empty string');
      });
      return expect(nock.isDone()).to.be.false;
    });
  });
  it('should throw error if query returns nothing for a provided site name', async () => {
    const service = new GraphQLSitemapService({ clientFactory, siteName });
    nock(endpoint)
      .post('/', (body) => {
        return body.variables.siteName === siteName;
      })
      .reply(200, {
        data: {
          site: {
            siteInfo: null,
          },
        },
      });
    await service.fetchExportSitemap('en').catch((error: RangeError) => {
      expect(error.message).to.equal(getSiteEmptyError(siteName));
    });
  });
  it('should provide a default GraphQL client', () => {
    const service = new TestService({
      clientFactory,
      siteName,
    });
    const graphQLClient = service.client as GraphQLClient;
    const graphQLRequestClient = service.client as GraphQLRequestClient;
    // eslint-disable-next-line no-unused-expressions
    expect(graphQLClient).to.exist;
    // eslint-disable-next-line no-unused-expressions
    expect(graphQLRequestClient).to.exist;
  });
});
