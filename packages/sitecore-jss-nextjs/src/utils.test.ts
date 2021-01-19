/* eslint-disable no-unused-expressions */
import { expect, use, spy } from 'chai';
import { getPublicUrl, getSitecoreSecurityToken } from './utils';

describe('utils', () => {
  describe('getPublicUrl', () => {
    after(() => {
      delete process.env.PUBLIC_URL;
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
  });
  describe('getSitecoreSecurityToken', () => {
    after(() => {
      delete process.env.SITECORE_SECURITY_TOKEN;
    });

    it('should throw if env variable missing', () => {
      expect(() => getSitecoreSecurityToken()).to.throw();
    });

    it('should return env variable', () => {
      const token = '1234abcd';
      process.env.SITECORE_SECURITY_TOKEN = token;
      const result = getSitecoreSecurityToken();
      expect(result).to.equal(token);
    });
  });
});
