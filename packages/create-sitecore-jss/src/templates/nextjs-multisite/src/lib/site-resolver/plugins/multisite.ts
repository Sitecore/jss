import { SiteInfo } from '@sitecore-jss/sitecore-jss-nextjs/site';
import config from 'temp/config';
import { SiteResolverPlugin } from '..';

class MultisitePlugin implements SiteResolverPlugin {
  exec(sites: SiteInfo[]): SiteInfo[] {
    // Add preloaded sites
    sites.push(...(JSON.parse(config.sites) as SiteInfo[]));

    return sites;
  }
}

export const multisitePlugin = new MultisitePlugin();
