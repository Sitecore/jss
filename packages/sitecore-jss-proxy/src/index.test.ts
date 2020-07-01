import { expect } from 'chai';
import { removeEmptyAnalyticsCookie, rewriteRequestPath } from './';
import config from './test/config.test';

describe('removeEmptyAnalyticsCookie', () => {
  it('should remove empty analytics cookie from response headers', () => {
    const mockResponse = {
      headers: {
        'set-cookie': [
          'SC_ANALYTICS_GLOBAL_COOKIE=; expires=Wed, 17-Mar-2027 14:28:58 GMT; path=/; HttpOnly',
        ],
      },
    };

    const expected = {
      headers: {
        'set-cookie': [],
      },
    };

    removeEmptyAnalyticsCookie(mockResponse);

    expect(mockResponse).to.eql(expected);
  });
});

describe('rewriteRequestPath', () => {
  describe('when url contains excluded route', () => {
    it('should return original url', () => {
      const url = '/sitecore/layoutsvc/render/jss?item=/&sc_apikey={GUID}';
      const expected = url;
      const mockRequest = {
        headers: {
          'accept-encoding': 'gzip or whatever',
        },
      };

      const actual = rewriteRequestPath(url, mockRequest, config);
      expect(actual).to.equal(expected);
    });
  });
  describe('when url contains excluded route with url encoded chars', () => {
    it('should return original url', () => {
      const url = '/sitecore%20modules/foo.txt';
      const expected = '/sitecore%20modules/foo.txt';
      const mockRequest = {
        headers: {
          'accept-encoding': 'gzip or whatever',
        },
      };

      const actual = rewriteRequestPath(url, mockRequest, config);
      expect(actual).to.equal(expected);
    });
  });
  describe('when url does not contain layout service route', () => {
    it('should return route prefixed with layout service route', () => {
      const url = '/about';
      const expected = '/sitecore/layoutsvc/render/jss?item=%2Fabout&sc_apikey={GUID}';
      const mockRequest = {
        headers: {
          'accept-encoding': 'gzip or whatever',
        },
      };

      const actual = rewriteRequestPath(url, mockRequest, config);
      expect(actual).to.equal(expected);
    });
    it('should return route prefixed with layout service route when encoded chars are part of route', () => {
      const url = '/about%20us';
      const expected = '/sitecore/layoutsvc/render/jss?item=%2Fabout%20us&sc_apikey={GUID}';
      const mockRequest = {
        headers: {
          'accept-encoding': 'gzip or whatever',
        },
      };

      const actual = rewriteRequestPath(url, mockRequest, config);
      expect(actual).to.equal(expected);
    });
    describe('when url contains a querystring', () => {
      it('should return route prefixed with layout service route and with querystring appended', () => {
        const url = '/about?sc_camp=123456%2078';
        const expected =
          '/sitecore/layoutsvc/render/jss?item=%2Fabout&sc_apikey={GUID}&sc_camp=123456%2078';

        const req = {
          query: { sc_camp: '123456 78' },
          headers: {
            'accept-encoding': 'gzip or whatever',
          },
        };

        const actual = rewriteRequestPath(url, req, config);

        expect(actual).to.equal(expected);
      });
    });
    describe('when a route parsing function is provided', () => {
      it('should use the item path and language provided by the function', () => {
        const url = '/lorem?sc_camp=123456';
        const expected =
          '/sitecore/layoutsvc/render/jss?item=%2Fipsum%2Fdolor&sc_apikey={GUID}&sc_lang=zz-ZZ&sc_camp=123456';

        const req = {
          query: { sc_camp: '123456' },
          headers: {
            'accept-encoding': 'gzip or whatever',
          },
        };
        const parseRouteUrl = () => ({
          sitecoreRoute: 'ipsum/dolor',
          lang: 'zz-ZZ',
        });
        const actual = rewriteRequestPath(url, req, config, parseRouteUrl);
        expect(actual).to.equal(expected);
      });
      it('should use the item path and language provided by the function with encoded chars', () => {
        const url = '/lorem%20ipsum?sc_camp=123456%2078';
        const expected =
          '/sitecore/layoutsvc/render/jss?item=%2Florem%20ipsum%2Fdolor&sc_apikey={GUID}&sc_lang=zz-ZZ&sc_camp=123456%2078';

        const req = {
          query: { sc_camp: '123456 78' },
          headers: {
            'accept-encoding': 'gzip or whatever',
          },
        };
        const parseRouteUrl = (incomingUrl: string) => ({
          sitecoreRoute: `${incomingUrl}/dolor`,
          lang: 'zz-ZZ',
        });
        const actual = rewriteRequestPath(url, req, config, parseRouteUrl);
        expect(actual).to.equal(expected);
      });
    });
  });
});
