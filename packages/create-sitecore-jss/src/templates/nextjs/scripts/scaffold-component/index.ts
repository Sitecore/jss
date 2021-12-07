/*
  Component Scaffolding Script
  This is a script that enables scaffolding a new JSS component using `jss scaffold <ComponentName>`.
  The default convention is that component names must start with a capital letter, and can contain
  letters, number, underscores, or dashes.
  
  If the <ComponentName> parameter includes a path, it must be relative to the src/components folder.
  For example, `jss scaffold search/SearchBox` will create a component called `SearchBox` in
  `src/components/search/SearchBox.tsx`. Specifying a relative path is optional, and just providing
  the name is ok.

  Edit this script if you wish to use your own conventions for component storage in your JSS app.
*/

/* eslint-disable no-throw-literal,no-console */

import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

import * as plugins from 'temp/scaffold-component-plugins';
import generateComponentSrc from 'scripts/templates/component-src';

interface PluginOptions {
  /**
   * Determines whether we are in `code first` env
   */
  codeFirst?: boolean;
  /**
   * Steps for the user to be executed after `scaffold` will be finished
   */
  steps?: string[];
}

export type Plugin = ({
  scaffoldFile,
  componentName,
  componentPath,
  componentRootPath,
}: {
  scaffoldFile: (rootPath: string, fileContent: string, filename: string) => string | null;
  componentName: string;
  componentPath: string;
  componentRootPath: string;
  filename: string;
}) => void | PluginOptions;

// Matches component names that start with a capital letter, and contain only letters, number,
// underscores, or dashes. Optionally, the component name can be preceded by a relative path
const nameParamFormat = new RegExp(/^((?:[\w-]+\/)*)([A-Z][\w-]+)$/);
const componentArg = process.argv[2];

const regExResult = nameParamFormat.exec(componentArg);

const componentPath = regExResult ? regExResult[1] : '';
const componentName = regExResult ? regExResult[2] : '';
const filename = `${componentName}.tsx`;

if (!componentArg) {
  throw 'Component name was not passed. Usage: jss scaffold <ComponentName>';
}

if (regExResult === null) {
  throw `Component name should start with an uppercase letter and contain only letters, numbers,
dashes, or underscores. If specifying a path, it must be relative to src/components`;
}

/**
 * Creates a file relative to the specified path if the file doesn't exist. Creates directories as needed.
 * @param {string} rootPath - the root path
 * @param {string} fileContent - the file content
 * @param {string} filename - the filename
 * @returns the new file's filepath
 */
function scaffoldFile(rootPath: string, fileContent: string, filename: string): string | null {
  const outputDir = path.join(rootPath, componentPath);
  const outputFile = path.join(outputDir, filename);

  if (fs.existsSync(outputFile)) {
    console.log(chalk.red(`Skipping creating ${outputFile}; already exists.`));
    return null;
  }

  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(outputFile, editLineEndings(fileContent), 'utf8');
  console.log(chalk.green(`File ${outputFile} has been scaffolded.`));
  return outputFile;
}

/**
 * Force to use `crlf` line endings, we are using `crlf` across the project.
 * Replace: `lf` (\n), `cr` (\r)
 * @param {string} content
 */
function editLineEndings(content: string) {
  return content.replace(/\r|\n/gm, '\r\n');
}

const componentRootPath = 'src/components';
const options: PluginOptions = { steps: [] };

options.codeFirst = (Object.values(plugins) as Plugin[]).some((plugin) => {
  const output =
    plugin({ scaffoldFile, componentName, componentPath, componentRootPath, filename }) || {};

  output.steps && options.steps?.push(...output.steps);

  return output.codeFirst;
});

console.log(
  chalk.green(`
Scaffolding of ${componentName} complete.
Next steps:`)
);

const componentOutputPath = scaffoldFile(
  componentRootPath,
  generateComponentSrc(componentName),
  filename
);

if (componentOutputPath) {
  console.log(`* Implement the React component in ${chalk.green(componentOutputPath)}`);
}

if (!options.codeFirst) {
  console.log(
    `* Scaffold the component in Sitecore using '${chalk.green(
      `jss deploy component ${componentName} --allowedPlaceholders placeholder-for-component`
    )}, or create the rendering item and datasource template yourself.`
  );
  console.log(
    `* Deploy your app with the new component to Sitecore (${chalk.green(
      'jss deploy:watch'
    )} or ${chalk.green('jss deploy files')})`
  );
  console.log(`* Add the component to a route using Sitecore Experience Editor, and test it.`);
}

options.steps?.forEach((step) => console.log(step));
