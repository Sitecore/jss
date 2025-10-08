/* eslint-disable no-unused-expressions */
import { expect, use } from 'chai';
import spies from 'chai-spies';
import { NativeDataFetcherConfig } from '../native-fetcher';
import {
  ComponentLayoutRequestParams,
  RestComponentLayoutService,
} from './rest-component-layout-service';
import { LayoutServiceData } from '../layout/models';
import nock from 'nock';
import { SITECORE_EDGE_URL_DEFAULT } from '../constants';
import { DesignLibraryMode } from './models';

use(spies);

describe('RestComponentLayoutService', () => {
  const defaultTestInput: ComponentLayoutRequestParams = {
    itemId: '123',
    componentUid: '456',
    siteName: 'supersite',
  };

  const contextId = 'test-context-id';

  const defaultTestData = {
    sitecore: {
      context: {},
      route: {
        name: 'xxx',
        placeholders: {
          'editing-componentmode-placeholder': [],
        },
      },
    },
  };

  afterEach(() => {
    nock.cleanAll();
  });

  it('should fetch component data', () => {
    nock(SITECORE_EDGE_URL_DEFAULT)
      .get(
        '/layout/component?sitecoreContextId=test-context-id&item=123&uid=456&sc_site=supersite&sc_lang=en'
      )
      .reply(200, () => defaultTestData);

    const service = new RestComponentLayoutService({
      sitecoreEdgeContextId: contextId,
    });

    return service
      .fetchComponentData(defaultTestInput)
      .then((layoutServiceData: LayoutServiceData & NativeDataFetcherConfig) => {
        expect(layoutServiceData).to.deep.equal(defaultTestData);
      });
  });

  it('should fetch component data in metadata mode', () => {
    nock(SITECORE_EDGE_URL_DEFAULT, {
      reqheaders: {
        sc_editMode: 'true',
      },
    })
      .get(
        '/layout/component?sitecoreContextId=test-context-id&item=123&uid=456&sc_site=supersite&sc_lang=en'
      )
      .reply(200, () => defaultTestData);

    const service = new RestComponentLayoutService({
      sitecoreEdgeContextId: contextId,
    });

    return service
      .fetchComponentData({ ...defaultTestInput, mode: DesignLibraryMode.Metadata })
      .then((layoutServiceData: LayoutServiceData & NativeDataFetcherConfig) => {
        expect(layoutServiceData).to.deep.equal(defaultTestData);
      });
  });

  it('should fetch component data when optional params provided', () => {
    const testInput: ComponentLayoutRequestParams = {
      ...defaultTestInput,
      dataSourceId: '789',
      renderingId: '000',
      version: '1',
      language: 'en',
    };

    const testExpectedData = {
      sitecore: {
        context: {},
        route: {
          name: 'xxx',
          placeholders: {
            'editing-componentmode-placeholder': [
              {
                uid: '456',
                componentName: 'RichText',
                dataSource: '789',
                params: {
                  GridParameters: 'col-12',
                  FieldNames: 'Default',
                  Styles: '',
                  RenderingIdentifier: '',
                  DynamicPlaceholderId: '3',
                },
              },
            ],
          },
        },
      },
    };

    nock(SITECORE_EDGE_URL_DEFAULT)
      .get(
        '/layout/component?sitecoreContextId=test-context-id&item=123&uid=456&dataSourceId=789&renderingItemId=000&version=1&sc_site=supersite&sc_lang=en'
      )
      .reply(200, () => testExpectedData);

    const service = new RestComponentLayoutService({
      sitecoreEdgeContextId: contextId,
    });

    return service
      .fetchComponentData(testInput)
      .then((layoutServiceData: LayoutServiceData & NativeDataFetcherConfig) => {
        expect(layoutServiceData).to.deep.equal(testExpectedData);
      });
  });

  it('should fetch component data from a custom edge endpoint', () => {
    const customEdgeUrl = 'https://custom-edge-url.com';

    const service = new RestComponentLayoutService({
      sitecoreEdgeContextId: contextId,
      sitecoreEdgeUrl: customEdgeUrl,
    });

    nock(customEdgeUrl)
      .get(
        '/layout/component?sitecoreContextId=test-context-id&item=123&uid=456&sc_site=supersite&sc_lang=en'
      )
      .reply(200, () => defaultTestData);

    return service
      .fetchComponentData(defaultTestInput)
      .then((layoutServiceData: LayoutServiceData & NativeDataFetcherConfig) => {
        expect(layoutServiceData).to.deep.equal(defaultTestData);
      });
  });

  it('should catch 404 when request layout data', () => {
    nock(SITECORE_EDGE_URL_DEFAULT)
      .get(
        '/layout/component?sitecoreContextId=test-context-id&item=123&uid=456&sc_site=supersite&sc_lang=en'
      )
      .reply(404, () => ({
        data: {
          sitecore: { context: { pageEditing: false, language: 'en' }, route: null },
        },
      }));

    const service = new RestComponentLayoutService({
      sitecoreEdgeContextId: contextId,
    });

    return service
      .fetchComponentData(defaultTestInput)
      .then((layoutServiceData: LayoutServiceData) => {
        expect(layoutServiceData).to.deep.equal({
          data: {
            sitecore: {
              context: {
                pageEditing: false,
                language: 'en',
              },
              route: null,
            },
          },
        });
      });
  });

  it('should allow non 404 errors through', () => {
    nock(SITECORE_EDGE_URL_DEFAULT)
      .get(
        '/layout/component?sitecoreContextId=test-context-id&item=123&uid=456&sc_site=supersite&sc_lang=en'
      )
      .reply(401, { message: 'whoops' });

    const service = new RestComponentLayoutService({
      sitecoreEdgeContextId: contextId,
    });

    return service.fetchComponentData(defaultTestInput).catch((error) => {
      expect(error.response.status).to.equal(401);
      expect(error.response.data.message).to.equal('whoops');
    });
  });

  describe('getComponentFetchParams', () => {
    it('should return params', () => {
      const service = new RestComponentLayoutService({
        sitecoreEdgeContextId: contextId,
      });
      const testParams = {
        itemId: '123',
        componentUid: '456',
        dataSourceId: '789',
        renderingId: '000',
        version: '1',
        siteName: 'notsupersite',
        language: 'en',
        variant: 'default',
      };

      const expectedResult = {
        sitecoreContextId: contextId,
        item: testParams.itemId,
        uid: testParams.componentUid,
        dataSourceId: testParams.dataSourceId,
        renderingItemId: testParams.renderingId,
        version: testParams.version,
        sc_site: testParams.siteName,
        sc_lang: testParams.language,
      };

      // eslint-disable-next-line dot-notation
      expect(service['getComponentFetchParams'](testParams)).to.deep.equal(expectedResult);
    });

    it('should return params with no undefined params', () => {
      const service = new RestComponentLayoutService({
        sitecoreEdgeContextId: contextId,
      });

      const testParams = {
        itemId: '123',
        componentUid: '456',
        dataSourceId: undefined,
        renderingId: '000',
        version: undefined,
        siteName: 'supersite',
        language: 'en',
        variant: 'default',
      };

      const expectedResult = {
        sitecoreContextId: contextId,
        item: testParams.itemId,
        uid: testParams.componentUid,
        renderingItemId: testParams.renderingId,
        sc_lang: testParams.language,
        sc_site: testParams.siteName,
      };

      // eslint-disable-next-line dot-notation
      expect(service['getComponentFetchParams'](testParams)).to.deep.equal(expectedResult);
    });
  });
});
