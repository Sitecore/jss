// eslint-disable-next-line @typescript-eslint/no-require-imports
const plugins = require('scripts/temp/generate-component-builder-plugins');
import { PackageDefinition, ComponentFile } from '@sitecore-jss/sitecore-jss-dev-tools';

export interface ComponentBuilderPluginConfig {
  watch?: boolean;
  packages: PackageDefinition[];
  components: ComponentFile[];
}

export interface ComponentBuilderPlugin {
  /**
   * Detect order when the plugin should be called, e.g. 0 - will be called first (can be a plugin which data is required for other plugins)
   */
  order: number;
  /**
   * A function which will be called during component builder generation
   * @param {JssConfig} config Current (accumulated) config
   */
  exec(config: ComponentBuilderPluginConfig): ComponentBuilderPluginConfig;
}

/*
  COMPONENT BUILDER GENERATION
  Generates the /src/temp/componentBuilder.ts file.
  
  componentBuilder provides componentFactory which maps React components to JSS components
  and moduleFactory which maps component files (modules) to JSS components.
  The component factory is a mapping between a string name and a React component instance.
  When the Sitecore Layout service returns a layout definition, it returns named components.
  This mapping is used to construct the component hierarchy for the layout.
  The default convention uses the parent folder name as the component name
  NOTE: this script can run in two modes. The default mode, the component builder file is written once.
  But if `--watch` is a process argument, the component builder source folder will be watched,
  and the componentBuilder.ts rewritten on added or deleted files.
  This is used during `jss start` to pick up new or removed components at runtime.
*/

const defaultConfig: ComponentBuilderPluginConfig = {
  watch: process.argv.some((arg) => arg === '--watch'),
  packages: [],
  components: [],
};

(Object.values(plugins) as ComponentBuilderPlugin[])
  .sort((p1, p2) => p1.order - p2.order)
  .reduce((config, plugin) => plugin.exec(config), defaultConfig);
