import { SiteInfo, SiteResolver, ResolverMode } from '@sitecore-jss/sitecore-jss-nextjs/site';
import * as plugins from 'temp/site-resolver-plugins';

/*
  The site resolver stores site information and is used in the app
  whenever site lookup is required (e.g. by name in page props factory
  or by host in Next.js middleware).

  By default, the app is single-site (one JSS app per Sitecore site).
  However, multi-site is available with the `nextjs-multisite` add-on.
*/

export interface SiteResolverPlugin {
  /**
   * A function which will be called during sites collection
   */
  exec(sites: SiteInfo[]): SiteInfo[];
}

const sites = (Object.values(plugins) as SiteResolverPlugin[]).reduce(
  (sites, plugin) => plugin.exec(sites),
  []
);

// Site resolver can use two modes of operation
// Headless: JSS will match site with the most specific hostname first regardless of the order they are configured in Sitecore
// Classic: JSS will match the first site based on the order of sites retrieved from Sitecore
export const siteResolver = new SiteResolver(sites, ResolverMode.Headles);
