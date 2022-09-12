/* eslint-disable no-unused-expressions */
import { CdpService, ExperienceParams, DEFAULT_CHANNEL } from './cdp-service';
import { expect, spy, use } from 'chai';
import spies from 'chai-spies';
import nock from 'nock';
import { AxiosDataFetcher } from '../axios-fetcher';

use(spies);

describe('CdpService', () => {
  const endpoint = 'http://sctest';
  const clientKey = 'client-key';
  const contentId = 'content-id';
  const variantId = 'variant-1';
  const pointOfSale = 'pos-1';
  const friendlyId = contentId;
  const channel = DEFAULT_CHANNEL;
  const browserId = 'browser-id';
  const ref = browserId;
  const ua = 'user-agent-string';
  const params = {
    referrer: 'about:client',
    utm: {
      campaign: 'test',
      source: null,
      medium: null,
      content: null,
    },
  } as ExperienceParams;

  const config = {
    endpoint,
    clientKey,
    pointOfSale,
  };

  afterEach(() => {
    nock.cleanAll();
  });

  describe('executeExperience', () => {
    it('should return variant data for a route', async () => {
      nock(endpoint, {
        reqheaders: {
          'User-Agent': ua,
        },
      })
        .post('/v2/callFlows', {
          clientKey,
          pointOfSale,
          channel,
          browserId,
          friendlyId,
          params,
        })
        .reply(200, {
          variantId,
        });

      const service = new CdpService(config);
      const actualVariantId = await service.executeExperience(contentId, browserId, ua, params);

      expect(actualVariantId).to.deep.equal(variantId);
    });

    it('should return fallback value when no response', async () => {
      nock(endpoint)
        .post('/v2/callFlows', {
          clientKey,
          pointOfSale,
          channel,
          browserId,
          friendlyId,
          params,
        })
        .reply(200, {
          variantId: '',
        });

      const service = new CdpService(config);
      const variantId = await service.executeExperience(contentId, browserId, ua, params);

      expect(variantId).to.be.undefined;
    });

    it('should fetch using specified channel', async () => {
      const channelOverride = 'TEST';
      nock(endpoint)
        .post('/v2/callFlows', {
          clientKey,
          pointOfSale,
          channel: channelOverride,
          browserId,
          friendlyId,
          params,
        })
        .reply(200, {
          variantId,
        });

      const service = new CdpService({ ...config, channel: channelOverride });
      const actualVariantId = await service.executeExperience(contentId, browserId, ua, params);

      expect(actualVariantId).to.deep.equal(variantId);
    });

    it('should fetch using custom fetcher resolver and respond with data', async () => {
      const fetcherSpy = spy((url: string, data?: unknown) => {
        return new AxiosDataFetcher().fetch<never>(url, data);
      });

      nock(endpoint)
        .post('/v2/callFlows', {
          clientKey,
          pointOfSale,
          channel,
          browserId,
          friendlyId,
          params,
        })
        .reply(200, {
          variantId,
        });

      const service = new CdpService({ ...config, dataFetcherResolver: () => fetcherSpy });
      const actualVariantId = await service.executeExperience(contentId, browserId, ua, params);

      expect(actualVariantId).to.deep.equal(variantId);
      expect(fetcherSpy).to.be.called.once;
      expect(fetcherSpy).to.be.called.with('http://sctest/v2/callFlows');
    });

    it('should use custom fetcher resolver and return undefined id when timeout is exceeded', async () => {
      const fetcherSpy = spy((url: string, data?: any) => {
        return new AxiosDataFetcher({ timeout: 30 }).fetch<never>(url, data);
      });

      nock(endpoint)
        .post('/v2/callFlows', {
          clientKey,
          pointOfSale,
          channel,
          browserId,
          friendlyId,
          params,
        })
        .delay(50)
        .reply(408);

      const service = new CdpService({ ...config, dataFetcherResolver: () => fetcherSpy });
      const actualVariantId = await service.executeExperience(contentId, browserId, ua, params);

      expect(actualVariantId).to.deep.equal(undefined);
    });

    it('should throw error', async () => {
      nock(endpoint)
        .post('/v2/callFlows', {
          clientKey,
          pointOfSale,
          channel,
          browserId,
          friendlyId,
          params,
        })
        .replyWithError('error_test');
      const service = new CdpService(config);
      await service.executeExperience(contentId, browserId, ua, params).catch((error) => {
        expect(error.message).to.contain('error_test');
      });
    });

    it('should return fallback value when api returns timeout error', async () => {
      nock(endpoint)
        .post('/v2/callFlows', {
          clientKey,
          pointOfSale,
          channel,
          browserId,
          friendlyId,
          params,
        })
        .reply(408);

      const service = new CdpService(config);
      const actualVariantId = await service.executeExperience(contentId, browserId, ua, params);

      expect(actualVariantId).to.deep.equal(undefined);
    });
  });

  describe('generateBrowserId', () => {
    it('should return browser id', async () => {
      nock(endpoint)
        .get(`/v1.2/browser/create.json?client_key=${clientKey}&message={}`)
        .reply(200, {
          ref,
        });

      const service = new CdpService(config);
      const actualRef = await service.generateBrowserId();

      expect(actualRef).to.deep.equal(ref);
    });

    it('should fetch using custom fetcher resolver and respond with data', async () => {
      const fetcherSpy = spy((url: string, data?: unknown) => {
        return new AxiosDataFetcher().fetch<never>(url, data);
      });

      nock(endpoint)
        .get(`/v1.2/browser/create.json?client_key=${clientKey}&message={}`)
        .reply(200, {
          ref,
        });

      const service = new CdpService({ ...config, dataFetcherResolver: () => fetcherSpy });
      const actualRef = await service.generateBrowserId();

      expect(actualRef).to.deep.equal(ref);
      expect(fetcherSpy).to.be.called.once;
      expect(fetcherSpy).to.be.called.with(
        `http://sctest/v1.2/browser/create.json?client_key=${clientKey}&message={}`
      );
    });

    it('should use custom fetcher resolver and return undefined ref when timeout is exceeded', async () => {
      const fetcherSpy = spy((url: string, data?: any) => {
        return new AxiosDataFetcher({ timeout: 30 }).fetch<never>(url, data);
      });

      nock(endpoint)
        .get(`/v1.2/browser/create.json?client_key=${clientKey}&message={}`)
        .delay(50)
        .reply(408);

      const service = new CdpService({ ...config, dataFetcherResolver: () => fetcherSpy });
      const actualRef = await service.generateBrowserId();

      expect(actualRef).to.deep.equal(undefined);
    });

    it('should throw error', async () => {
      nock(endpoint)
        .get(`/v1.2/browser/create.json?client_key=${clientKey}&message={}`)
        .replyWithError('error_test');

      const service = new CdpService(config);
      await service.generateBrowserId().catch((error) => {
        expect(error.message).to.contain('error_test');
      });
    });

    it('should return fallback value when api returns timeout error', async () => {
      nock(endpoint)
        .get(`/v1.2/browser/create.json?client_key=${clientKey}&message={}`)
        .reply(408);

      const service = new CdpService(config);
      const actualRef = await service.generateBrowserId();

      expect(actualRef).to.deep.equal(undefined);
    });
  });
});
