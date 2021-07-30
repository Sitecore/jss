/* eslint-disable no-unused-expressions */
import { HttpDataFetcher } from '@sitecore-jss/sitecore-jss';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { expect } from 'chai';
import { trackEvent } from './trackingApi';

// note: axios needs to use `withCredentials: true` in order for Sitecore cookies to be included in CORS requests
// which is necessary for analytics and such
const axiosFetcher: HttpDataFetcher<void> = (url, data) =>
  axios({
    url,
    method: data ? 'POST' : 'GET',
    data,
    withCredentials: true,
  });

describe('trackEvent', () => {
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
    const expectedUrl = 'https://www.myhost.net/sitecore/api/jss/track/event';

    // configure 'POST' requests to return config options
    mock.onPost().reply((config) => {
      // config contains axios client config options, e.g. url, withCredentials, etc...
      return [200, { ...config }];
    });

    return trackEvent([{ eventId: 'porgs' }], {
      host: 'https://www.myhost.net',
      test: true,
      fetcher: axiosFetcher,
    }).then((data) => {
      // testData should contain the 'config' object from the mock request
      const testData = (data as unknown) as { [key: string]: unknown };
      expect(testData.url).to.equal(expectedUrl);
      expect(testData.withCredentials, 'with credentials is not true').to.be.true;
    });
  });

  it('should fetch with querystring', () => {
    const expectedUrl = 'https://www.myhost.net/sitecore/api/jss/track/event?sc_camp=123456';

    // configure 'POST' requests to return config options
    mock.onPost().reply((config) => {
      // config contains axios client config options, e.g. url, withCredentials, etc...
      return [200, { ...config }];
    });

    return trackEvent([{ campaignId: '123456' }], {
      host: 'https://www.myhost.net',
      querystringParams: { sc_camp: 123456 },
      test: true,
      fetcher: axiosFetcher,
    }).then((data) => {
      // testData should contain the 'config' object from the mock request
      const testData = (data as unknown) as { [key: string]: unknown };
      expect(testData.url).to.equal(expectedUrl);
      expect(testData.withCredentials, 'with credentials is not true').to.be.true;
    });
  });
});
