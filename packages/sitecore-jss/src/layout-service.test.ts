import { expect, spy, use } from 'chai';
import spies from 'chai-spies';
import { LayoutService } from './layout-service';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { IncomingMessage, ServerResponse } from 'http';
import { AxiosDataFetcher } from './data-fetcher';

use(spies);

describe('LayoutService', () => {
  let mock: MockAdapter;

  before(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  after(() => {
    mock.restore();
  });

  it('should fetch route data', () => {
    mock.onGet().reply((config) => {
      return [200, { ...config, data: { sitecore: { context: {}, route: { name: 'xxx' } } } }];
    });

    const service = new LayoutService({
      apiHost: 'http://sctest',
      apiKey: '0FBFF61E-267A-43E3-9252-B77E71CEE4BA',
      siteName: 'supersite',
    });

    return service.fetchLayoutData('/styleguide', 'en').then((layoutServiceData: any) => {
      expect(layoutServiceData.url).to.equal(
        'http://sctest/sitecore/api/layout/render/jss?item=%2Fstyleguide&sc_apikey=0FBFF61E-267A-43E3-9252-B77E71CEE4BA&sc_site=supersite&sc_lang=en&tracking=true'
      );
      expect(layoutServiceData.data).to.deep.equal({
        sitecore: {
          context: {},
          route: { name: 'xxx' },
        },
      });
    });
  });

  it('should fetch route data and invoke callbacks', () => {
    mock.onGet().reply((config) => {
      return [
        200,
        {
          ...config,
          data: { sitecore: { context: {}, route: { name: 'xxx' } } },
        },
        {
          'set-cookie': 'test-set-cookie-value',
        },
      ];
    });

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

    const setHeaderSpy: any = spy();

    const res = {
      setHeader: setHeaderSpy,
    } as ServerResponse;

    const service = new LayoutService({
      apiHost: 'http://sctest',
      apiKey: '0FBFF61E-267A-43E3-9252-B77E71CEE4BA',
      siteName: 'supersite',
      tracking: false,
    });

    return service.fetchLayoutData('/home', 'da-DK', req, res).then((layoutServiceData: any) => {
      expect(layoutServiceData.headers['cookie']).to.equal('test-cookie-value');
      expect(layoutServiceData.headers['referer']).to.equal('http://sctest');
      expect(layoutServiceData.headers['user-agent']).to.equal('test-user-agent-value');
      expect(layoutServiceData.headers['X-Forwarded-For']).to.equal('192.168.1.10');

      expect(layoutServiceData.url).to.equal(
        'http://sctest/sitecore/api/layout/render/jss?item=%2Fhome&sc_apikey=0FBFF61E-267A-43E3-9252-B77E71CEE4BA&sc_site=supersite&sc_lang=da-DK&tracking=false'
      );
      expect(layoutServiceData.data).to.deep.equal({
        sitecore: {
          context: {},
          route: { name: 'xxx' },
        },
      });
      expect(setHeaderSpy).to.be.called.with('set-cookie', 'test-set-cookie-value');
    });
  });

  it('should fetch route data and assign headers', () => {
    mock.onGet().reply((config) => {
      return [
        200,
        {
          ...config,
          data: { sitecore: { context: {}, route: { name: 'xxx' } } },
        },
        {
          'set-cookie': 'test-set-cookie-value',
        },
      ];
    });

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

    const setHeaderSpy: any = spy();

    const res = {
      setHeader: setHeaderSpy,
    } as ServerResponse;

    const service = new LayoutService({
      apiHost: 'http://sctest',
      apiKey: '0FBFF61E-267A-43E3-9252-B77E71CEE4BA',
      siteName: 'supersite',
      tracking: false,
    });

    return service.fetchLayoutData('/home', 'da-DK', req, res).then((layoutServiceData: any) => {
      expect(layoutServiceData.headers['cookie']).to.equal('test-cookie-value');
      expect(layoutServiceData.headers['referer']).to.equal('http://sctest');
      expect(layoutServiceData.headers['user-agent']).to.equal('test-user-agent-value');
      expect(layoutServiceData.headers['X-Forwarded-For']).to.equal('192.168.1.10');

      expect(layoutServiceData.url).to.equal(
        'http://sctest/sitecore/api/layout/render/jss?item=%2Fhome&sc_apikey=0FBFF61E-267A-43E3-9252-B77E71CEE4BA&sc_site=supersite&sc_lang=da-DK&tracking=false'
      );
      expect(layoutServiceData.data).to.deep.equal({
        sitecore: {
          context: {},
          route: { name: 'xxx' },
        },
      });
      expect(setHeaderSpy).to.be.called.with('set-cookie', 'test-set-cookie-value');
    });
  });

  it('should fetch route data using custom fetcher', () => {
    const fetcherSpy = spy((url: string) => {
      return new AxiosDataFetcher().fetch(url);
    });

    mock.onGet().reply((config) => {
      return [200, { ...config, data: { sitecore: { context: {}, route: { name: 'xxx' } } } }];
    });

    const service = new LayoutService({
      apiHost: 'http://sctest',
      apiKey: '0FBFF61E-267A-43E3-9252-B77E71CEE4BA',
      siteName: 'supersite',
      dataFetcherResolver: () => fetcherSpy,
    });

    return service.fetchLayoutData('/home', 'da-DK').then((layoutServiceData: any) => {
      expect(layoutServiceData.url).to.equal(
        'http://sctest/sitecore/api/layout/render/jss?item=%2Fhome&sc_apikey=0FBFF61E-267A-43E3-9252-B77E71CEE4BA&sc_site=supersite&sc_lang=da-DK&tracking=true'
      );
      expect(layoutServiceData.data).to.deep.equal({
        sitecore: {
          context: {},
          route: { name: 'xxx' },
        },
      });

      expect(fetcherSpy).to.be.called.once;
      expect(fetcherSpy).to.be.called.with(
        'http://sctest/sitecore/api/layout/render/jss?item=%2Fhome&sc_apikey=0FBFF61E-267A-43E3-9252-B77E71CEE4BA&sc_site=supersite&sc_lang=da-DK&tracking=true'
      );
    });
  });
});
