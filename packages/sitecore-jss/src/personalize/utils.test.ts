﻿import { expect } from 'chai';
import {
  getPersonalizedRewrite,
  getPersonalizedRewriteData,
  normalizePersonalizedRewrite,
  CdpHelper,
  VARIANT_PREFIX,
  DEFAULT_VARIANT,
  PersonalizedRewriteData,
  getGroomedVariantIds,
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
    it('should return the personalized data with component variant ids from the rewrite path', () => {
      const pathname = `/some/path/${VARIANT_PREFIX}123/${VARIANT_PREFIX}comp1_var2/${VARIANT_PREFIX}comp2_var1/`;
      const expectedResult = {
        variantId: '123',
        componentVariantIds: ['comp1_var2', 'comp2_var1'],
      };
      const result = getPersonalizedRewriteData(pathname);
      expect(result).to.deep.equal(expectedResult);
    });
    it('should return the personalized data with component variant ids from any position in pathname', () => {
      const persSegmentOne = `${VARIANT_PREFIX}123`;
      const persSegmentTwo = `${VARIANT_PREFIX}comp1_var2`;
      const persSegmentThree = `${VARIANT_PREFIX}comp2_var1'`;

      const path1 = `/${persSegmentOne}/${persSegmentTwo}/${persSegmentThree}/some/path/`;
      const path2 = `/_site_mysite/${persSegmentOne}/${persSegmentTwo}/${persSegmentThree}/some/path/`;

      expect(getPersonalizedRewriteData(path1)).to.deep.equal(getPersonalizedRewriteData(path2));
    });
  });

  describe('getGroomedVariantIds', () => {
    it('should return object with DEFAULT_VARIANT only for empty collection', () => {
      const input: string[] = [];
      const expectedOutput: PersonalizedRewriteData = {
        variantId: DEFAULT_VARIANT,
        componentVariantIds: [],
      };
      expect(getGroomedVariantIds(input)).to.deep.equal(expectedOutput);
    });

    it('should return object with page-level variandId when matching ID found', () => {
      const input = ['standard-page-level-varid'];
      const expectedOutput: PersonalizedRewriteData = {
        variantId: 'standard-page-level-varid',
        componentVariantIds: [],
      };
      expect(getGroomedVariantIds(input)).to.deep.equal(expectedOutput);
    });

    it('should return object with component variant ids, when matching IDs found', () => {
      const input = ['component-id_variantid-1', 'other-component-id_variantid-2'];
      const expectedOutput: PersonalizedRewriteData = {
        variantId: DEFAULT_VARIANT,
        componentVariantIds: input,
      };
      expect(getGroomedVariantIds(input)).to.deep.equal(expectedOutput);
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
      const pathNameInversed = `/${VARIANT_PREFIX}foo/_site_mysite`;
      const result = normalizePersonalizedRewrite(pathname);
      expect(result).to.equal('/_site_mysite');
      expect(normalizePersonalizedRewrite(pathNameInversed)).to.equal(result);
    });

    it('should return pathname without variant id and component variant ids', () => {
      const pathname = `/${VARIANT_PREFIX}foo/${VARIANT_PREFIX}comp1_var1/${VARIANT_PREFIX}comp2_var3/some/path`;
      const result = normalizePersonalizedRewrite(pathname);
      expect(result).to.equal('/some/path');
    });

    it('should return the root pathname without the variant id and component ids', () => {
      const pathname = `/${VARIANT_PREFIX}foo/${VARIANT_PREFIX}comp1_var1/${VARIANT_PREFIX}comp2_var3/`;
      const result = normalizePersonalizedRewrite(pathname);
      expect(result).to.equal('/');
    });

    it('should return the root pathname without the variant id and component ids when pathname not ends with "/"', () => {
      const pathname = `/${VARIANT_PREFIX}foo/${VARIANT_PREFIX}comp1_var1/${VARIANT_PREFIX}comp2_var3`;
      const result = normalizePersonalizedRewrite(pathname);
      expect(result).to.equal('/');
    });

    it('should normalize path with multiple component variant ids with other prefixes present', () => {
      const pathname = `/_site_mysite/${VARIANT_PREFIX}foo/${VARIANT_PREFIX}comp1_var1/${VARIANT_PREFIX}comp2_var3`;
      const pathNameInversed = `/${VARIANT_PREFIX}foo/${VARIANT_PREFIX}comp1_var1/${VARIANT_PREFIX}comp2_var3/_site_mysite`;
      const result = normalizePersonalizedRewrite(pathname);
      expect(result).to.equal('/_site_mysite');
      expect(normalizePersonalizedRewrite(pathNameInversed)).to.equal(result);
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
      it('should format default variant with scope', () => {
        const pageId = '110d559fdea542ea9c1c8a5df7e70ef9';
        const language = 'en';
        const scope = 'myscope1';
        const result = CdpHelper.getPageVariantId(pageId, language, DEFAULT_VARIANT, scope);
        expect(result).to.equal(`${scope}_${pageId}_${language}_default`);
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
      it('should format variant with scope', () => {
        const pageId = '110d559fdea542ea9c1c8a5df7e70ef9';
        const language = 'en';
        const variantId = '54c8e9b50b2c53638fa6d32a3a302f51';
        const scope = 'myscope1';
        const result = CdpHelper.getPageVariantId(pageId, language, variantId, scope);
        expect(result).to.equal(`${scope}_${pageId}_${language}_${variantId}`);
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
      it('should format variant with scope', () => {
        const pageId = '110d559fdea542ea9c1c8a5df7e70ef9';
        const language = 'en';
        const scope = 'myscope1';
        const result = CdpHelper.getContentId(pageId, language, scope);
        expect(result).to.equal(`embedded_${scope}_${pageId}_${language}`);
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

    describe('normalizeScope', () => {
      it('should return empty string when no scope value is provided', () => {
        expect(CdpHelper.normalizeScope()).to.equal('');
        expect(CdpHelper.normalizeScope('')).to.equal('');
      });

      it('should return scope when scope value is provided', () => {
        const scope = 'myscope';
        expect(CdpHelper.normalizeScope(scope)).to.equal(scope);
      });

      it('should return scope when scope value is provided and is alphanumeric', () => {
        const scope = 'myscope123';
        const result = CdpHelper.normalizeScope(scope);
        expect(result).to.equal(scope);
      });

      it('should return scope when scope value is provided and includes non-alphanumeric characters', () => {
        const scope = '_myscope-12+3_';
        const result = CdpHelper.normalizeScope(scope);
        expect(result).to.equal('myscope123');
      });
    });
  });
});
