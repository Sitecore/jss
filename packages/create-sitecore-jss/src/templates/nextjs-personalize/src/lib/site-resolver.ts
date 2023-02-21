import {
  SiteResolver,
  SiteInfo,
  parseEnvValue,
} from '@sitecore-jss/sitecore-jss-nextjs/middleware';
import config from 'temp/config';

/*
  The site resolver stores site information and is used in the app
  whenever site lookup is required (e.g. by name in page props factory
  or by host in Next.js middleware).
*/

// Grab our configured sites
const sites = JSON.parse(config.sites) as SiteInfo[];

const pointOfSale = parseEnvValue(process.env.NEXT_PUBLIC_CDP_POINTOFSALE);

// Then add fallback site with default values
sites.unshift({
  name: config.jssAppName,
  language: config.defaultLanguage,
  hostName: '*',
  pointOfSale:
    typeof pointOfSale === 'object' ? pointOfSale : { [config.defaultLanguage]: pointOfSale },
});

/** SiteResolver singleton */
export const siteResolver = new SiteResolver(sites);
