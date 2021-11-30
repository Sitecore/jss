import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { JsonObjectType } from '../steps/transform';

export const isJssApp = (
  template: string,
  pkg: {
    config?: {
      sitecoreConfigPath: string;
    };
  }
) => {
  // TODO: check if styleguide is a jss app
  // check if current project is a JSS project
  // TODO: move to helpers
  if (pkg?.config?.sitecoreConfigPath === undefined) {
    console.log(
      chalk.red(
        `Error: Could not add ${chalk.yellow(
          template
        )} to the current project because it is not a JSS app.`
      )
    );
    console.log(
      chalk.magenta(
        `${chalk.yellow('*')} Make sure the path to your JSS app is passed in with the ${chalk.cyan(
          '--destination flag'
        )}, or is the cwd.`
      )
    );
    console.log(
      chalk.magenta(
        `${chalk.yellow('*')} Check that the ${chalk.cyan(
          'sitecoreConfigPath'
        )} property exists in the ${chalk.cyan('package.json')}`
      )
    );
    process.exit(1);
  }
};

export const getPascalCaseName = (name: string): string => {
  // handle underscores by converting them to hyphens
  const temp: string[] = name.replace(/_/g, '-').split('-');
  name = temp.map((item: string) => (item = item.charAt(0).toUpperCase() + item.slice(1))).join('');
  return name;
};

export const openPackageJson = (pkgPath?: string) => {
  const filePath = path.resolve(pkgPath ? `${pkgPath}` : './package.json');
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return data ? JSON.parse(data) : undefined;
  } catch (error) {
    console.log(chalk.red(`The following error occurred while trying to read ${filePath}:`));
    console.log(chalk.red(error));
  }
};

export const sortKeys = (obj: JsonObjectType) => {
  const sorted: any = {};
  Object.keys(obj)
    .sort()
    .forEach((key: string) => (sorted[key] = obj[key]));

  return sorted;
};
