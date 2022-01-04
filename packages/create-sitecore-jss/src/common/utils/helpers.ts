import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { InitializerFactory } from '../../InitializerFactory';
import { JsonObjectType } from '../steps/transform';

export const isJssApp = (
  template: string,
  pkg: {
    config?: {
      sitecoreConfigPath: string;
    };
  }
): boolean => {
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
    return false;
  }
  return true;
};

export const isDevEnvironment = (cwd?: string): boolean => {
  const currentPath = path.resolve(cwd || process.cwd());
  // TODO: is there a better way to detect this?
  const lernaPath = path.join(currentPath, '..', '..');

  return fs.existsSync(path.join(lernaPath, 'lerna.json'));
};

export const getPascalCaseName = (name: string): string => {
  // handle underscores by converting them to hyphens
  const temp: string[] = name.replace(/_/g, '-').split('-');
  name = temp.map((item: string) => (item = item.charAt(0).toUpperCase() + item.slice(1))).join('');
  return name;
};

export const openPackageJson = (pkgPath?: string) => {
  const filePath = path.resolve(pkgPath ?? './package.json');
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return data ? JSON.parse(data) : undefined;
  } catch (error) {
    console.log(chalk.red(`The following error occurred while trying to read ${filePath}:`));
    console.log(chalk.red(error));
  }
};

export const writePackageJson = (object: unknown, pkgPath?: string) => {
  const filePath = path.resolve(pkgPath ?? './package.json');
  try {
    fs.writeFileSync(filePath, JSON.stringify(object, null, 2), { encoding: 'utf8' });
  } catch (error) {
    console.log(chalk.red(`The following error occurred while trying to write ${filePath}:`));
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

export const getBaseTemplates = async (templatePath: string): Promise<string[]> => {
  const templates = fs.readdirSync(templatePath, 'utf8');
  const initFactory = new InitializerFactory();
  const baseTemplates = [];

  for (const template of templates) {
    const res = await initFactory.create(template);
    res?.isBase && baseTemplates.push(template);
  }
  return baseTemplates;
};

export const getAppPrefix = (appPrefix: boolean, appName: string, includeHyphen = true): string =>
  appPrefix ? `${getPascalCaseName(appName)}${includeHyphen ? '-' : ''}` : '';

export const writeFileToPath = (destinationPath: string, content: string) => {
  fs.writeFileSync(destinationPath, content, 'utf8');
};
