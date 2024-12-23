import { SiteInfo } from '@sitecore-jss/sitecore-jss-nextjs/site';
import { sitecoreConfig } from '@sitecore-jss/sitecore-jss-nextjs';
import { SiteResolverPlugin } from '..';

class MultisitePlugin implements SiteResolverPlugin {
  exec(sites: SiteInfo[]): SiteInfo[] {
    // Add preloaded sites
    sites.push(...(JSON.parse(sitecoreConfig.sites) as SiteInfo[]));

    return sites;
  }
}

export const multisitePlugin = new MultisitePlugin();
