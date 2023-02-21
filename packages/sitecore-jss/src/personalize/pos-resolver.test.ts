import { expect, use, spy } from 'chai';
import spies from 'chai-spies';
import { SiteInfo } from '../site';
import { PosResolver } from './pos-resolver';

use(spies);

describe('PosResolver', () => {
  it('should resolve point of sale', () => {
    const sites: Record<string, SiteInfo> = {
      foo: {
        name: 'foo',
        hostName: 'foo.net',
        language: 'en',
        pointOfSale: { en: 'en-pos', ua: 'ua-pos' },
      },
    };
    const getSite = (siteName: string) => sites[siteName];
    const posResolver = new PosResolver({ getSite });

    expect(posResolver.resolve('en', 'foo')).to.equal('en-pos');
  });

  it('should resolve default point of sale', () => {
    const sites: Record<string, SiteInfo> = {
      foo: {
        name: 'foo',
        hostName: 'foo.net',
        language: 'ua',
        pointOfSale: { en: 'en-pos', ua: 'ua-pos' },
      },
    };
    const getSite = (siteName: string) => sites[siteName];
    const posResolver = new PosResolver({ getSite });

    expect(posResolver.resolve('da-DK', 'foo')).to.equal('ua-pos');
  });

  it('should return empty string when point of sale is not provided', () => {
    const sites: Record<string, SiteInfo> = {
      foo: {
        name: 'foo',
        hostName: 'foo.net',
        language: 'en',
      },
    };
    const getSite = (siteName: string) => sites[siteName];
    const posResolver = new PosResolver({ getSite });

    expect(posResolver.resolve('en', 'foo')).to.equal('');
  });

  it('should handle thrown error', () => {
    const logSpy = spy.on(console, 'log');
    const getSite = () => {
      throw 'oops';
    };
    const posResolver = new PosResolver({ getSite });

    expect(posResolver.resolve('en', 'foo')).to.equal('');
    expect(logSpy).called.once.with('oops');

    spy.restore(console.log);
  });
});
