/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { SiteInfo } from './middleware';
import { getPublicUrl, getJssEditingSecret, resolvePointOfSale } from './utils';

describe('utils', () => {
  describe('getPublicUrl', () => {
    after(() => {
      delete process.env.PUBLIC_URL;
      delete process.env.VERCEL_URL;
    });

    it('should fallback to localhost:3000 if not defined', () => {
      const result = getPublicUrl();
      expect(result).to.equal('http://localhost:3000');
    });

    it('should return env variable', () => {
      const publicUrl = 'http://test.com';
      process.env.PUBLIC_URL = publicUrl;
      const result = getPublicUrl();
      expect(result).to.equal(publicUrl);
    });

    it('should remove trailing slash', () => {
      const publicUrl = 'http://test.com/foo/';
      process.env.PUBLIC_URL = publicUrl;
      const result = getPublicUrl();
      expect(result).to.equal('http://test.com/foo');
    });

    it('should throw for invalid URL', () => {
      process.env.PUBLIC_URL = 'nope';
      expect(() => getPublicUrl()).to.throw();
    });

    it('should use VERCEL_URL', () => {
      process.env.VERCEL_URL = 'jss.uniqueid.vercel.com';
      const result = getPublicUrl();
      expect(result).to.equal('https://jss.uniqueid.vercel.com');
    });
  });
  describe('getJssEditingSecret', () => {
    after(() => {
      delete process.env.JSS_EDITING_SECRET;
    });

    it('should throw if env variable missing', () => {
      expect(() => getJssEditingSecret()).to.throw();
    });

    it('should return env variable', () => {
      const secret = '1234abcd';
      process.env.JSS_EDITING_SECRET = secret;
      const result = getJssEditingSecret();
      expect(result).to.equal(secret);
    });
  });

  describe('resolvePointOfSale', () => {
    it('should return empty when no point of sale present', () => {
      const site: SiteInfo = {
        name: 'no-pos',
        hostName: 'www.nopos.com',
        language: 'en',
      };
      const language = 'en';
      const result = resolvePointOfSale(site, language);
      expect(result).to.equal('');
    });

    it('should return pos for provided language', () => {
      const myPoint = 'apos.com';
      const site: SiteInfo = {
        name: 'apos',
        hostName: 'www.apos.com',
        pointOfSale: {
          en: myPoint,
        },
        language: 'de-DE',
      };

      const result = resolvePointOfSale(site, 'en');
      expect(result).to.equal(myPoint);
    });

    it('should return pos for site language as first backup', () => {
      const site: SiteInfo = {
        name: 'apos',
        hostName: 'www.apos.com',
        pointOfSale: {
          'de-DE': 'depos.com',
          'es-ES': 'espos.com',
        },
        language: 'de-DE',
      };

      const result = resolvePointOfSale(site, 'en');
      expect(result).to.equal('depos.com');
    });

    it('should return pos for site language when provided language is empty', () => {
      const site: SiteInfo = {
        name: 'apos',
        hostName: 'www.apos.com',
        pointOfSale: {
          'de-DE': 'depos.com',
          'es-ES': 'espos.com',
        },
        language: 'de-DE',
      };

      const result = resolvePointOfSale(site, '');
      expect(result).to.equal('depos.com');
    });

    it('should use fallback value when other values missing', () => {
      const site: SiteInfo = {
        name: 'apos',
        hostName: 'www.apos.com',
        pointOfSale: {
          'de-DE': 'depos.com',
          'es-ES': 'espos.com',
          '*': 'fallpos.com',
        },
        language: 'en-CA',
      };

      const result = resolvePointOfSale(site, 'en');
      expect(result).to.equal('fallpos.com');
    });
  });
});
