import { SiteResolver, SiteInfo } from '@sitecore-jss/sitecore-jss-nextjs';
import config from 'temp/config';

// Grab our configured sites
const sites = JSON.parse(config.sites) as SiteInfo[];

// Then add fallback site with default values
sites.push({
  name: config.jssAppName,
  language: config.defaultLanguage,
  hostName: '*',
});

export const siteResolver = new SiteResolver(sites);
