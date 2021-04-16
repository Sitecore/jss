/* eslint-disable no-unused-expressions */
import { expect, use } from 'chai';
import spies from 'chai-spies';
import {
  DecisionsContext,
  PersonalizationDecisionsService,
  PersonalizationDecisionsServiceConfig,
} from './personalization-decisions-service';
import Sinon, { stub } from 'sinon';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

use(spies);

interface CustomWindow {
  [key: string]: unknown;
  document: unknown;
}

interface Global {
  window: CustomWindow | undefined;
}

declare const global: Global;

describe('PersonalizationDecisionsService', () => {
  describe('isTrackingEnabled', () => {
    it('should be true if not specified in config', () => {
      const decisionsService = new PersonalizationDecisionsService({
        apiKey: 'testApiKey',
        siteName: 'testSiteName',
      });

      expect(decisionsService.isTrackingEnabled()).to.be.true;
    });

    [true, false].forEach((value) => {
      it(`should be ${value} from config`, () => {
        const decisionsService = new PersonalizationDecisionsService({
          apiKey: 'testApiKey',
          siteName: 'testSiteName',
          isTrackingEnabled: value,
        });

        expect(decisionsService.isTrackingEnabled()).equal(value);
      });
    });
  });

  describe('getPersonalizationDecisions', () => {
    let mock: MockAdapter;
    let stubDataFetcher: Sinon.SinonStub;
    let context: DecisionsContext;

    before(() => {
      mock = new MockAdapter(axios);
    });

    beforeEach(() => {
      stubDataFetcher = stub();
      stubDataFetcher.returns(Promise.resolve({ status: 200, data: { test: 'test' } }));
      context = {
        routePath: 'testRoutePath',
        language: 'testLanguage',
        renderingIds: ['testik1'],
      };

      global.window = {
        location: { pathname: '', search: '' },
        document: {},
      };
    });

    afterEach(() => {
      mock.reset();
    });

    after(() => {
      global.window = undefined;
      mock.restore();
    });

    it('should use AxiosDataFetcher if fetcher is not specified', async () => {
      mock.onPost().reply(() => {
        return [200, { status: 200, statusText: 'ok', data: {} }];
      });
      const config: PersonalizationDecisionsServiceConfig = {
        apiKey: 'testApiKey',
        siteName: 'testSiteName',
      };
      const decisionsService = new PersonalizationDecisionsService(config);

      await decisionsService.getPersonalizationDecisions(context);

      expect(mock.history.post.length).equal(1);
      expect(mock.history.post[0].url).equal(
        '/sitecore/api/layout/personalization/decision?sc_apikey=testApiKey&sc_site=testSiteName&tracking=true'
      );
      expect(mock.history.post[0].data).to.equal(
        JSON.stringify({
          routePath: 'testRoutePath',
          language: 'testLanguage',
          renderingIds: ['testik1'],
          url: '',
        })
      );
    });

    it('should use default endpoint and tracking if not specified in config', async () => {
      const config: PersonalizationDecisionsServiceConfig = {
        apiKey: 'testApiKey',
        siteName: 'testSiteName',
        fetcher: stubDataFetcher,
      };
      const decisionsService = new PersonalizationDecisionsService(config);

      await decisionsService.getPersonalizationDecisions(context);

      const stubDataFetcherArgs = stubDataFetcher.getCall(0).args;
      expect(stubDataFetcherArgs[0]).equals(
        '/sitecore/api/layout/personalization/decision?sc_apikey=testApiKey&sc_site=testSiteName&tracking=true'
      );
      expect(stubDataFetcherArgs[1]).deep.equals({
        language: 'testLanguage',
        referrer: undefined,
        renderingIds: ['testik1'],
        routePath: 'testRoutePath',
        url: '',
      });
    });

    it('should use serviceUrl from config', async () => {
      const config: PersonalizationDecisionsServiceConfig = {
        apiKey: 'testApiKey',
        siteName: 'testSiteName',
        endpoint: 'testServiceUrl',
        fetcher: stubDataFetcher,
      };
      const decisionsService = new PersonalizationDecisionsService(config);

      await decisionsService.getPersonalizationDecisions(context);

      const stubDataFetcherArgs = stubDataFetcher.getCall(0).args;
      expect(stubDataFetcherArgs[0]).equals(
        'testServiceUrl?sc_apikey=testApiKey&sc_site=testSiteName&tracking=true'
      );
      expect(stubDataFetcherArgs[1]).deep.equals({
        language: 'testLanguage',
        referrer: undefined,
        renderingIds: ['testik1'],
        routePath: 'testRoutePath',
        url: '',
      });
    });

    it('should use config params for url preparation', async () => {
      const config: PersonalizationDecisionsServiceConfig = {
        apiKey: 'testApiKey',
        siteName: 'testSiteName',
        endpoint: 'testServiceUrl',
        fetcher: stubDataFetcher,
        isTrackingEnabled: false,
      };
      const decisionsService = new PersonalizationDecisionsService(config);

      await decisionsService.getPersonalizationDecisions(context);

      const stubDataFetcherArgs = stubDataFetcher.getCall(0).args;
      expect(stubDataFetcherArgs[0]).equals(
        'testServiceUrl?sc_apikey=testApiKey&sc_site=testSiteName&tracking=false'
      );
      expect(stubDataFetcherArgs[1]).deep.equals({
        language: 'testLanguage',
        referrer: undefined,
        renderingIds: ['testik1'],
        routePath: 'testRoutePath',
        url: '',
      });
    });

    it('should use window to set referrer and url to request body', async () => {
      global.window = {
        location: {
          pathname: 'test_pathname',
          search: '?sc_camp=testcamp&sc_test=10',
        },
        document: {
          referrer: 'testReferrer',
        },
      };

      const config: PersonalizationDecisionsServiceConfig = {
        apiKey: 'testApiKey',
        siteName: 'testSiteName',
        endpoint: 'testServiceUrl',
        fetcher: stubDataFetcher,
        isTrackingEnabled: false,
      };
      const decisionsService = new PersonalizationDecisionsService(config);

      await decisionsService.getPersonalizationDecisions(context);

      const stubDataFetcherArgs = stubDataFetcher.getCall(0).args;
      expect(stubDataFetcherArgs[0]).equals(
        'testServiceUrl?sc_apikey=testApiKey&sc_site=testSiteName&tracking=false'
      );
      expect(stubDataFetcherArgs[1]).deep.equals({
        language: 'testLanguage',
        referrer: 'testReferrer',
        renderingIds: ['testik1'],
        routePath: 'testRoutePath',
        url: 'test_pathname?sc_camp=testcamp&sc_test=10',
      });
    });

    it('should extract query params from main window using currentPageParamsToExtract config', async () => {
      global.window = {
        location: {
          pathname: 'test_pathname',
          search: '?sc_camp=testcamp&sc_test=10',
        },
        document: {
          referrer: 'testReferrer',
        },
      };

      const config: PersonalizationDecisionsServiceConfig = {
        apiKey: 'testApiKey',
        siteName: 'testSiteName',
        endpoint: 'testServiceUrl',
        fetcher: stubDataFetcher,
        currentPageParamsToExtract: ['sc_camp'],
        isTrackingEnabled: false,
      };
      const decisionsService = new PersonalizationDecisionsService(config);

      await decisionsService.getPersonalizationDecisions(context);

      const stubDataFetcherArgs = stubDataFetcher.getCall(0).args;
      expect(stubDataFetcherArgs[0]).equals(
        'testServiceUrl?sc_apikey=testApiKey&sc_site=testSiteName&tracking=false&sc_camp=testcamp'
      );
      expect(stubDataFetcherArgs[1]).deep.equals({
        language: 'testLanguage',
        referrer: 'testReferrer',
        renderingIds: ['testik1'],
        routePath: 'testRoutePath',
        url: 'test_pathname?sc_camp=testcamp&sc_test=10',
      });
    });
  });
});
