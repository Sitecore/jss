/* eslint-disable dot-notation */
import chai from 'chai';
import chaiString from 'chai-string';
import { RenderMiddlewareBase } from './render-middleware';
import {
  QUERY_PARAM_EDITING_SECRET,
  QUERY_PARAM_VERCEL_PROTECTION_BYPASS,
  QUERY_PARAM_VERCEL_SET_BYPASS_COOKIE,
  EDITING_PASS_THROUGH_HEADERS,
} from './constants';

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
      const vercelBypassToken = 'token1234Vercel';
      const vercelBypassCookie = 'samesitenone';
      query[QUERY_PARAM_EDITING_SECRET] = secret;
      query[QUERY_PARAM_VERCEL_PROTECTION_BYPASS] = vercelBypassToken;
      query[QUERY_PARAM_VERCEL_SET_BYPASS_COOKIE] = vercelBypassCookie;

      expect(middleware['getQueryParamsForPropagation'](query)).to.deep.equal({
        [QUERY_PARAM_VERCEL_PROTECTION_BYPASS]: vercelBypassToken,
        [QUERY_PARAM_VERCEL_SET_BYPASS_COOKIE]: vercelBypassCookie,
      });
    });
  });

  describe('getHeadersForPropagation', () => {
    it('should return approved headers', () => {
      const middleware = new SampleMiddleware();

      const approvedHeaders = {};
      EDITING_PASS_THROUGH_HEADERS.forEach((key) => (approvedHeaders[key] = `${key}-value`));
      const allHeaders = {
        ...approvedHeaders,
        nope: 'nope',
        'should-not-pass': 'n/a',
      };

      expect(middleware['getHeadersForPropagation'](allHeaders)).to.deep.equal(approvedHeaders);
    });
  });
});
