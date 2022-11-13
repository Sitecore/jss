import { SiteResolver, SiteConfig } from './site-resolver';
import { WildCardExp } from '../utils';
import { siteNotFoundError } from '../constants';

const SITE_PREFIX = '_site_';

type SiteMapping = {
  name: string;
  hostName: string;
  hostNameExp: WildCardExp[];
};

/**
 * Normalize a multisite rewrite path (remove multisite data)
 * @param {string} pathname the pathname
 * @returns {string} the pathname with multisite data removed
 */
export function normalizeMultisiteRewrite(pathname: string): string {
  if (!pathname.includes(SITE_PREFIX)) {
    return pathname;
  }
  const result = pathname.match(`${SITE_PREFIX}.*?(?:\\/|$)`);
  return result === null ? pathname : pathname.replace(result[0], '');
}

export class MultisiteResolver implements SiteResolver {
  private siteMappings: SiteMapping[];

  public get allSites(): SiteConfig[] {
    return this.siteConfigs;
  }

  /**
   * Create a MultisiteResolver SiteResolver
   * @param {SiteConfig[]} siteConfigs configuration
   */
  constructor(public siteConfigs: SiteConfig[]) {
    // Parse the hostName for lookup use
    this.siteMappings = [];
    this.siteConfigs.forEach((siteConfig) => {
      this.siteMappings.push({
        name: siteConfig.name,
        hostName: siteConfig.hostName,
        hostNameExp: siteConfig.hostName
          .split('|')
          .filter((piece) => piece.length > 0)
          .map((hostNameExp) => new WildCardExp(hostNameExp)),
      });
    });
  }

  /**
   * Get the site from the multisite rewrite path
   * @param {string} pathname the pathname
   * @returns {SiteConfig} the site from the multisite rewrite path
   * @throws An error if a site cannot be found
   */
  public getSiteForPath(pathname: string): SiteConfig {
    const path = pathname.endsWith('/') ? pathname : pathname + '/';

    const result = path.match(`${SITE_PREFIX}(.*?)\\/`);
    if (!result) {
      throw new Error(siteNotFoundError);
    }

    const siteConfig = this.siteConfigs.find((site) => site.name === result[1]);
    if (!siteConfig) {
      throw new Error(siteNotFoundError);
    }
    return siteConfig;
  }

  /**
   * Get the site from the host name
   * @param {string} host the host name
   * @returns {SiteConfig} the site from the multisite rewrite path
   * @throws An error if a site cannot be found
   */
  public getSiteForHost(host: string): SiteConfig {
    const siteMapping = this.siteMappings.find(
      (siteMapping) =>
        host.length === 0 ||
        siteMapping.hostName.length === 0 ||
        siteMapping.hostNameExp.find((hostNameExp) => hostNameExp.matches(host)) !== undefined
    );

    if (!siteMapping) {
      throw new Error(siteNotFoundError);
    }

    const siteConfig = this.siteConfigs.find((site) => site.name === siteMapping.name);
    if (!siteConfig) {
      throw new Error(siteNotFoundError);
    }

    return siteConfig;
  }

  /**
   * Get a sitemap path for the give site
   * @param {string[]} path the sitemap path
   * @param {SiteConfig} site the site to include in the rewrite
   * @returns {string[]} the updated sitemap path
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getSitemapPath(path: string[], site: SiteConfig): string[] {
    const result = [`${SITE_PREFIX}${site.name}`, ...path];
    return result;
  }

  /**
   * Get a multisite rewrite path for given pathname
   * @param {string} pathname the pathname
   * @param {MultisiteRewriteData} site the site to include in the rewrite
   * @returns {string} the rewrite path
   */
  public getMultisiteRewrite(pathname: string, site: SiteConfig): string {
    const path = pathname.startsWith('/') ? pathname : '/' + pathname;
    return `/${SITE_PREFIX}${site.name}${path}`;
  }
}
