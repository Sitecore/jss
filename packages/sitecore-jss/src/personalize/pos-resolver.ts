import { SiteInfo } from '../site';

type PosResolverConfig = {
  getSite: (siteName: string) => SiteInfo;
};

// This class is used to get point of sale identifier(s). Resolving from env variable, but it can be expanded or change in future if needed.
export class PosResolver {
  constructor(private config: PosResolverConfig) {}

  /**
   * Resolve point of sale by locale and site name
   * @param {string} locale
   * @param {string} siteName site name
   * @returns {string} point of sale
   */
  public resolve = (locale: string, siteName: string): string => {
    try {
      const site = this.config.getSite(siteName);

      if (!site.pointOfSale) return '';

      return site.pointOfSale[locale] || site.pointOfSale[site.language];
    } catch (error) {
      console.log(error);
      return '';
    }
  };
}
