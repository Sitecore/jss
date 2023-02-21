import { SiteInfo } from '@sitecore-jss/sitecore-jss-nextjs/middleware';
import config from 'temp/config';
import { SiteResolverPlugin } from '..';

class DefaultPlugin implements SiteResolverPlugin {
  exec(sites: SiteInfo[]): SiteInfo[] {
    // Add our single site
    sites.unshift({
      name: config.jssAppName,
      language: config.defaultLanguage,
      hostName: '*',
    });

    return sites;
  }
}

export const defaultPlugin = new DefaultPlugin();
