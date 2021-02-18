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
 * Escapes a string literal for use in RegEx
 * @param {string} literal
 */
function escapeRegex(literal: string) {
  return literal.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

/**
 * @param {PackageJson} pkg package.json object
 * @param {string} name App name
 * @param {string} [replaceName] Optional token which will enable "name replacement mode". If omitted, default/conventional values are used.
 */
export function applyNameToPackageJson(pkg: PackageJson, name: string, replaceName?: string) {
  pkg.name = name; // root name will never match "replaceName", so always set directly
  pkg.config.appName = replaceName
    ? pkg.config.appName.replace(RegExp(escapeRegex(replaceName), 'g'), name)
    : name;

  if (pkg.config.sitecoreDistPath) {
    pkg.config.sitecoreDistPath = replaceName
      ? pkg.config.sitecoreDistPath.replace(RegExp(escapeRegex(replaceName), 'g'), name)
      : `/dist/${name}`;
  }
  if (pkg.config.graphQLEndpointPath) {
    pkg.config.graphQLEndpointPath = replaceName
      ? pkg.config.graphQLEndpointPath.replace(RegExp(escapeRegex(replaceName), 'g'), name)
      : `/api/${name}`;
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
    return configXml.replace(RegExp(escapeRegex(replaceName), 'g'), name);
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

  // replace jss app graphQLEndpoint
  configXml = configXml.replace(
    /<app ((.|\n|\r)*?)graphQLEndpoint="[^"]+"/g,
    `<app $1graphQLEndpoint="/api/${name}"`
  );

  // replace GraphQL url
  configXml = configXml.replace(
    /<([^ ]+)GraphQLEndpoint ((.|\n|\r)*?)url="[^"]+"/g,
    `<${name}GraphQLEndpoint $2url="/api/${name}"`
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
  console.log(chalk.cyan(`Applying name ${name} to package.json...`));

  // Apply name to package.json file
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
