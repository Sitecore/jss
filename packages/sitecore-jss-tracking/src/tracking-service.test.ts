/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {} from 'mocha';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { expect } from 'chai';
import { RouteData } from '@sitecore-jss/sitecore-jss';
import { TrackingService, setTestAdapter } from './tracking-service';

describe('TrackingService', () => {
  let mock: MockAdapter;
  const wind = (global as any).window;

  before(() => {
    mock = new MockAdapter(axios);
    setTestAdapter(mock.adapter());
  });

  beforeEach(() => {
    (global as any).window = {
      location: { pathname: '/page', search: '' },
    };
  });

  afterEach(() => {
    mock.reset();
  });

  after(() => {
    setTestAdapter(null);
    mock.restore();

    if (wind) {
      (global as any).window = wind;
    } else {
      delete (global as any).window;
    }
  });

  describe('trackCurrentPage', () => {
    [
      ['', '/sitecore/api/track/pageview?sc_apikey=MyKey&sc_site=MySite'],
      ['?', '/sitecore/api/track/pageview?sc_apikey=MyKey&sc_site=MySite'],
      [
        '?sc_camp=1111&some=value&sc_trk=5555',
        '/sitecore/api/track/pageview?sc_apikey=MyKey&sc_site=MySite&sc_camp=1111&sc_trk=5555',
      ],
    ].forEach(([queryString, expectedUrl]) => {
      it(`should track page with query string \'${queryString}\'`, () => {
        // arrange
        mock.onPost().reply(() => [200, {}]);

        window.location.search = queryString;
        window.location.pathname = '/page';

        const service = new TrackingService({
          apiKey: 'MyKey',
          siteName: 'MySite',
        });

        const routeData = createRouteData('itemId', 'deviceId', 'ja-JP');

        // act
        return service.trackCurrentPage({}, routeData).then(() => {
          // assert
          expect(mock.history.post).to.have.length(1);

          const post = mock.history.post[0];
          expect(post.url).to.equal(expectedUrl);
          expect(post.withCredentials, 'with credentials is not true').to.be.true;

          const body = JSON.parse(post.data);
          expect(body.url).to.equal('/page' + queryString);
          expect(body.itemId).to.equal('itemId');
          expect(body.layoutDeviceId).to.equal('deviceId');
          expect(body.language).to.equal('ja-JP');
        });
      });
    });

    it('should skip optional apiKey param', () => {
      // arrange
      mock.onPost().reply(() => [200, {}]);

      window.location.pathname = '/page';

      const service = new TrackingService({});

      // act
      return service.trackCurrentPage({}, createRouteData(undefined)).then(() => {
        // assert
        expect(mock.history.post).to.have.length(1);

        const body = JSON.parse(mock.history.post[0].data);
        expect(body.url).to.equal('/page');
      });
    });

    it('should skip optional itemId param', () => {
      // arrange
      mock.onPost().reply(() => [200, {}]);

      window.location.pathname = '/page';

      const service = new TrackingService({ host: 'https://www.myhost.net' });

      // act
      return service.trackCurrentPage({}, createRouteData(undefined)).then(() => {
        // assert
        expect(mock.history.post).to.have.length(1);

        const post = mock.history.post[0];
        const body = JSON.parse(post.data);
        expect(body.url).to.equal('/page');
        expect(post.data).not.to.contain('itemId');
      });
    });

    it('should skip optional layoutDeviceId param', () => {
      // arrange
      mock.onPost().reply(() => [200, {}]);

      window.location.pathname = '/page';

      const service = new TrackingService({ host: 'https://www.myhost.net' });

      // act
      return service.trackCurrentPage({}, createRouteData('myItemId', undefined)).then(() => {
        // assert
        expect(mock.history.post).to.have.length(1);

        const post = mock.history.post[0];
        const body = JSON.parse(post.data);
        expect(body.url).to.equal('/page');
        expect(body.itemId).to.equal('myItemId');
        expect(post.data).not.to.contain('layoutDeviceId');
      });
    });

    it('should skip optional itemLanguage param', () => {
      // arrange
      mock.onPost().reply(() => [200, {}]);

      window.location.pathname = '/page';

      const service = new TrackingService({ host: 'https://www.myhost.net' });

      const routeData = createRouteData('myItemId', undefined, undefined);

      // act
      return service.trackCurrentPage({}, routeData).then(() => {
        // assert
        expect(mock.history.post).to.have.length(1);

        const post = mock.history.post[0];
        const body = JSON.parse(post.data);
        expect(body.url).to.equal('/page');
        expect(body.itemId).to.equal('myItemId');
        expect(post.data).not.to.contain('language');
      });
    });

    it('should take site name from layout even if it passed to constructor', () => {
      // arrange
      mock.onPost().reply(() => [200, {}]);

      window.location.pathname = '/page';

      const service = new TrackingService({
        host: 'https://www.myhost.net',
        siteName: 'defaultSite',
      });

      const context = { site: { name: 'MySite' } };

      // act
      return service.trackCurrentPage(context, createRouteData('itemId')).then(() => {
        // assert
        expect(mock.history.post).to.have.length(1);

        expect(mock.history.post[0].url).to.equal(
          'https://www.myhost.net/sitecore/api/track/pageview?sc_site=MySite'
        );
      });
    });

    it('should trasfer the specified querystring params of the current request', () => {
      // arrange
      mock.onPost().reply(() => [200, {}]);

      window.location.search = '?sc_camp=1111&par1=my value1&par2=my%20value2&sc_trk=5555';

      const service = new TrackingService({
        host: 'https://www.myhost.net',
        currentPageParamsToTrack: ['par1', 'par2'],
      });

      // act
      return service.trackCurrentPage({}, createRouteData('itemId')).then(() => {
        // assert
        expect(mock.history.post).to.have.length(1);

        expect(mock.history.post[0].url).to.equal(
          'https://www.myhost.net/sitecore/api/track/pageview?par1=my%20value1&par2=my%20value2'
        );
      });
    });

    it('should use host and serviceUrl passed in options', () => {
      // arrange
      mock.onPost().reply(() => [200, {}]);

      const service = new TrackingService({
        host: 'https://www.myhost.net',
        serviceUrl: '/my/path',
      });

      // act
      return service.trackCurrentPage({}, createRouteData('itemId')).then(() => {
        // assert
        expect(mock.history.post).to.have.length(1);

        expect(mock.history.post[0].url).to.equal('https://www.myhost.net/my/path/pageview');
      });
    });

    it('should use custom fetcher passed in options', () => {
      // arrange
      mock.onPost().reply(() => [200, {}]);

      const service = new TrackingService({
        fetcher: (url, data) =>
          axios({
            url: '/myfetcher' + url,
            method: data ? 'POST' : 'GET',
            data,
            withCredentials: true,
          }),
      });

      // act
      return service.trackCurrentPage({}, createRouteData('myItemId')).then(() => {
        // assert
        expect(mock.history.post).to.have.length(1);

        const post = mock.history.post[0];
        expect(post.url).to.equal('/myfetcher/sitecore/api/track/pageview');
        expect(JSON.parse(post.data).itemId).to.equal('myItemId');
      });
    });
  });

  describe('trackPage', () => {
    it('should track page', () => {
      // arrange
      mock.onPost().reply(() => [200, {}]);

      const service = new TrackingService({
        apiKey: 'MyKey',
        siteName: 'MySite',
      });

      // act
      return service.trackPage({ url: '/page?a=1' }, { extraParam: 'extra' }).then(() => {
        // assert
        expect(mock.history.post).to.have.length(1);

        const post = mock.history.post[0];
        expect(post.url).to.equal(
          '/sitecore/api/track/pageview?sc_apikey=MyKey&sc_site=MySite&extraParam=extra'
        );

        expect(post.withCredentials, 'with credentials is not true').to.be.true;
        expect(post.data).to.equal('{"url":"/page?a=1"}');
      });
    });
  });

  const createRouteData = (itemId?: string, deviceId?: string, language?: string): RouteData => {
    return {
      name: '',
      itemId: itemId,
      itemLanguage: language,
      deviceId: deviceId,
      placeholders: {},
    };
  };
});
