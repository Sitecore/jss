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

  it('should fetch sitemap', async () => {
    mockRootItemIdRequest();

    mockPathsRequest([
      {
        url: { path: '/ua/' },
      },
      {
        url: { path: '/ua/x1' },
      },
      {
        url: { path: '/ua/y1/y2/y3/y4' },
      },
      {
        url: { path: '/ua/y1/y2' },
      },
    ]);

    const sitemap = await graphQLLayoutService.fetchSitemap(['ua'], ROOT_ITEM, 'ua');

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

  it('should fetch sitemap using multiple locales', async () => {
    mockRootItemIdRequest();

    mockPathsRequest([
      {
        url: { path: '/ua/x1' },
      },
      {
        url: { path: '/ua/y1/y2/y3/y4' },
      },
      {
        url: { path: '/ua/y1/y2' },
      },
    ]);

    mockPathsRequest([
      {
        url: { path: '/da-DK/x1-da-DK' },
      },
      {
        url: { path: '/da-DK/y1/y2/y3/y4-da-DK' },
      },
      {
        url: { path: '/da-DK/y1/y2-da-DK' },
      },
    ]);

    const sitemap = await graphQLLayoutService.fetchSitemap(['ua', 'da-DK'], ROOT_ITEM, 'ua');

    expect(sitemap).to.deep.equal([
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
      {
        params: {
          path: ['da-DK', 'x1-da-DK'],
        },
      },
      {
        params: {
          path: ['da-DK', 'y1', 'y2', 'y3', 'y4-da-DK'],
        },
      },
      {
        params: {
          path: ['da-DK', 'y1', 'y2-da-DK'],
        },
      },
    ]);
  });

  it('should fetch sitemap when items is empty', async () => {
    mockRootItemIdRequest();

    mockPathsRequest([]);

    const sitemap = await graphQLLayoutService.fetchSitemap(['ua'], ROOT_ITEM, 'ua');

    expect(sitemap).to.deep.equal([]);
  });

  it('should not fetch sitemap if locales are not provided', async () => {
    mockRootItemIdRequest();

    const sitemap = await graphQLLayoutService.fetchSitemap([], ROOT_ITEM, 'ua');

    expect(sitemap).to.deep.equal([]);
  });

  it('should not fetch sitemap if rootItemId is not provided', async () => {
    nock('http://jssnextweb')
      .post('/graphql')
      .reply(200, {
        data: null,
      });

    const sitemap = await graphQLLayoutService.fetchSitemap([], ROOT_ITEM, 'ua');

    expect(sitemap).to.deep.equal([]);
  });

  it('should handle error when request root item id', async () => {
    nock('http://jssnextweb')
      .post('/graphql')
      .reply(401, {
        error: 'whoops',
      });

    const sitemap = await graphQLLayoutService.fetchSitemap(['ua'], ROOT_ITEM, 'ua');

    expect(sitemap).to.deep.equal([]);
  });

  it('should handle error when request paths', async () => {
    mockRootItemIdRequest();

    nock('http://jssnextweb')
      .post('/graphql')
      .reply(401, 'whoops');

    const sitemap = await graphQLLayoutService.fetchSitemap(['ua'], ROOT_ITEM, 'ua');

    expect(sitemap).to.deep.equal([]);
  });

  it('getRootItemIdQuery', () => {
    const query = graphQLLayoutService.getRootItemIdQuery('/sitecore/jssnextweb/home');

    expect(query).to.equal(`query {
      item(path:"/sitecore/jssnextweb/home") {
        id
      }
    }`);
  });

  it('getSitemapQuery', () => {
    const query = graphQLLayoutService.getSitemapQuery('111-222-333', 'ua');

    expect(query).to.equal(`query {
      search(
        filter: {
          AND:[
            {
              name:"_path",
              value:"111-222-333"
            },
            {
              name:"_language",
              value:"ua"
            },
            {
              name:"haslayout",
              value :"true"
            }
          ]
        }
      ){
        results {
          url {
            path
          }
        }
      }
    }`);
  });
});
