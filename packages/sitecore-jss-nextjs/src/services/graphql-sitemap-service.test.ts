import { expect } from 'chai';
import nock from 'nock';
import {
  GraphQLSitemapService,
  GraphQLSitemapServiceConfig,
  languageError,
} from './graphql-sitemap-service';
import appRootQueryResponse from '../testData/mockAppRootQueryResponse.json';
import sitemapQueryResult from '../testData/sitemapQueryResult.json';
import sitemapServiceResult from '../testData/sitemapServiceResult';
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
  const rootItemId = '{GUID}';
  const endpoint = 'http://site';
  const apiKey = 'some-api-key';
  const siteName = 'site-name';

  afterEach(() => {
    nock.cleanAll();
  });

  const mockRootItemIdRequest = (results?: { data: { item: { id: string } | undefined } }) => {
    nock(endpoint)
      .post('/', /AppRootQuery/gi)
      .reply(
        200,
        results === undefined
          ? appRootQueryResponse
          : {
              data: {
                search: {
                  results
                },
              },
            }
      );
  };

  const mockPathsRequest = (results?: { url: { path: string } }[]) => {
    nock(endpoint)
      .post('/', /SitemapQuery/gi)
      .reply(
        200,
        results === undefined
          ? sitemapQueryResult
          : {
            data: {
              site: {
                siteInfo:{
                  routes:{
                    total: results.length,
                    pageInfo: {
                     hasNext: false,
                    },
                    results,
                  }
                },
              },
            }
          }
      );
  };

  describe('Fetch sitemap in SSG mode', () => {
    it('should work when 1 language is requested', async () => {
      mockPathsRequest();

      const service = new GraphQLSitemapService({ endpoint, apiKey, siteName, rootItemId });
      const sitemap = await service.fetchSSGSitemap(['ua']);
      expect(sitemap).to.deep.equal(sitemapServiceResult);

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
                }
              }
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
                  }
                }
              },
          },
        });

      const service = new GraphQLSitemapService({ endpoint, apiKey, siteName, rootItemId });
      const sitemap = await service.fetchSSGSitemap([lang1, lang2]);

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
      const service = new GraphQLSitemapService({ endpoint, apiKey, siteName, rootItemId });
      await service.fetchSSGSitemap([]).catch((error: RangeError) => {
        expect(error.message).to.equal(languageError);
      });
    });

    it('should use a custom pageSize, if provided', async () => {
      const customPageSize = 20;

      nock(endpoint)
        .post('/', (body) => body.variables.pageSize === customPageSize)
        .reply(200, sitemapQueryResult);

      const service = new GraphQLSitemapService({
        endpoint,
        apiKey,
        siteName,
        rootItemId,
        pageSize: customPageSize,
      });
      const sitemap = await service.fetchSSGSitemap(['ua']);

      expect(sitemap).to.deep.equal(sitemapServiceResult);
      return expect(nock.isDone()).to.be.true;
    });

    it('should use default value if pageSize is not specified', async () => {
      nock(endpoint)
        .post(
          '/',
          (body) =>
            body.query.indexOf('$pageSize: Int = 10') > 0 && body.variables.pageSize === undefined
        )
        .reply(200, sitemapQueryResult);

      const service = new GraphQLSitemapService({
        endpoint,
        apiKey,
        siteName,
        rootItemId,
        pageSize: undefined,
      });
      const sitemap = await service.fetchSSGSitemap(['ua']);

      expect(sitemap).to.deep.equal(sitemapServiceResult);
      return expect(nock.isDone()).to.be.true;
    });

    it('should work if sitemap has 0 pages', async () => {
      mockPathsRequest([]);

      const service = new GraphQLSitemapService({ endpoint, apiKey, siteName, rootItemId });
      const sitemap = await service.fetchSSGSitemap(['ua']);
      expect(sitemap).to.deep.equal([]);
      return expect(nock.isDone()).to.be.true;
    });

    /* TODO: cleanup these tests or replace
    it('should attempt to fetch the rootItemId, if rootItemId not provided', async () => {
      mockRootItemIdRequest();

      nock(endpoint)
        .post('/', (body) => body.variables.rootItemId === 'GUIDGUIDGUID')
        .reply(200, sitemapQueryResult);

      const service = new GraphQLSitemapService({
        endpoint,
        apiKey,
        siteName,
      });

      const sitemap = await service.fetchSSGSitemap(['ua']);
      expect(sitemap).to.deep.equal(sitemapServiceResult);
    });

    it('should use a custom rootItemId, if provided', async () => {
      const customRootId = 'cats';

      nock(endpoint)
        .post('/', (body) => body.variables.rootItemId === customRootId)
        .reply(200, sitemapQueryResult);

      const service = new GraphQLSitemapService({
        endpoint,
        apiKey,
        siteName,
        rootItemId: customRootId,
      });

      const sitemap = await service.fetchSSGSitemap(['ua']);
      expect(sitemap).to.deep.equal(sitemapServiceResult);
    });



    it('should use a jssTemplateId, if provided', async () => {
      const jssAppTemplateId = '{de397294-cfcc-4795-847e-442416d0617b}';
      const randomId = '{5a4e6edc-4518-4afb-afdc-9fa22ec4eb91}';

      nock(endpoint)
        .post('/', (body) => body.variables.jssAppTemplateId === jssAppTemplateId)
        .reply(200, {
          data: {
            layout: {
              homePage: {
                rootItem: [
                  {
                    id: randomId,
                  },
                ],
              },
            },
          },
        });

      nock(endpoint)
        .post('/', (body) => body.variables.rootItemId === randomId)
        .reply(200, sitemapQueryResult);

      const service = new GraphQLSitemapService({
        endpoint,
        apiKey,
        siteName,
        jssAppTemplateId,
      });

      const sitemap = await service.fetchSSGSitemap(['ua']);
      expect(sitemap).to.deep.equal(sitemapServiceResult);
    });
    */

    it('should throw error if SitemapQuery fails', async () => {
      mockRootItemIdRequest();
      nock(endpoint)
        .post('/', /SitemapQuery/gi)
        .reply(500, 'Error 😥');

      const service = new GraphQLSitemapService({ endpoint, apiKey, siteName });
      await service.fetchSSGSitemap(['ua']).catch((error: RangeError) => {
        expect(error.message).to.contain('SitemapQuery');
        expect(error.message).to.contain('Error 😥');
      });
      return expect(nock.isDone()).to.be.true;
    });

    it('should throw error if AppRootQuery fails', async () => {
      nock(endpoint)
        .post('/', /AppRootQuery/gi)
        .reply(500, 'Error 😥');

      const service = new GraphQLSitemapService({ endpoint, apiKey, siteName });
      await service.fetchSSGSitemap(['ua']).catch((error: RangeError) => {
        expect(error.message).to.contain('AppRootQuery');
        expect(error.message).to.contain('Error 😥');
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

      const service = new GraphQLSitemapService({ endpoint, apiKey, siteName });
      const sitemap = await service.fetchExportSitemap('ua');

      expect(sitemap).to.deep.equal(expectedExportSitemap);
      return expect(nock.isDone()).to.be.true;
    });

    it('should work if endpoint returns 0 pages', async () => {
      mockRootItemIdRequest();
      mockPathsRequest([]);

      const service = new GraphQLSitemapService({ endpoint, apiKey, siteName });
      const sitemap = await service.fetchExportSitemap('ua');

      expect(sitemap).to.deep.equal([]);
      return expect(nock.isDone()).to.be.true;
    });

    it('should throw error if SitemapQuery fails', async () => {
      mockRootItemIdRequest();
      nock(endpoint)
        .post('/', /SitemapQuery/gi)
        .reply(500, 'Error 😥');

      const service = new GraphQLSitemapService({ endpoint, apiKey, siteName });
      await service.fetchExportSitemap('ua').catch((error: RangeError) => {
        expect(error.message).to.contain('SitemapQuery');
        expect(error.message).to.contain('Error 😥');
      });
      return expect(nock.isDone()).to.be.true;
    });

    it('should throw error if AppRootQuery fails', async () => {
      nock(endpoint)
        .post('/', /AppRootQuery/gi)
        .reply(500, 'Error 😥');

      const service = new GraphQLSitemapService({ endpoint, apiKey, siteName });
      await service.fetchExportSitemap('ua').catch((error: RangeError) => {
        expect(error.message).to.contain('AppRootQuery');
        expect(error.message).to.contain('Error 😥');
      });
      return expect(nock.isDone()).to.be.true;
    });

    it('should throw error if language is not provided', async () => {
      mockRootItemIdRequest();
      mockPathsRequest();

      const service = new GraphQLSitemapService({ endpoint, apiKey, siteName });
      await service.fetchExportSitemap('').catch((error: RangeError) => {
        expect(error.message).to.equal('The language must be a non-empty string');
      });

      return expect(nock.isDone()).to.be.false;
    });
  });

  it('should provide a default GraphQL client', () => {
    const service = new TestService({
      endpoint,
      apiKey,
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
