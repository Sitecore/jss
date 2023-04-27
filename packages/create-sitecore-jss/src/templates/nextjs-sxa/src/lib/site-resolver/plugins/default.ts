import { SiteInfo } from '@sitecore-jss/sitecore-jss-nextjs/site';
import config from 'temp/config';
import { SiteResolverPlugin } from '..';

class DefaultPlugin implements SiteResolverPlugin {
  exec(sites: SiteInfo[]): SiteInfo[] {
    /**
     * remove default logic. it breaks for getting site info about context site language
    */
    return sites;
  }
}

export const defaultPlugin = new DefaultPlugin();
