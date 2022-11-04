import { expect } from 'chai';
import { SiteResolver } from './site-resolver';

describe('SiteResolver', () => {
  const sitesInfo = [
    {
      name: 'cat',
      hostName: 'supercat.com',
      virtualFolder: '/north',
      language: 'en',
    },
    {
      name: 'dog',
      hostName: 'superdog.com',
      virtualFolder: '/south',
      language: 'da-DK',
    },
  ];

  it('should resolve site name', () => {
    const siteName = SiteResolver.resolve('superdog.com', sitesInfo);

    expect(siteName).to.equal('dog');
  });

  it('should return custom fallback site name', () => {
    const siteName = SiteResolver.resolve('superanimal.com', sitesInfo, 'animal');

    expect(siteName).to.equal('animal');
  });

  it('should return default fallback site name', () => {
    const siteName = SiteResolver.resolve('superanimal.com', sitesInfo);

    expect(siteName).to.equal('website');
  });
});
