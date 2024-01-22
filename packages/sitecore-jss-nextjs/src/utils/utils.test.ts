/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { getPublicUrl, getJssEditingSecret } from './utils';

describe('utils', () => {
  describe('getPublicUrl', () => {
    afterEach(() => {
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

    it('should use VERCEL_URL if PUBLIC_URL is not defined', () => {
      process.env.VERCEL_URL = 'jss.uniqueid.vercel.com';
      const result = getPublicUrl();
      expect(result).to.equal('https://jss.uniqueid.vercel.com');
    });

    it('should use PUBLIC_URL if PUBLIC_URL and VERCEL_URL are defined', () => {
      process.env.VERCEL_URL = 'jss.uniqueid.vercel.com';
      process.env.PUBLIC_URL = 'http://test.com';
      const result = getPublicUrl();
      expect(result).to.equal('http://test.com');
    });

    it('should use PUBLIC_URL if it is an empty string and VERCEL_URL is defined', () => {
      process.env.VERCEL_URL = 'jss.uniqueid.vercel.com';
      const publicUrl = '';
      process.env.PUBLIC_URL = publicUrl;
      const result = getPublicUrl();
      expect(result).to.equal(publicUrl);
    });

    it('should use PUBLIC_URL if it is defined and is empty string', () => {
      const publicUrl = '';
      process.env.PUBLIC_URL = publicUrl;
      const result = getPublicUrl();
      expect(result).to.equal(publicUrl);
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
});
