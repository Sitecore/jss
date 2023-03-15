import { SiteInfo } from '../site';

export class PosResolver {
  static resolve = (site: SiteInfo, language: string) => {
    return site.pointOfSale
      ? site.pointOfSale[language] || site.pointOfSale['*'] || site.pointOfSale[site.language]
      : '';
  };
}
