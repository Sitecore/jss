import { SiteResolver, SiteConfig } from './site-resolver';

export class SinglesiteResolver implements SiteResolver {
  public get allSites(): SiteConfig[] {
    return [this.siteConfig];
  }

  /**
   * TBD.
   * @param {SiteConfig} siteConfig configuration
   */
  constructor(public siteConfig: SiteConfig) {}

  /**
   * Get the site from the multisite rewrite path
   * @param {string} _pathname the pathname
   * @returns {SiteConfig} the site from the multisite rewrite path
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getSiteForPath(_pathname: string): SiteConfig {
    return this.siteConfig;
  }

  /**
   * Get the site from the host name
   * @param {string} _host the host name
   * @returns {SiteConfig} the site for the host name
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getSiteForHost(_host: string): SiteConfig {
    return this.siteConfig;
  }

  /**
   * Get a sitemap path for the give site
   * @param {string[]} paths the sitemap path
   * @param {SiteConfig} _site the site to include in the rewrite
   * @returns {string[]} the updated sitemap path
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getSitemapPaths(paths: string[], _site: SiteConfig): string[] {
    return paths;
  }
}
