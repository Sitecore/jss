// import { SiteInfo } from './graphql-siteinfo-service';

type SiteInfo = {
  hostName: string;
  language?: string;
  name: string;
};

/**
 * Information about the current host
 */
export type HostInfo = {
  hostName: string;
  language?: string;
};

// Delimiters for multi-value hostnames
const DELIMITERS = /\||,|\;/g;

// Wildcard hostname
const WILDCARD = '*';

/**
 * Determines site name based on the provided host information
 */
export class SiteResolver {
  /**
   * Resolve siteName by host information
   * @param {HostInfo} hostInfo information about current host
   * @param {SiteInfo[]} sitesInfo list of available sites
   * @param {string} [fallbackSiteName] siteName to be returned in case siteName is not found
   * @returns {string} siteName
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
        (value) => languageMatches && (hostInfo.hostName === value || value === WILDCARD)
      );
    });

    return siteInfo?.name || fallbackSiteName;
  };

  private matchesPattern(hostname: string, pattern: string): boolean {
    const regExp = new RegExp(pattern.replace(/\./g, '.').replace(/\*/g, '.*'), 'g');

    return !!hostname.match(regExp);
  }
}
