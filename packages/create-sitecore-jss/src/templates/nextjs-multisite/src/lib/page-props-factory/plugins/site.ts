import { SitecorePageProps } from 'lib/page-props';
import chalk from 'chalk';
import fs from 'fs';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import { getSiteRewriteData } from '@sitecore-jss/sitecore-jss-nextjs';
import { Plugin } from '..';
import { siteResolver } from 'lib/site-resolver';
import config from 'temp/config';

class SitePlugin implements Plugin {
  order = 0;

  async exec(props: SitecorePageProps, context: GetServerSidePropsContext | GetStaticPropsContext) {
    const path =
      context.params === undefined
        ? '/'
        : Array.isArray(context.params.path)
        ? context.params.path.join('/')
        : context.params.path ?? '/';

    // Get site name (from path)
    const siteData = getSiteRewriteData(path, config.jssAppName);

    // Resolve site by name
    props.site = siteResolver.getByName(siteData.siteName);

    if (
      props.site.project &&
      !fs.existsSync(`${process.cwd()}/src/projects/${props.site.project}`)
    ) {
      console.log(
        chalk.yellow(
          `Project ${props.site.project} is not added to the app. Shared layout, components are used instead`
        )
      );
    }

    return props;
  }
}

export const sitePlugin = new SitePlugin();
