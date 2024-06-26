import { expect } from 'chai';
import nock from 'nock';
import { GraphQLRobotsService } from './graphql-robots-service';
import { siteNameError } from '../constants';
import { GraphQLRequestClient } from '../graphql-request-client';

const robotsQueryResultNull = {
  site: {
    siteInfo: null,
  },
};

describe('GraphQLRobotsService', () => {
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

  const mockRobotsRequest = (siteName?: string) => {
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
    it('should get error if robots.txt has empty sitename', async () => {
      mockRobotsRequest();

      const service = new GraphQLRobotsService({ clientFactory, siteName: '' });
      await service.fetchRobots().catch((error: Error) => {
        expect(error.message).to.equal(siteNameError);
      });

      return expect(nock.isDone()).to.be.false;
    });

    it('should get robots.txt', async () => {
      mockRobotsRequest(siteName);

      const service = new GraphQLRobotsService({ clientFactory, siteName });
      const robots = await service.fetchRobots();
      expect(robots).to.equal(siteName);

      return expect(nock.isDone()).to.be.true;
    });
  });
});
