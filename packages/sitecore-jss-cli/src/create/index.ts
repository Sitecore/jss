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
 * @param {string} [replaceName] Optional token which will enable "name replacement mode". If omitted, default/conventional values are used.
 */
export function applyNameToPackageJson(pkg: PackageJson, name: string, replaceName?: string) {
  pkg.name = name; // root name will never match "replaceName", so always set directly
  pkg.config.appName = replaceName
    ? applyNameReplacement(pkg.config.appName, replaceName, name)
    : name;

  if (pkg.config.sitecoreDistPath) {
    pkg.config.sitecoreDistPath = replaceName
      ? applyNameReplacement(pkg.config.sitecoreDistPath, replaceName, name)
      : `/dist/${name}`;
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
 * @param {string} configXml Sitecore configuration xml
 * @param {string} name App name
 * @param {string} [replaceName] Optional token which will enable "name replacement mode". If omitted, default/conventional values are used.
 */
export function applyNameToSitecoreConfig(configXml: string, name: string, replaceName?: string) {
  if (replaceName) {
    return applyNameReplacement(configXml, replaceName, name);
  }

  // replace site name
  configXml = configXml.replace(/<site ((.|\n|\r)*?)name="[^"]+"/g, `<site $1name="${name}"`);

  // replace root path
  configXml = configXml.replace(
    /<site ((.|\n|\r)*?)rootPath="[^"]+"/g,
    `<site $1rootPath="/sitecore/content/${name}"`
  );

  // replace jss app name
  configXml = configXml.replace(/<app ((.|\n|\r)*?)name="[^"]+"/g, `<app $1name="${name}"`);

  // replace jss app sitecorePath
  configXml = configXml.replace(
    /<app ((.|\n|\r)*?)sitecorePath="[^"]+"/g,
    `<app $1sitecorePath="/sitecore/content/${name}"`
  );

  // replace GraphQL url
  configXml = configXml.replace(
    /<([^ ]+)GraphQLEndpoint ((.|\n|\r)*?)url="[^"]+"/g,
    `<${name}GraphQLEndpoint url="/sitecore/api/graph/edge"`
  );

  configXml = configXml.replace(/<\/(.+)GraphQLEndpoint>/g, `</${name}GraphQLEndpoint>`);

  // replace GraphQL templates path
  configXml = configXml.replace(
    /(<templates>\/sitecore\/templates\/Project\/)[^<]+(<\/templates>)/g,
    `$1${name}$2`
  );
  return configXml;
}

/**
 * @param {string} projectFolder Project folder
 * @param {string} name App name
 * @param {string} hostName App hostname
 * @param {string} [replaceName] Optional token which will enable "name replacement mode" on project files. If omitted, default/conventional values are used.
 */
export function applyNameToProject(
  projectFolder: string,
  name: string,
  hostName: string,
  replaceName?: string
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
      configXml = applyNameToSitecoreConfig(configXml, name, replaceName);
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
}
