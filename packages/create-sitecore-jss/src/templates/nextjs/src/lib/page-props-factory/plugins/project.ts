import { SitecorePageProps } from 'lib/page-props';
import chalk from 'chalk';
import fs from 'fs';
import { Plugin } from '..';

class ProjectPlugin implements Plugin {
  order = 1;

  async exec(props: SitecorePageProps) {
    if (
      process.env.NODE_ENV === 'development' &&
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

export const projectPlugin = new ProjectPlugin();
