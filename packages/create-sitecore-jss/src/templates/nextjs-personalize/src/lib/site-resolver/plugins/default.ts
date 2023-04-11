import { SiteInfo } from '@sitecore-jss/sitecore-jss-nextjs/site';
import { tryParseEnvValue } from '@sitecore-jss/sitecore-jss-nextjs/utils';
import config from 'temp/config';
import { SiteResolverPlugin } from '..';

// Resolving from env variable, but it can be expanded or change in future if needed.
const pointOfSale = tryParseEnvValue<Record<string, string>>(
  process.env.NEXT_PUBLIC_CDP_POINTOFSALE,
  { [config.defaultLanguage]: process.env.NEXT_PUBLIC_CDP_POINTOFSALE || '' }
);

class DefaultPlugin implements SiteResolverPlugin {
  exec(sites: SiteInfo[]): SiteInfo[] {
    // Add default/configured site
    sites.unshift({
      name: config.jssAppName,
      language: config.defaultLanguage,
      hostName: '*',
      pointOfSale,
    });

    return sites;
  }
}

export const defaultPlugin = new DefaultPlugin();
