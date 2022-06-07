import { expect } from 'chai';
import nock from 'nock';
import { ErrorHandlingType, GraphQLErrorHandlingService } from './graphql-error-handling-service';
import { siteNameError } from '../constants';

const errorHandlingQueryResultNull = {
  site: {
    siteInfo: null,
  },
};

describe('GraphQLErrorHandlingService', () => {
  const endpoint = 'http://site';
  const apiKey = 'some-api-key';
  const siteName = 'site-name';
  const language = 'en';
  const mockErrorHandlingPages = {
    notFoundPagePath: '/notFoundPage',
    serverErrorPagePath: '/serverErrorPage',
  };

  afterEach(() => {
    nock.cleanAll();
  });

  const mockErrorHandlingPagesRequest = (errorHandling?: ErrorHandlingType | null) => {
    nock(endpoint)
      .post('/')
      .reply(
        200,
        errorHandling
          ? {
              data: {
                site: {
                  siteInfo: {
                    errorHandling,
                  },
                },
              },
            }
          : {
              data: errorHandlingQueryResultNull,
            }
      );
  };

  describe('Fetch error handling pages', () => {
    it('should get error if sitename is empty', async () => {
      mockErrorHandlingPagesRequest();

      const service = new GraphQLErrorHandlingService({ endpoint, apiKey, siteName: '', language });
      await service.fetchErrorHandling().catch((error: Error) => {
        expect(error.message).to.equal(siteNameError);
      });

      return expect(nock.isDone()).to.be.false;
    });

    it('should fetch error handling pages', async () => {
      mockErrorHandlingPagesRequest(mockErrorHandlingPages);

      const service = new GraphQLErrorHandlingService({ endpoint, apiKey, siteName, language });
      const errorHandlingPages = await service.fetchErrorHandling();

      expect(errorHandlingPages).to.deep.equal(mockErrorHandlingPages);

      return expect(nock.isDone()).to.be.true;
    });

    it('should get null if error handling not exists', async () => {
      mockErrorHandlingPagesRequest();

      const service = new GraphQLErrorHandlingService({ endpoint, apiKey, siteName, language});
      const errorHandling = await service.fetchErrorHandling();
      console.log(errorHandling, 'error handling');

      // eslint-disable-next-line no-unused-expressions
      expect(errorHandling).to.be.null;
      return expect(nock.isDone()).to.be.true;
    });
  });
});
