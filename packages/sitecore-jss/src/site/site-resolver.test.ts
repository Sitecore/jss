/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { SiteResolver } from './site-resolver';

describe('SiteResolver', () => {
  describe('resolve', () => {
    it('should return undefined when sites info is empty', () => {
      const site = SiteResolver.resolve('foo.com', []);

      expect(site).to.be.undefined;
    });

    it('should return undefined when there is no appropriate site info', () => {
      const site = SiteResolver.resolve('foo.com', [
        { hostName: 'bar.com', language: '', name: 'bar' },
        { hostName: 'var.com', language: '', name: 'var' },
      ]);

      expect(site).to.be.undefined;
    });

    it('should return site', () => {
      const site = SiteResolver.resolve('foo.com', [
        { hostName: 'bar.net', language: '', name: 'bar' },
        { hostName: 'foo.com', language: '', name: 'foo' },
        { hostName: 'var.com', language: '', name: 'var' },
      ]);

      expect(site).to.not.be.undefined;
      expect(site?.name).to.equal('foo');
    });

    it('should return site when hostname includes wildcard', () => {
      const site = SiteResolver.resolve('foo.com', [
        { hostName: 'var.com', language: '', name: 'var' },
        { hostName: 'bar.net', language: '', name: 'bar' },
        { hostName: '*.com', language: '', name: 'foo' },
        { hostName: 'foo.com', language: '', name: 'foo-en' },
      ]);

      expect(site).to.not.be.undefined;
      expect(site?.name).to.equal('foo');
    });

    it('should return site when wildcard is provided', () => {
      const site = SiteResolver.resolve('foo.com', [
        { hostName: 'bar.net', language: '', name: 'bar' },
        { hostName: '*', language: '', name: 'wildcard' },
        { hostName: 'foo.com', language: '', name: 'foo' },
      ]);

      expect(site).to.not.be.undefined;
      expect(site?.name).to.equal('wildcard');
    });

    describe('should return site when multi-value hostnames are provided', () => {
      it('hostnames include wildcard characters', () => {
        let site = SiteResolver.resolve('test.foo.bar.com', [
          { hostName: '*.bat.com|foo.bar.com', language: '', name: 'bar' },
          { hostName: 'test.com|*.foo.*.com|foo.com', language: '', name: 'foo' },
        ]);
        expect(site).to.not.be.undefined;
        expect(site?.name).to.equal('foo');

        site = SiteResolver.resolve('xfoo.bar.com.en', [
          { hostName: 'foo.bar.com', language: '', name: 'bar' },
          { hostName: 'test.com|*foo.*.com*|foo.com', language: '', name: 'foo' },
        ]);
        expect(site).to.not.be.undefined;
        expect(site?.name).to.equal('foo');
      });

      it('hostname contains whitespaces', () => {
        const site = SiteResolver.resolve('foo.com', [
          { hostName: 'bar.net', language: '', name: 'bar' },
          { hostName: 'test.com; foo.net | foo.com', language: '', name: 'foo' },
          { hostName: 'var.com', language: '', name: 'var' },
        ]);

        expect(site).to.not.be.undefined;
        expect(site?.name).to.equal('foo');
      });

      it('comma delimiter is used', () => {
        const site = SiteResolver.resolve('foo.com', [
          { hostName: 'bar.net', language: '', name: 'bar' },
          { hostName: 'test.com,foo.net,foo.com', language: '', name: 'foo' },
          { hostName: 'var.com', language: '', name: 'var' },
        ]);

        expect(site).to.not.be.undefined;
        expect(site?.name).to.equal('foo');
      });

      it('semicolon delimiter is used', () => {
        const site = SiteResolver.resolve('foo.com', [
          { hostName: 'bar.net', language: '', name: 'bar' },
          { hostName: 'test.com;foo.net;foo.com', language: '', name: 'foo' },
          { hostName: 'var.com', language: '', name: 'var' },
        ]);

        expect(site).to.not.be.undefined;
        expect(site?.name).to.equal('foo');
      });

      it('pipe delimiter is used', () => {
        const site = SiteResolver.resolve('foo.com', [
          { hostName: 'bar.net', language: '', name: '' },
          { hostName: 'test.com|foo.net|foo.com', language: '', name: 'foo' },
          { hostName: 'var.com', language: '', name: 'var' },
        ]);

        expect(site).to.not.be.undefined;
        expect(site?.name).to.equal('foo');
      });
    });
  });
});
