export type SiteConfig = {
  /**
   * Allow additional user defined properties.
   */
  [key: string]: any;

  /**
   * Name of the site.
   */
  name: string;

  /**
   * The host name of the incoming url. May include wildcards (ex. www.site.net, *.site.net, *.net, pda.*, print.*.net)
   * It's possible to set more than one mask by using '|' symbol as a separator (ex. pda.*|print.*.net)
   */
  hostName: string;

  /**
   * The host name of the incoming url. May include wildcards (ex. www.site.net, *.site.net, *.net, pda.*, print.*.net)
   * It's possible to set more than one mask by using '|' symbol as a separator (ex. pda.*|print.*.net)
   */
  targetHostName: string;

  /**
   *  Disables the use of trailing wildcards when resolving the name of a website.
   * For example, when set to true, 'test.com' is not be matched to '*test.c'. Default value: false.
   */
  disableTrailingWildcard: boolean;
};

/**
 * Resolve the site for a given path or host.
 */
export interface SiteResolver {
  readonly allSites: SiteConfig[];

  /**
   * Get the site from the multisite rewrite path
   * @param {string} pathname the pathname
   * @returns {SiteConfig} the site from the multisite rewrite path
   */
  getSiteForPath(pathname: string): SiteConfig;

  /**
   * Get the site from the host name
   * @param {string} host the host name
   * @returns {SiteConfig} the site for the host name
   */
  getSiteForHost(host: string): SiteConfig;

  /**
   * Get a sitemap path for the give site
   * @param {string[]} paths the sitemap path
   * @param {SiteConfig} site the site to include in the rewrite
   * @returns {string[]} the updated sitemap path
   */
  getSitemapPaths(paths: string[], site: SiteConfig): string[];
}
