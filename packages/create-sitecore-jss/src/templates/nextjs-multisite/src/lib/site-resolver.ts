import { SiteResolver, SiteInfo } from '@sitecore-jss/sitecore-jss-nextjs';
import config from 'temp/config';

/*
  The site resolver stores site information and is used in the app
  whenever site lookup is required (e.g. by name in page props factory
  or by host in Next.js middleware).
*/

// Grab our configured sites
const sites = JSON.parse(config.sites) as SiteInfo[];

// Then add fallback site with default values
sites.push({
  name: config.jssAppName,
  language: config.defaultLanguage,
  hostName: '*',
});

/** SiteResolver singleton */
export const siteResolver = new SiteResolver(sites);
