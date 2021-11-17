/* eslint-disable no-unused-expressions */
import { expect, spy, use } from 'chai';
import spies from 'chai-spies';
import { IncomingMessage, ServerResponse } from 'http';
import { AxiosRequestConfig } from 'axios';
import { AxiosDataFetcher } from '../axios-fetcher';
import { RestLayoutService } from './rest-layout-service';
import { LayoutServiceData, PlaceholderData } from './models';
import nock from 'nock';

use(spies);

describe('RestLayoutService', () => {
  type SetHeader = (name: string, value: unknown) => void;

  afterEach(() => {
    nock.cleanAll();
  });

  it('should fetch layout data', () => {
    nock('http://sctest')
      .get(
        '/sitecore/api/layout/render/jss?item=%2Fstyleguide&sc_apikey=0FBFF61E-267A-43E3-9252-B77E71CEE4BA&sc_site=supersite&sc_lang=en&tracking=true'
      )
      .reply(200, (_, requestBody) => ({
        requestBody: requestBody,
        data: { sitecore: { context: {}, route: { name: 'xxx' } } },
      }));

    const service = new RestLayoutService({
      apiHost: 'http://sctest',
      apiKey: '0FBFF61E-267A-43E3-9252-B77E71CEE4BA',
      siteName: 'supersite',
    });

    return service
      .fetchLayoutData('/styleguide', 'en')
      .then((layoutServiceData: LayoutServiceData & AxiosRequestConfig) => {
        expect(layoutServiceData.data).to.deep.equal({
          sitecore: {
            context: {},
            route: { name: 'xxx' },
          },
        });
      });
  });

  it('should fetch layout data and invoke callbacks', () => {
    nock('http://sctest')
      .get(
        '/sitecore/api/layout/render/jss?item=%2Fhome&sc_apikey=0FBFF61E-267A-43E3-9252-B77E71CEE4BA&sc_site=supersite&sc_lang=da-DK&tracking=false'
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

    const service = new RestLayoutService({
      apiHost: 'http://sctest',
      apiKey: '0FBFF61E-267A-43E3-9252-B77E71CEE4BA',
      siteName: 'supersite',
      tracking: false,
    });

    return service
      .fetchLayoutData('/home', 'da-DK', req, res)
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

  it('should fetch layout data', () => {
    nock('http://sctest')
      .get(
        '/sitecore/api/layout/render/jss?item=%2Fhome&sc_apikey=0FBFF61E-267A-43E3-9252-B77E71CEE4BA&sc_site=supersite&sc_lang=da-DK&tracking=false'
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

    const service = new RestLayoutService({
      apiHost: 'http://sctest',
      apiKey: '0FBFF61E-267A-43E3-9252-B77E71CEE4BA',
      siteName: 'supersite',
      tracking: false,
    });

    return service
      .fetchLayoutData('/home', 'da-DK', req, res)
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

  it('should fetch layout data using custom configuration name', () => {
    nock('http://sctest')
      .get(
        '/sitecore/api/layout/render/listen?item=%2Fhome&sc_apikey=0FBFF61E-267A-43E3-9252-B77E71CEE4BA&sc_site=supersite&sc_lang=da-DK&tracking=false'
      )
      .reply(200, (_, requestBody) => ({
        requestBody: requestBody,
        data: { sitecore: { context: {}, route: { name: 'xxx' } } },
      }));

    const service = new RestLayoutService({
      apiHost: 'http://sctest',
      apiKey: '0FBFF61E-267A-43E3-9252-B77E71CEE4BA',
      siteName: 'supersite',
      configurationName: 'listen',
      tracking: false,
    });

    return service
      .fetchLayoutData('/home', 'da-DK')
      .then((layoutServiceData: LayoutServiceData & AxiosRequestConfig) => {
        expect(layoutServiceData.data).to.deep.equal({
          sitecore: {
            context: {},
            route: { name: 'xxx' },
          },
        });
      });
  });

  it('should fetch layout data using custom fetcher resolver', () => {
    const fetcherSpy = spy((url: string) => {
      return new AxiosDataFetcher().fetch<never>(url);
    });

    nock('http://sctest')
      .get(
        '/sitecore/api/layout/render/jss?item=%2Fhome&sc_apikey=0FBFF61E-267A-43E3-9252-B77E71CEE4BA&sc_site=supersite&sc_lang=da-DK&tracking=true'
      )
      .reply(200, () => ({
        data: { sitecore: { context: {}, route: { name: 'xxx' } } },
      }));

    const service = new RestLayoutService({
      apiHost: 'http://sctest',
      apiKey: '0FBFF61E-267A-43E3-9252-B77E71CEE4BA',
      siteName: 'supersite',
      dataFetcherResolver: () => fetcherSpy,
    });

    return service
      .fetchLayoutData('/home', 'da-DK')
      .then((layoutServiceData: LayoutServiceData) => {
        expect(layoutServiceData).to.deep.equal({
          data: {
            sitecore: {
              context: {},
              route: { name: 'xxx' },
            },
          },
        });

        expect(fetcherSpy).to.be.called.once;
        expect(fetcherSpy).to.be.called.with(
          'http://sctest/sitecore/api/layout/render/jss?item=%2Fhome&sc_apikey=0FBFF61E-267A-43E3-9252-B77E71CEE4BA&sc_site=supersite&sc_lang=da-DK&tracking=true'
        );
      });
  });

  it('should catch 404 when request layout data', () => {
    nock('http://sctest')
      .get(
        '/sitecore/api/layout/render/jss?item=%2Fstyleguide&sc_apikey=0FBFF61E-267A-43E3-9252-B77E71CEE4BA&sc_site=supersite&sc_lang=en&tracking=true'
      )
      .reply(404, () => ({
        data: {
          sitecore: { context: { pageEditing: false, language: 'en' }, route: null },
        },
      }));

    const service = new RestLayoutService({
      apiHost: 'http://sctest',
      apiKey: '0FBFF61E-267A-43E3-9252-B77E71CEE4BA',
      siteName: 'supersite',
    });

    return service
      .fetchLayoutData('/styleguide', 'en')
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
        '/sitecore/api/layout/render/jss?item=%2Fstyleguide&sc_apikey=0FBFF61E-267A-43E3-9252-B77E71CEE4BA&sc_site=supersite&sc_lang=en&tracking=true'
      )
      .reply(401, { message: 'whoops' });

    const service = new RestLayoutService({
      apiHost: 'http://sctest',
      apiKey: '0FBFF61E-267A-43E3-9252-B77E71CEE4BA',
      siteName: 'supersite',
    });

    return service.fetchLayoutData('/styleguide', 'en').catch((error) => {
      expect(error.response.status).to.equal(401);
      expect(error.response.data.message).to.equal('whoops');
    });
  });

  it('should fetch placeholder data', () => {
    nock('http://sctest')
      .get(
        '/sitecore/api/layout/placeholder/jss?placeholderName=superPh&item=%2Fxxx&sc_apikey=0FBFF61E-267A-43E3-9252-B77E71CEE4BA&sc_site=supersite&sc_lang=da-DK&tracking=false'
      )
      .reply(
        200,
        {
          name: 'x1',
          path: 'x1/x2',
          elements: [],
        },
        {
          'set-cookie': 'test-set-cookie-value',
        }
      );

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

    const service = new RestLayoutService({
      apiHost: 'http://sctest',
      apiKey: '0FBFF61E-267A-43E3-9252-B77E71CEE4BA',
      siteName: 'supersite',
      tracking: false,
    });

    return service
      .fetchPlaceholderData('superPh', '/xxx', 'da-DK', req, res)
      .then((placeholderData: PlaceholderData) => {
        expect(placeholderData).to.deep.equal({
          name: 'x1',
          path: 'x1/x2',
          elements: [],
        });
      });
  });

  it('should fetch placeholder data using custom fetcher resolver', () => {
    const fetcherSpy = spy((url: string) => {
      return new AxiosDataFetcher().fetch<never>(url);
    });

    nock('http://sctest')
      .get(
        '/sitecore/api/layout/placeholder/jss?placeholderName=superPh&item=%2Fxxx&sc_apikey=0FBFF61E-267A-43E3-9252-B77E71CEE4BA&sc_site=supersite&sc_lang=da-DK&tracking=true'
      )
      .reply(200, {
        name: 'x1',
        path: 'x1/x2',
        elements: [],
      });

    const service = new RestLayoutService({
      apiHost: 'http://sctest',
      apiKey: '0FBFF61E-267A-43E3-9252-B77E71CEE4BA',
      siteName: 'supersite',
      dataFetcherResolver: () => fetcherSpy,
    });

    return service
      .fetchPlaceholderData('superPh', '/xxx', 'da-DK')
      .then((placeholderData: PlaceholderData) => {
        expect(placeholderData).to.deep.equal({
          name: 'x1',
          path: 'x1/x2',
          elements: [],
        });

        expect(fetcherSpy).to.be.called.once;
        expect(fetcherSpy).to.be.called.with(
          'http://sctest/sitecore/api/layout/placeholder/jss?placeholderName=superPh&item=%2Fxxx&sc_apikey=0FBFF61E-267A-43E3-9252-B77E71CEE4BA&sc_site=supersite&sc_lang=da-DK&tracking=true'
        );
      });
  });
});
