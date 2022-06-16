import { expect } from 'chai';
import nock from 'nock';
import { ErrorPagesType, GraphQLErrorPagesService } from './graphql-error-pages-service';
import { siteNameError } from '../constants';

const errorQueryResultNull = {
  site: {
    siteInfo: null,
  },
};

describe('GraphQLErrorPagesService', () => {
  const endpoint = 'http://site';
  const apiKey = 'some-api-key';
  const siteName = 'site-name';
  const language = 'en';
  const mockErrorPages = {
    notFoundPagePath: '/notFoundPage',
    serverErrorPagePath: '/serverErrorPage',
  };

  afterEach(() => {
    nock.cleanAll();
  });

  const mockErrorPagesRequest = (errorPages?: ErrorPagesType | null) => {
    nock(endpoint)
      .post('/')
      .reply(
        200,
        errorPages
          ? {
              data: {
                site: {
                  siteInfo: {
                    errorHandling: errorPages,
                  },
                },
              },
            }
          : {
              data: errorQueryResultNull,
            }
      );
  };

  describe('Fetch error pages', () => {
    it('should get error if sitename is empty', async () => {
      mockErrorPagesRequest();

      const service = new GraphQLErrorPagesService({
        endpoint,
        apiKey,
        siteName: '',
        language,
      });
      await service.fetchErrorPages().catch((error: Error) => {
        expect(error.message).to.equal(siteNameError);
      });

      return expect(nock.isDone()).to.be.false;
    });

    it('should fetch error pages', async () => {
      mockErrorPagesRequest(mockErrorPages);

      const service = new GraphQLErrorPagesService({
        endpoint,
        apiKey,
        siteName,
        language,
      });
      const errorPages = await service.fetchErrorPages();

      expect(errorPages).to.deep.equal(mockErrorPages);

      return expect(nock.isDone()).to.be.true;
    });

    it('should get null if error not exists', async () => {
      mockErrorPagesRequest();

      const service = new GraphQLErrorPagesService({
        endpoint,
        apiKey,
        siteName,
        language,
      });
      const errorPages = await service.fetchErrorPages();

      // eslint-disable-next-line no-unused-expressions
      expect(errorPages).to.be.null;
      return expect(nock.isDone()).to.be.true;
    });
  });
});
