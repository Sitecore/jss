import { resolveAppRoot } from './resolve-app-root';
import { GraphQLRequestClient } from '../graphql-request-client';
import siteRootQueryResponse from '../../testData/mockSiteRootQueryResponse.json';
import { expect } from 'chai';
import nock from 'nock';

describe('context', () => {
  const endpoint = 'http://site';
  const apiKey = '0FBFF61E-267A-43E3-9252-B77E71CEE4BA';

  afterEach(() => {
    nock.cleanAll();
  });

  describe('resolve-app-root', () => {
    it('should fetch app root', async () => {
      nock(endpoint, {
        reqheaders: {
          sc_apikey: apiKey,
        },
      })
        .post('/', /GetSiteRoot/gi)
        .reply(200, siteRootQueryResponse);

      const client = new GraphQLRequestClient(endpoint, {
        apiKey,
      });

      const result = await resolveAppRoot(client, 'siteName', 'language');
      expect(result).to.equal('GUIDGUIDGUID');
    });

    it('should throw error if no app root found', async () => {
      nock(endpoint, {
        reqheaders: {
          sc_apikey: apiKey,
        },
      })
        .post('/', /GetSiteRoot/gi)
        .reply(200, {
          data: {
            layout: {
              homePage: {
                rootItem: [],
              },
            },
          },
        });

      const client = new GraphQLRequestClient(endpoint, {
        apiKey,
      });

      await resolveAppRoot(client, 'siteName', 'language').catch((error) => {
        expect(error.message).to.equal('Error fetching Sitecore site root item');
      });
    });
  });
});
