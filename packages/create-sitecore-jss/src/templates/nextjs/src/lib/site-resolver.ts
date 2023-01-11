import { SiteResolver } from '@sitecore-jss/sitecore-jss-nextjs/middleware';
import config from 'temp/config';

/*
  The site resolver stores site information and is used in the app
  whenever site lookup is required (e.g. by name in page props factory
  or by host in Next.js middleware).

  By default, the app is single-site (one JSS app per Sitecore site).
  However, multi-site is available with the `nextjs-multisite` add-on.
*/

// Add our single site
const sites = [
  {
    name: config.jssAppName,
    language: config.defaultLanguage,
    hostName: '*',
  },
];

/** SiteResolver singleton */
export const siteResolver = new SiteResolver(sites);
