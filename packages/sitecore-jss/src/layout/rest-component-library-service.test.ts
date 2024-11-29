/* eslint-disable no-unused-expressions */
import { expect, spy, use } from 'chai';
import spies from 'chai-spies';
import { IncomingMessage, ServerResponse } from 'http';
import { AxiosRequestConfig } from 'axios';
import { AxiosDataFetcher } from '../axios-fetcher';
import {
  ComponentLibraryRequestParams,
  RestComponentLibraryService,
} from './rest-component-library-service';
import { EditMode, LayoutServiceData } from './models';
import nock from 'nock';

use(spies);

describe('RestLayoutService', () => {
  type SetHeader = (name: string, value: unknown) => void;

  const defaultTestInput: ComponentLibraryRequestParams = {
    itemId: '123',
    componentUid: '456',
  };

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
    nock('http://sctest')
      .get(
        '/sitecore/api/layout/component/jss?sc_apikey=0FBFF61E-267A-43E3-9252-B77E71CEE4BA&item=123&uid=456&sc_site=supersite&sc_lang=en&tracking=true'
      )
      .reply(200, (_, requestBody) => ({
        requestBody: requestBody,
        data: defaultTestData,
      }));

    const service = new RestComponentLibraryService({
      apiHost: 'http://sctest',
      apiKey: '0FBFF61E-267A-43E3-9252-B77E71CEE4BA',
      siteName: 'supersite',
    });

    return service
      .fetchComponentData(defaultTestInput)
      .then((layoutServiceData: LayoutServiceData & AxiosRequestConfig) => {
        expect(layoutServiceData.data).to.deep.equal(defaultTestData);
      });
  });

  it('should fetch component data and invoke callbacks', () => {
    nock('http://sctest')
      .get(
        '/sitecore/api/layout/component/jss?sc_apikey=0FBFF61E-267A-43E3-9252-B77E71CEE4BA&item=123&uid=456&sc_site=supersite&sc_lang=en&tracking=false'
      )
      .reply(200, (_, requestBody) => ({
        requestBody: requestBody,
        data: { sitecore: { context: {}, route: { name: 'xxx' } } },
        headers: {
          Accept: 'application/json, text/plain, */*',
          cookie: 'test-cookie-value',
          referer: 'http://sctest',
          'user-agent': 'test-user-agent-value',
          'X-Forwarded-For': '192.168.1.10',
        },
      }));

    const req = {
      connection: {
        remoteAddress: '192.168.1.10',
      },
      headers: {
        cookie: 'test-cookie-value',
        referer: 'http://sctest',
        'user-agent': 'test-user-agent-value',
      },
    } as IncomingMessage;

    const setHeaderSpy: SetHeader = spy();

    const res = {
      setHeader: setHeaderSpy,
    } as ServerResponse;

    const service = new RestComponentLibraryService({
      apiHost: 'http://sctest',
      apiKey: '0FBFF61E-267A-43E3-9252-B77E71CEE4BA',
      siteName: 'supersite',
      tracking: false,
    });

    return service
      .fetchComponentData(defaultTestInput, req, res)
      .then((layoutServiceData: LayoutServiceData & AxiosRequestConfig) => {
        expect(layoutServiceData.headers.cookie).to.equal('test-cookie-value');
        expect(layoutServiceData.headers.referer).to.equal('http://sctest');
        expect(layoutServiceData.headers['user-agent']).to.equal('test-user-agent-value');
        expect(layoutServiceData.headers['X-Forwarded-For']).to.equal('192.168.1.10');
        expect(layoutServiceData.data).to.deep.equal({
          sitecore: {
            context: {},
            route: { name: 'xxx' },
          },
        });
      });
  });

  it('should fetch component data when optional params provided', () => {
    const testInput: ComponentLibraryRequestParams = {
      ...defaultTestInput,
      dataSourceId: '789',
    };

    const testUnexpectedData = {
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

    nock('http://sctest')
      .get(
        '/sitecore/api/layout/component/jss?sc_apikey=0FBFF61E-267A-43E3-9252-B77E71CEE4BA&item=123&uid=456&dataSourceId=789&sc_site=supersite&sc_lang=en&tracking=true'
      )
      .reply(200, (_, requestBody) => ({
        requestBody: requestBody,
        data: testExpectedData,
        headers: {
          Accept: 'application/json, text/plain, */*',
          cookie: 'test-cookie-value',
          referer: 'http://sctest',
          'user-agent': 'test-user-agent-value',
          'X-Forwarded-For': '192.168.1.10',
        },
      }))
      .get('/sitecore/api/layout/component/jss')
      .query(true)
      .reply(200, (_, requestBody) => ({
        requestBody: requestBody,
        data: testUnexpectedData,
        headers: {
          Accept: 'application/json, text/plain, */*',
          cookie: 'test-cookie-value',
          referer: 'http://sctest',
          'user-agent': 'test-user-agent-value',
          'X-Forwarded-For': '192.168.1.10',
        },
      }));

    const req = {
      connection: {
        remoteAddress: '192.168.1.10',
      },
      headers: {
        cookie: 'test-cookie-value',
        referer: 'http://sctest',
        'user-agent': 'test-user-agent-value',
      },
    } as IncomingMessage;

    const setHeaderSpy: SetHeader = spy();

    const res = {
      setHeader: setHeaderSpy,
    } as ServerResponse;

    const service = new RestComponentLibraryService({
      apiHost: 'http://sctest',
      apiKey: '0FBFF61E-267A-43E3-9252-B77E71CEE4BA',
      siteName: 'supersite',
    });

    return service
      .fetchComponentData(testInput, req, res)
      .then((layoutServiceData: LayoutServiceData & AxiosRequestConfig) => {
        expect(layoutServiceData.headers.cookie).to.equal('test-cookie-value');
        expect(layoutServiceData.headers.referer).to.equal('http://sctest');
        expect(layoutServiceData.headers['user-agent']).to.equal('test-user-agent-value');
        expect(layoutServiceData.headers['X-Forwarded-For']).to.equal('192.168.1.10');
        expect(layoutServiceData.data).to.deep.equal(testExpectedData);
      });
  });

  it('should fetch component data with custom site name', () => {
    const testInput: ComponentLibraryRequestParams = {
      ...defaultTestInput,
      siteName: 'mysite',
    };

    const testUnexpectedData = {
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

    nock('http://sctest')
      .get(
        '/sitecore/api/layout/component/jss?sc_apikey=0FBFF61E-267A-43E3-9252-B77E71CEE4BA&item=123&uid=456&sc_site=mysite&sc_lang=en&tracking=true'
      )
      .reply(200, (_, requestBody) => ({
        requestBody: requestBody,
        data: testExpectedData,
        headers: {
          Accept: 'application/json, text/plain, */*',
          cookie: 'test-cookie-value',
          referer: 'http://sctest',
          'user-agent': 'test-user-agent-value',
          'X-Forwarded-For': '192.168.1.10',
        },
      }))
      .get('/sitecore/api/layout/component/jss')
      .query(true)
      .reply(200, (_, requestBody) => ({
        requestBody: requestBody,
        data: testUnexpectedData,
        headers: {
          Accept: 'application/json, text/plain, */*',
          cookie: 'test-cookie-value',
          referer: 'http://sctest',
          'user-agent': 'test-user-agent-value',
          'X-Forwarded-For': '192.168.1.10',
        },
      }));

    const req = {
      connection: {
        remoteAddress: '192.168.1.10',
      },
      headers: {
        cookie: 'test-cookie-value',
        referer: 'http://sctest',
        'user-agent': 'test-user-agent-value',
      },
    } as IncomingMessage;

    const setHeaderSpy: SetHeader = spy();

    const res = {
      setHeader: setHeaderSpy,
    } as ServerResponse;

    const service = new RestComponentLibraryService({
      apiHost: 'http://sctest',
      apiKey: '0FBFF61E-267A-43E3-9252-B77E71CEE4BA',
      siteName: 'supersite',
    });

    return service
      .fetchComponentData(testInput, req, res)
      .then((layoutServiceData: LayoutServiceData & AxiosRequestConfig) => {
        expect(layoutServiceData.headers.cookie).to.equal('test-cookie-value');
        expect(layoutServiceData.headers.referer).to.equal('http://sctest');
        expect(layoutServiceData.headers['user-agent']).to.equal('test-user-agent-value');
        expect(layoutServiceData.headers['X-Forwarded-For']).to.equal('192.168.1.10');
        expect(layoutServiceData.data).to.deep.equal(testExpectedData);
      });
  });

  it('should fetch layout data using custom configuration name', () => {
    nock('http://sctest')
      .get(
        '/sitecore/api/layout/component/listen?sc_apikey=0FBFF61E-267A-43E3-9252-B77E71CEE4BA&item=123&uid=456&sc_site=supersite&sc_lang=en&tracking=false'
      )
      .reply(200, (_, requestBody) => ({
        requestBody: requestBody,
        data: defaultTestData,
      }));

    const service = new RestComponentLibraryService({
      apiHost: 'http://sctest',
      apiKey: '0FBFF61E-267A-43E3-9252-B77E71CEE4BA',
      siteName: 'supersite',
      configurationName: 'listen',
      tracking: false,
    });

    return service
      .fetchComponentData(defaultTestInput)
      .then((layoutServiceData: LayoutServiceData & AxiosRequestConfig) => {
        expect(layoutServiceData.data).to.deep.equal(defaultTestData);
      });
  });

  it('should fetch layout data using custom fetcher resolver', () => {
    const fetcherSpy = spy((url: string) => {
      return new AxiosDataFetcher().fetch<never>(url);
    });

    nock('http://sctest')
      .get(
        '/sitecore/api/layout/component/jss?sc_apikey=0FBFF61E-267A-43E3-9252-B77E71CEE4BA&item=123&uid=456&sc_site=supersite&sc_lang=en&tracking=true'
      )
      .reply(200, () => ({
        data: defaultTestData,
      }));

    const service = new RestComponentLibraryService({
      apiHost: 'http://sctest',
      apiKey: '0FBFF61E-267A-43E3-9252-B77E71CEE4BA',
      siteName: 'supersite',
      dataFetcherResolver: () => fetcherSpy,
    });

    return service
      .fetchComponentData(defaultTestInput)
      .then((layoutServiceData: LayoutServiceData) => {
        expect(layoutServiceData).to.deep.equal({ data: defaultTestData });

        expect(fetcherSpy).to.be.called.once;
        expect(fetcherSpy).to.be.called.with(
          'http://sctest/sitecore/api/layout/component/jss?sc_apikey=0FBFF61E-267A-43E3-9252-B77E71CEE4BA&item=123&uid=456&sc_site=supersite&sc_lang=en&tracking=true'
        );
      });
  });

  it('should catch 404 when request layout data', () => {
    nock('http://sctest')
      .get(
        '/sitecore/api/layout/component/jss?sc_apikey=0FBFF61E-267A-43E3-9252-B77E71CEE4BA&item=123&uid=456&sc_site=supersite&sc_lang=en&tracking=true'
      )
      .reply(404, () => ({
        data: {
          sitecore: { context: { pageEditing: false, language: 'en' }, route: null },
        },
      }));

    const service = new RestComponentLibraryService({
      apiHost: 'http://sctest',
      apiKey: '0FBFF61E-267A-43E3-9252-B77E71CEE4BA',
      siteName: 'supersite',
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
    nock('http://sctest')
      .get(
        '/sitecore/api/layout/component/jss?sc_apikey=0FBFF61E-267A-43E3-9252-B77E71CEE4BA&item=123&uid=456&sc_site=supersite&sc_lang=en&tracking=true'
      )
      .reply(401, { message: 'whoops' });

    const service = new RestComponentLibraryService({
      apiHost: 'http://sctest',
      apiKey: '0FBFF61E-267A-43E3-9252-B77E71CEE4BA',
      siteName: 'supersite',
    });

    return service.fetchComponentData(defaultTestInput).catch((error) => {
      expect(error.response.status).to.equal(401);
      expect(error.response.data.message).to.equal('whoops');
    });
  });

  describe('getComponentFetchParams', () => {
    it('should return params', () => {
      const service = new RestComponentLibraryService({
        apiHost: 'http://sctest',
        apiKey: '0FBFF61E-267A-43E3-9252-B77E71CEE4BA',
        siteName: 'supersite',
      });
      const testParams = {
        itemId: '123',
        componentUid: '456',
        dataSourceId: '789',
        renderingId: '000',
        version: '1',
        siteName: 'notsupersite',
        language: 'en',
        editMode: EditMode.Metadata,
        variant: 'default',
      };

      const expectedResult = {
        sc_apikey: '0FBFF61E-267A-43E3-9252-B77E71CEE4BA',
        item: testParams.itemId,
        uid: testParams.componentUid,
        dataSourceId: testParams.dataSourceId,
        renderingItemId: testParams.renderingId,
        version: testParams.version,
        sc_site: testParams.siteName,
        sc_lang: testParams.language,
        sc_mode: testParams.editMode,
        sc_variant: testParams.variant,
        tracking: true,
      };

      // eslint-disable-next-line dot-notation
      expect(service['getComponentFetchParams'](testParams)).to.deep.equal(expectedResult);
    });

    it('should return params with no undefined params', () => {
      const service = new RestComponentLibraryService({
        apiHost: 'http://sctest',
        apiKey: '0FBFF61E-267A-43E3-9252-B77E71CEE4BA',
        siteName: 'supersite',
      });
      const testParams = {
        itemId: '123',
        componentUid: '456',
        dataSourceId: undefined,
        renderingId: '000',
        version: undefined,
        siteName: undefined,
        language: 'en',
        editMode: EditMode.Metadata,
        variant: 'default',
      };

      const expectedResult = {
        sc_apikey: '0FBFF61E-267A-43E3-9252-B77E71CEE4BA',
        item: testParams.itemId,
        uid: testParams.componentUid,
        renderingItemId: testParams.renderingId,
        sc_lang: testParams.language,
        sc_mode: testParams.editMode,
        sc_variant: testParams.variant,
        tracking: true,
      };

      // eslint-disable-next-line dot-notation
      expect(service['getComponentFetchParams'](testParams)).to.deep.equal(expectedResult);
    });
  });
});
