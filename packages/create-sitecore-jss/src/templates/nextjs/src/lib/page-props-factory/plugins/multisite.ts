import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import { SiteResolver } from '@sitecore-jss/sitecore-jss-nextjs';
import { SitecorePageProps } from 'lib/page-props';
import { siteResolverFactory } from 'lib/site-resolver-factory';
import { Plugin } from '..';
import { normalize } from '../normalize';

class MultisitePlugin implements Plugin {
  private siteResolver: SiteResolver;

  order = 0;

  constructor() {
    this.siteResolver = siteResolverFactory.create();
  }

  async exec(props: SitecorePageProps, context: GetServerSidePropsContext | GetStaticPropsContext) {
    console.log(context);

    // Get normalized Sitecore item path
    const path = normalize(context.params);

    const site = this.siteResolver.getSiteForPath(path);
    props.site = site;
    return props;
  }
}

export const multisitePlugin = new MultisitePlugin();
