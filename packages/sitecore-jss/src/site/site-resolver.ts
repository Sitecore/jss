import { SiteInfo } from './graphql-siteinfo-service';

/**
 * Information about the current host
 */
export type HostInfo = {
  hostName: string;
  language?: string;
};

// Delimiters for multi-value hostnames
const DELIMITERS = /\|/g;

// Wildcard hostname
const WILDCARD = '*';

/**
 * Determines site name based on the provided hostname
 */
export class SiteResolver {
  /**
   * Resolve siteName by hostName
   * @param {HostInfo} hostInfo
   * @param {SiteInfo[]} sitesInfo
   * @param {string} [fallbackSiteName] siteName to be returned in case siteName is not found
   * @returns {string} siteName
   */
  static resolve = (
    hostInfo: HostInfo,
    sitesInfo: SiteInfo[],
    fallbackSiteName = 'website'
  ): string => {
    const siteInfo = sitesInfo.find((info) => {
      const hostnames = info.hostName.split(DELIMITERS);

      const languageMatches =
        info.language === '' || !hostInfo.language || hostInfo.language === info.language;

      return hostnames.some(
        (value) => languageMatches && (hostInfo.hostName === value || value === WILDCARD)
      );
    });

    return siteInfo?.name || fallbackSiteName;
  };
}
