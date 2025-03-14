/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import sinon, { SinonSpy } from 'sinon';
import nock from 'nock';
import { ErrorPages, GraphQLErrorPagesService } from './graphql-error-pages-service';
import { siteNameError } from '../constants';
import { LayoutServiceData } from '../layout';
import { GraphQLRequestClient } from '../graphql-request-client';

const errorQueryResultNull = {
  site: {
    siteInfo: null,
  },
};

describe('GraphQLErrorPagesService', () => {
  const endpoint = 'http://site';
  const apiKey = 'some-api-key';
  const clientFactory = GraphQLRequestClient.createClientFactory({
    endpoint,
    apiKey,
  });
  const siteName = 'site-name';
  const language = 'en';
  const mockErrorPages = {
    notFoundPagePath: '/notFoundPage',
    notFoundPage: { rendered: {} as LayoutServiceData },
    serverErrorPagePath: '/serverErrorPage',
    serverErrorPage: { rendered: {} as LayoutServiceData },
  };

  afterEach(() => {
    nock.cleanAll();
  });

  const mockErrorPagesRequest = (errorPages?: ErrorPages | null) => {
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
        clientFactory,
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
        clientFactory,
        siteName,
        language,
      });
      const errorPages = await service.fetchErrorPages();

      expect(errorPages).to.deep.equal(mockErrorPages);

      return expect(nock.isDone()).to.be.true;
    });

    it('should fetch error pages using clientFactory', async () => {
      mockErrorPagesRequest(mockErrorPages);

      const clientFactory = GraphQLRequestClient.createClientFactory({
        endpoint,
        apiKey,
      });

      const service = new GraphQLErrorPagesService({
        siteName,
        language,
        clientFactory,
      });

      const errorPages = await service.fetchErrorPages();

      expect(errorPages).to.deep.equal(mockErrorPages);

      return expect(nock.isDone()).to.be.true;
    });

    it('should get null if error not exists', async () => {
      mockErrorPagesRequest();

      const service = new GraphQLErrorPagesService({
        clientFactory,
        siteName,
        language,
      });
      const errorPages = await service.fetchErrorPages();

      // eslint-disable-next-line no-unused-expressions
      expect(errorPages).to.be.null;
      return expect(nock.isDone()).to.be.true;
    });
  });

  it('should call clientFactory with the correct arguments', () => {
    const clientFactorySpy: SinonSpy = sinon.spy();
    const mockServiceConfig = {
      siteName: 'supersite',
      language,
      clientFactory: clientFactorySpy,
      retries: 3,
      retryStrategy: {
        getDelay: () => 1000,
        shouldRetry: () => true,
      },
    };

    new GraphQLErrorPagesService(mockServiceConfig);

    expect(clientFactorySpy.calledOnce).to.be.true;

    const calledWithArgs = clientFactorySpy.firstCall.args[0];
    expect(calledWithArgs.debugger).to.exist;
    expect(calledWithArgs.retries).to.equal(mockServiceConfig.retries);
    expect(calledWithArgs.retryStrategy).to.deep.equal(mockServiceConfig.retryStrategy);
  });
});
