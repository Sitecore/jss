/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { getAppRootId, siteNameError, languageError } from './app-root-query';
import { SearchQueryService } from './search-service';
import { GraphQLRequestClient } from './../graphql-request-client';
import appRootQueryResponse from '../test-data/mockAppRootQueryResponse.json';
import nock from 'nock';
import { SitecoreTemplateId } from '../constants';

// Todo: Instead of creating a GraphQLRequestClient instance, we can use the
// GraphQLClient interface. This would be a better mock. Potentially create a
// 'internal/sitecore-test project for such helpers.

describe('graphql', () => {
  describe('getAppRootId', () => {
    const endpoint = 'http://site';
    const apiKey = 'api-key';
    const queryNameFilter = new RegExp('AppRootQuery');
    const client = new GraphQLRequestClient(endpoint, { apiKey });

    afterEach(() => {
      nock.cleanAll();
    });

    describe('should return', () => {
      it('valid app root ID', async () => {
        nock(endpoint, { reqheaders: { sc_apikey: apiKey } })
          .post('/', queryNameFilter)
          .reply(200, appRootQueryResponse);

        const result = await getAppRootId(client, 'siteName', 'language');
        expect(result).to.equal('GUIDGUIDGUID');
      });

      it('valid root id using fallback language as en', async () => {
        nock(endpoint, { reqheaders: { sc_apikey: apiKey } })
          .post('/', (body) => {
            return body.variables.language === 'language';
          })
          .reply(200, {
            data: {
              layout: {
                homePage: {
                  rootItem: [],
                },
              },
            },
          });

        nock(endpoint, { reqheaders: { sc_apikey: apiKey } })
          .post('/', (body) => {
            return body.variables.language === 'en';
          })
          .reply(200, appRootQueryResponse);

        const result = await getAppRootId(client, 'siteName', 'language');
        expect(result).to.equal('GUIDGUIDGUID');
      });

      it('null for the passed language and for fallback language en', async () => {
        nock(endpoint, { reqheaders: { sc_apikey: apiKey } })
          .post('/', (body) => {
            return body.variables.language === 'language';
          })
          .reply(200, {
            data: {
              layout: {
                homePage: {
                  rootItem: [],
                },
              },
            },
          });

        nock(endpoint, { reqheaders: { sc_apikey: apiKey } })
          .post('/', (body) => {
            return body.variables.language === 'en';
          })
          .reply(200, {
            data: {
              layout: {
                homePage: {
                  rootItem: [],
                },
              },
            },
          });

        const result = await getAppRootId(client, 'siteName', 'language');
        expect(result).to.be.null;
      });

      it('null if no app root found', async () => {
        nock(endpoint, { reqheaders: { sc_apikey: apiKey } })
          .post('/', queryNameFilter)
          .reply(200, {
            data: {
              layout: {
                homePage: {
                  rootItem: [],
                },
              },
            },
          });

        const result = await getAppRootId(client, 'siteName', 'en');
        expect(result).to.be.null;
      });
    });

    describe('parameters', () => {
      it('should enforce valid "siteName" value', async () => {
        nock(endpoint, { reqheaders: { sc_apikey: apiKey } })
          .post('/', queryNameFilter)
          .reply(200, appRootQueryResponse);

        await getAppRootId(client, '', 'language').catch((error) => {
          expect(error).to.be.instanceOf(RangeError);
          expect(error.message).to.equal(siteNameError);
        });
      });

      it('should enforce valid "language" value', async () => {
        nock(endpoint, { reqheaders: { sc_apikey: apiKey } })
          .post('/', queryNameFilter)
          .reply(200, appRootQueryResponse);

        await getAppRootId(client, 'siteName', '').catch((error) => {
          expect(error).to.be.instanceOf(RangeError);
          expect(error.message).to.equal(languageError);
        });
      });

      it('should use custom jssAppTemplateId, if provided', async () => {
        const customTemplateId = '{custom-id}';
        nock(endpoint, { reqheaders: { sc_apikey: apiKey } })
          .post('/', (body) => body.variables.jssAppTemplateId === customTemplateId)
          .reply(200, appRootQueryResponse);

        await getAppRootId(client, 'siteName', 'language', customTemplateId);
        expect(nock.isDone()).to.be.true;
      });

      it('should use default value for jssAppTemplateId, if not specified', async () => {
        nock(endpoint, { reqheaders: { sc_apikey: apiKey } })
          .post('/', (body) => body.variables.jssAppTemplateId === SitecoreTemplateId.JssApp)
          .reply(200, appRootQueryResponse);

        await getAppRootId(client, 'siteName', 'language');
        expect(nock.isDone()).to.be.true;
      });
    });
  });

  describe('search-service', () => {
    const endpoint = 'http://site';
    const apiKey = 'api-key';
    const client = new GraphQLRequestClient(endpoint, { apiKey });
    const searchService = new SearchQueryService(client);

    it('should throw when rootItemId is missing', async () => {
      const result = searchService.fetch('mockQuery', {
        language: 'en',
      });
      await result.catch((error: RangeError) => {
        expect(error.message).to.equal('"rootItemId" and "language" must be non-empty strings');
      });
    });
  });
});
