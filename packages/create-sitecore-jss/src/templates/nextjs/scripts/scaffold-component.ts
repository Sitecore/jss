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

import chalk from 'chalk';
import generateComponentSrc from './templates/component-src';
import { constants } from '@sitecore-jss/sitecore-jss-dev-tools/nextjs';
import { scaffoldFile } from '@sitecore-jss/sitecore-jss-dev-tools';


// Matches component names that start with a capital letter, and contain only letters, number,
// underscores, or dashes. Optionally, the component name can be preceded by a relative path
const nameParamFormat = new RegExp(/^((?:[\w-]+\/)*)([A-Z][\w-]+)$/);
const componentArg = process.argv[2];

if (!componentArg) {
  throw 'Component name was not passed. Usage: jss scaffold <ComponentName>';
}

const regExResult = nameParamFormat.exec(componentArg);

if (regExResult === null) {
  throw `Component name should start with an uppercase letter and contain only letters, numbers,
dashes, or underscores. If specifying a path, it must be relative to src/components`;
}

const componentPath = regExResult[1];
const componentName = regExResult[2];
const filename = `${componentName}.tsx`;

const componentOutputPath = scaffoldFile(
  constants.COMPONENT_ROOT_PATH,
  generateComponentSrc(componentName),
  filename,
  componentPath
);

console.log(
  chalk.green(`
Scaffolding of ${componentName} complete.
Next steps:`)
);

if (componentOutputPath) {
  console.log(`* Implement the React component in ${chalk.green(componentOutputPath)}`);
}
