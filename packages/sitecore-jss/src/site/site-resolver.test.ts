/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { SiteResolver } from './site-resolver';

describe('SiteResolver', () => {
  describe('getByHost', () => {
    it('should throw when sites info is empty', () => {
      const resolver = new SiteResolver([]);
      expect(() => {
        resolver.getByHost('foo.com');
      }).to.throw(Error, 'Could not resolve site for host foo.com');
    });

    it('should throw when there is no appropriate site info', () => {
      const resolver = new SiteResolver([
        { hostName: 'bar.com', language: '', name: 'bar' },
        { hostName: 'var.com', language: '', name: 'var' },
      ]);
      expect(() => {
        resolver.getByHost('foo.com');
      }).to.throw(Error, 'Could not resolve site for host foo.com');
    });

    it('should return site', () => {
      const resolver = new SiteResolver([
        { hostName: 'bar.net', language: '', name: 'bar' },
        { hostName: 'foo.com', language: '', name: 'foo' },
        { hostName: 'var.com', language: '', name: 'var' },
      ]);
      const site = resolver.getByHost('foo.com');

      expect(site).to.not.be.undefined;
      expect(site?.name).to.equal('foo');
    });

    it('should return site when hostname includes wildcard', () => {
      const resolver = new SiteResolver([
        { hostName: 'var.com', language: '', name: 'var' },
        { hostName: 'bar.net', language: '', name: 'bar' },
        { hostName: '*.com', language: '', name: 'foo' },
      ]);
      const site = resolver.getByHost('foo.com');

      expect(site).to.not.be.undefined;
      expect(site?.name).to.equal('foo');
    });

    it('should return site when wildcard is provided', () => {
      const resolver = new SiteResolver([
        { hostName: 'bar.net', language: '', name: 'bar' },
        { hostName: '*', language: '', name: 'wildcard' },
      ]);
      const site = resolver.getByHost('foo.com');

      expect(site).to.not.be.undefined;
      expect(site?.name).to.equal('wildcard');
    });

    it('should be case insensitive', () => {
      const resolver = new SiteResolver([{ hostName: 'foo.com', language: '', name: 'foo' }]);
      const site = resolver.getByHost('Foo.com');

      expect(site).to.not.be.undefined;
      expect(site?.name).to.equal('foo');
    });

    it('should prefer most specific match', () => {
      const resolver = new SiteResolver([
        { hostName: '*', language: '', name: 'foo' },
        { hostName: '*.app.net', language: '', name: 'bar' },
        { hostName: 'i.app.net', language: '', name: 'i-bar' },
        { hostName: 'baz.app.net', language: '', name: 'baz' },
      ]);
      let site = resolver.getByHost('foo.net');
      expect(site).to.not.be.undefined;
      expect(site?.name).to.equal('foo');
      site = resolver.getByHost('bar.app.net');
      expect(site).to.not.be.undefined;
      expect(site?.name).to.equal('bar');
      site = resolver.getByHost('i.app.net');
      expect(site).to.not.be.undefined;
      expect(site?.name).to.equal('i-bar');
      site = resolver.getByHost('Baz.app.net');
      expect(site).to.not.be.undefined;
      expect(site?.name).to.equal('baz');
    });

    it('should prefer first site match for same hostName', () => {
      const resolver = new SiteResolver([
        { hostName: '*', language: '', name: 'foo' },
        { hostName: 'Bar.net', language: '', name: 'bar' },
        { hostName: '*', language: '', name: 'foo-never' },
        { hostName: 'bar.net', language: '', name: 'bar-never' },
      ]);
      let site = resolver.getByHost('foo.net');
      expect(site).to.not.be.undefined;
      expect(site?.name).to.equal('foo');
      site = resolver.getByHost('bar.net');
      expect(site).to.not.be.undefined;
      expect(site?.name).to.equal('bar');
    });

    describe('multi-value hostname', () => {
      it('hostnames include wildcard characters', () => {
        let resolver = new SiteResolver([
          { hostName: '*.bat.com|foo.bar.com', language: '', name: 'bar' },
          { hostName: 'test.com|*.foo.*.com|foo.com', language: '', name: 'foo' },
        ]);
        let site = resolver.getByHost('test.foo.bar.com');
        expect(site).to.not.be.undefined;
        expect(site?.name).to.equal('foo');

        resolver = new SiteResolver([
          { hostName: 'foo.bar.com', language: '', name: 'bar' },
          { hostName: 'test.com|*foo.*.com*|foo.com', language: '', name: 'foo' },
        ]);
        site = resolver.getByHost('xfoo.bar.com.en');
        expect(site).to.not.be.undefined;
        expect(site?.name).to.equal('foo');
      });

      it('hostname contains whitespaces', () => {
        const resolver = new SiteResolver([
          { hostName: 'bar.net', language: '', name: 'bar' },
          { hostName: 'test.com; foo.net | foo.com', language: '', name: 'foo' },
          { hostName: 'var.com', language: '', name: 'var' },
        ]);
        const site = resolver.getByHost('foo.com');

        expect(site).to.not.be.undefined;
        expect(site?.name).to.equal('foo');
      });

      it('comma delimiter is used', () => {
        const resolver = new SiteResolver([
          { hostName: 'bar.net', language: '', name: 'bar' },
          { hostName: 'test.com,foo.net,foo.com', language: '', name: 'foo' },
          { hostName: 'var.com', language: '', name: 'var' },
        ]);
        const site = resolver.getByHost('foo.com');

        expect(site).to.not.be.undefined;
        expect(site?.name).to.equal('foo');
      });

      it('semicolon delimiter is used', () => {
        const resolver = new SiteResolver([
          { hostName: 'bar.net', language: '', name: 'bar' },
          { hostName: 'test.com;foo.net;foo.com', language: '', name: 'foo' },
          { hostName: 'var.com', language: '', name: 'var' },
        ]);
        const site = resolver.getByHost('foo.com');

        expect(site).to.not.be.undefined;
        expect(site?.name).to.equal('foo');
      });

      it('pipe delimiter is used', () => {
        const resolver = new SiteResolver([
          { hostName: 'bar.net', language: '', name: '' },
          { hostName: 'test.com|foo.net|foo.com', language: '', name: 'foo' },
          { hostName: 'var.com', language: '', name: 'var' },
        ]);
        const site = resolver.getByHost('foo.com');

        expect(site).to.not.be.undefined;
        expect(site?.name).to.equal('foo');
      });
    });
  });

  describe('getByName', () => {
    it('should throw when sites info is empty', () => {
      const resolver = new SiteResolver([]);
      expect(() => {
        resolver.getByName('foo');
      }).to.throw(Error, 'Could not resolve site for name foo');
    });

    it('should throw when there is no appropriate site info', () => {
      const resolver = new SiteResolver([
        { hostName: 'bar.com', language: '', name: 'bar' },
        { hostName: 'var.com', language: '', name: 'var' },
      ]);
      expect(() => {
        resolver.getByName('foo');
      }).to.throw(Error, 'Could not resolve site for name foo');
    });

    it('should return site', () => {
      const resolver = new SiteResolver([
        { hostName: 'bar.net', language: '', name: 'bar' },
        { hostName: 'foo.com', language: '', name: 'foo' },
        { hostName: 'var.com', language: '', name: 'var' },
      ]);
      const site = resolver.getByName('foo');

      expect(site).to.not.be.undefined;
      expect(site?.hostName).to.equal('foo.com');
    });

    it('should be case insensitive', () => {
      const resolver = new SiteResolver([{ hostName: 'foo.com', language: '', name: 'foo' }]);
      const site = resolver.getByName('Foo');

      expect(site).to.not.be.undefined;
      expect(site?.hostName).to.equal('foo.com');
    });
  });
});
