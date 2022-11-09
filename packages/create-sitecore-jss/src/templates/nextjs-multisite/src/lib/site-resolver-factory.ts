import { SiteConfig, SiteResolver, MultisiteResolver } from '@sitecore-jss/sitecore-jss-nextjs';
import config from 'temp/config';

export class SiteResolverFactory {
  create(): SiteResolver {
    const sites = JSON.parse(config.sites) as SiteConfig[];

    return new MultisiteResolver(sites);
  }
}

export const siteResolverFactory = new SiteResolverFactory();
