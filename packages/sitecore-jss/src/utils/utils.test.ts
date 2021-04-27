/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { isExperienceEditorActive, isServer, resolveUrl, getAppRootId } from '.';
import { GraphQLRequestClient } from '../graphql-request-client';
import siteRootQueryResponse from '../testData/mockSiteRootQueryResponse.json';
import nock from 'nock';

// must make TypeScript happy with `global` variable modification
interface CustomWindow {
  [key: string]: unknown;
  document: unknown;
}

interface Global {
  window: CustomWindow | undefined;
}

declare const global: Global;

describe('utils', () => {
  describe('isServer', () => {
    it('should return true when invoked on server', () => {
      expect(isServer()).to.be.true;
    });

    it('should return false when not invoked on server', () => {
      global.window = { document: {} };

      expect(isServer()).to.be.false;
    });

    after(() => {
      global.window = undefined;
    });
  });

  describe('isExperienceEditorActive', () => {
    it('should return true when EE is active', () => {
      global.window = {
        document: {},
        Sitecore: { PageModes: { ChromeManager: {} } },
      };
      expect(isExperienceEditorActive()).to.be.true;
    });

    it('should return false when EE is not active', () => {
      global.window = { document: {}, Sitecore: null };
      expect(isExperienceEditorActive()).to.be.false;
    });

    after(() => {
      global.window = undefined;
    });
  });

  describe('resolveUrl', () => {
    const testData = [
      {
        test: 'should support querystring params',
        url: 'https://test.io',
        params: { foo: 'foo', bar: 1 },
        expected: 'https://test.io/?foo=foo&bar=1',
      },
      {
        test: 'should support empty querystring params',
        url: 'https://test.io',
        params: {},
        expected: 'https://test.io/',
      },
      {
        test: 'should support undefined querystring params',
        url: 'https://test.io',
        params: undefined,
        expected: 'https://test.io/',
      },
      {
        test: 'should support undefined querystring params',
        url: 'https://test.io',
        params: undefined,
        expected: 'https://test.io/',
      },
      {
        test: 'should support existing querystring params in url',
        url: 'https://test.io?foo=foo',
        params: { bar: 1 },
        expected: 'https://test.io/?foo=foo&bar=1',
      },
    ];

    testData.forEach(({ test, url, params, expected }) => {
      it(test, () => {
        const result = resolveUrl(url, params);
        expect(result).to.equal(expected);
      });
    });
  });

  describe('getAppRootId', () => {

    const endpoint = 'http://site';
    const apiKey = '0FBFF61E-267A-43E3-9252-B77E71CEE4BA';

    afterEach(() => {
      nock.cleanAll();
    });

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

      const result = await getAppRootId(client, 'siteName', 'language');
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

      await getAppRootId(client, 'siteName', 'language').catch((error) => {
        expect(error.message).to.equal('Error fetching Sitecore site root item');
      });
    });
  });
});
