import { expect } from 'chai';
import { HostInfo, SiteResolver } from './site-resolver';

describe.only('SiteResolver', () => {
  const hostInfo: HostInfo = {
    hostName: 'foo.com',
  };

  const hostInfoWithLanguage: HostInfo = {
    ...hostInfo,
    language: 'en',
  };

  describe('resolve', () => {
    describe('fallback site name', () => {
      it('should return default when sites info is empty', () => {
        const siteName = SiteResolver.resolve(hostInfo, []);

        expect(siteName).to.equal('website');
      });

      it('should return default when there is no appropriate site info', () => {
        const siteName = SiteResolver.resolve(hostInfo, [
          { hostName: 'bar.com', language: '', name: 'bar' },
          { hostName: 'var.com', language: '', name: 'var' },
        ]);

        expect(siteName).to.equal('website');
      });

      it('should return custom when sites info is empty', () => {
        const siteName = SiteResolver.resolve(hostInfo, [], 'sample');

        expect(siteName).to.equal('sample');
      });

      it('should return custom when there is no appropriate site info', () => {
        const siteName = SiteResolver.resolve(
          hostInfo,
          [
            { hostName: 'bar.com', language: '', name: 'bar' },
            { hostName: 'var.com', language: '', name: 'var' },
          ],
          'sample'
        );

        expect(siteName).to.equal('sample');
      });
    });

    it('should return site name when only hostname is provided', () => {
      const siteName = SiteResolver.resolve(hostInfo, [
        { hostName: 'bar.net', language: '', name: 'bar' },
        { hostName: 'foo.com', language: '', name: 'foo' },
        { hostName: 'var.com', language: '', name: 'var' },
      ]);

      expect(siteName).to.equal('foo');
    });

    it('should return site name when hostname includes wildcard', () => {
      const siteName = SiteResolver.resolve(hostInfo, [
        { hostName: 'var.com', language: 'da-DK', name: 'var' },
        { hostName: 'bar.net', language: 'en', name: 'bar' },
        { hostName: '*.com', language: '', name: 'foo' },
        { hostName: 'foo.com', language: 'en', name: 'foo-en' },
      ]);

      expect(siteName).to.equal('foo');
    });

    it('should return site name when wildcard is provided', () => {
      const siteName = SiteResolver.resolve(hostInfo, [
        { hostName: 'bar.net', language: '', name: 'bar' },
        { hostName: '*', language: '', name: 'wildcard' },
        { hostName: 'foo.com', language: '', name: 'foo' },
      ]);

      expect(siteName).to.equal('wildcard');
    });

    it('should return site name when language is provided', () => {
      const siteName = SiteResolver.resolve(hostInfoWithLanguage, [
        { hostName: 'foo.com', language: 'ca', name: 'foo-ca' },
        { hostName: 'var.com', language: 'da-DK', name: 'var' },
        { hostName: 'bar.net', language: 'en', name: 'bar' },
        { hostName: 'foo.com', language: 'en', name: 'foo-en' },
      ]);

      expect(siteName).to.equal('foo-en');
    });

    it('should return site name when language is omit', () => {
      const siteName = SiteResolver.resolve(hostInfoWithLanguage, [
        { hostName: 'var.com', language: 'da-DK', name: 'var' },
        { hostName: 'bar.net', language: 'en', name: 'bar' },
        { hostName: 'foo.com', language: '', name: 'foo' },
        { hostName: 'foo.com', language: 'en', name: 'foo-en' },
      ]);

      expect(siteName).to.equal('foo');
    });

    describe('should return site name when multi-value hostnames are provided', () => {
      it('hostnames include wildcard characters', () => {
        expect(
          SiteResolver.resolve({ hostName: 'test.foo.bar.com' }, [
            { hostName: '*.bat.com|foo.bar.com', language: '', name: 'bar' },
            { hostName: 'test.com|*.foo.*.com|foo.com', language: '', name: 'foo' },
          ])
        ).to.equal('foo');

        expect(
          SiteResolver.resolve({ hostName: 'xfoo.bar.com.en' }, [
            { hostName: 'foo.bar.com', language: '', name: 'bar' },
            { hostName: 'test.com|*foo.*.com*|foo.com', language: '', name: 'foo' },
          ])
        ).to.equal('foo');
      });

      it('hostname contains whitespaces', () => {
        const siteName = SiteResolver.resolve(hostInfo, [
          { hostName: 'bar.net', language: '', name: 'bar' },
          { hostName: 'test.com; foo.net | foo.com', language: '', name: 'foo' },
          { hostName: 'var.com', language: '', name: 'var' },
        ]);

        expect(siteName).to.equal('foo');
      });

      it('comma delimiter is used', () => {
        const siteName = SiteResolver.resolve(hostInfoWithLanguage, [
          { hostName: 'bar.net', language: '', name: 'bar' },
          { hostName: 'test.com,foo.net,foo.com', language: 'en', name: 'foo' },
          { hostName: 'var.com', language: '', name: 'var' },
        ]);

        expect(siteName).to.equal('foo');
      });

      it('semicolon delimiter is used', () => {
        const siteName = SiteResolver.resolve(hostInfoWithLanguage, [
          { hostName: 'bar.net', language: '', name: 'bar' },
          { hostName: 'test.com;foo.net;foo.com', language: 'en', name: 'foo' },
          { hostName: 'var.com', language: '', name: 'var' },
        ]);

        expect(siteName).to.equal('foo');
      });

      it('pipe delimiter is used', () => {
        const siteName = SiteResolver.resolve(hostInfoWithLanguage, [
          { hostName: 'bar.net', language: '', name: 'bar' },
          { hostName: 'test.com|foo.net|foo.com', language: 'en', name: 'foo' },
          { hostName: 'var.com', language: '', name: 'var' },
        ]);

        expect(siteName).to.equal('foo');
      });
    });
  });
});
