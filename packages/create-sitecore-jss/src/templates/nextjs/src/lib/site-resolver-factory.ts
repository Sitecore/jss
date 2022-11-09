import { SiteConfig, SiteResolver, SinglesiteResolver } from '@sitecore-jss/sitecore-jss-nextjs';
import config from 'temp/config';

export class SiteResolverFactory {
  create(): SiteResolver {
    const sites = JSON.parse(config.sites) as SiteConfig[];

    return new SinglesiteResolver(sites[0]);
  }
}

export const siteResolverFactory = new SiteResolverFactory();
