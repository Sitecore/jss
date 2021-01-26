import { expect } from 'chai';
import { extractProxy } from './package-deploy';

describe('package-deploy', () => {
  describe('extractProxy', () => {
    it('should return proxy object', () => {
      expect(extractProxy('https://localhost:9999')).to.deep.equal({
        protocol: 'https',
        port: 9999,
        host: 'localhost',
      });

      expect(extractProxy('http://myhostname:1234')).to.deep.equal({
        protocol: 'http',
        port: 1234,
        host: 'myhostname',
      });
    });

    it('should return undefined if proxy not provided', () => {
      expect(extractProxy()).to.equal(undefined);
    });

    it('should return undefined if proxy is not valid url', () => {
      process.exit = () => [] as never;
      expect(extractProxy('test')).to.equal(undefined);
    });
  });
});
