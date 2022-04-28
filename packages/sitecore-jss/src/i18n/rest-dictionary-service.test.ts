import { expect, spy, use } from 'chai';
import spies from 'chai-spies';
import { RestDictionaryService, RestDictionaryServiceData } from './rest-dictionary-service';
import { AxiosDataFetcher } from '../axios-fetcher';
import nock from 'nock';

use(spies);

describe('RestDictionaryService', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should fetch dictionary data', () => {
    nock('http://sctest')
      .get(
        '/sitecore/api/jss/dictionary/supersite/da-DK?sc_apikey=0FBFF61E-267A-43E3-9252-B77E71CEE4BA'
      )
      .reply(200, (_, requestBody) => ({
        requestBody: requestBody,
        status: 200,
        statusText: 'ok',
        phrases: { x: 'x1', y: 'y2' },
      }));

    const service = new RestDictionaryService({
      apiHost: 'http://sctest',
      apiKey: '0FBFF61E-267A-43E3-9252-B77E71CEE4BA',
      siteName: 'supersite',
      cacheEnabled: false,
    });

    return service.fetchDictionaryData('da-DK').then((phrases) => {
      expect(phrases).to.deep.equal({
        x: 'x1',
        y: 'y2',
      });
    });
  });

  describe('caching enabled', () => {
    it('should use cached data', async () => {
      nock('http://sctest')
        .get(
          '/sitecore/api/jss/dictionary/supersite/da-DK?sc_apikey=0FBFF61E-267A-43E3-9252-B77E71CEE4BA'
        )
        .reply(200, (_, requestBody) => ({
          requestBody: requestBody,
          status: 200,
          statusText: 'ok',
          phrases: { x: 'x1', y: 'y2' },
        }));

      const service = new RestDictionaryService({
        apiHost: 'http://sctest',
        apiKey: '0FBFF61E-267A-43E3-9252-B77E71CEE4BA',
        siteName: 'supersite',
        cacheEnabled: true,
        cacheTimeout: 1,
      });

      const fetchedPhrases = await service.fetchDictionaryData('da-DK');
      expect(fetchedPhrases).to.deep.equal({
        x: 'x1',
        y: 'y2',
      });

      nock('http://sctest')
        .get(
          '/sitecore/api/jss/dictionary/supersite/da-DK?sc_apikey=0FBFF61E-267A-43E3-9252-B77E71CEE4BA'
        )
        .reply(200, (_, requestBody) => ({
          requestBody: requestBody,
          status: 200,
          statusText: 'ok',
          phrases: { x: 'x11', y: 'y22' },
        }));

      const cachedPhrases = await service.fetchDictionaryData('da-DK');

      expect(cachedPhrases).to.deep.equal({
        x: 'x1',
        y: 'y2',
      });
    });

    it('should load updated data after timeout finished', async () => {
      nock('http://sctest')
        .get(
          '/sitecore/api/jss/dictionary/supersite/ua?sc_apikey=0FBFF61E-267A-43E3-9252-B77E71CEE4BA'
        )
        .reply(200, (_, requestBody) => ({
          requestBody: requestBody,
          status: 200,
          statusText: 'ok',
          phrases: { x: 'x1', y: 'y2' },
        }));

      const service = new RestDictionaryService({
        apiHost: 'http://sctest',
        apiKey: '0FBFF61E-267A-43E3-9252-B77E71CEE4BA',
        siteName: 'supersite',
        cacheEnabled: true,
        cacheTimeout: 0.5,
      });

      const fetchedPhrases = await service.fetchDictionaryData('ua');

      expect(fetchedPhrases).to.deep.equal({
        x: 'x1',
        y: 'y2',
      });

      nock('http://sctest')
        .get(
          '/sitecore/api/jss/dictionary/supersite/ua?sc_apikey=0FBFF61E-267A-43E3-9252-B77E71CEE4BA'
        )
        .reply(200, (_, requestBody) => ({
          requestBody: requestBody,
          status: 200,
          statusText: 'ok',
          phrases: { x: 'x11', y: 'y22' },
        }));

      const p = new Promise((resolve) => {
        setTimeout(
          () =>
            service.fetchDictionaryData('ua').then((cachedPhrases) => {
              expect(cachedPhrases).to.deep.equal({
                x: 'x11',
                y: 'y22',
              });

              resolve(undefined);
            }),
          600
        );
      });

      await p;
    });
  });

  it('should fetch dictionary data using custom data fetcher', () => {
    const fetcherSpy = spy((url: string) => {
      return new AxiosDataFetcher().fetch<RestDictionaryServiceData>(url);
    });

    nock('http://sctest')
      .get(
        '/sitecore/api/jss/dictionary/supersite/ua?sc_apikey=0FBFF61E-267A-43E3-9252-B77E71CEE4BA'
      )
      .reply(200, (_, requestBody) => ({
        requestBody: requestBody,
        status: 200,
        statusText: 'ok',
        phrases: { x: 'q1', y: 'w2' },
      }));

    const service = new RestDictionaryService({
      apiHost: 'http://sctest',
      apiKey: '0FBFF61E-267A-43E3-9252-B77E71CEE4BA',
      siteName: 'supersite',
      dataFetcher: fetcherSpy,
      cacheEnabled: false,
    });

    return service.fetchDictionaryData('ua').then((phrases) => {
      expect(phrases).to.deep.equal({
        x: 'q1',
        y: 'w2',
      });

      // eslint-disable-next-line no-unused-expressions
      expect(fetcherSpy).to.be.called.once;
      expect(fetcherSpy).to.be.called.with(
        'http://sctest/sitecore/api/jss/dictionary/supersite/ua?sc_apikey=0FBFF61E-267A-43E3-9252-B77E71CEE4BA'
      );
    });
  });
});
