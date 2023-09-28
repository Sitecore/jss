import { ModuleType, generatePlugins } from '@sitecore-jss/sitecore-jss-dev-tools';
import generateComponentSrc from 'scripts/templates/component-src';
import chalk from 'chalk';

generatePlugins({
  distPath: 'scripts/temp/scaffold-component-plugins.ts',
  rootPath: 'scripts/scaffold-component/plugins',
  moduleType: ModuleType.ESM,
  silent: true,
});

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

// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugins = require('scripts/temp/scaffold-component-plugins');

export interface ScaffoldComponentPluginConfig {
  [key: string]: unknown;
  componentName: string;
  componentPath: string;
  componentTemplateGenerator: (componentName: string) => string;
  args: string[];
  nextSteps: string[];
}

export interface ScaffoldComponentPlugin {
  /**
   * Detect order when the plugin should be called, e.g. 0 - will be called first (can be a plugin which data is required for other plugins)
   */
  order: number;
  /**
   * A function which will be called during component scaffolding
   * @param {JssConfig} config Current (accumulated) config
   */
  exec(config: ScaffoldComponentPluginConfig): ScaffoldComponentPluginConfig;
}

// Matches component names that start with a capital letter, and contain only letters, number,
// underscores, or dashes. Optionally, the component name can be preceded by a relative path
const nameParamFormat = new RegExp(/^((?:[\w\-]+\/)*)([A-Z][\w-]+)$/);
const componentArg = process.argv[2];
const args = process.argv.slice(3);

if (!componentArg) {
  throw 'Component name was not passed. Usage: jss scaffold <ComponentName>';
}

const regExResult = nameParamFormat.exec(componentArg);

if (regExResult === null) {
  throw `Component name should start with an uppercase letter and contain only letters, numbers,
dashes, or underscores. If specifying a path, it must be relative to src/components`;
}

const defaultConfig: ScaffoldComponentPluginConfig = {
  componentPath: regExResult[1],
  componentName: regExResult[2],
  componentTemplateGenerator: generateComponentSrc,
  args: args,
  nextSteps: [],
};

// default entry in next steps
defaultConfig.nextSteps.push(
  chalk.green(`
Scaffolding of ${defaultConfig.componentName} complete.
Next steps:`)
);

const config = (Object.values(plugins) as ScaffoldComponentPlugin[])
  .sort((p1, p2) => p1.order - p2.order)
  .reduce((config, plugin) => plugin.exec(config), defaultConfig);

console.log(config.nextSteps.join('\n'));
