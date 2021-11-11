/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { trackEvent } from './trackingApi';
import { AxiosDataFetcher } from '../axios-fetcher';
import { AxiosResponse } from 'axios';
import nock from 'nock';

/**
 * Implements a data fetcher using Axios - replace with your favorite
 * SSR-capable HTTP or fetch library if you like. See HttpDataFetcher<T> type
 * in sitecore-jss library for implementation details/notes.
 * @param {string} url The URL to request; may include query string
 * @param {unknown} data Optional data to POST with the request.
 */
function dataFetcher<ResponseType>(
  url: string,
  data?: unknown
): Promise<AxiosResponse<ResponseType>> {
  return new AxiosDataFetcher().fetch<ResponseType>(url, data);
}

describe('trackEvent', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should fetch with host', () => {
    nock('https://www.myhost.net')
      .post('/sitecore/api/jss/track/event')
      .reply(200, (_, requestBody) => requestBody);

    return trackEvent([{ eventId: 'porgs' }], {
      host: 'https://www.myhost.net',
      test: true,
      fetcher: dataFetcher,
    }).then((data) => {
      expect(data).to.deep.equal([{ eventId: 'porgs' }]);
    });
  });

  it('should fetch with querystring', () => {
    // configure 'POST' requests to return config options
    nock('https://www.myhost.net')
      .post('/sitecore/api/jss/track/event')
      .query({ sc_camp: 123456 })
      .reply(200, (_, requestBody) => requestBody);

    return trackEvent([{ campaignId: '123456' }], {
      host: 'https://www.myhost.net',
      querystringParams: { sc_camp: 123456 },
      test: true,
      fetcher: dataFetcher,
    }).then((data) => {
      expect(data).to.deep.equal([{ campaignId: '123456' }]);
    });
  });
});
