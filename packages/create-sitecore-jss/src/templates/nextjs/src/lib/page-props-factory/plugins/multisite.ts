import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import { getMultisiteRewriteData } from '@sitecore-jss/sitecore-jss-nextjs';
import { SitecorePageProps } from 'lib/page-props';
import config from 'temp/config';
import { Plugin } from '..';
import { extractPath } from '../extract-path';

class MultisitePlugin implements Plugin {
  order = 0;

  async exec(props: SitecorePageProps, context: GetServerSidePropsContext | GetStaticPropsContext) {
    // Get normalized Sitecore item path
    const path = extractPath(context.params);

    const rewriteData = getMultisiteRewriteData(path);

    if (!rewriteData.siteName) {
      props.site = config.jssAppName;
      return props;
    }

    // TODO: Remove site from path
    props.site = rewriteData.siteName;
    return props;
  }
}

export const multisitePlugin = new MultisitePlugin();
