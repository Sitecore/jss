import { SiteInfo } from './graphql-siteinfo-service';

// Delimiters for multi-value hostnames
const DELIMITERS = /\||,|;/g;

/**
 * Determines site based on the provided host name
 */
export class SiteResolver {
  /**
   * Resolve site by host name
   * @param {string} hostname the host name
   * @param {SiteInfo[]} sites the list of available sites
   * @returns {SiteInfo} the resolved site
   */
  static resolve = (hostname: string, sites: SiteInfo[]): SiteInfo | undefined => {
    const siteInfo = sites.find((info) => {
      const hostnames = info.hostName.replace(/\s/g, '').split(DELIMITERS);

      return hostnames.some(
        (hostName) => hostName === hostname || SiteResolver.matchesPattern(hostname, hostName)
      );
    });

    return siteInfo;
  };

  private static matchesPattern(hostname: string, pattern: string): boolean {
    // dots should be treated as chars
    // stars should be treated as wildcards
    const regExpPattern = pattern.replace(/\./g, '\\.').replace(/\*/g, '.*');

    const regExp = new RegExp(`^${regExpPattern}$`, 'g');

    return !!hostname.match(regExp);
  }
}
