import { SiteInfo } from './graphql-siteinfo-service';

// Delimiters for multi-value hostnames
const DELIMITERS = /\||,|;/g;

export type SiteResolverType = {
  /**
   * Resolve site by host name
   * @param {string} hostName the host name
   * @returns {SiteInfo} the resolved site
   */
  getByHost(hostName: string): SiteInfo;
  /**
   * Resolve site by site name
   * @param {string} siteName the site name
   * @returns {SiteInfo} the resolved site
   */
  getByName(siteName: string): SiteInfo;
};

/**
 * Resolves site based on the provided host or site name
 */
export class SiteResolver implements SiteResolverType {
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
    for (const [hostname, site] of this.getHostMap()) {
      if (this.matchesPattern(hostName, hostname)) {
        return site;
      }
    }
    throw new Error(`Could not resolve site for host ${hostName}`);
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

  protected getHostMap = (): Map<string, SiteInfo> => {
    const map = new Map<string, SiteInfo>();

    // First collect unique hostnames.
    // For sites with same hostname defined, priority is given to the first encountered.
    this.sites.forEach((site) => {
      const hostnames = site.hostName
        .replace(/\s/g, '')
        .toLocaleLowerCase()
        .split(DELIMITERS);
      hostnames.forEach((hostname) => {
        if (!map.has(hostname)) {
          map.set(hostname, site);
        }
      });
    });

    // Now order by specificity.
    // This equivalates to sorting from longest to shortest with the assumption
    // that your match is less specific as wildcards are introduced.
    // E.g. order.eu.site.com → *.eu.site.com → *.site.com → *
    // In case of a tie (e.g. *.site.com vs i.site.com), prefer one with less wildcards.
    return new Map(
      Array.from(map).sort((a, b) => {
        if (a[0].length === b[0].length) {
          return (a[0].match(/\*/g) || []).length - (b[0].match(/\*/g) || []).length;
        }
        return b[0].length - a[0].length;
      })
    );
  };
  // b[0].match(/\*/g) || []).length
  protected matchesPattern(hostname: string, pattern: string): boolean {
    // dots should be treated as chars
    // stars should be treated as wildcards
    const regExpPattern = pattern.replace(/\./g, '\\.').replace(/\*/g, '.*');

    const regExp = new RegExp(`^${regExpPattern}$`, 'gi');

    return !!hostname.match(regExp);
  }
}
