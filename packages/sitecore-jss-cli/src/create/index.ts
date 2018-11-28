import chalk from 'chalk';
import fs from 'fs';
import glob from 'glob';
import path from 'path';

export function applyNameToProject(projectFolder: string, name: string, hostName: string) {
  console.log(chalk.cyan(`Setting package name ${name}...`));

  const packagePath = path.join(projectFolder, 'package.json');

  const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  pkg.name = name;
  pkg.config.appName = name;
  pkg.config.sitecoreDistPath = `/dist/${name}`;
  pkg.config.graphQLEndpointPath = `/api/${name}`;

  fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2));

  let configFileIndex = 0;

  glob
    .sync(path.join(projectFolder, 'sitecore', 'config', '*.config'))
    .forEach((sitecoreConfigPath: string) => {
      let configXml = fs.readFileSync(sitecoreConfigPath, 'utf8');
      // replace site name
      configXml = configXml.replace(/<site ((.|\n|\r)*?)name="[^"]+"/g, `<site $1name="${name}"`);

      // replace host name
      configXml = configXml.replace(
        /<site ((.|\n|\r)*?)hostName="[^"]+"/g,
        `<site $1hostName="${hostName}"`
      );

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
        /<([^ ]+)GraphQLEndpoint ((.|\n|\r)*?)url="\/api\/[^"]+"/g,
        `<${name}GraphQLEndpoint $2url="/api/${name}"`
      );

      configXml = configXml.replace(/<\/(.+)GraphQLEndpoint>/g, `</${name}GraphQLEndpoint>`);

      // replace GraphQL templates path
      configXml = configXml.replace(
        /(<templates>\/sitecore\/templates\/Project\/)[^<]+(<\/templates>)/g,
        `$1${name}$2`
      );

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
