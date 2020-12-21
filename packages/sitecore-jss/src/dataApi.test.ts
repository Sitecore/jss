/* eslint-disable no-unused-expressions */
/* eslint-disable  @typescript-eslint/no-explicit-any */

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { expect } from 'chai';
import { fetchPlaceholderData, fetchRouteData } from './dataApi';
import { HttpJsonFetcher } from './httpClientInterface';

// note: axios needs to use `withCredentials: true` in order for Sitecore cookies to be included in CORS requests
// which is necessary for analytics and such
const axiosFetcher: HttpJsonFetcher<any> = (url, data) =>
  axios({
    url,
    method: data ? 'POST' : 'GET',
    data,
    withCredentials: true,
  });

describe('fetchRouteData', () => {
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

  it('should fetch with host', () => {
    const expectedUrl = 'https://www.myhost.net/sitecore/api/layout/render/jss?item=%2Fabout';

    // configure 'GET' requests to return config options
    mock.onGet().reply((config) => {
      // config contains axios client config options, e.g. url, withCredentials, etc...
      return [200, { ...config }];
    });

    return fetchRouteData('/about', {
      layoutServiceConfig: { host: 'https://www.myhost.net' },
      fetcher: axiosFetcher,
    }).then((data) => {
      // testData should contain the 'config' object from the mock request
      const testData = data as any;
      expect(testData.url).to.equal(expectedUrl);
      expect(testData.withCredentials, 'with credentials is not true').to.be.true;
    });
  });

  it('should fetch with querystring', () => {
    const expectedUrl =
      'https://www.myhost.net/sitecore/api/layout/render/jss?item=%2Fabout&sc_camp=123456';

    // configure 'GET' requests to return config options
    mock.onGet().reply((config) => {
      // config contains axios client config options, e.g. url, withCredentials, etc...
      return [200, { ...config }];
    });

    return fetchRouteData('/about', {
      fetcher: axiosFetcher,
      layoutServiceConfig: { host: 'https://www.myhost.net' },
      querystringParams: { sc_camp: 123456 },
    }).then((data) => {
      // testData should contain the 'config' object from the mock request
      const testData = data as any;
      expect(testData.url).to.equal(expectedUrl);
      expect(testData.withCredentials, 'with credentials is not true').to.be.true;
    });
  });
});

describe('fetchPlaceholderData', () => {
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

  it('should fetch with host', () => {
    const expectedUrl =
      'https://www.myhost.net/sitecore/api/layout/placeholder/jss?placeholderName=%2F%24root%2Fmain&item=%2Fabout';

    // configure 'GET' requests to return config options
    mock.onGet().reply((config) => {
      // config contains axios client config options, e.g. url, withCredentials, etc...
      return [200, { elements: [{ ...config }] }];
    });

    return fetchPlaceholderData('/$root/main', '/about', {
      layoutServiceConfig: { host: 'https://www.myhost.net' },
      fetcher: axiosFetcher,
    }).then((data) => {
      // testData should contain the 'config' object from the mock request
      const testData = data as any;
      expect(testData.elements[0].url).to.equal(expectedUrl);
      expect(testData.elements[0].withCredentials, 'with credentials is not true').to.be.true;
    });
  });

  it('should fetch with querystring', () => {
    const expectedUrl =
      'https://www.myhost.net/sitecore/api/layout/placeholder/jss?placeholderName=%2F%24root%2Fmain&item=%2Fabout&sc_camp=123456';

    // configure 'GET' requests to return config options
    mock.onGet().reply((config) => {
      // config contains axios client config options, e.g. url, withCredentials, etc...
      return [200, { elements: [{ ...config }] }];
    });

    return fetchPlaceholderData('/$root/main', '/about', {
      layoutServiceConfig: { host: 'https://www.myhost.net' },
      querystringParams: { sc_camp: 123456 },
      fetcher: axiosFetcher,
    }).then((data) => {
      // testData should contain the 'config' object from the mock request
      const testData = data as any;
      expect(testData.elements[0].url).to.equal(expectedUrl);
      expect(testData.elements[0].withCredentials, 'with credentials is not true').to.be.true;
    });
  });
});
