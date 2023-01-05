import { SiteResolver } from '@sitecore-jss/sitecore-jss-nextjs';
import config from 'temp/config';

// Add single site with default values
const sites = [
  {
    name: config.jssAppName,
    language: config.defaultLanguage,
    hostName: '*',
  },
];

export const siteResolver = new SiteResolver(sites);
