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
  return value.replace(RegExp(escapeLiteral(replaceName), 'gi'), withName);
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
 */
export function applyNameToProject(
  projectFolder: string,
  name: string,
  hostName: string,
  replaceName: string
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

  replacePrefix(projectFolder, name, replaceName);
}

/**
 * Returns a string formatted to Uppercase and no hyphens
 * so my-next-sitecore-app becomes Mynextsitecoreapp
 * @param {string} name
 */
export function getGqlFormattedName(name: string): string {
  let gqlFormattedName: string = name.split('-').join('');
  gqlFormattedName = gqlFormattedName.charAt(0).toUpperCase() + gqlFormattedName.slice(1);

  return gqlFormattedName;
}

/**
 * Called during jss create, this function replaces the sample's prefix with the app's name on Sitecore templates
 * @param {string} projectFolder Project folder
 * @param {string} name Name value to replace
 * @param {string} prefix Prefix of the sample app's template - should match Jss[RAV|Next]Web
 */
export function replacePrefix(projectFolder: string, name: string, prefix: string) {
  glob.sync(path.join(projectFolder, '**/*.*')).forEach((filePath: string) => {
    if (filePath.match(/data|sitecore\/definitions|src/)) {
      let fileContents: string = fs.readFileSync(filePath, 'utf8');

      if (filePath.match('routes/graphql') && fileContents.match(`${prefix}-GraphQL`)) {
        // in this case there are multiple prefixes on the page to replace,
        // but some should be gqlFormatted and others shouldn't
        fileContents = applyNameReplacement(
          fileContents,
          `${prefix}-GraphQL-IntegratedDemo`,
          `${getGqlFormattedName(name)}-GraphQL-IntegratedDemo`
        );
        fileContents = applyNameReplacement(
          fileContents,
          `${prefix}-GraphQL-ConnectedDemo`,
          `${getGqlFormattedName(name)}-GraphQL-ConnectedDemo`
        );
        fileContents = applyNameReplacement(fileContents, prefix, name);
        fs.writeFileSync(filePath, fileContents);
        return;
      }

      if (fileContents.match(/ConnectedDemo|IntegratedDemo/g)) {
        // this case is for the GraphQL components that need file renames in addition to
        // the applyNameReplacement
        fileContents = applyNameReplacement(fileContents, prefix, getGqlFormattedName(name));
        fs.writeFileSync(filePath, fileContents);

        // need to change filename here because it's imported in another component
        const newPath: string = applyNameReplacement(filePath, prefix, getGqlFormattedName(name));
        fs.renameSync(filePath, newPath);
        if (filePath.match(/GraphQl/)) {
          fileContents = applyNameReplacement(fileContents, prefix, getGqlFormattedName(name));
          fs.writeFileSync(filePath, fileContents);
        }
        return;
      }

      if (filePath.includes(`${prefix}-`)) {
        fileContents = applyNameReplacement(fileContents, prefix, name);
        fs.writeFileSync(filePath, fileContents);
        const newPath: string = applyNameReplacement(filePath, prefix, name);
        fs.renameSync(filePath, newPath);
        return;
      }

      fileContents = applyNameReplacement(fileContents, prefix, name);
      fs.writeFileSync(filePath, fileContents);
    }
  });
}
