import {
  generatePlugins,
  ModuleType,
  type PluginDefinition,
} from '@sitecore-jss/sitecore-jss-dev-tools';

/*
  PLUGINS GENERATION
  NOTE: pluginName: the name of the plugin in the src/lib folder
  Generates the `/src/temp/{pluginName}-plugins.ts` file, which exports list of plugins

  Generating the plugins is optional, and it can be maintained manually if preferred.

  The default convention uses the plugin's filename (without the extension) as the first part of the component
  name. For example, the file `/lib/page-props-factory/plugins/exampleName.ts` would map to plugin `exampleNamePlugin`.
*/

const pluginDefinitions: PluginDefinition[] = [
  {
    distPath: 'scripts/temp/config-plugins.ts',
    rootPath: 'scripts/config/plugins',
    moduleType: ModuleType.ESM,
  },
  {
    distPath: 'temp/site-resolver-plugins.ts',
    rootPath: 'lib/site-resolver/plugins',
    moduleType: ModuleType.ESM,
  },
];

pluginDefinitions.forEach(definition => {
  generatePlugins(definition);
});
