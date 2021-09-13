import chalk from 'chalk';
import fs from 'fs';
import glob from 'glob';
import path from 'path';

interface PackageJsonConfig {
  appName: string;
  graphQLEndpointPath?: string;
  sitecoreDistPath?: string;
}

interface PackageJson {
  name: string;
  config: PackageJsonConfig;
}

/**
 * Apply name replacement on a given string
 * @param {string} value String to perform replacement on
 * @param {string} replaceName Name value to replace
 * @param {string} withName Name value to replace with
 */
export function applyNameReplacement(value: string, replaceName: string, withName: string) {
  // Escapes a string literal for use in RegEx
  const escapeLiteral = (literal: string) => {
    return literal.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  };
  return value.replace(RegExp(escapeLiteral(replaceName), 'g'), withName);
}

/**
 * @param {PackageJson} pkg package.json object
 * @param {string} name App name
 * @param {string} replaceName Name value to replace
 */
export function applyNameToPackageJson(pkg: PackageJson, name: string, replaceName: string) {
  pkg.name = name; // root name will never match "replaceName", so always set directly
  pkg.config.appName = applyNameReplacement(pkg.config.appName, replaceName, name);

  if (pkg.config.sitecoreDistPath) {
    pkg.config.sitecoreDistPath = applyNameReplacement(
      pkg.config.sitecoreDistPath,
      replaceName,
      name
    );
  }
  return pkg;
}

/**
 * @param {string} configXml Sitecore configuration xml
 * @param {string} hostName App hostname
 */
export function applyHostNameToSitecoreConfig(configXml: string, hostName: string) {
  // replace host name
  configXml = configXml.replace(
    /<site ((.|\n|\r)*?)hostName="[^"]+"/g,
    `<site $1hostName="${hostName}"`
  );
  return configXml;
}

/**
 * @param {string} projectFolder Project folder
 * @param {string} name App name
 * @param {string} hostName App hostname
 * @param {string} replaceName Name value to replace
 * @param {boolean} withPrefix Option to pass to replacePrefix - defaults to false
 */
export function applyNameToProject(
  projectFolder: string,
  name: string,
  hostName: string,
  replaceName: string,
  withPrefix?: boolean
) {
  // Apply name to package.json file
  console.log(chalk.cyan(`Applying name ${name} to package.json...`));

  const packagePath = path.join(projectFolder, 'package.json');
  let pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  pkg = applyNameToPackageJson(pkg, name, replaceName);
  fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2));

  // Apply name and hostName to Sitecore config files
  let configFileIndex = 0;
  glob
    .sync(path.join(projectFolder, 'sitecore', 'config', '*.config'))
    .forEach((sitecoreConfigPath: string) => {
      let configXml = fs.readFileSync(sitecoreConfigPath, 'utf8');

      console.log(
        chalk.cyan(`Applying name ${name} and hostName ${hostName} to ${sitecoreConfigPath}...`)
      );
      configXml = applyNameReplacement(configXml, replaceName, name);
      configXml = applyHostNameToSitecoreConfig(configXml, hostName);

      fs.unlinkSync(sitecoreConfigPath);

      const configFileIndexName = configFileIndex === 0 ? '' : configFileIndex;
      const finalConfigFileName = path.join(
        path.dirname(sitecoreConfigPath),
        `${name}${configFileIndexName}.config`
      );

      configFileIndex += 1;

      fs.writeFileSync(finalConfigFileName, configXml);
    });

  replacePrefix(projectFolder, name, replaceName, withPrefix);
}

/**
 * Returns a string formatted to PascalCase
 * my-next-sitecore-app becomes MyNextSitecoreApp
 * @param {string} name
 */
export function getPascalCaseName(name: string): string {
  const temp: string[] = name.split('-');
  name = temp.map((item: string) => (item = item.charAt(0).toUpperCase() + item.slice(1))).join('');
  return name;
}

/**
 * Called during jss create, this function replaces the sample's prefix with the app's name on Sitecore templates
 * @param {string} projectFolder Project folder
 * @param {string} name Name value to replace
 * @param {string} prefix Prefix of the sample app's template - should match Jss[RAV|Next]Web
 * @param {boolean} withPrefix if true, replaces prefix with app name in PascalCase,
 * otherwise strip the prefix
 */
export function replacePrefix(
  projectFolder: string,
  name: string,
  prefix: string,
  withPrefix?: boolean
) {
  if (!withPrefix) {
    console.log(chalk.cyan('Removing template prefix...'));
    const prefixWithHyphen = prefix + '-';
    glob
      .sync(path.join(projectFolder, './{data,sitecore/definitions,src}/**/*.*'))
      .forEach((filePath: string) => {
        let fileContents: string = fs.readFileSync(filePath, 'utf8');

        // remove prefix
        fileContents = applyNameReplacement(fileContents, prefixWithHyphen, '');
        // need to call applyNameReplacement again with original prefix
        // to account for GraphQL queries and associated components
        fileContents = applyNameReplacement(fileContents, prefix, '');
        fs.writeFileSync(filePath, fileContents);
      });
    return;
  }

  console.log(chalk.cyan(`Replacing template prefix with ${getPascalCaseName(name)}...`));
  glob
    .sync(path.join(projectFolder, './{data,sitecore/definitions,src}/**/*.*'))
    .forEach((filePath: string) => {
      let fileContents: string = fs.readFileSync(filePath, 'utf8');

      // replace prefix with pascal case app name
      fileContents = applyNameReplacement(fileContents, prefix, getPascalCaseName(name));
      fs.writeFileSync(filePath, fileContents);
    });
}
