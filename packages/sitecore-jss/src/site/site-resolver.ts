import { SiteInfo } from './graphql-siteinfo-service';

// This resolver is used to determine site name based on the provided hostname
export class SiteResolver {
  /**
   * Resolve siteName by hostName
   * @param {string} hostName
   * @param {SiteInfo[]} sitesInfo
   * @param {string} [fallbackSiteName] siteName to be returned in case siteName is not found
   * @returns {string} siteName
   */
  static resolve = (hostName: string, sitesInfo: SiteInfo[], fallbackSiteName?: string): string => {
    const siteInfo = sitesInfo.find((info) => info.hostName === hostName);

    return siteInfo?.name || fallbackSiteName || 'website';
  };
}
