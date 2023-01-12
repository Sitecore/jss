import { expect } from 'chai';
import { getSiteRewrite, getSiteRewriteData, normalizeSiteRewrite, SITE_PREFIX } from './utils';

describe('utils', () => {
  describe('getSiteRewrite', () => {
    const data = {
      siteName: 'jss',
    };

    it('should return a string', () => {
      expect(getSiteRewrite('/pathname', data)).to.be.a('string');
    });

    it('should return the path with the site name when pathname starts with "/"', () => {
      const pathname = '/some/path';
      const result = getSiteRewrite(pathname, data);
      expect(result).to.equal(`/${SITE_PREFIX}${data.siteName}/some/path`);
    });

    it('should return the path with the site name when pathname not starts with "/"', () => {
      const pathname = 'some/path';
      const result = getSiteRewrite(pathname, data);
      expect(result).to.equal(`/${SITE_PREFIX}${data.siteName}/some/path`);
    });

    it('should return the root path with the site name', () => {
      const pathname = '/';
      const result = getSiteRewrite(pathname, data);
      expect(result).to.equal(`/${SITE_PREFIX}${data.siteName}/`);
    });
  });

  describe('getSiteRewriteData', () => {
    const defaultSiteName = 'foo';

    it('should return a MultiSiteRewriteData object', () => {
      expect(getSiteRewriteData('/some/path', defaultSiteName)).to.be.an('object');
    });

    it('should return the multisite data from the rewrite path', () => {
      const pathname = `/some/path/${SITE_PREFIX}bar/`;
      const result = getSiteRewriteData(pathname, defaultSiteName);
      expect(result.siteName).to.equal('bar');
    });

    it('should return the default site name when pathname does not contain site name', () => {
      const pathname = '/some/path';
      const result = getSiteRewriteData(pathname, defaultSiteName);
      expect(result.siteName).to.equal(defaultSiteName);
    });

    it('should return empty site name when pathname is missing site name', () => {
      const pathname = `/some/path/${SITE_PREFIX}/`;
      const result = getSiteRewriteData(pathname, defaultSiteName);
      expect(result.siteName).to.equal(defaultSiteName);
    });

    it('should return site name from anywhere in the path', () => {
      const siteName = 'fiftyone';
      const path1 = `/${SITE_PREFIX}${siteName}/some/path/`;
      const path2 = `/_variantId_0451/${SITE_PREFIX}${siteName}/some/path/`;

      expect(getSiteRewriteData(path1, defaultSiteName)).to.deep.equal(getSiteRewriteData(path2, defaultSiteName));
    });
  });

  describe('normalizeSiteRewrite', () => {
    it('should return a string', () => {
      expect(normalizeSiteRewrite('/some/path')).to.be.a('string');
    });

    it('should return the pathname when it does not contain site prefix', () => {
      const pathname = '/some/path';
      const result = normalizeSiteRewrite(pathname);
      expect(result).to.equal(pathname);
    });

    it('should return the pathname without the site name', () => {
      const pathname = `/${SITE_PREFIX}foo/some/path`;
      const result = normalizeSiteRewrite(pathname);
      expect(result).to.equal('/some/path');
    });

    it('should return the root pathname without the site name', () => {
      const pathname = `/${SITE_PREFIX}foo/`;
      const result = normalizeSiteRewrite(pathname);
      expect(result).to.equal('/');
    });

    it('should return the root pathname without the site name when pathname not ends with "/"', () => {
      const pathname = `/${SITE_PREFIX}foo`;
      const result = normalizeSiteRewrite(pathname);
      expect(result).to.equal('/');
    });

    it('should normalize path with other prefixes present', () => {
      const pathnameWithPrefix = `/_variantId_0451/${SITE_PREFIX}foo`;
      const pathnameWithPostfix = `/${SITE_PREFIX}foo/_variantId_0451/`;
      const resultPrefix = normalizeSiteRewrite(pathnameWithPrefix);
      const resultPostfix = normalizeSiteRewrite(pathnameWithPostfix);
      expect(resultPrefix).to.equal('/_variantId_0451/');
      expect(resultPrefix).to.equal(resultPostfix);
    });
  });
});
