import { CdpService } from './cdp-service';
import { expect, use } from 'chai';
import spies from 'chai-spies';
import nock from 'nock';

use(spies);

describe('CdpService', () => {
  const endpoint = 'http://sctest';
  const clientKey = 'client-key';
  const contentId = 'content-id';
  const segments = ['segment-1', 'segment-2'];
  const browserId = 'browser-id';

  const config = {
    endpoint,
    clientKey,
  };

  afterEach(() => {
    nock.cleanAll();
  });

  it('should return segment data for a route', async () => {
    nock(endpoint)
      .post(`/v2/callFlows/getSegments/${contentId}`, {
        clientKey: clientKey,
        browserId: browserId,
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
        clientKey: clientKey,
        browserId: browserId,
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
});
