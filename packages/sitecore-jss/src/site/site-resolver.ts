import { SiteInfo } from './graphql-siteinfo-service';

/**
 * Information about the current host
 */
export type HostInfo = {
  hostName: string;
  language?: string;
};

// Delimiters for multi-value hostnames
const DELIMITERS = /\||,|;/g;

/**
 * Determines site name based on the provided host information
 */
export class SiteResolver {
  /**
   * Resolve siteName by host information
   * @param {HostInfo} hostInfo information about current host
   * @param {SiteInfo[]} sitesInfo list of available sites
   * @param {string} [fallbackSiteName] siteName to be returned in case siteName is not found
   * @returns {string} siteName resolved site name
   */
  static resolve = (
    hostInfo: HostInfo,
    sitesInfo: SiteInfo[],
    fallbackSiteName = 'website'
  ): string => {
    const siteInfo = sitesInfo.find((info) => {
      const hostnames = info.hostName.replace(/\s/g, '').split(DELIMITERS);

      const languageMatches =
        info.language === '' || !hostInfo.language || hostInfo.language === info.language;

      return hostnames.some(
        (hostname) =>
          languageMatches &&
          (hostInfo.hostName === hostname ||
            SiteResolver.matchesPattern(hostInfo.hostName, hostname))
      );
    });

    return siteInfo?.name || fallbackSiteName;
  };

  private static matchesPattern(hostname: string, pattern: string): boolean {
    // dots should be treated as chars
    // stars should be treated as wildcards
    const regExpPattern = pattern.replace(/\./g, '\\.').replace(/\*/g, '.*');

    const regExp = new RegExp(`^${regExpPattern}$`, 'g');

    return !!hostname.match(regExp);
  }
}
