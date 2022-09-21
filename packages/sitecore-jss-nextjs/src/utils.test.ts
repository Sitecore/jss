/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { getPublicUrl, getJssEditingSecret, getPointOfSaleForLocaleOrDefault } from './utils';

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
  describe('getPointOfSaleForLocaleOrDefault', () => {
    it('should return result when a single value string is provided', () => {
      const pointOfSaleTest = 'zombo.com';
      const parsedPos = getPointOfSaleForLocaleOrDefault(pointOfSaleTest);
      expect(parsedPos).to.equal(pointOfSaleTest);
    });

    it('should return first result when a multi value string is provided with no locale', () => {
      const pointOfSaleTest = "en:zombo.com,fr:fr.zombo.com,de-DE:de.zombo.com";
      const parsedPos = getPointOfSaleForLocaleOrDefault(pointOfSaleTest);
      expect(parsedPos).to.equal("zombo.com");
    });

    it('should return result when a multi value string is provided with locale', () => {
      const lang = 'en-ca';
      const posForLang = 'beavertails.ca';
      const pointOfSaleTest = `en:zombo.com,fr:fr.zombo.com,${lang}:${posForLang},de-DE:de.zombo.com`;
      const parsedPos = getPointOfSaleForLocaleOrDefault(pointOfSaleTest,lang);
      expect(parsedPos).to.equal(posForLang);
    });

    it('should return empty string when empty cdpPos string is provided', () => {
      const pointOfSaleTest = getPointOfSaleForLocaleOrDefault('');
      expect(pointOfSaleTest).to.equal('');
    });

    it('should return empty string when locale is not found', () => {
      const pointOfSaleTest = "en:zombo.com,fr:fr.zombo.com,de-DE:de.zombo.com";
      const parsedPos = getPointOfSaleForLocaleOrDefault(pointOfSaleTest, 'es-ES');
      expect(parsedPos).to.equal('');
    });

    it('should return empty string when invalid URL is provided in input single value string', () => {
      const pointOfSaleTest = 'abrakadabra';
      const parsedPos = getPointOfSaleForLocaleOrDefault(pointOfSaleTest);
      expect(parsedPos).to.equal('');
    });

    it('should return empty string when matching URL is invalid in provided multi-value string', () => {
      const pointOfSaleTest = "en:zombo.com,da-DA:nke,fr:fr.zombo.com,de-DE:de.zombo.com";
      const parsedPos = getPointOfSaleForLocaleOrDefault(pointOfSaleTest, "da-DA");
      expect(parsedPos).to.equal('');
    })
  });
});
