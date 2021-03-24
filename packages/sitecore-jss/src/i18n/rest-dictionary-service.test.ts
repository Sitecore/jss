import { expect, spy, use } from 'chai';
import mcache from 'memory-cache';
import spies from 'chai-spies';
import { RestDictionaryService, RestDictionaryServiceData } from './rest-dictionary-service';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { AxiosDataFetcher } from '../axios-fetcher';

use(spies);

describe('RestDictionaryService', () => {
  let mock: MockAdapter;

  before(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
    mcache.clear();
  });

  after(() => {
    mock.restore();
  });

  it('should fetch dictionary data', () => {
    mock.onGet().reply((config) => {
      return [200, { ...config, status: 200, statusText: 'ok', phrases: { x: 'x1', y: 'y2' } }];
    });

    const service = new RestDictionaryService({
      apiHost: 'http://sctest',
      apiKey: '0FBFF61E-267A-43E3-9252-B77E71CEE4BA',
      siteName: 'supersite',
    });

    return service.fetchDictionaryData('da-DK').then((phrases) => {
      expect(mock.history.get.length).to.equal(1);

      expect(mock.history.get[0].url).to.equal(
        'http://sctest/sitecore/api/jss/dictionary/supersite/da-DK?sc_apikey=0FBFF61E-267A-43E3-9252-B77E71CEE4BA'
      );

      expect(phrases).to.deep.equal({
        x: 'x1',
        y: 'y2',
      });
    });
  });

  describe('caching enabled', () => {
    it('should use cached data', async () => {
      mock.onGet().reply((config) => {
        return [200, { ...config, status: 200, statusText: 'ok', phrases: { x: 'x1', y: 'y2' } }];
      });

      const service = new RestDictionaryService({
        apiHost: 'http://sctest',
        apiKey: '0FBFF61E-267A-43E3-9252-B77E71CEE4BA',
        siteName: 'supersite',
        cacheEnabled: true,
      });

      const fetchedPhrases = await service.fetchDictionaryData('da-DK');

      expect(mock.history.get.length).to.equal(1);

      expect(mock.history.get[0].url).to.equal(
        'http://sctest/sitecore/api/jss/dictionary/supersite/da-DK?sc_apikey=0FBFF61E-267A-43E3-9252-B77E71CEE4BA'
      );

      expect(fetchedPhrases).to.deep.equal({
        x: 'x1',
        y: 'y2',
      });

      mock.onGet().reply((config) => {
        return [200, { ...config, status: 200, statusText: 'ok', phrases: { x: 'x11', y: 'y22' } }];
      });

      const cachedPhrases = await service.fetchDictionaryData('da-DK');

      expect(mock.history.get.length).to.equal(1);

      expect(cachedPhrases).to.deep.equal({
        x: 'x1',
        y: 'y2',
      });
    });

    it('should load updated data after timeout finished', async () => {
      mock.onGet().reply((config) => {
        return [200, { ...config, status: 200, statusText: 'ok', phrases: { x: 'x1', y: 'y2' } }];
      });

      const service = new RestDictionaryService({
        apiHost: 'http://sctest',
        apiKey: '0FBFF61E-267A-43E3-9252-B77E71CEE4BA',
        siteName: 'supersite',
        cacheEnabled: true,
        cacheTimeout: 0.5,
      });

      const fetchedPhrases = await service.fetchDictionaryData('ua');

      expect(mock.history.get.length).to.equal(1);

      expect(mock.history.get[0].url).to.equal(
        'http://sctest/sitecore/api/jss/dictionary/supersite/ua?sc_apikey=0FBFF61E-267A-43E3-9252-B77E71CEE4BA'
      );

      expect(fetchedPhrases).to.deep.equal({
        x: 'x1',
        y: 'y2',
      });

      mock.onGet().reply((config) => {
        return [200, { ...config, status: 200, statusText: 'ok', phrases: { x: 'x11', y: 'y22' } }];
      });

      const p = new Promise((resolve) => {
        setTimeout(
          () =>
            service.fetchDictionaryData('ua').then((cachedPhrases) => {
              expect(cachedPhrases).to.deep.equal({
                x: 'x11',
                y: 'y22',
              });

              expect(mock.history.get.length).to.equal(2, 'Did not fetch updated phrases');

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

    mock.onGet().reply((config) => {
      return [200, { ...config, status: 200, statusText: 'ok', phrases: { x: 'q1', y: 'w2' } }];
    });

    const service = new RestDictionaryService({
      apiHost: 'http://sctest',
      apiKey: '0FBFF61E-267A-43E3-9252-B77E71CEE4BA',
      siteName: 'supersite',
      dataFetcher: fetcherSpy,
    });

    return service.fetchDictionaryData('ua').then((phrases) => {
      expect(mock.history.get.length).to.equal(1);

      expect(mock.history.get[0].url).to.equal(
        'http://sctest/sitecore/api/jss/dictionary/supersite/ua?sc_apikey=0FBFF61E-267A-43E3-9252-B77E71CEE4BA'
      );

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
