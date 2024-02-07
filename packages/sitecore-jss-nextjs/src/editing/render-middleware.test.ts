/* eslint-disable dot-notation */
import chai, { use } from 'chai';
import sinonChai from 'sinon-chai';
import chaiString from 'chai-string';
import { AxiosDataFetcher } from '@sitecore-jss/sitecore-jss';
import { RenderMiddlewareBase } from './render-middleware';
import { NextApiRequest } from 'next';
import {
  QUERY_PARAM_EDITING_SECRET,
  QUERY_PARAM_PROTECTION_BYPASS_SITECORE,
  QUERY_PARAM_PROTECTION_BYPASS_VERCEL,
} from './constants';

use(sinonChai);
const expect = chai.use(chaiString).expect;

type Query = {
  [key: string]: string;
};

describe('RenderMiddlewareBase', () => {
  class SampleMiddleware extends RenderMiddlewareBase {}

  const mockFetcher = () => ({} as AxiosDataFetcher);

  describe('defaultResolveServerUrl', () => {
    it('should use https protocol on Vercel', async () => {
      process.env.VERCEL = '1';

      const middleware = new SampleMiddleware();

      const url = middleware['defaultResolveServerUrl']({
        headers: { host: 'localhost' },
      } as NextApiRequest);

      expect(url).to.equal('https://localhost');

      delete process.env.VERCEL;
    });

    it('should use http protocol', async () => {
      const middleware = new SampleMiddleware();

      const url = middleware['defaultResolveServerUrl']({
        headers: { host: 'localhost' },
      } as NextApiRequest);

      expect(url).to.equal('http://localhost');
    });
  });

  it('should use custom resolveServerUrl', async () => {
    const serverUrl = 'https://test.com';

    const middleware = new SampleMiddleware({
      resolveServerUrl: () => serverUrl,
    });

    expect(middleware['resolveServerUrl']({} as NextApiRequest)).to.equal(serverUrl);
  });

  it('should use custom dataFetcher', () => {
    const dataFetcher = mockFetcher();

    const middleware = new SampleMiddleware({
      dataFetcher,
    });

    expect(middleware['dataFetcher']).to.equal(dataFetcher);
  });

  describe('getQueryParamsForPropagation', () => {
    it('should construct query params for protection bypass', () => {
      const middleware = new SampleMiddleware();

      const secret = 'secret1234';
      const query = {} as Query;
      const bypassTokenSitecore = 'token1234Sitecore';
      const bypassTokenVercel = 'token1234Vercel';
      query[QUERY_PARAM_EDITING_SECRET] = secret;
      query[QUERY_PARAM_PROTECTION_BYPASS_SITECORE] = bypassTokenSitecore;
      query[QUERY_PARAM_PROTECTION_BYPASS_VERCEL] = bypassTokenVercel;

      expect(middleware['getQueryParamsForPropagation'](query)).to.deep.equal({
        [QUERY_PARAM_PROTECTION_BYPASS_SITECORE]: bypassTokenSitecore,
        [QUERY_PARAM_PROTECTION_BYPASS_VERCEL]: bypassTokenVercel,
      });
    });
  });
});
