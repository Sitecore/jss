import { expect } from 'chai';
import * as utils from './utils';

const { getPersonalizedRewrite, getPersonalizedRewriteData, normalizePersonalizedRewrite } = utils;

export const DEFAULT_SEGMENT = '_default';
export const SEGMENT_PREFIX = '_segmentId_';

describe('utils', () => {
  describe('getPersonalizedRewrite', () => {
    const data = {
      segmentId: 'segment-id',
    };
    it('should return a string', () => {
      expect(getPersonalizedRewrite('/pathname', data)).to.be.a('string');
    });
    it('should return the path with the segment id when pathname starts with "/"', () => {
      const pathname = '/some/path';
      const result = getPersonalizedRewrite(pathname, data);
      expect(result).to.equal(`/${SEGMENT_PREFIX}segment-id/some/path`);
    });
    it('should return the path with the segment id when path ', () => {
      const pathname = 'some/path';
      const result = getPersonalizedRewrite(pathname, data);
      expect(result).to.equal(`/${SEGMENT_PREFIX}segment-id/some/path`);
    });
  });

  describe('getPersonalizedRewriteData', () => {
    it('should return a PersonalizedRewriteData object', () => {
      expect(getPersonalizedRewriteData('/some/path')).to.be.an('object');
    });
    it('should return the default segment id when pathname does not contain segment id', () => {
      const pathname = '/some/path';
      const result = getPersonalizedRewriteData(pathname);
      expect(result.segmentId).to.equal(DEFAULT_SEGMENT);
    });
    it('should return the personalized data from the rewrite path', () => {
      const pathname = '/some/path/_segmentId_/';
      const result = getPersonalizedRewriteData(pathname);
      expect(result.segmentId).to.equal('');
    });
  });

  describe('normalizePersonalizedRewrite', () => {
    it('should return a string', () => {
      expect(normalizePersonalizedRewrite('/some/path')).to.be.a('string');
    });
    it('should return the pathname when it does not contain segment id', () => {
      const pathname = '/some/path';
      const result = normalizePersonalizedRewrite(pathname);
      expect(result).to.equal(pathname);
    });
    it('should return the pathname without the segment id', () => {
      const pathname = '/some/path/_segmentId_/';
      const result = normalizePersonalizedRewrite(pathname);
      expect(result).to.equal('/some/path/');
    });
  });
});
