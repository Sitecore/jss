import { expect } from 'chai';
import { SiteInfo } from '../site';
import { PosResolver } from './pos-resolver';

describe('resolvePointOfSale', () => {
  it('should return empty when no point of sale present', () => {
    const site: SiteInfo = {
      name: 'no-pos',
      hostName: 'www.nopos.com',
      language: 'en',
    };
    const language = 'en';
    const result = PosResolver.resolve(site, language);
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

    const result = PosResolver.resolve(site, 'en');
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

    const result = PosResolver.resolve(site, 'en');
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

    const result = PosResolver.resolve(site, '');
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

    const result = PosResolver.resolve(site, 'en');
    expect(result).to.equal('fallpos.com');
  });
});
