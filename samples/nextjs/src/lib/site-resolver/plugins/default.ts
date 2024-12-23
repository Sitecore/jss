import { SiteInfo } from '@sitecore-jss/sitecore-jss-nextjs/site';
import { sitecoreConfig } from '@sitecore-jss/sitecore-jss-nextjs';
import { SiteResolverPlugin } from '..';

class DefaultPlugin implements SiteResolverPlugin {
  exec(sites: SiteInfo[]): SiteInfo[] {
    // Add default/configured site
    sites.unshift({
      name: sitecoreConfig.sitecoreSiteName,
      language: sitecoreConfig.defaultLanguage,
      hostName: '*',
    });

    return sites;
  }
}

export const defaultPlugin = new DefaultPlugin();
