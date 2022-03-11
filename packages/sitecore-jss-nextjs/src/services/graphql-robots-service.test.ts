import { expect } from 'chai';
import nock from 'nock';
import { GraphQLRobotsService, GraphQLRobotsServiceConfig } from './graphql-robots-service';
import { GraphQLClient, GraphQLRequestClient } from '@sitecore-jss/sitecore-jss/graphql';

class TestService extends GraphQLRobotsService {
  public client: GraphQLClient;
  constructor(options: GraphQLRobotsServiceConfig) {
    super(options);
    this.client = this.getGraphQLClient();
  }
}

const robotsQueryResultNull = {
  site: {
    siteInfo: null,
  },
};

describe('GraphQLRobotsService', () => {
  const endpoint = 'http://site';
  const apiKey = 'some-api-key';
  const siteName = 'site-name';

  afterEach(() => {
    nock.cleanAll();
  });

  const mockPathsRequest = (siteName?: string) => {
    nock(endpoint)
      .post('/')
      .reply(
        200,
        siteName
          ? {
              data: {
                site: {
                  siteInfo: {
                    robots: siteName,
                  },
                },
              },
            }
          : {
              data: robotsQueryResultNull,
            }
      );
  };

  describe('Fetch robots.txt', () => {
    it('should work if robots.txt has empty string', async () => {
      mockPathsRequest();

      const service = new GraphQLRobotsService({ endpoint, apiKey, siteName: '' });
      const sitemap = await service.fetchRobots();
      expect(sitemap).to.equal(undefined);

      return expect(nock.isDone()).to.be.true;
    });

    it('should work get robots.txt', async () => {
      mockPathsRequest(siteName);

      const service = new GraphQLRobotsService({ endpoint, apiKey, siteName: '' });
      const sitemap = await service.fetchRobots();
      expect(sitemap).to.equal(siteName);

      return expect(nock.isDone()).to.be.true;
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
