import { SiteInfo } from './graphql-siteinfo-service';

// Delimiters for multi-value hostnames
const DELIMITERS = /\||,|;/g;

/**
 * Resolves site based on the provided host or site name
 */
export class SiteResolver {
  /**
   * @param {SiteInfo[]} sites Array of sites to be used in resolution
   */
  constructor(readonly sites: SiteInfo[]) {}

  /**
   * Resolve site by host name
   * @param {string} hostName the host name
   * @returns {SiteInfo} the resolved site
   * @throws {Error} if a matching site is not found
   */
  public getByHost = (hostName: string): SiteInfo => {
    const siteInfo = this.sites.find((info) => {
      const hostnames = info.hostName.replace(/\s/g, '').split(DELIMITERS);

      return hostnames.some(
        (hostname) => hostName === hostname || this.matchesPattern(hostName, hostname)
      );
    });

    if (!siteInfo) {
      throw new Error(`Could not resolve site for host ${hostName}`);
    }

    return siteInfo;
  };

  /**
   * Resolve site by site name
   * @param {string} siteName the site name
   * @returns {SiteInfo} the resolved site
   * @throws {Error} if a matching site is not found
   */
  public getByName = (siteName: string): SiteInfo => {
    const siteInfo = this.sites.find(
      (info) => info.name.toLocaleLowerCase() === siteName.toLocaleLowerCase()
    );

    if (!siteInfo) {
      throw new Error(`Could not resolve site for name ${siteName}`);
    }

    return siteInfo;
  };

  protected matchesPattern(hostname: string, pattern: string): boolean {
    // dots should be treated as chars
    // stars should be treated as wildcards
    const regExpPattern = pattern.replace(/\./g, '\\.').replace(/\*/g, '.*');

    const regExp = new RegExp(`^${regExpPattern}$`, 'gi');

    return !!hostname.match(regExp);
  }
}
