import { expect } from 'chai';
import {
  getPersonalizedRewrite,
  getPersonalizedRewriteData,
  normalizePersonalizedRewrite,
  parseMultiValuePointOfSale,
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
  });
  describe('parseMultiValuePointOfSale', () => {
    it('should return Record when valid json collection provided', () => {
      const cdpRecord: Record<string, string> = {
        en: 'value1',
        'da-DA': 'nke',
      };
      const validJson = JSON.stringify(cdpRecord);

      const result = parseMultiValuePointOfSale(validJson);

      expect(result).to.deep.equal(cdpRecord);
    });
    it('should throw when input value with invlaid json provided', () => {
      const invalidJson = '{abcderef}';

      expect(parseMultiValuePointOfSale.bind(null, invalidJson)).to.throw();
    });
  });
});
