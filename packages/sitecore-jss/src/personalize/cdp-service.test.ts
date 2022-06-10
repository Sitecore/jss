/* eslint-disable no-unused-expressions */
import { CdpService } from './cdp-service';
import { expect, spy, use } from 'chai';
import spies from 'chai-spies';
import nock from 'nock';
import { AxiosDataFetcher } from '../axios-fetcher';

use(spies);

describe('CdpService', () => {
  const endpoint = 'http://sctest';
  const clientKey = 'client-key';
  const contentId = 'content-id';
  const segments = ['segment-1', 'segment-2'];
  const browserId = 'browser-id';
  const timeout = 50;

  const config = {
    endpoint,
    clientKey,
    timeout,
  };

  afterEach(() => {
    nock.cleanAll();
  });

  it('should return segment data for a route', async () => {
    nock(endpoint)
      .post(`/v2/callFlows/getSegments/${contentId}`, {
        clientKey,
        browserId,
        params: {},
      })
      .reply(200, {
        segments,
        browserId,
      });

    const service = new CdpService(config);
    const getSegmentDataResult = await service.getSegments(contentId, browserId);

    expect(getSegmentDataResult).to.deep.equal({
      segments,
      browserId,
    });
  });

  it('should return empty segments array when no response', async () => {
    nock(endpoint)
      .post(`/v2/callFlows/getSegments/${contentId}`, {
        clientKey,
        browserId,
        params: {},
      })
      .reply(200, {
        segments: [],
        browserId: '',
      });

    const service = new CdpService(config);
    const getSegmentDataResult = await service.getSegments(contentId, browserId);

    expect(getSegmentDataResult).to.deep.equal({
      segments: [],
      browserId: '',
    });
  });

  it('should fetch using custom fetcher resolver', async () => {
    const fetcherSpy = spy((url: string, data?: unknown) => {
      return new AxiosDataFetcher().fetch<never>(url, data);
    });

    nock(endpoint)
      .post(`/v2/callFlows/getSegments/${contentId}`, {
        clientKey,
        browserId,
        params: {},
      })
      .reply(200, {
        segments,
        browserId,
      });

    const service = new CdpService({ ...config, dataFetcherResolver: () => fetcherSpy });
    const getSegmentDataResult = await service.getSegments(contentId, browserId);

    expect(getSegmentDataResult).to.deep.equal({
      segments,
      browserId,
    });
    expect(fetcherSpy).to.be.called.once;
    expect(fetcherSpy).to.be.called.with(`http://sctest/v2/callFlows/getSegments/${contentId}`);
  });
  it('should return empty segments array if request timeout', async () => {
    nock(endpoint)
      .post(`/v2/callFlows/getSegments/${contentId}`, {
        clientKey,
        browserId,
        params: {},
      })
      .delay(100)
      .reply(408);
    const service = new CdpService(config);
    const getSegmentDataResult = await service.getSegments(contentId, browserId).catch((error) => {
      expect(error.response.status).to.equal(408);
    });

    expect(getSegmentDataResult).to.deep.equal({ segments: [], browserId });
  });
});
