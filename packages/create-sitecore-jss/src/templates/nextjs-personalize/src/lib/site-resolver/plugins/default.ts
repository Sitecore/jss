import { SiteInfo, parseEnvValue } from '@sitecore-jss/sitecore-jss-nextjs/middleware';
import config from 'temp/config';
import { SiteResolverPlugin } from '..';

// Resolving from env variable, but it can be expanded or change in future if needed.
const pointOfSale = parseEnvValue(process.env.NEXT_PUBLIC_CDP_POINTOFSALE);

class DefaultPlugin implements SiteResolverPlugin {
  exec(sites: SiteInfo[]): SiteInfo[] {
    // Add our single site
    sites.unshift({
      name: config.jssAppName,
      language: config.defaultLanguage,
      hostName: '*',
      pointOfSale:
        typeof pointOfSale === 'object' ? pointOfSale : { [config.defaultLanguage]: pointOfSale },
    });

    return sites;
  }
}

export const defaultPlugin = new DefaultPlugin();
