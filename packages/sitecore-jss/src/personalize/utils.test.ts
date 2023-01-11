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
      const result = normalizePersonalizedRewrite(pathname);
      expect(result).to.equal('/_site_mysite/');
    });
  });

  describe('CdpHelper', () => {
    describe('getPageVariantId', () => {
      it('should format default variant', () => {
        const pageId = '110d559fdea542ea9c1c8a5df7e70ef9';
        const language = 'en';
        const result = CdpHelper.getPageVariantId(pageId, language, DEFAULT_VARIANT);
        expect(result).to.equal(`${pageId}_${language}_default`);
      });
      it('should format empty variant', () => {
        const pageId = '110d559fdea542ea9c1c8a5df7e70ef9';
        const language = 'en';
        const result = CdpHelper.getPageVariantId(pageId, language, '');
        expect(result).to.equal(`${pageId}_${language}_default`);
      });
      it('should format variant', () => {
        const pageId = '110d559fdea542ea9c1c8a5df7e70ef9';
        const language = 'en';
        const variantId = '54c8e9b50b2c53638fa6d32a3a302f51';
        const result = CdpHelper.getPageVariantId(pageId, language, variantId);
        expect(result).to.equal(`${pageId}_${language}_${variantId}`);
      });
      it('should use lowercase', () => {
        const pageId = '3E0A2F20B3255E57881FFF6648D08575';
        const language = 'EN';
        const variantId = '54C8E9B50B2C53638FA6D32A3A302F51';
        const result = CdpHelper.getPageVariantId(pageId, language, variantId);
        expect(result).to.equal(`${pageId}_${language}_${variantId}`.toLowerCase());
      });
      it('should convert language dashes to underscores', () => {
        const pageId = '3E0A2F20B3255E57881FFF6648D08575';
        const language = 'da-DK';
        const variantId = '54C8E9B50B2C53638FA6D32A3A302F51';
        const result = CdpHelper.getPageVariantId(pageId, language, variantId);
        expect(result).to.equal(`${pageId}_da_dk_${variantId}`.toLowerCase());
      });
      it('should ensure GUID format N for pageId', () => {
        const pageId = '{FFCD3AC4-38E3-5286-A0B9-5F7113D5E74A}';
        const language = 'en';
        const variantId = 'test';
        const result = CdpHelper.getPageVariantId(pageId, language, variantId);
        expect(result).to.equal(
          `FFCD3AC438E35286A0B95F7113D5E74A_${language}_${variantId}`.toLowerCase()
        );
      });
    });

    describe('getContentId', () => {
      it('should format variant', () => {
        const pageId = '110d559fdea542ea9c1c8a5df7e70ef9';
        const language = 'en';
        const result = CdpHelper.getContentId(pageId, language);
        expect(result).to.equal(`embedded_${pageId}_${language}`);
      });
      it('should use lowercase', () => {
        const pageId = '3E0A2F20B3255E57881FFF6648D08575';
        const language = 'EN';
        const result = CdpHelper.getContentId(pageId, language);
        expect(result).to.equal(`embedded_${pageId}_${language}`.toLowerCase());
      });
      it('should convert language dashes to underscores', () => {
        const pageId = '3E0A2F20B3255E57881FFF6648D08575';
        const language = 'da-DK';
        const result = CdpHelper.getContentId(pageId, language);
        expect(result).to.equal(`embedded_${pageId}_da_DK`.toLowerCase());
      });
      it('should ensure GUID format N for pageId', () => {
        const pageId = '{FFCD3AC4-38E3-5286-A0B9-5F7113D5E74A}';
        const language = 'en';
        const result = CdpHelper.getContentId(pageId, language);
        expect(result).to.equal(
          `embedded_FFCD3AC438E35286A0B95F7113D5E74A_${language}`.toLowerCase()
        );
      });
    });
  });
});
