/* eslint-disable no-unused-expressions */
import { expect, use } from 'chai';
import sinon, { SinonSpy } from 'sinon';
import spies from 'chai-spies';
import nock from 'nock';
import { GraphQLLayoutService } from './graphql-layout-service';
import { GraphQLRequestClient, GraphQLRequestClientFactory } from '../graphql-request-client';

use(spies);

describe('GraphQLLayoutService', () => {
  const apiKey = '0FBFF61E-267A-43E3-9252-B77E71CEE4BA';
  const endpoint = 'http://sctest/graphql';

  const clientFactory = GraphQLRequestClient.createClientFactory({
    endpoint,
    apiKey,
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it('should fetch layout data using clientFactory', async () => {
    nock('https://bar.com', {
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

    const clientFactory: GraphQLRequestClientFactory = GraphQLRequestClient.createClientFactory({
      apiKey,
      endpoint: 'https://bar.com/graphql',
    });

    const service = new GraphQLLayoutService({
      siteName: 'supersite',
      clientFactory,
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
      clientFactory,
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
      clientFactory,
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
      clientFactory,
      siteName: 'supersite',
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
      clientFactory,
      siteName: 'supersite',
    });

    await service.fetchLayoutData('/styleguide', 'da-DK').catch((error) => {
      expect(error.response.status).to.equal(401);
      expect(error.response.error).to.equal('whoops');
    });
  });

  it('should call clientFactory with the correct arguments', () => {
    const clientFactorySpy: SinonSpy = sinon.spy();
    const mockServiceConfig = {
      siteName: 'supersite',
      clientFactory: clientFactorySpy,
      retries: 3,
      retryStrategy: {
        getDelay: () => 1000,
        shouldRetry: () => true,
      },
    };

    new GraphQLLayoutService(mockServiceConfig);

    expect(clientFactorySpy.calledOnce).to.be.true;

    const calledWithArgs = clientFactorySpy.firstCall.args[0];
    expect(calledWithArgs.debugger).to.exist;
    expect(calledWithArgs.retries).to.equal(mockServiceConfig.retries);
    expect(calledWithArgs.retryStrategy).to.deep.equal(mockServiceConfig.retryStrategy);
  });
});
