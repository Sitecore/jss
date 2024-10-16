const plugins = require('scripts/temp/generate-component-factory-plugins');
import { PackageDefinition } from '@sitecore-jss/sitecore-jss-dev-tools';

export interface ComponentFactoryPluginConfig {
  watch?: boolean;
  packages: PackageDefinition[];
  components: string[];
}

export interface ComponentFactoryPlugin {
  /**
   * Detect order when the plugin should be called, e.g. 0 - will be called first (can be a plugin which data is required for other plugins)
   */
  order: number;
  /**
   * A function which will be called during component factory generation
   * @param {JssConfig} config Current (accumulated) config
   */
  exec(config: ComponentFactoryPluginConfig): ComponentFactoryPluginConfig;
}

/*
  COMPONENT FACTORY GENERATION
  Generates the /src/app/components/app-components.module.ts file which maps Angular components
  to JSS components.

  The component factory module defines a mapping between a string component name and a Angular component instance.
  When the Sitecore Layout service returns a layout definition, it returns named components.
  This mapping is used to construct the component hierarchy for the layout.

  NOTE: this script can run in two modes. The default mode, the component factory file is written once.
  But if `--watch` is a process argument, the component factory source folder will be watched,
  and the componentFactory.js rewritten on added or deleted files.
  This is used during `jss start` to pick up new or removed components at runtime.
*/

const defaultConfig: ComponentFactoryPluginConfig = {
  watch: process.argv.some(arg => arg === '--watch'),
  packages: [],
  components: [],
};

(Object.values(plugins) as ComponentFactoryPlugin[])
  .sort((p1, p2) => p1.order - p2.order)
  .reduce((config, plugin) => plugin.exec(config), defaultConfig);
