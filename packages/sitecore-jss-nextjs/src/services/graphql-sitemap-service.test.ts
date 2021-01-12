import { expect } from 'chai';
import nock from 'nock';
import { GraphQLSitemapService } from './graphql-sitemap-service';

describe('GraphQLSitemapService', () => {
  const ROOT_ITEM = '/sitecore/next/home';
  const graphQLLayoutService = new GraphQLSitemapService({
    endpoint: 'http://jssnextweb/graphql',
  });

  beforeEach(() => {
    nock.cleanAll();
  });

  it('should fetch sitemap', async () => {
    nock('http://jssnextweb')
      .post('/graphql')
      .reply(200, {
        data: {
          search: {
            results: {
              totalCount: 1,
              pageInfo: {
                hasNextPage: true,
                hasPreviousPage: true,
              },
              items: [
                {
                  path: '/sitecore/next/home',
                },
                {
                  path: '/sitecore/next/home/x1',
                },
                {
                  path: '/sitecore/next/home/y1/y2/y3/y4',
                },
                {
                  path: '/sitecore/next/home/y1/y2',
                },
              ],
            },
          },
        },
      });

    const sitemap = await graphQLLayoutService.fetchSitemap(['ua'], ROOT_ITEM);

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
    nock('http://jssnextweb')
      .post('/graphql')
      .reply(200, {
        data: {
          search: {
            results: {
              totalCount: 1,
              pageInfo: {
                hasNextPage: true,
                hasPreviousPage: true,
              },
              items: [
                {
                  path: '/sitecore/next/home/x1',
                },
                {
                  path: '/sitecore/next/home/y1/y2/y3/y4',
                },
                {
                  path: '/sitecore/next/home/y1/y2',
                },
              ],
            },
          },
        },
      });

    nock('http://jssnextweb')
      .post('/graphql')
      .reply(200, {
        data: {
          search: {
            results: {
              totalCount: 1,
              pageInfo: {
                hasNextPage: true,
                hasPreviousPage: true,
              },
              items: [
                {
                  path: '/sitecore/next/home/da-DK/x1-da-DK',
                },
                {
                  path: '/sitecore/next/home/da-DK/y1/y2/y3/y4-da-DK',
                },
                {
                  path: '/sitecore/next/home/da-DK/y1/y2-da-DK',
                },
              ],
            },
          },
        },
      });

    const sitemap = await graphQLLayoutService.fetchSitemap(['ua', 'da-DK'], ROOT_ITEM);

    expect(sitemap).to.deep.equal([
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
          path: ['da-DK', 'x1-da-DK'],
        },
        locale: 'da-DK',
      },
      {
        params: {
          path: ['da-DK', 'y1', 'y2', 'y3', 'y4-da-DK'],
        },
        locale: 'da-DK',
      },
      {
        params: {
          path: ['da-DK', 'y1', 'y2-da-DK'],
        },
        locale: 'da-DK',
      },
    ]);
  });

  it('should fetch sitemap when items is empty', async () => {
    nock('http://jssnextweb')
      .post('/graphql')
      .reply(200, {
        data: {
          search: {
            results: {
              totalCount: 1,
              pageInfo: {
                hasNextPage: true,
                hasPreviousPage: true,
              },
            },
          },
        },
      });

    const sitemap = await graphQLLayoutService.fetchSitemap(['ua'], ROOT_ITEM);

    expect(sitemap).to.deep.equal([]);
  });

  it('should not fetch sitemap if locales are not provided', async () => {
    const sitemap = await graphQLLayoutService.fetchSitemap([], ROOT_ITEM);

    expect(sitemap).to.deep.equal([]);
  });

  it('should handle 404', async () => {
    nock('http://jssnextweb')
      .post('/graphql')
      .reply(404, 'whoops');

    const sitemap = await graphQLLayoutService.fetchSitemap(['ua'], ROOT_ITEM);

    expect(sitemap).to.deep.equal([]);
  });

  it('should handle custom error code', async () => {
    nock('http://jssnextweb')
      .post('/graphql')
      .reply(401, 'whoops');

    const sitemap = await graphQLLayoutService.fetchSitemap(['ua'], ROOT_ITEM);

    expect(sitemap).to.deep.equal([]);
  });

  it('getSitemapQuery', () => {
    const query = graphQLLayoutService.getSitemapQuery('/sitecore/web/home', 'ua');

    expect(query).to.equal(`{
			search(
				rootItem: "/sitecore/web/home",
				language: "ua",
				latestVersion: true,
				fieldsEqual: [
					{name: "_templatename", value: "App Route"}
				]
			){
				results{
					totalCount
					pageInfo {
						hasNextPage
						hasPreviousPage
					}
					items{
						name
						path
					}
				}
			}
		}`);
  });
});
