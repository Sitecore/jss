/* eslint-disable dot-notation */
import chai, { use } from 'chai';
import sinonChai from 'sinon-chai';
import chaiString from 'chai-string';
import { RenderMiddlewareBase } from './render-middleware';
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
