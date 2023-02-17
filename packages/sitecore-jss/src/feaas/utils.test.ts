import { expect } from 'chai';
import {
  getPersonalizedRewrite,
  getPersonalizedRewriteData,
  normalizePersonalizedRewrite,
  CdpHelper,
  VARIANT_PREFIX,
  DEFAULT_VARIANT,
} from './utils';

describe('utils', () => {
  describe('getPersonalizedRewrite', () => {
    const data = {
      variantId: 'variant-id',
    };
    it('should return a string', () => {
      expect(getPersonalizedRewrite('/pathname', data)).to.be.a('string');
    });
    it('should return the path with the variant id when pathname starts with "/"', () => {
      const pathname = '/some/path';
      const result = getPersonalizedRewrite(pathname, data);
      expect(result).to.equal(`/${VARIANT_PREFIX}${data.variantId}/some/path`);
    });
    it('should return the path with the variant id when pathname not starts with "/"', () => {
      const pathname = 'some/path';
      const result = getPersonalizedRewrite(pathname, data);
      expect(result).to.equal(`/${VARIANT_PREFIX}${data.variantId}/some/path`);
    });
    it('should return the root path with the variant id', () => {
      const pathname = '/';
      const result = getPersonalizedRewrite(pathname, data);
      expect(result).to.equal(`/${VARIANT_PREFIX}${data.variantId}/`);
    });
  });

  describe('getPersonalizedRewriteData', () => {
    it('should return a PersonalizedRewriteData object', () => {
      expect(getPersonalizedRewriteData('/some/path')).to.be.an('object');
    });
    it('should return the personalized data from the rewrite path', () => {
      const pathname = `/some/path/${VARIANT_PREFIX}123/`;
      const result = getPersonalizedRewriteData(pathname);
      expect(result.variantId).to.equal('123');
    });
    it('should return the default variant id when pathname does not contain variant', () => {
      const pathname = '/some/path';
      const result = getPersonalizedRewriteData(pathname);
      expect(result.variantId).to.equal(DEFAULT_VARIANT);
    });
    it('should return empty variant id when pathname is missing variant id', () => {
      const pathname = `/some/path/${VARIANT_PREFIX}/`;
      const result = getPersonalizedRewriteData(pathname);
      expect(result.variantId).to.equal('');
    });
    it('should return varinat id from any position in pathname', () => {
      const testId = '0451';
      const path1 = `/${VARIANT_PREFIX}${testId}/some/path/`;
      const path2 = `/_site_mysite/${VARIANT_PREFIX}${testId}/some/path/`;

      expect(getPersonalizedRewriteData(path1)).to.deep.equal(getPersonalizedRewriteData(path2));
    });
  });

  describe('normalizePersonalizedRewrite', () => {
    it('should return a string', () => {
      expect(normalizePersonalizedRewrite('/some/path')).to.be.a('string');
    });
    it('should return the pathname when it does not contain variant id', () => {
      const pathname = '/some/path';
      const result = normalizePersonalizedRewrite(pathname);
      expect(result).to.equal(pathname);
    });
    it('should return the pathname without the variant id', () => {
      const pathname = `/${VARIANT_PREFIX}foo/some/path`;
      const result = normalizePersonalizedRewrite(pathname);
      expect(result).to.equal('/some/path');
    });
    it('should return the root pathname without the variant id', () => {
      const pathname = `/${VARIANT_PREFIX}foo/`;
      const result = normalizePersonalizedRewrite(pathname);
      expect(result).to.equal('/');
    });
    it('should return the root pathname without the variant id when pathname not ends with "/"', () => {
      const pathname = `/${VARIANT_PREFIX}foo`;
      const result = normalizePersonalizedRewrite(pathname);
      expect(result).to.equal('/');
    });
    it('should normalize path with other prefixes present', () => {
      const pathname = `/_site_mysite/${VARIANT_PREFIX}foo`;
      const pathNameInversed = `/${VARIANT_PREFIX}foo/_site_mysite/`;
      const result = normalizePersonalizedRewrite(pathname);
      expect(result).to.equal('/_site_mysite/');
      expect(normalizePersonalizedRewrite(pathNameInversed)).to.equal(result);
    });
  });

  describe('FEAASUtils', () => {
    describe('getFEAASLibraryIds', () => {
    });
  });
