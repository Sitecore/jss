import { expect, use } from 'chai';
import spies from 'chai-spies';
import nock from 'nock';
import { GraphQLLayoutService } from './graphql-layout-service';

use(spies);

describe('GraphQLLayoutService', () => {
  const apiKey = '0FBFF61E-267A-43E3-9252-B77E71CEE4BA';

  afterEach(() => {
    nock.cleanAll();
  });

  it('should fetch layout data', async () => {
    nock('http://sctest', {
      reqheaders: {
        sc_apikey: apiKey,
      },
    })
      .post('/graphql', (body) => {
        return (
          body.query.replace(/\n|\s/g, '') ===
          'query{layout(site:"supersite",routePath:"/styleguide",language:"da-DK"){item{rendered}}}'
        );
      })
      .reply(200, {
        data: {
          layout: {
            item: {
              rendered: {
                sitecore: {
                  context: {
                    pageEditing: false,
                    site: { name: 'JssNextWeb' },
                  },
                  route: {
                    name: 'styleguide',
                    layoutId: 'xxx',
                  },
                },
              },
            },
          },
        },
      });

    const service = new GraphQLLayoutService({
      endpoint: 'http://sctest/graphql',
      apiKey: apiKey,
      siteName: 'supersite',
    });

    const data = await service.fetchLayoutData('/styleguide', 'da-DK');

    expect(data).to.deep.equal({
      sitecore: {
        context: {
          pageEditing: false,
          site: { name: 'JssNextWeb' },
        },
        route: {
          name: 'styleguide',
          layoutId: 'xxx',
        },
      },
    });
  });

  it('should fetch layout data if locale is not provided', async () => {
    nock('http://sctest', {
      reqheaders: {
        sc_apikey: apiKey,
      },
    })
      .post('/graphql', (body) => {
        return (
          body.query.replace(/\n|\s/g, '') ===
          'query{layout(site:"supersite",routePath:"/styleguide"){item{rendered}}}'
        );
      })
      .reply(200, {
        data: {
          layout: {
            item: {
              rendered: {
                sitecore: {
                  context: {
                    pageEditing: false,
                    site: { name: 'JssNextWeb' },
                  },
                  route: {
                    name: 'styleguide',
                    layoutId: 'xxx',
                  },
                },
              },
            },
          },
        },
      });

    const service = new GraphQLLayoutService({
      endpoint: 'http://sctest/graphql',
      apiKey: apiKey,
      siteName: 'supersite',
    });

    const data = await service.fetchLayoutData('/styleguide');

    expect(data).to.deep.equal({
      sitecore: {
        context: {
          pageEditing: false,
          site: { name: 'JssNextWeb' },
        },
        route: {
          name: 'styleguide',
          layoutId: 'xxx',
        },
      },
    });
  });

  it('should fetch layout data using custom layout query', async () => {
    nock('http://sctest', {
      reqheaders: {
        sc_apikey: apiKey,
      },
    })
      .post('/graphql', (body) => {
        return (
          body.query.replace(/\n|\s/g, '') ===
          'query{layout111(site:"supersite",route:"/styleguide",language:"en"){item{rendered}}}'
        );
      })
      .reply(200, {
        data: {
          layout: {
            item: {
              rendered: {
                sitecore: {
                  context: {
                    pageEditing: false,
                    site: { name: 'JssNextWeb' },
                  },
                  route: {
                    name: 'styleguide',
                    layoutId: 'xxx',
                  },
                },
              },
            },
          },
        },
      });

    const service = new GraphQLLayoutService({
      endpoint: 'http://sctest/graphql',
      apiKey: apiKey,
      siteName: 'supersite',
      formatLayoutQuery: (siteName, itemPath, locale) =>
        `layout111(site:"${siteName}",route:"${itemPath}",language:"${locale || 'en'}")`,
    });

    const data = await service.fetchLayoutData('/styleguide');

    expect(data).to.deep.equal({
      sitecore: {
        context: {
          pageEditing: false,
          site: { name: 'JssNextWeb' },
        },
        route: {
          name: 'styleguide',
          layoutId: 'xxx',
        },
      },
    });
  });

  it('should handle not found', async () => {
    nock('http://sctest')
      .post('/graphql', (body) => {
        return (
          body.query.replace(/\n|\s/g, '') ===
          'query{layout(site:"supersite",routePath:"/styleguide",language:"da-DK"){item{rendered}}}'
        );
      })
      .reply(200, {
        data: {
          layout: null,
        },
      });

    const service = new GraphQLLayoutService({
      endpoint: 'http://sctest/graphql',
      siteName: 'supersite',
      apiKey: apiKey,
    });

    const data = await service.fetchLayoutData('/styleguide', 'da-DK');

    expect(data).to.deep.equal({
      sitecore: {
        context: {
          pageEditing: false,
          language: 'da-DK',
        },
        route: null,
      },
    });
  });

  it('should return error', async () => {
    nock('http://sctest', {
      reqheaders: {
        sc_apikey: apiKey,
      },
    })
      .post('/graphql')
      .reply(401, {
        error: 'whoops',
      });

    const service = new GraphQLLayoutService({
      endpoint: 'http://sctest/graphql',
      apiKey: apiKey,
      siteName: 'supersite',
    });

    await service.fetchLayoutData('/styleguide', 'da-DK').catch((error) => {
      expect(error.response.status).to.equal(401);
      expect(error.response.error).to.equal('whoops');
    });
  });

  it('should indicate no tracking', () => {
    const service = new GraphQLLayoutService({
      endpoint: 'http://sctest/graphql',
      siteName: 'supersite',
      apiKey: apiKey,
    });

    expect(service.tracking).to.equal(false);
  });
});
