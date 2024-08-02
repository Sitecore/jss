import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { InitializerFactory } from '../../InitializerFactory';
import { JsonObjectType } from '../processes/transform';

/**
 * Determines whether you are in a dev environment.
 * It's `true` if you are inside the monorepo
 * @param {string} [cwd] path to the current working directory
 * @returns {boolean} is a development environment
 */
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

/**
 * Provides json data from a file
 * @param {string} [jsonFilePath] path to the .json file.
 * @returns json data
 */
export const openJsonFile = (jsonFilePath: string) => {
  try {
    const data = fs.readFileSync(jsonFilePath, 'utf8');
    return data ? JSON.parse(data) : undefined;
  } catch (error) {
    console.log(chalk.red(`The following error occurred while trying to read ${jsonFilePath}:`));
    console.log(chalk.red(error));
  }
};

/**
 * Creates a .json file and inserts provided data
 * @param {Object} data data to be written into the .json file
 * @param {string} [jsonFilePath] a path to a file.
 */
export const writeJsonFile = (data: { [key: string]: unknown }, jsonFilePath: string) => {
  try {
    fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2), { encoding: 'utf8' });
  } catch (error) {
    console.log(chalk.red(`The following error occurred while trying to write ${jsonFilePath}:`));
    console.log(chalk.red(error));
  }
};

/**
 * Save configuration params to the package.json
 * @param {string[]} templates templates applied to the sample
 * @param {string} [pkgPath] path to the package.json
 */
export const saveConfiguration = (templates: string[], pkgPath: string) => {
  const pkg = openJsonFile(pkgPath);

  writeJsonFile({ ...pkg, config: { ...pkg.config, templates } }, pkgPath);
};

export const sortKeys = (obj: JsonObjectType) => {
  const sorted: any = {};
  Object.keys(obj)
    .sort()
    .forEach((key: string) => (sorted[key] = obj[key]));

  return sorted;
};

/**
 * Returns all templates
 * @param {string} templatePath path to the templates
 * @returns {string[]} templates
 */
export const getAllTemplates = (templatePath: string): string[] => {
  return fs.readdirSync(templatePath, 'utf8');
};

/**
 * Returns subset of base templates
 * @param {string} templatePath path to the templates
 * @returns {string[]} base templates
 */
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

export const removeFile = (filePath: string) => {
  fs.unlinkSync(filePath);
};
