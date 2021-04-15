/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-expressions */

import { expect, spy, use } from 'chai';
import spies from 'chai-spies';
import nock from 'nock';
import { IncomingMessage, ServerResponse } from 'http';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { AxiosDataFetcher } from '../axios-fetcher';
import { RestLayoutService } from './rest-layout-service';
import { GraphQLLayoutService } from './graphql-layout-service';
import { LayoutServiceData, PlaceholderData } from './models';

use(spies);

describe('LayoutService', () => {
  describe('RestLayoutService', () => {
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

    it('should fetch layout data', () => {
      mock.onGet().reply((config) => {
        return [200, { ...config, data: { sitecore: { context: {}, route: { name: 'xxx' } } } }];
      });

      const service = new RestLayoutService({
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

    it('should fetch layout data and invoke callbacks', () => {
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

      const service = new RestLayoutService({
        apiHost: 'http://sctest',
        apiKey: '0FBFF61E-267A-43E3-9252-B77E71CEE4BA',
        siteName: 'supersite',
        tracking: false,
      });

      return service.fetchLayoutData('/home', 'da-DK', req, res).then((layoutServiceData: any) => {
        expect(layoutServiceData.headers.cookie).to.equal('test-cookie-value');
        expect(layoutServiceData.headers.referer).to.equal('http://sctest');
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

    it('should fetch layout data', () => {
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

      const service = new RestLayoutService({
        apiHost: 'http://sctest',
        apiKey: '0FBFF61E-267A-43E3-9252-B77E71CEE4BA',
        siteName: 'supersite',
        tracking: false,
      });

      return service.fetchLayoutData('/home', 'da-DK', req, res).then((layoutServiceData: any) => {
        expect(layoutServiceData.headers.cookie).to.equal('test-cookie-value');
        expect(layoutServiceData.headers.referer).to.equal('http://sctest');
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

    it('should fetch layout data using custom fetcher resolver', () => {
      const fetcherSpy = spy((url: string) => {
        return new AxiosDataFetcher().fetch<any>(url);
      });

      mock.onGet().reply(() => {
        return [200, { sitecore: { context: {}, route: { name: 'xxx' } } }];
      });

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

    it('should catch 404 when request layout data', () => {
      mock.onGet().reply(() => {
        return [
          404,
          {
            sitecore: {
              context: {
                pageEditing: false,
                language: 'en',
              },
              route: null,
            },
          },
        ];
      });

      const service = new RestLayoutService({
        apiHost: 'http://sctest',
        apiKey: '0FBFF61E-267A-43E3-9252-B77E71CEE4BA',
        siteName: 'supersite',
      });

      return service.fetchLayoutData('/styleguide', 'en').then((layoutServiceData: any) => {
        expect(layoutServiceData).to.deep.equal({
          sitecore: {
            context: {
              pageEditing: false,
              language: 'en',
            },
            route: null,
          },
        });
      });
    });

    it('should allow non 404 errors through', () => {
      mock.onGet().reply(() => {
        return [401, { message: 'whoops' }];
      });

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
      mock.onGet().reply(() => {
        return [
          200,
          {
            name: 'x1',
            path: 'x1/x2',
            elements: [],
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
          expect(setHeaderSpy).to.be.called.with('set-cookie', 'test-set-cookie-value');
        });
    });

    it('should fetch placeholder data using custom fetcher resolver', () => {
      const fetcherSpy = spy((url: string) => {
        return new AxiosDataFetcher().fetch<any>(url);
      });

      mock.onGet().reply(() => {
        return [
          200,
          {
            name: 'x1',
            path: 'x1/x2',
            elements: [],
          },
        ];
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

  describe('GraphQLLayoutService', () => {
    const apiKey = '0FBFF61E-267A-43E3-9252-B77E71CEE4BA';

    afterEach(() => {
      nock.cleanAll();
    });

    it('should fetch layout data', async () => {
      nock('http://sctest', {
        reqheaders: {
          sc_apikey: apiKey,
        },
      })
        .post('/graphql', (body) => {
          return (
            body.query.replace(/\n|\s/g, '') ===
            'query{layout(site:"supersite",routePath:"/styleguide",language:"da-DK"){item{rendered}}}'
          );
        })
        .reply(200, {
          data: {
            layout: {
              item: {
                rendered: {
                  sitecore: {
                    context: {
                      pageEditing: false,
                      site: { name: 'JssNextWeb' },
                    },
                    route: {
                      name: 'styleguide',
                      layoutId: 'xxx',
                    },
                  },
                },
              },
            },
          },
        });

      const service = new GraphQLLayoutService({
        endpoint: 'http://sctest/graphql',
        apiKey: apiKey,
        siteName: 'supersite',
      });

      const data = await service.fetchLayoutData('/styleguide', 'da-DK');

      expect(data).to.deep.equal({
        sitecore: {
          context: {
            pageEditing: false,
            site: { name: 'JssNextWeb' },
          },
          route: {
            name: 'styleguide',
            layoutId: 'xxx',
          },
        },
      });
    });

    it('should fetch layout data if locale is not provided', async () => {
      nock('http://sctest', {
        reqheaders: {
          sc_apikey: apiKey,
        },
      })
        .post('/graphql', (body) => {
          return (
            body.query.replace(/\n|\s/g, '') ===
            'query{layout(site:"supersite",routePath:"/styleguide"){item{rendered}}}'
          );
        })
        .reply(200, {
          data: {
            layout: {
              item: {
                rendered: {
                  sitecore: {
                    context: {
                      pageEditing: false,
                      site: { name: 'JssNextWeb' },
                    },
                    route: {
                      name: 'styleguide',
                      layoutId: 'xxx',
                    },
                  },
                },
              },
            },
          },
        });

      const service = new GraphQLLayoutService({
        endpoint: 'http://sctest/graphql',
        apiKey: apiKey,
        siteName: 'supersite',
      });

      const data = await service.fetchLayoutData('/styleguide');

      expect(data).to.deep.equal({
        sitecore: {
          context: {
            pageEditing: false,
            site: { name: 'JssNextWeb' },
          },
          route: {
            name: 'styleguide',
            layoutId: 'xxx',
          },
        },
      });
    });

    it('should fetch layout data using custom layout query', async () => {
      nock('http://sctest', {
        reqheaders: {
          sc_apikey: apiKey,
        },
      })
        .post('/graphql', (body) => {
          return (
            body.query.replace(/\n|\s/g, '') ===
            'query{layout111(site:"supersite",route:"/styleguide",language:"en"){item{rendered}}}'
          );
        })
        .reply(200, {
          data: {
            layout: {
              item: {
                rendered: {
                  sitecore: {
                    context: {
                      pageEditing: false,
                      site: { name: 'JssNextWeb' },
                    },
                    route: {
                      name: 'styleguide',
                      layoutId: 'xxx',
                    },
                  },
                },
              },
            },
          },
        });

      const service = new GraphQLLayoutService({
        endpoint: 'http://sctest/graphql',
        apiKey: apiKey,
        siteName: 'supersite',
        formatLayoutQuery: (siteName, itemPath, locale) =>
          `layout111(site:"${siteName}",route:"${itemPath}",language:"${locale || 'en'}")`,
      });

      const data = await service.fetchLayoutData('/styleguide');

      expect(data).to.deep.equal({
        sitecore: {
          context: {
            pageEditing: false,
            site: { name: 'JssNextWeb' },
          },
          route: {
            name: 'styleguide',
            layoutId: 'xxx',
          },
        },
      });
    });

    it('should handle not found', async () => {
      nock('http://sctest')
        .post('/graphql', (body) => {
          return (
            body.query.replace(/\n|\s/g, '') ===
            'query{layout(site:"supersite",routePath:"/styleguide",language:"da-DK"){item{rendered}}}'
          );
        })
        .reply(200, {
          data: {
            layout: null,
          },
        });

      const service = new GraphQLLayoutService({
        endpoint: 'http://sctest/graphql',
        siteName: 'supersite',
        apiKey: apiKey,
      });

      const data = await service.fetchLayoutData('/styleguide', 'da-DK');

      expect(data).to.deep.equal({
        sitecore: {
          context: {
            pageEditing: false,
            language: 'da-DK',
          },
          route: null,
        },
      });
    });

    it('should return error', async () => {
      nock('http://sctest', {
        reqheaders: {
          sc_apikey: apiKey,
        },
      })
        .post('/graphql')
        .reply(401, {
          error: 'whoops',
        });

      const service = new GraphQLLayoutService({
        endpoint: 'http://sctest/graphql',
        apiKey: apiKey,
        siteName: 'supersite',
      });

      await service.fetchLayoutData('/styleguide', 'da-DK').catch((error) => {
        expect(error.response.status).to.equal(401);
        expect(error.response.error).to.equal('whoops');
      });
    });
  });
});
