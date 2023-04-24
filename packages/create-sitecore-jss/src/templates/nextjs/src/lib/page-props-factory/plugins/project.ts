import { getPublicUrl } from '@sitecore-jss/sitecore-jss-nextjs/utils';
import { SitecorePageProps } from 'lib/page-props';
import chalk from 'chalk';
import fs from 'fs';
import { Plugin } from '..';

class ProjectPlugin implements Plugin {
  order = 1;

  async exec(props: SitecorePageProps) {
    if (!props.site.project) {
      return props;
    }

    const isProjectImplemented = fs.existsSync(`${process.cwd()}/src/projects/${props.site.project}`);

    if (process.env.NODE_ENV === 'development' && !isProjectImplemented) {
      console.log(
        chalk.yellow(
          `Project ${props.site.project} is not implemented. Shared layout, components are used instead`
        )
      );
    }

    if (isProjectImplemented) {
      const stylesPath = `${process.cwd()}/public/projects/${props.site.project}/index.css`;

      if (fs.existsSync(stylesPath)) {
        props.headLinks.push({
          rel: 'stylesheet',
          href: `${getPublicUrl()}/projects/${props.site.project}/index.css`,
        });
      }
    }

    return props;
  }
}

export const projectPlugin = new ProjectPlugin();
